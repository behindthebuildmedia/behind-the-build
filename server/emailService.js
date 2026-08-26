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
  let serviceName = "Brand Building";
  let planName = "Custom";
  let price = "Custom Price";
  let referenceLink = "None";
  let preferredStartDate = "Flexible";

  if (bookingData.service && Array.isArray(bookingData.service) && bookingData.service.length > 0) {
    const mainService = bookingData.service[0];
    if (typeof mainService === "string") {
      serviceName = mainService;
    } else if (mainService && typeof mainService === "object") {
      serviceName = mainService.service || serviceName;
      planName = mainService.plan || planName;
      price = mainService.price || price;
      referenceLink = mainService.referenceLink || referenceLink;
      preferredStartDate = mainService.preferredStartDate || preferredStartDate;
    }
  } else if (typeof bookingData.service === "string") {
    serviceName = bookingData.service;
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

    const clientSubject = `Booking Confirmed — Behind The Build | ${bookingId}`;
    const clientText = `Hi ${bookingData.client_name},

Thank you for choosing Behind The Build.

Your booking has been successfully received.

Booking ID:
${bookingId}

Service:
${serviceName}

Plan:
${planName}

Amount:
${price}

Project Details:
${bookingData.project_description || "None provided"}

Our team will review your requirements and contact you shortly.

Behind The Build
Because great products deserve to be seen.`;

    const mailOptions = {
      from: `"Behind The Build" <${process.env.EMAIL_USER}>`,
      to: bookingData.email,
      subject: clientSubject,
      text: clientText,
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
    const { serviceName, planName, price, referenceLink, preferredStartDate } = extractServiceDetails(bookingData);
    const recipient = process.env.EMAIL_TEAM_TO || "hello@behindthebuild.in";

    const teamSubject = `New Booking — ${serviceName} | ${bookingId}`;
    const teamText = `Booking ID: ${bookingId}
Customer Name: ${bookingData.client_name}
Customer Email: ${bookingData.email}
Phone Number: ${bookingData.phone}
Company / Brand: ${bookingData.company_name || "None"}
Service: ${serviceName}
Plan: ${planName}
Price: ${price}
Project Location: ${bookingData.region || "Remote"}
Reference / Portfolio Link: ${referenceLink}
Preferred Start Date: ${preferredStartDate}
Project Details: ${bookingData.project_description || "None"}
Submission Date & Time: ${bookingData.created_at || new Date().toISOString()}`;

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