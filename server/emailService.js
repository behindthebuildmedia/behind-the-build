import { Resend } from "resend";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/* =====================================================
   EMAIL PROVIDER CONFIGURATION

   Priority order:
   1. Zoho SMTP  — sends FROM admin@behindthebuild.in with full
                    SPF/DKIM/DMARC alignment (DNS already configured)
   2. Resend API — sends FROM admin@behindthebuild.in with Resend
                    DKIM (requires resend._domainkey DNS CNAME record)
   3. Gmail SMTP — last resort fallback, sends from Gmail address
                    (will likely land in spam due to domain mismatch)
===================================================== */

const SENDER_EMAIL = process.env.EMAIL_FROM || "admin@behindthebuild.in";
const SENDER_NAME = "Behind The Build";
const REPLY_TO_EMAIL = process.env.EMAIL_REPLY_TO || "admin@behindthebuild.in";
const TEAM_EMAIL = process.env.EMAIL_TEAM_TO || process.env.COMPANY_EMAIL || "admin@behindthebuild.in";

/* ---------- Provider 1: Zoho SMTP ---------- */
const zohoUser = process.env.ZOHO_USER || process.env.EMAIL_FROM || null;
const zohoPass = process.env.ZOHO_PASS || null;

let zohoTransporter = null;
if (zohoUser && zohoPass) {
  zohoTransporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    family: 4,
    auth: {
      user: zohoUser,
      pass: zohoPass,
    },
  });
  console.log(`[Email] Zoho SMTP configured for ${zohoUser}`);
}

/* ---------- Provider 2: Resend API ---------- */
const RESEND_API_KEY = process.env.RESEND_API_KEY || null;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
if (resend) {
  console.log("[Email] Resend API configured");
}

/* ---------- Provider 3: Gmail SMTP (explicit opt-in only) ---------- */
const gmailUser = process.env.EMAIL_USER || null;
const gmailPass = process.env.EMAIL_PASS || null;

let gmailTransporter = null;
if (gmailUser && gmailPass) {
  gmailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    family: 4,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });
  console.log(`[Email] Gmail SMTP configured for ${gmailUser}`);
}

/* ---------- Provider status (for diagnostics) ---------- */
export const getEmailProviderInfo = () => {
  if (zohoTransporter) {
    return {
      configured: true,
      primary: "zoho-smtp",
      sender: zohoUser,
      replyTo: REPLY_TO_EMAIL,
      dnsReady: true,
      note: "Zoho SMTP — SPF/DKIM/DMARC aligned for behindthebuild.in",
    };
  }
  if (resend) {
    return {
      configured: true,
      primary: "resend",
      sender: SENDER_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      dnsReady: false,
      note: "Resend API — verify resend._domainkey DNS CNAME record exists and is verified",
    };
  }
  if (gmailTransporter) {
    return {
      configured: true,
      primary: "gmail-smtp",
      sender: gmailUser,
      replyTo: REPLY_TO_EMAIL,
      dnsReady: false,
      note: "Gmail SMTP — sends from Gmail address, not admin@behindthebuild.in; likely spam",
    };
  }
  return {
    configured: false,
    primary: "none",
    sender: SENDER_EMAIL,
    replyTo: REPLY_TO_EMAIL,
    dnsReady: false,
    note: "No email provider configured — set RESEND_API_KEY or ZOHO_USER + ZOHO_PASS in Vercel environment variables",
  };
};

const activeProviderInfo = getEmailProviderInfo();
if (!activeProviderInfo.configured) {
  console.error("[Email] CRITICAL: No email provider configured. Set RESEND_API_KEY in Vercel production environment variables.");
} else if (activeProviderInfo.primary === "gmail-smtp") {
  console.warn("[Email] WARNING: Gmail SMTP sends from a Gmail address — customer emails will land in spam.");
}

