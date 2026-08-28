import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { supabase } from './server/supabase.js';
import { sendClientEmail, sendTeamEmail } from './server/emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure allowed CORS origins
const allowedOrigins = [
  'https://behindthebuild.co',
  'https://www.behindthebuild.co',
  'https://behindthebuild.in',
  'https://www.behindthebuild.in',
  'https://behindthebuild-fawn.vercel.app'
];

if (process.env.FRONTEND_URL) {
  const formattedFrontendUrl = process.env.FRONTEND_URL.replace(/\/$/, '');
  allowedOrigins.push(formattedFrontendUrl);
}

// Regex to safely allow Vercel previews over HTTPS (e.g. https://*.vercel.app)
const vercelPreviewRegex = /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/;
// Regex to allow localhost in development
const localhostRegex = /^http:\/\/localhost:\d+$/;

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. tools, backend calls)
    if (!origin) return callback(null, true);

    const cleanedOrigin = origin.replace(/\/$/, '');

    if (allowedOrigins.indexOf(cleanedOrigin) !== -1) {
      return callback(null, true);
    }

    if (vercelPreviewRegex.test(cleanedOrigin)) {
      return callback(null, true);
    }

    if (localhostRegex.test(cleanedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error('Blocked by CORS policy'));
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Secure custom HTTP headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Enable HSTS in production when served over HTTPS
  if (process.env.NODE_ENV === 'production' && req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  next();
});

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation helper (digits, spaces, hyphens, optional leading plus, min 7 chars)
const isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/[\s\-\+]/g, '');
  return cleanPhone.length >= 7 && /^\d+$/.test(cleanPhone);
};

// Fetch next sequential booking ID from Supabase
const getNextBookingIdFromSupabase = async () => {
  const currentYear = new Date().getFullYear();
  const generateFallbackBookingId = () => {
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `BTB-${currentYear}-${rand}`;
  };

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_id')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('[Supabase ID Generation] Error fetching latest booking_id:', error.message);
      return generateFallbackBookingId();
    }

    if (!data || data.length === 0) {
      return `BTB-${currentYear}-00001`;
    }

    let maxNum = 0;
    for (const row of data) {
      const match = row.booking_id.match(/^BTB-(\d{4})-(\d{5})$/);
      if (match && parseInt(match[1], 10) === currentYear) {
        const num = parseInt(match[2], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    }

    if (maxNum > 0) {
      const nextNum = maxNum + 1;
      return `BTB-${currentYear}-${String(nextNum).padStart(5, '0')}`;
    }

    return `BTB-${currentYear}-00001`;
  } catch (err) {
    console.error('[Supabase ID Generation] Exception:', err.message);
    return generateFallbackBookingId();
  }
};

// Check for duplicate bookings within a 30-second window in Supabase
const checkDuplicateInSupabase = async (email, phone) => {
  try {
    const cutoffTime = new Date(Date.now() - 30 * 1000).toISOString();

    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .eq('phone', phone.trim())
      .gte('created_at', cutoffTime)
      .limit(1);

    if (error) {
      console.error('[Supabase Duplicate Check] Error:', error.message);
      return false;
    }

    return data && data.length > 0;
  } catch (err) {
    console.error('[Supabase Duplicate Check] Exception:', err.message);
    return false;
  }
};

// Custom memory-based rate limiter middleware to protect booking submissions
const rateLimitMemory = {};
const bookingRateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;

  if (!rateLimitMemory[ip]) {
    rateLimitMemory[ip] = [];
  }

  rateLimitMemory[ip] = rateLimitMemory[ip].filter(timestamp => now - timestamp < windowMs);

  const limit = process.env.NODE_ENV === 'production' ? maxRequests : 100;

  if (rateLimitMemory[ip].length >= limit) {
    return res.status(429).json({
      error: 'Too many booking requests from this IP. Please try again after 15 minutes.'
    });
  }

  rateLimitMemory[ip].push(now);
  next();
};

// Periodic pruning of the memory map to prevent memory leak
setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  for (const ip in rateLimitMemory) {
    rateLimitMemory[ip] = rateLimitMemory[ip].filter(timestamp => now - timestamp < windowMs);
    if (rateLimitMemory[ip].length === 0) {
      delete rateLimitMemory[ip];
    }
  }
}, 60 * 60 * 1000);

