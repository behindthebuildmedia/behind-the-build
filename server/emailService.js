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
   FORMAT SERVICES
===================================================== */

const formatServicesHTML = (services) => {
  let list = [];

  if (Array.isArray(services)) {
    list = services;
  }

  if (list.length === 0) {
    return "<p>—</p>";
  }

  return `
    <ul style="padding-left:18px;margin:0;">
      ${list
      .map((item) => {
        if (typeof item === "string") {
          return `<li>${item}</li>`;
        }

        return `<li>
            <strong>${item.service}</strong>
            ${item.plan ? ` - ${item.plan}` : ""}
          </li>`;
      })
      .join("")}
    </ul>
  `;
};

/* =====================================================
   CLIENT EMAIL
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

    const mailOptions = {
      from: `"Behind The Build" <${process.env.EMAIL_USER}>`,
      to: bookingData.email,
      subject: `Your Project Request Has Been Received | Behind The Build`,
      html: `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Behind The Build</title>

<style>

body{

margin:0;

padding:40px;

background:#f7f7f7;

font-family:Arial,sans-serif;

}

.wrapper{

max-width:650px;

margin:auto;

background:#ffffff;

border-radius:12px;

overflow:hidden;

box-shadow:0 10px 30px rgba(0,0,0,.08);

}

.header{

background:#111;

color:#fff;

padding:40px;

}

.header h1{

margin:0;

font-size:28px;

letter-spacing:1px;

}

.red{

color:#C8041C;

}

.content{

padding:40px;

}

.content h2{

margin-top:0;

font-size:26px;

}

.box{

background:#fafafa;

border:1px solid #eee;

padding:25px;

border-radius:10px;

margin:30px 0;

}

.table{

width:100%;

border-collapse:collapse;

}

.table td{

padding:10px 0;

border-bottom:1px solid #ececec;

}

.label{

font-weight:bold;

width:180px;

}

.button{

display:inline-block;

margin-top:30px;

background:#C8041C;

color:#fff!important;

padding:15px 30px;

text-decoration:none;

border-radius:6px;

font-weight:bold;

}

.footer{

background:#111;

color:#aaa;

padding:25px;

text-align:center;

font-size:13px;

}

</style>

</head>

<body>

<div class="wrapper">

<div class="header">

<h1>BEHIND THE <span class="red">BUILD</span></h1>

</div>

<div class="content">

<h2>Hello ${bookingData.client_name},</h2>

<p>

Thank you for choosing Behind The Build.

Your project request has been received successfully.

</p>

<div class="box">

<h3>Booking ID</h3>

<h1 class="red">${bookingId}</h1>

</div>

<h3>Project Summary</h3>

<table class="table">

<tr>

<td class="label">Client</td>

<td>${bookingData.client_name}</td>

</tr>

<tr>

<td class="label">Company</td>

<td>${bookingData.company_name || "-"}</td>

</tr>

<tr>

<td class="label">Budget</td>

<td>${bookingData.budget}</td>

</tr>

<tr>

<td class="label">Timeline</td>

<td>${bookingData.timeline}</td>

</tr>

<tr>

<td class="label">Region</td>

<td>${bookingData.region}</td>

</tr>

<tr>

<td class="label">Services</td>

<td>${formatServicesHTML(bookingData.services)}</td>

</tr>

</table>

<p style="margin-top:35px;">

Our creative team will review your project and

contact you within <strong>24 Hours.</strong>

</p>

<a

class="button"

href="${process.env.FRONTEND_URL || 'https://behindthebuild.in'}"

>

Visit Website

</a>

</div>

<div class="footer">

© 2026 Behind The Build

<br>

You Build It. We Bring It To The World.

</div>

</div>

</body>

</html>
`,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
    };

  } catch (error) {
    console.error("[Email] Client email failed:", error.message || error);

    return {
      success: false,
      error,
    };
  }
};

/* =====================================================
   TEAM EMAIL
===================================================== */

export const sendTeamEmail = async (bookingData, bookingId) => {
  try {

    const mailOptions = {

      from: `"Behind The Build" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_TEAM_TO,

      subject: `🚀 New Project Inquiry | ${bookingId}`,

      html: `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

body{

margin:0;

padding:40px;

background:#f5f5f5;

font-family:Arial,sans-serif;

}

.wrapper{

max-width:700px;

margin:auto;

background:#fff;

border-radius:12px;

overflow:hidden;

box-shadow:0 10px 30px rgba(0,0,0,.08);

}

.header{

background:#111;

padding:35px;

color:#fff;

}

.header h1{

margin:0;

font-size:28px;

}

.red{

color:#C8041C;

}

.content{

padding:40px;

}

.card{

background:#fafafa;

border:1px solid #ececec;

padding:25px;

border-radius:10px;

margin-bottom:25px;

}

.table{

width:100%;

border-collapse:collapse;

}

.table td{

padding:12px 0;

border-bottom:1px solid #eee;

vertical-align:top;

}

.label{

width:180px;

font-weight:bold;

}

.footer{

background:#111;

padding:20px;

text-align:center;

color:#999;

font-size:13px;

}

</style>

</head>

<body>

<div class="wrapper">

<div class="header">

<h1>

NEW PROJECT

<span class="red">REQUEST</span>

</h1>

</div>

<div class="content">

<div class="card">

<h2 style="margin-top:0;">

Booking ID

</h2>

<h1 class="red">

${bookingId}

</h1>

</div>

<table class="table">

<tr>

<td class="label">

Client Name

</td>

<td>

${bookingData.client_name}

</td>

</tr>

<tr>

<td class="label">

Company

</td>

<td>

${bookingData.company_name || "-"}

</td>

</tr>

<tr>

<td class="label">

Email

</td>

<td>

${bookingData.email}

</td>

</tr>

<tr>

<td class="label">

Phone

</td>

<td>

${bookingData.phone}

</td>

</tr>

<tr>

<td class="label">

Region

</td>

<td>

${bookingData.region}

</td>

</tr>

<tr>

<td class="label">

Budget

</td>

<td>

${bookingData.budget}

</td>

</tr>

<tr>

<td class="label">

Timeline

</td>

<td>

${bookingData.timeline}

</td>

</tr>

<tr>

<td class="label">

Services

</td>

<td>

${formatServicesHTML(bookingData.services)}

</td>

</tr>

<tr>

<td class="label">

Description

</td>

<td>

${bookingData.project_description || "No description provided"}

</td>

</tr>

</table>
        <div style="margin-top:30px;">

          <h3 style="margin-bottom:10px;">
            Next Steps
          </h3>

          <ul style="padding-left:18px;line-height:1.8;">
            <li>Review project requirements.</li>
            <li>Contact the client within 24 hours.</li>
            <li>Prepare quotation & timeline.</li>
            <li>Schedule discovery meeting.</li>
          </ul>

        </div>

      </div>

      <div class="footer">

        © 2026 Behind The Build

        <br>

        Internal Notification System

      </div>

    </div>

  </body>

</html>

      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
    };

  } catch (error) {

    console.error("[Email] Team email failed:", error.message || error);

    return {
      success: false,
      error,
    };

  }

};