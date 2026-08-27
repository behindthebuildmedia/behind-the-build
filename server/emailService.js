import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/* =====================================================
   GMAIL SMTP TRANSPORTER
===================================================== */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =====================================================
   VERIFY SMTP CONNECTION
===================================================== */
transporter.verify((error) => {
  if (error) {
    console.error("❌ Gmail SMTP connection failed:", error.message || error);
  } else {
    console.log("✅ Gmail SMTP connection successful");
  }
});

/* =====================================================
   HELPER TO EXTRACT SINGLE SERVICE DETAILS
===================================================== */
const extractServiceDetails = (bookingData) => {
  let serviceName = bookingData.serviceName || bookingData.service || "Brand Building";
  let planName = bookingData.planName || bookingData.plan || "Custom";
  let price = bookingData.price || "Custom Price";
  let referenceLink = bookingData.referenceLink || "None";
  let preferredStartDate = bookingData.preferredStartDate || "Flexible";

  const servicesArr = bookingData.services;

  if (servicesArr && Array.isArray(servicesArr) && servicesArr.length > 0) {
    const mainService = servicesArr[0];
    if (typeof mainService === "string") {
      serviceName = mainService;
    } else if (mainService && typeof mainService === "object") {
      serviceName = mainService.service || serviceName;
      planName = mainService.plan || planName;
      price = mainService.price || price;
      referenceLink = mainService.referenceLink || referenceLink;
      preferredStartDate = mainService.preferredStartDate || preferredStartDate;
    }
  }

  return { serviceName, planName, price, referenceLink, preferredStartDate };
};

