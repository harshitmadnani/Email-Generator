import nodemailer from "nodemailer";
import fs from "fs";
import { getRomanticGif } from "./giphy.js";

// Load messages
const messages = JSON.parse(
  fs.readFileSync("./messages.json", "utf-8")
);

export const sendMail = async () => {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    let specialMessage = null;
    let subject = "💖 Good Morning Jaan 💖";

    // 🎂 Birthday (10 December)
    if (day === 10 && month === 12) {
      specialMessage = `
Happy Birthday My Love 🎂💖

Today is not just your birthday… it’s the day the most beautiful person came into this world ❤️

You are my happiness, my peace, and my everything.

I feel so lucky to have you in my life.

I love you endlessly 😘
      `;
      subject = "🎂 Happy Birthday My Love 💖";
    }

    // 💍 Anniversary (1 September)
    else if (day === 1 && month === 9) {
      specialMessage = `
Happy Anniversary My Love 💍❤️

Another beautiful year with you… and I still feel the same butterflies 🥺

Being with you is the best decision of my life.

Every moment with you is my favorite memory.

I will keep loving you more every single day 💖

Forever yours 😘
      `;
      subject = "💍 Happy Anniversary My Love ❤️";
    }

    // ✅ Normal message
    const randomMessage = specialMessage
      ? specialMessage
      : messages[Math.floor(Math.random() * messages.length)];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🎞️ GIF
    const gifUrl = await getRomanticGif();

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="
  margin:0; 
  padding:0; 
  background:#f5f5f7; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
">

  <div style="max-width:420px; margin:auto; padding:20px;">

    <!-- Card -->
    <div style="
      background:white;
      border-radius:28px;
      padding:28px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    ">

      <!-- Header -->
      <h1 style="
        font-size:28px;
        font-weight:700;
        letter-spacing:-0.5px;
        color:#1d1d1f;
        margin:0;
        text-align:center;
      ">
        ${specialMessage ? "Today is all about YOU 💖" : "Good Morning 💖"}
      </h1>

      <!-- Subtext -->
      <p style="
        font-size:15px;
        color:#6e6e73;
        text-align:center;
        margin-top:6px;
      ">
        ${specialMessage ? "A special day deserves a special message 💕" : "Just a little love for you today"}
      </p>

      <!-- GIF -->
      <img 
        src="${gifUrl}" 
        style="
          width:140px;
          display:block;
          margin:25px auto;
          border-radius:16px;
        "
      />

      <!-- Message -->
      <div style="
        font-size:18px;
        line-height:1.6;
        color:#1d1d1f;
        text-align:center;
        margin-top:10px;
        padding:18px;
        border-radius:18px;
        background:#fafafa;
      ">
        ${randomMessage}
      </div>

      <!-- Divider -->
      <div style="
        height:1px;
        background:#e5e5e7;
        margin:25px 0;
      "></div>

      <!-- Footer -->
      <p style="
        text-align:center;
        font-size:14px;
        color:#6e6e73;
      ">
        You make everything feel better ❤️
      </p>

      <p style="
        text-align:center;
        margin-top:10px;
        font-size:15px;
        font-weight:600;
        color:#1d1d1f;
      ">
        — Yours 💌
      </p>

    </div>

  </div>

</body>
</html>
`;

    await transporter.sendMail({
      from: `"Your Love 💖" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: subject,
      html: htmlTemplate,
    });

    console.log("💌 Mail sent to:", process.env.EMAIL_TO);

  } catch (err) {
    console.error("❌ Mail error:", err);
  }
};