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

  const servicesArr = bookingData.services || bookingData.service;

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
  } else if (typeof bookingData.service === "string") {
    serviceName = bookingData.service;
  } else if (typeof bookingData.services === "string") {
    serviceName = bookingData.services;
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

    const clientSubject = `Behind The Build — Booking Confirmed ${bookingId}`;
    const clientText = `Hi ${bookingData.client_name},

Thank you for choosing Behind The Build.

Your booking has been successfully received.

Booking ID:
${bookingId}

Service:
${serviceName}

Plan:
${planName}

Price:
${price}

Company:
${bookingData.company_name || "None"}

Project Details:
${bookingData.project_description || "None"}

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
    const recipient = process.env.EMAIL_TEAM_TO || "hello@behindthebuild.in";

    const teamSubject = `NEW BOOKING — ${bookingId}`;
    const teamText = `NEW SERVICE BOOKING

Booking ID:
${bookingId}

Customer:
${bookingData.client_name}

Email:
${bookingData.email}

Phone:
${bookingData.phone}

Company:
${bookingData.company_name || "None"}

Service:
${serviceName}

Plan:
${planName}

Price:
${price}

Location:
${bookingData.region || "Remote"}

Project Details:
${bookingData.project_description || "None"}

Date:
${bookingData.created_at || new Date().toISOString()}`;

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