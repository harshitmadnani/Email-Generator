import nodemailer from "nodemailer";
import fs from "fs";

// Load messages
const messages = JSON.parse(
  fs.readFileSync("./messages.json", "utf-8")
);

export const sendMail = async () => {

  try {
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="margin:0; padding:0; background:#ffe6eb; font-family: Arial, sans-serif;">

  <div style="max-width:420px; margin:auto; padding:20px;">

    <!-- Outer Soft Card -->
    <div style="
      background: #fff0f5;
      border-radius: 25px;
      padding: 15px;
      box-shadow: 0 10px 30px rgba(255, 105, 135, 0.3);
    ">

      <!-- Inner Gradient Card -->
      <div style="
        background: linear-gradient(145deg, #ff4d6d, #ff85a2);
        border-radius: 20px;
        padding: 25px;
        text-align: center;
        color: white;
      ">

        <!-- Floating Hearts -->
        <div style="font-size:20px; margin-bottom:10px;">
          💖 💕 💘 💝 💗
        </div>

        <!-- Header -->
        <h1 style="
          margin: 0;
          font-size: 26px;
          line-height: 1.4;
          font-weight: bold;
        ">
          Good Morning, My Love 🧸💖
        </h1>

        <!-- Cute Line -->
        <p style="
          margin-top:8px;
          font-size:14px;
          opacity:0.9;
        ">
          You make my world brighter every day ☀️
        </p>

        <!-- Divider -->
        <div style="
          margin:15px auto;
          width:70px;
          height:3px;
          background:white;
          border-radius:5px;
        "></div>

        <!-- Message Bubble -->
        <div style="
          background: rgba(255,255,255,0.2);
          padding: 18px;
          border-radius: 18px;
          font-size: 17px;
          line-height: 1.7;
          margin-top: 10px;
          backdrop-filter: blur(5px);
        ">
          ${randomMessage}
        </div>

        <!-- Teddy Love Line -->
        <p style="
          margin-top: 20px;
          font-size: 14px;
          opacity: 0.95;
        ">
          🧸 Sending you the warmest hugs and kisses 💋
        </p>

        <!-- Love Meter -->
        <div style="
          margin-top: 15px;
          font-size: 14px;
        ">
          💘 Love Level Today: 100% (and always increasing 😏)
        </div>

        <!-- Signature -->
        <p style="
          margin-top: 20px;
          font-size: 15px;
          font-weight: bold;
        ">
          Forever yours ❤️
        </p>

      </div>

      <!-- Bottom Cute Note -->
      <p style="
        text-align:center;
        font-size:12px;
        color:#ff6f91;
        margin-top:12px;
      ">
        💌 Made with endless love just for you 💌
      </p>

    </div>

  </div>

</body>
</html>
`;


    await transporter.sendMail({
      from: `"Your Love 💖" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "💖 Good Morning Jaan 💖",
      html: htmlTemplate,
    });
    console.log("💌 Mail sent to:", process.env.EMAIL_TO);

  } catch (err) {
    console.error("❌ Mail error:", err);
  }
};