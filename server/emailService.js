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
    const clientText = `Hi ${bookingData.client_name},

Thank you for choosing Behind The Build.

Your booking has been successfully received.

Booking ID:
[${bookingId}]

Service:
[${serviceName}]

Package:
[${planName}]

Price:
[${price}]

Company:
[${bookingData.company_name || "None"}]

Project Details:
[${bookingData.project_description || bookingData.project_details || "None"}]

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