// POST: Create a new booking
app.post('/api/bookings', bookingRateLimiter, async (req, res) => {

  try {
    const {
      client_name,
      full_name,
      company_name,
      email,
      phone,
      region,
      project_location,
      services,
      budget,
      price,
      timeline,
      project_timeline,
      project_description,
      project_details,
      // New fields from corrected booking form
      monthly_price,
      duration,
      total_price,
      location_type,
      event_location
    } = req.body;

    const normalizedFullName = (full_name || client_name || '').trim();
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPhone = (phone || '').trim();
    const normalizedCompanyName = (company_name || null);
    const normalizedRegion = (project_location || region || 'Remote').trim();
    const normalizedDetails = (project_details || project_description || 'None').trim();
    const normalizedTimeline = (project_timeline || timeline || 'Flexible').trim();

    // Strict input type and length verification to prevent buffer payloads/NoSQL pollution
    const isInvalidString = (val, maxLen) => {
      if (val === undefined || val === null) return false;
      return typeof val !== 'string' || val.length > maxLen;
    };

    if (
      isInvalidString(normalizedFullName, 100) ||
      isInvalidString(normalizedCompanyName, 100) ||
      isInvalidString(normalizedEmail, 100) ||
      isInvalidString(normalizedPhone, 30) ||
      isInvalidString(normalizedRegion, 300) || // Relaxed to 300 to allow event addresses
      isInvalidString(normalizedTimeline, 50) ||
      isInvalidString(normalizedDetails, 2000)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payload elements or excessive length.',
        error: 'Invalid payload elements or excessive length.'
      });
    }

    // 1. Validate required fields
    if (!normalizedFullName) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required.',
        error: 'Full name is required.'
      });
    }
    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
        error: 'A valid email address is required.'
      });
    }
    if (!normalizedPhone || !isValidPhone(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'A valid phone number (at least 7 digits) is required.',
        error: 'A valid phone number (at least 7 digits) is required.'
      });
    }
    if (!normalizedDetails) {
      return res.status(400).json({
        success: false,
        message: 'Project details are required.',
        error: 'Project details are required.'
      });
    }

    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one selected service is required.',
        error: 'At least one selected service is required.'
      });
    }

    // 2. Prevent duplicate submissions (within a 30-second window)
    const isDuplicate = await checkDuplicateInSupabase(normalizedEmail, normalizedPhone);
    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate submission detected. Please wait 30 seconds before sending another request.',
        error: 'Duplicate submission detected. Please wait 30 seconds before sending another request.'
      });
    }

    // 3. Generate Booking ID automatically
    const booking_id = await getNextBookingIdFromSupabase();
    if (!booking_id) {
      return res.status(500).json({
        success: false,
        message: 'Could not generate a booking ID. Please try again.',
        error: 'Could not generate a booking ID. Please try again.'
      });
    }

    // 4. Save to Supabase Table (Primary Database)
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const firstServiceObj = (services && Array.isArray(services) && services.length > 0) ? services[0] : {};
    const serviceName = firstServiceObj.service || 'Brand Building';
    const planName = firstServiceObj.plan || 'Custom';
    const priceVal = firstServiceObj.price || price || budget || 'Custom';

    let data;
    try {
      // Try inserting into bookings with the new column layout first
      const newLayoutResult = await supabase
        .from('bookings')
        .insert([
          {
            id,
            booking_id,
            full_name: normalizedFullName,
            email: normalizedEmail,
            phone: normalizedPhone,
            company_name: normalizedCompanyName,
            service: serviceName,
            plan: planName,
            price: priceVal,
            project_location: normalizedRegion,
            project_details: normalizedDetails,
            project_timeline: normalizedTimeline,
            status: 'NEW',
            created_at: now
          }
        ])
        .select()
        .single();

      if (newLayoutResult.error) {
        console.warn(`[Supabase] Insert into bookings with new schema failed: ${newLayoutResult.error.message}. Falling back to old schema...`);

        // Fallback to the old schema on bookings table
        const oldLayoutResult = await supabase
          .from('bookings')
          .insert([
            {
              id,
              booking_id,
              client_name: normalizedFullName,
              company_name: normalizedCompanyName,
              email: normalizedEmail,
              phone: normalizedPhone,
              region: normalizedRegion,
              service: services,
              budget: priceVal,
              timeline: normalizedTimeline,
              project_description: normalizedDetails,
              status: 'NEW',
              source: 'Website',
              created_at: now,
              updated_at: now
            }
          ])
          .select()
          .single();

        if (oldLayoutResult.error) {
          console.error(`[Supabase Fallback] Insert into bookings with old schema failed: ${oldLayoutResult.error.message}`);
          return res.status(500).json({
            success: false,
            message: 'Unable to submit your project request. Please try again.'
          });
        }
        data = oldLayoutResult.data;
      } else {
        data = newLayoutResult.data;
      }
    } catch (dbErr) {
      console.error(`[Supabase Exception] DB insertion error: ${dbErr.message}`);
      return res.status(500).json({
        success: false,
        message: 'Unable to submit your project request. Please try again.'
      });
    }

    const returnedBookingId = (data && data.booking_id) || booking_id;
    console.log(`[Booking inserted into Supabase] Booking ID: ${returnedBookingId}`);

    // 5. Build email payload
    const emailPayload = {
      client_name: normalizedFullName,
      company_name: normalizedCompanyName,
      email: normalizedEmail,
      phone: normalizedPhone,
      region: normalizedRegion,
      project_location: normalizedRegion,
      services,
      budget: total_price || priceVal,
      price: total_price || priceVal,
      timeline: duration || normalizedTimeline,
      project_timeline: duration || normalizedTimeline,
      project_description: normalizedDetails,
      project_details: normalizedDetails,
      created_at: now,
      // Corrected fields mappings
      monthly_price: monthly_price || priceVal,
      duration: duration || normalizedTimeline,
      total_price: total_price || priceVal,
      location_type: location_type || (normalizedRegion === 'Remote' ? 'Remote' : 'Event Location'),
      event_location: event_location || (normalizedRegion === 'Remote' ? 'Not applicable' : normalizedRegion)
    };

    // 6. Return response immediately (Database success achieved)
    console.log("API response returned with emailPayload");
    return res.status(201).json({
      success: true,
      booking_id: returnedBookingId,
      bookingId: returnedBookingId,
      emailPayload: emailPayload,
      message: 'Your project request has been received successfully.'
    });

  } catch (err) {
    console.error('Error handling booking request:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit your project request. Please try again.',
      error: 'Unable to submit your project request. Please try again.'
    });
  }
});