/* =====================================================
   CORE SEND FUNCTION (Zoho → Resend → Gmail)
===================================================== */
const sendEmail = async ({ from, to, replyTo, subject, text, html, headers }) => {

  // ---- Try Zoho SMTP first (full SPF/DKIM/DMARC alignment) ----
  if (zohoTransporter) {
    try {
      const mailOptions = {
        from: `"${SENDER_NAME}" <${zohoUser}>`,
        to,
        replyTo: replyTo || REPLY_TO_EMAIL,
        subject,
        text,
        html,
        headers,
      };

      await zohoTransporter.sendMail(mailOptions);
      console.log("[Zoho SMTP] Email sent successfully");
      return { success: true, provider: "zoho-smtp" };
    } catch (zohoErr) {
      console.error("[Zoho SMTP] Failed:", zohoErr.message);
      // Fall through to next provider
    }
  }

  // ---- Try Resend API (authenticated domain sending) ----
  if (resend) {
    try {
      const resendPayload = {
        from,
        to: Array.isArray(to) ? to : [to],
        reply_to: replyTo,
        subject,
        text,
        html,
      };

      // Add optional headers if provided (e.g. List-Unsubscribe, X-Entity-Ref-ID)
      if (headers && Object.keys(headers).length > 0) {
        resendPayload.headers = headers;
      }

      const result = await resend.emails.send(resendPayload);

      if (result.error) {
        console.error("[Resend] API error:", JSON.stringify(result.error));
        throw new Error(result.error.message || "Resend API error");
      }

      console.log("[Resend] Email sent successfully. ID:", result.data?.id);
      return { success: true, provider: "resend", id: result.data?.id };
    } catch (resendErr) {
      console.error("[Resend] Failed:", resendErr.message);
      // Fall through to Gmail
    }
  }

  // ---- Gmail SMTP (explicit opt-in only — not recommended for production) ----
  if (gmailTransporter) {
    try {
      const mailOptions = {
        from: `"${SENDER_NAME}" <${gmailUser}>`,
        to,
        replyTo: replyTo || REPLY_TO_EMAIL,
        subject,
        text,
        html,
        headers,
      };

      await gmailTransporter.sendMail(mailOptions);
      console.log("[Gmail SMTP] Email sent (warning: may land in spam — Gmail address ≠ behindthebuild.in)");
      return { success: true, provider: "gmail-smtp" };
    } catch (gmailErr) {
      console.error("[Gmail SMTP] Email failed:", gmailErr.message);
      return { success: false, provider: "gmail-smtp", error: gmailErr.message };
    }
  }

  console.error("[Email] All providers failed or unconfigured — email not sent. Set RESEND_API_KEY in Vercel environment.");
  return {
    success: false,
    provider: "none",
    error: "No email provider configured. Set RESEND_API_KEY in Vercel environment variables.",
  };
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
    const locationDisplay = isEventLocation ? eventLocationText : "Remote";
    const projectDetails = bookingData.project_description || bookingData.project_details || "None";

    // Subject — clean, professional, transactional
    const subject = `Booking Request Received — Behind The Build [${bookingId}]`;

    // Plain-text version (critical for deliverability)
    const text = `Hi ${customerName},

Thank you for submitting your project request to Behind The Build.

We have received your booking request and our team will review the details and contact you shortly.

Booking ID: ${bookingId}

PROJECT DETAILS
---------------
Service: ${serviceName}
Package: ${planName}
Duration: ${durationText}
Price: ${totalPriceText}
Location: ${locationDisplay}
Project requirements: ${projectDetails}

We will contact you using the email address or phone number provided in your request.

Regards,
Behind The Build
admin@behindthebuild.in
https://behindthebuild.in

---
This is a transactional confirmation email for your booking request with Behind The Build.`;

    // HTML version — clean, lightweight, professional, transactional
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Request Received — Behind The Build</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border-radius:6px;overflow:hidden;border:1px solid #E8E8E8;">

          <!-- HEADER -->
          <tr>
            <td style="padding:28px 32px 20px 32px;border-bottom:3px solid #111111;">
              <p style="margin:0;font-size:17px;font-weight:700;color:#111111;letter-spacing:0.3px;">Behind The Build</p>
            </td>
          </tr>

          <!-- BOOKING ID BADGE -->
          <tr>
            <td style="padding:20px 32px 0 32px;">
              <p style="margin:0;font-size:12px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Booking Reference</p>
              <p style="margin:4px 0 0 0;font-size:16px;font-weight:700;color:#111111;font-family:monospace;">${bookingId}</p>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="padding:20px 32px 8px 32px;">
              <p style="margin:0 0 10px 0;font-size:15px;color:#111111;font-weight:600;">Hi ${customerName},</p>
              <p style="margin:0;font-size:14px;line-height:1.65;color:#444444;">
                Thank you for submitting your project request to Behind The Build. We have received your booking and our team will review the details and contact you shortly.
              </p>
            </td>
          </tr>

          <!-- PROJECT DETAILS -->
          <tr>
            <td style="padding:16px 32px 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E8E8;border-radius:4px;overflow:hidden;">
                <tr>
                  <td style="padding:11px 16px;background-color:#F8F8F8;border-bottom:1px solid #E8E8E8;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#555555;text-transform:uppercase;letter-spacing:1px;">Project Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 16px 8px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${detailRow("Service", serviceName)}
                      ${detailRow("Package", planName)}
                      ${detailRow("Duration", durationText)}
                      ${detailRow("Price", totalPriceText)}
                      ${detailRow("Location", locationDisplay)}
                      ${detailRow("Project requirements", `<span style="white-space:pre-wrap;">${projectDetails}</span>`)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NEXT STEPS -->
          <tr>
            <td style="padding:0 32px 28px 32px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#555555;">
                We will contact you using the email address or phone number provided in your request.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:18px 32px;border-top:1px solid #E8E8E8;background-color:#F8F8F8;">
              <p style="margin:0 0 3px 0;font-size:13px;font-weight:700;color:#111111;">Behind The Build</p>
              <p style="margin:0;font-size:12px;color:#888888;line-height:1.6;">
                <a href="mailto:admin@behindthebuild.in" style="color:#888888;text-decoration:none;">admin@behindthebuild.in</a><br>
                <a href="https://behindthebuild.in" style="color:#888888;text-decoration:none;">behindthebuild.in</a>
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:14px 0 0 0;font-size:11px;color:#BBBBBB;text-align:center;">
          This is a transactional confirmation email for your booking request with Behind The Build.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;

    // Headers to improve deliverability
    const emailHeaders = {
      "X-Entity-Ref-ID": bookingId,
      "List-Unsubscribe": "<mailto:admin@behindthebuild.in?subject=unsubscribe>",
    };

    const result = await sendEmail({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: bookingData.email,
      replyTo: REPLY_TO_EMAIL,
      subject,
      text,
      html,
      headers: emailHeaders,
    });

    if (result.success) {
      console.log(`[Email] Customer confirmation sent to ${bookingData.email} via ${result.provider}. Booking: ${bookingId}`);
    } else {
      console.error(`[Email] Customer confirmation FAILED for ${bookingData.email}. Booking: ${bookingId}. Error: ${result.error}`);
    }

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

    // Plain-text version
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

    // HTML version — simple admin notification
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Received</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border-radius:6px;overflow:hidden;border:1px solid #E8E8E8;">

          <!-- HEADER -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #E8E8E8;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:700;color:#212121;">New Booking Received</p>
              <p style="margin:0;font-size:13px;font-family:monospace;font-weight:600;color:#212121;">${bookingId}</p>
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
                ${detailRow("Amount", totalPriceText)}
                ${detailRow("Location", locationTypeText)}
                ${detailRow("Event Location", eventLocationText)}
                ${detailRow("Project Details", projectDetails)}
                ${detailRow("Submitted", bookingData.created_at || new Date().toISOString())}
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #E8E8E8;background-color:#F8F8F8;">
              <p style="margin:0;font-size:11px;color:#AAAAAA;">Behind The Build — Automated Booking Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const result = await sendEmail({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: TEAM_EMAIL,
      replyTo: bookingData.email, // Reply goes to customer
      subject,
      text,
      html,
    });

    if (result.success) {
      console.log(`[Email] Admin notification sent to ${TEAM_EMAIL} via ${result.provider}. Booking: ${bookingId}`);
    } else {
      console.error(`[Email] Admin notification FAILED. Booking: ${bookingId}. Error: ${result.error}`);
    }

    return result;
  } catch (error) {
    console.error("[Email] Team email failed:", error.message || error);
    return { success: false, error: error.message || error };
  }
};