/* =====================================================
   CUSTOMER EMAIL
===================================================== */
export const sendClientEmail = async (bookingData, bookingId) => {
  try {
    if (!bookingData.email || !bookingData.email.includes("@")) {
      console.error("[Email] Client email failed: Invalid recipient", bookingData.email);
      return {
        success: false,
        error: "Invalid client email address",
      };
    }

    const { serviceName, planName, price } = extractServiceDetails(bookingData);

    const clientSubject = `Behind The Build — Booking Confirmed [${bookingId}]`;
    
    // Fallback plain text email
    const clientText = `Hi ${bookingData.client_name},

Thank you for choosing Behind The Build.

Your booking has been successfully received. Our team will review your requirements and get back to you shortly.

BOOKING DETAILS:
Booking ID: [${bookingId}]
Service: [${serviceName}]
Package: [${planName}]
Price: [${price}]
Company: [${bookingData.company_name || "None"}]
Project Location: [${bookingData.region || bookingData.project_location || "Remote"}]
Project Timeline: [${bookingData.timeline || bookingData.project_timeline || "Flexible"}]
Project Details: [${bookingData.project_description || bookingData.project_details || "None"}]

WHAT HAPPENS NEXT?
Our team will review your project details and contact you via email or phone within 24 hours.

NEED HELP?
If you have any questions, simply reply to this email and our team will assist you.

Behind The Build
Because great products deserve to be seen.`;

    // Premium HTML template
    const clientHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed | Behind The Build</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F9; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.015);">
          
          <!-- BLACK HEADER -->
          <tr>
            <td style="background-color: #212121; padding: 45px 35px; text-align: left;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-family: monospace; font-size: 20px; font-weight: 900; letter-spacing: 3px; color: #FFFFFF; text-transform: uppercase; line-height: 1.1; margin-bottom: 30px;">
                      BEHIND<br/>THE BUILD
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="font-family: monospace; font-size: 11px; font-weight: 900; letter-spacing: 3px; color: #C8041C; text-transform: uppercase; margin-bottom: 10px;">
                      BOOKING CONFIRMED
                    </div>
                    <h1 style="font-size: 30px; font-weight: 900; color: #FFFFFF; text-transform: uppercase; margin: 0; line-height: 1.1; letter-spacing: -0.5px;">
                      YOUR PROJECT<br/><span style="color: #C8041C;">IS IN MOTION.</span>
                    </h1>
                    <div style="height: 3px; width: 50px; background-color: #C8041C; margin-top: 25px;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CUSTOMER GREETING & INTRO -->
          <tr>
            <td style="padding: 40px 35px 20px 35px; background-color: #FFFFFF;">
              <p style="font-size: 15px; font-weight: bold; color: #212121; margin: 0 0 12px 0;">
                Hi ${bookingData.client_name},
              </p>
              <p style="font-size: 13px; line-height: 1.6; color: #555555; margin: 0; font-weight: 500;">
                Thank you for choosing Behind The Build.
              </p>
              <p style="font-size: 13px; line-height: 1.6; color: #555555; margin: 8px 0 0 0; font-weight: 500;">
                Your booking has been successfully received. Our team will review your project requirements and get back to you shortly.
              </p>
            </td>
          </tr>

          <!-- BOOKING DETAILS TABLE CARD -->
          <tr>
            <td style="padding: 10px 35px 30px 35px; background-color: #FFFFFF;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E6E6E6; border-radius: 4px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #212121; color: #FFFFFF; font-size: 11px; font-weight: 900; font-family: monospace; letter-spacing: 2px; padding: 12px 20px; text-transform: uppercase;">
                    BOOKING DETAILS
                  </td>
                </tr>
                <!-- Content Rows -->
                <tr>
                  <td style="background-color: #FAF9F9; padding: 15px 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      
                      <!-- Row 1: Booking ID -->
                      <tr style="border-bottom: 1px solid #E6E6E6;">
                        <td width="35%" style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase;">Booking ID</td>
                        <td width="65%" style="padding: 10px 0; font-size: 12px; font-family: monospace; font-weight: bold; color: #C8041C;">${bookingId}</td>
                      </tr>
                      
                      <!-- Row 2: Service -->
                      <tr style="border-bottom: 1px solid #E6E6E6;">
                        <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase; border-top: 1px solid #E6E6E6;">Service</td>
                        <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #212121; border-top: 1px solid #E6E6E6;">${serviceName}</td>
                      </tr>

                      <!-- Row 3: Package -->
                      <tr style="border-bottom: 1px solid #E6E6E6;">
                        <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase; border-top: 1px solid #E6E6E6;">Package</td>
                        <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #212121; border-top: 1px solid #E6E6E6;">${planName}</td>
                      </tr>

                      <!-- Row 4: Price -->
                      <tr style="border-bottom: 1px solid #E6E6E6;">
                        <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase; border-top: 1px solid #E6E6E6;">Price</td>
                        <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #C8041C; border-top: 1px solid #E6E6E6;">${price}</td>
                      </tr>

                      <!-- Row 5: Company -->
                      <tr style="border-bottom: 1px solid #E6E6E6;">
                        <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase; border-top: 1px solid #E6E6E6;">Company / Brand</td>
                        <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #212121; border-top: 1px solid #E6E6E6;">${bookingData.company_name || "None"}</td>
                      </tr>

                      <!-- Row 6: Location -->
                      <tr style="border-bottom: 1px solid #E6E6E6;">
                        <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase; border-top: 1px solid #E6E6E6;">Project Location</td>
                        <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #212121; border-top: 1px solid #E6E6E6;">${bookingData.region || bookingData.project_location || "Remote"}</td>
                      </tr>

                      <!-- Row 7: Timeline -->
                      <tr style="border-bottom: 1px solid #E6E6E6;">
                        <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase; border-top: 1px solid #E6E6E6;">Project Timeline</td>
                        <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #212121; border-top: 1px solid #E6E6E6;">${bookingData.timeline || bookingData.project_timeline || "Flexible"}</td>
                      </tr>

                      <!-- Row 8: Details -->
                      <tr>
                        <td valign="top" style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #212121; text-transform: uppercase; border-top: 1px solid #E6E6E6;">Project Details</td>
                        <td style="padding: 10px 0; font-size: 12px; line-height: 1.5; color: #444444; font-weight: bold; border-top: 1px solid #E6E6E6;">${bookingData.project_description || bookingData.project_details || "None"}</td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT & HELP -->
          <tr>
            <td style="padding: 35px; background-color: #FAF9F9; border-top: 1px solid #E6E6E6; border-bottom: 1px solid #E6E6E6;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <h3 style="font-size: 12px; font-weight: 900; font-family: monospace; letter-spacing: 2px; color: #212121; margin: 0 0 10px 0; text-transform: uppercase;">
                      WHAT HAPPENS NEXT?
                    </h3>
                    <p style="font-size: 12px; line-height: 1.6; color: #555555; margin: 0 0 25px 0; font-weight: 500;">
                      Our team will review your project details and contact you via email or phone within 24 hours.
                    </p>
                    
                    <h3 style="font-size: 12px; font-weight: 900; font-family: monospace; letter-spacing: 2px; color: #212121; margin: 0 0 10px 0; text-transform: uppercase;">
                      NEED HELP?
                    </h3>
                    <p style="font-size: 12px; line-height: 1.6; color: #555555; margin: 0; font-weight: 500;">
                      If you have any questions, simply reply to this email and our team will assist you.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BLACK FOOTER -->
          <tr>
            <td style="background-color: #111111; padding: 45px 35px; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-family: monospace; font-size: 15px; font-weight: 900; letter-spacing: 3px; color: #FFFFFF; text-transform: uppercase; margin-bottom: 5px;">
                      BEHIND THE BUILD
                    </div>
                    <div style="font-size: 11px; color: #888888; font-style: italic; margin-bottom: 25px; font-weight: 500;">
                      Because great products deserve to be seen.
                    </div>
                    <div style="font-size: 10px; color: #555555; font-weight: 500; letter-spacing: 0.5px;">
                      &copy; 2026 Behind The Build. All rights reserved.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const mailOptions = {
      from: `"Behind The Build" <${process.env.EMAIL_USER}>`,
      to: bookingData.email,
      subject: clientSubject,
      text: clientText,
      html: clientHtml,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("[Email] Client email failed:", error.message || error);
    return { success: false, error };
  }
};

/* =====================================================
   COMPANY EMAIL
===================================================== */
export const sendTeamEmail = async (bookingData, bookingId) => {
  try {
    const { serviceName, planName, price } = extractServiceDetails(bookingData);
    const recipient = process.env.COMPANY_EMAIL || "admin@behindthebuild.in";

    const teamSubject = `NEW BOOKING — [${bookingId}]`;
    const teamText = `NEW PROJECT BOOKING

Booking ID:
[${bookingId}]

Customer:
[${bookingData.client_name}]

Email:
[${bookingData.email}]

Phone:
[${bookingData.phone}]

Company:
[${bookingData.company_name || "None"}]

Service:
[${serviceName}]

Package:
[${planName}]

Price:
[${price}]

Location:
[${bookingData.region || bookingData.project_location || "Remote"}]

Timeline:
[${bookingData.timeline || bookingData.project_timeline || "Flexible"}]

Project Details:
[${bookingData.project_description || bookingData.project_details || "None"}]

Created:
[${bookingData.created_at || new Date().toISOString()}]`;

    const mailOptions = {
      from: `"Behind The Build System" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: teamSubject,
      text: teamText,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("[Email] Team email failed:", error.message || error);
    return { success: false, error };
  }
};