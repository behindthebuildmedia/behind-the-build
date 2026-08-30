import { Resend } from "resend";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/* =====================================================
   EMAIL PROVIDER CONFIGURATION
   
   Primary:  Resend API (proper DKIM/SPF for behindthebuild.in)
   Fallback: Gmail SMTP (if Resend is not configured)
===================================================== */

const RESEND_API_KEY = process.env.RESEND_API_KEY || null;
const SENDER_EMAIL = process.env.EMAIL_FROM || "admin@behindthebuild.in";
const SENDER_NAME = "Behind The Build";
const REPLY_TO_EMAIL = process.env.EMAIL_REPLY_TO || "admin@behindthebuild.in";
const TEAM_EMAIL = process.env.EMAIL_TEAM_TO || process.env.COMPANY_EMAIL || "admin@behindthebuild.in";

// Resend client (primary — authenticated sending from behindthebuild.in)
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Gmail SMTP fallback (used only if Resend API key is not configured)
const gmailUser = process.env.EMAIL_USER || 'behindthebuildofficial@gmail.com';
const gmailPass = process.env.EMAIL_PASS || Buffer.from('bmplbmx1Y21vdW5zcm9hYw==', 'base64').toString('utf-8');

const gmailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

if (resend) {
  console.log("[Email] Using Resend API for transactional emails");
} else {
  console.log("[Email] Resend API key not configured — using Gmail SMTP fallback");
}

/* =====================================================
   CORE SEND FUNCTION (Resend primary, Gmail fallback)
===================================================== */
const sendEmail = async ({ from, to, replyTo, subject, text, html }) => {
  // Try Resend first
  if (resend) {
    try {
      const result = await resend.emails.send({
        from,
        to: Array.isArray(to) ? to : [to],
        reply_to: replyTo,
        subject,
        text,
        html,
      });

      if (result.error) {
        console.error("[Resend] API error:", result.error);
        throw new Error(result.error.message || "Resend API error");
      }

      console.log("[Resend] Email sent successfully:", result.data?.id);
      return { success: true, provider: "resend", id: result.data?.id };
    } catch (resendErr) {
      console.error("[Resend] Failed, falling back to Gmail SMTP:", resendErr.message);
      // Fall through to Gmail SMTP
    }
  }

  // Gmail SMTP fallback
  try {
    const mailOptions = {
      from: `"${SENDER_NAME}" <${gmailUser}>`,
      to,
      replyTo: replyTo || REPLY_TO_EMAIL,
      subject,
      text,
      html,
    };

    await gmailTransporter.sendMail(mailOptions);
    console.log("[Gmail SMTP] Email sent successfully");
    return { success: true, provider: "gmail-smtp" };
  } catch (gmailErr) {
    console.error("[Gmail SMTP] Email failed:", gmailErr.message);
    return { success: false, provider: "gmail-smtp", error: gmailErr.message };
  }
};

/* =====================================================
   HELPER TO EXTRACT SINGLE SERVICE DETAILS
===================================================== */
const extractServiceDetails = (bookingData) => {
  let serviceName = bookingData.serviceName || bookingData.service || "Brand Building";
  let planName = bookingData.planName || bookingData.plan || "Custom";
  let price = bookingData.price || "Custom Price";

  const servicesArr = bookingData.services;

  if (servicesArr && Array.isArray(servicesArr) && servicesArr.length > 0) {
    const mainService = servicesArr[0];
    if (typeof mainService === "string") {
      serviceName = mainService;
    } else if (mainService && typeof mainService === "object") {
      serviceName = mainService.service || serviceName;
      planName = mainService.plan || planName;
      price = mainService.price || price;
    }
  }

  return { serviceName, planName, price };
};

/* =====================================================
   HELPER: Build a detail row for the HTML email
===================================================== */
const detailRow = (label, value) => `
  <tr>
    <td style="padding:10px 0;font-size:13px;color:#555555;border-bottom:1px solid #EEEEEE;width:40%;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;font-size:13px;color:#212121;font-weight:600;border-bottom:1px solid #EEEEEE;vertical-align:top;">${value}</td>
  </tr>`;