// POST: Send confirmation and notification emails (fully awaited, serverless safe)
app.post('/api/bookings/send-emails', async (req, res) => {
  try {
    const { booking_id, emailPayload } = req.body;
    
    if (!booking_id || !emailPayload) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID and email payload are required.'
      });
    }

    console.log(`[Async Email Trigger] Starting email delivery for Booking ID: ${booking_id}`);
    
    // Await both client and team emails so the serverless function does not terminate early
    const [clientRes, teamRes] = await Promise.all([
      sendClientEmail(emailPayload, booking_id),
      sendTeamEmail(emailPayload, booking_id)
    ]);

    console.log(`[Async Email Trigger] Finished. Client success: ${clientRes.success}, Team success: ${teamRes.success}`);

    return res.status(200).json({
      success: true,
      clientEmail: clientRes.success,
      teamEmail: teamRes.success
    });
  } catch (error) {
    console.error(`[Async Email Trigger Exception] Error sending emails:`, error.message || error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send emails.',
      error: error.message
    });
  }
});

// GET: System Status health check
app.get('/api/system-status', async (req, res) => {
  let dbStatus = 'Disconnected';
  try {
    const { error } = await supabase.from('bookings').select('id').limit(1);
    if (!error) {
      dbStatus = 'Connected';
    }
  } catch (e) {
    // Ignore error, falls back to Disconnected
  }

  const emailConfigured = process.env.RESEND_API_KEY ? 'Configured' : 'Unconfigured';
  const smtpStatus = 'Not Configured'; // using API SDK, not SMTP

  return res.status(200).json({
    database: dbStatus,
    email: emailConfigured,
    smtp: smtpStatus,
    supabase: dbStatus
  });
});

// GET: Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// Start Express server
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