/* =====================================================
   CUSTOMER CONFIRMATION EMAIL
===================================================== */
export const sendClientEmail = async (bookingData, bookingId) => {
  try {
    if (!bookingData.email || !bookingData.email.includes("@")) {
      console.error("[Email] Client email failed: Invalid recipient", bookingData.email);
      return { success: false, error: "Invalid client email address" };
    }

    const { serviceName, planName, price } = extractServiceDetails(bookingData);
    const customerName = bookingData.client_name || "there";
    const durationText = bookingData.duration || bookingData.timeline || bookingData.project_timeline || "1 Month";
    const totalPriceText = bookingData.total_price || price;
    const locationTypeText = bookingData.location_type || "Remote";
    const eventLocationText = bookingData.event_location || "Not applicable";
    const isEventLocation = locationTypeText === "Event Location";
    const projectDetails = bookingData.project_description || bookingData.project_details || "None";

    // ------------------------------------------------------------------
    // Subject — clean, professional, transactional
    // ------------------------------------------------------------------
    const subject = `Booking Confirmed — ${bookingId}`;

    // ------------------------------------------------------------------
    // Plain-text version (important for deliverability)
    // ------------------------------------------------------------------
    const text = `Hi ${customerName},

Thank you for choosing Behind The Build.

Your booking has been received successfully. Our team will review your requirements and get back to you shortly.

Booking Details
---------------
Booking ID: ${bookingId}
Service: ${serviceName}
Package: ${planName}
Duration: ${durationText}
Amount: ${totalPriceText}
Location: ${locationTypeText}${isEventLocation ? ` — ${eventLocationText}` : ""}

What happens next?
Our team will review your project details and contact you via email or phone within 24 hours.

If you have any questions, reply to this email and we will assist you.

Regards,
Behind The Build
admin@behindthebuild.in
https://behindthebuild.in`;

    // ------------------------------------------------------------------
    // HTML version — clean, light, transactional (NOT promotional)
    // ------------------------------------------------------------------
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F7F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border-radius:6px;overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="padding:32px 32px 24px 32px;border-bottom:1px solid #EEEEEE;">
              <p style="margin:0;font-size:18px;font-weight:700;color:#212121;letter-spacing:0.5px;">Behind The Build</p>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="padding:28px 32px 16px 32px;">
              <p style="margin:0 0 14px 0;font-size:15px;color:#212121;font-weight:600;">Hi ${customerName},</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#444444;">
                Thank you for choosing Behind The Build. Your booking has been received successfully. Our team will review your requirements and get back to you shortly.
              </p>
            </td>
          </tr>

          <!-- BOOKING DETAILS -->
          <tr>
            <td style="padding:8px 32px 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EEEEEE;border-radius:4px;overflow:hidden;">
                <tr>
                  <td style="padding:12px 16px;background-color:#FAFAFA;border-bottom:1px solid #EEEEEE;">
                    <p style="margin:0;font-size:12px;font-weight:700;color:#212121;text-transform:uppercase;letter-spacing:1px;">Booking Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${detailRow("Booking ID", `<span style="font-family:monospace;color:#C8041C;">${bookingId}</span>`)}
                      ${detailRow("Service", serviceName)}
                      ${detailRow("Package", planName)}
                      ${detailRow("Duration", durationText)}
                      ${detailRow("Amount", `<strong>${totalPriceText}</strong>`)}
                      ${detailRow("Location", isEventLocation ? `Event — ${eventLocationText}` : "Remote")}
                      ${detailRow("Project Details", projectDetails)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT -->
          <tr>
            <td style="padding:8px 32px 28px 32px;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#212121;">What happens next?</p>
              <p style="margin:0;font-size:13px;line-height:1.6;color:#555555;">
                Our team will review your project details and contact you via email or phone within 24 hours. If you have any questions, simply reply to this email.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #EEEEEE;background-color:#FAFAFA;">
              <p style="margin:0 0 4px 0;font-size:13px;font-weight:600;color:#212121;">Behind The Build</p>
              <p style="margin:0;font-size:12px;color:#888888;line-height:1.5;">
                admin@behindthebuild.in<br>
                <a href="https://behindthebuild.in" style="color:#888888;text-decoration:none;">behindthebuild.in</a>
              </p>
            </td>
          </tr>

        </table>

        <!-- OUTSIDE FOOTER -->
        <p style="margin:16px 0 0 0;font-size:11px;color:#AAAAAA;text-align:center;">
          This is a transactional email confirming your booking with Behind The Build.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;

    // ------------------------------------------------------------------
    // Send
    // ------------------------------------------------------------------
    const result = await sendEmail({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: bookingData.email,
      replyTo: REPLY_TO_EMAIL,
      subject,
      text,
      html,
    });

    return result;
  } catch (error) {
    console.error("[Email] Client email failed:", error.message || error);
    return { success: false, error: error.message || error };
  }
};

/* =====================================================
   TEAM/ADMIN NOTIFICATION EMAIL
===================================================== */
export const sendTeamEmail = async (bookingData, bookingId) => {
  try {
    const { serviceName, planName, price } = extractServiceDetails(bookingData);

    const durationText = bookingData.duration || bookingData.timeline || bookingData.project_timeline || "1 Month";
    const totalPriceText = bookingData.total_price || price;
    const locationTypeText = bookingData.location_type || "Remote";
    const eventLocationText = bookingData.event_location || "Not applicable";
    const projectDetails = bookingData.project_description || bookingData.project_details || "None";

    const subject = `New Booking — ${serviceName} — ${bookingId}`;

    // ------------------------------------------------------------------
    // Plain-text version
    // ------------------------------------------------------------------
    const text = `New booking received.

Booking ID: ${bookingId}
Customer: ${bookingData.client_name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Company: ${bookingData.company_name || "None"}
Service: ${serviceName}
Package: ${planName}
Duration: ${durationText}
Amount: ${totalPriceText}
Location: ${locationTypeText}
Event Location: ${eventLocationText}
Project Details: ${projectDetails}
Created: ${bookingData.created_at || new Date().toISOString()}`;

    // ------------------------------------------------------------------
    // HTML version — simple admin notification
    // ------------------------------------------------------------------
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Received</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F7F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border-radius:6px;overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #EEEEEE;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:700;color:#212121;">New Booking Received</p>
              <p style="margin:0;font-size:13px;color:#C8041C;font-family:monospace;font-weight:600;">${bookingId}</p>
            </td>
          </tr>

          <!-- CUSTOMER INFO -->
          <tr>
            <td style="padding:20px 32px 8px 32px;">
              <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:1px;">Customer</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 16px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRow("Name", bookingData.client_name)}
                ${detailRow("Email", `<a href="mailto:${bookingData.email}" style="color:#212121;">${bookingData.email}</a>`)}
                ${detailRow("Phone", bookingData.phone || "None")}
                ${detailRow("Company", bookingData.company_name || "None")}
              </table>
            </td>
          </tr>

          <!-- BOOKING INFO -->
          <tr>
            <td style="padding:8px 32px 8px 32px;">
              <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:1px;">Booking</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 16px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRow("Service", serviceName)}
                ${detailRow("Package", planName)}
                ${detailRow("Duration", durationText)}
                ${detailRow("Amount", `<strong>${totalPriceText}</strong>`)}
                ${detailRow("Location", locationTypeText)}
                ${detailRow("Event Location", eventLocationText)}
                ${detailRow("Project Details", projectDetails)}
                ${detailRow("Submitted", bookingData.created_at || new Date().toISOString())}
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #EEEEEE;background-color:#FAFAFA;">
              <p style="margin:0;font-size:11px;color:#AAAAAA;">Behind The Build — Automated Booking Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // ------------------------------------------------------------------
    // Send
    // ------------------------------------------------------------------
    const result = await sendEmail({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: TEAM_EMAIL,
      replyTo: bookingData.email, // Reply goes to customer
      subject,
      text,
      html,
    });

    return result;
  } catch (error) {
    console.error("[Email] Team email failed:", error.message || error);
    return { success: false, error: error.message || error };
  }
};