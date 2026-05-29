import nodemailer from "nodemailer";
import fs from "fs";
import { getRomanticGif } from "./giphy.js";

// Load messages
const messages = JSON.parse(fs.readFileSync("./messages.json", "utf-8"));

export const sendMail = async () => {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    // ── Days together (married 1 September 2025) ──
    const weddingDate = new Date("2025-09-01");
    const daysTogether = Math.floor((today - weddingDate) / (1000 * 60 * 60 * 24));
    const weeksTogether = Math.floor(daysTogether / 7);
    const monthsTogether = Math.floor(daysTogether / 30.44);

    // ── Next anniversary countdown ──
    const thisYear = today.getFullYear();
    let nextAnniversary = new Date(`${thisYear}-09-01`);
    if (today >= nextAnniversary) nextAnniversary = new Date(`${thisYear + 1}-09-01`);
    const daysToAnniversary = Math.round((nextAnniversary - today) / (1000 * 60 * 60 * 24));

    // ── Formatted date ──
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // ── Special days ──
    let specialMessage = null;
    let subject = "💖 Good Morning Jaan 💖";

    // 🎂 Birthday (10 December)
    if (day === 10 && month === 12) {
      specialMessage = `Happy Birthday My Love 🎂💖

Today is not just your birthday… it's the day the most beautiful person came into this world ❤️

You are my happiness, my peace, and my everything.

I feel so lucky to have you in my life.

I love you endlessly 😘`;
      subject = "🎂 Happy Birthday My Love 💖";
    }

    // 💍 Anniversary (1 September)
    else if (day === 1 && month === 9) {
      specialMessage = `Happy Anniversary My Love 💍❤️

Another beautiful year with you… and I still feel the same butterflies 🥺

Being with you is the best decision of my life.

Every moment with you is my favorite memory.

I will keep loving you more every single day 💖

Forever yours 😘`;
      subject = "💍 Happy Anniversary My Love ❤️";
    }

    const randomMessage = specialMessage
      ? specialMessage
      : messages[Math.floor(Math.random() * messages.length)];

    // ── Daily quote pool ──
    const quotes = [
      "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
      "You are my today and all of my tomorrows.",
      "In you, I found the home I never knew I was looking for.",
      "Every love story is beautiful, but ours is my favorite.",
      "You are the best thing that has ever been mine.",
      "I love you not only for what you are, but for what I am when I am with you.",
      "Whatever our souls are made of, yours and mine are the same.",
      "You are my sun, my moon, and all of my stars.",
    ];
    const dailyQuote = quotes[day % quotes.length];

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
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>${subject}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #fdf6f0;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body style="margin:0; padding:32px 16px; background:#fdf6f0;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">

        <table width="560" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:560px; width:100%; background:#ffffff; border-radius:32px; overflow:hidden;
                 box-shadow:0 2px 40px rgba(180,80,80,0.08), 0 1px 8px rgba(0,0,0,0.04);">

          <!-- HERO -->
          <tr>
            <td style="background:#1a0a0a; padding:52px 40px 44px; text-align:center;">
              <p style="font-size:11px; font-weight:500; letter-spacing:2.5px; text-transform:uppercase; color:#c0392b; margin:0 0 20px;">${formattedDate}</p>

              <div style="width:56px; height:56px; background:#c0392b; border-radius:50%;
                          display:inline-block; font-size:24px; line-height:56px; margin:0 auto 24px;">&#9829;</div>

              <h1 style="font-family:'Playfair Display', Georgia, serif; font-size:36px; font-weight:700;
                         color:#ffffff; line-height:1.2; margin:0 0 12px;">
                ${specialMessage ? "Today Is All About You ❤️" : "Good Morning,<br>Jaan ☀️"}
              </h1>

              <p style="font-size:14px; color:rgba(255,255,255,0.4); font-weight:300; letter-spacing:0.3px; margin:0;">
                A little reminder that someone loves you endlessly
              </p>
            </td>
          </tr>

          <!-- GIF -->
          <tr>
            <td style="padding:32px 36px 20px;">
              <div style="border-radius:20px; overflow:hidden; background:#f0e8e8; line-height:0;">
                <img src="${gifUrl}" alt="Sending you love"
                  width="488"
                  style="width:100%; max-width:488px; display:block; margin:0 auto; border-radius:20px;" />
              </div>
            </td>
          </tr>

          <!-- OUR JOURNEY COUNTER -->
          <tr>
            <td style="padding:0 36px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#1a0a0a; border-radius:16px;">
                <tr>
                  <td style="padding:18px 24px 10px;">
                    <p style="font-size:11px; font-weight:500; letter-spacing:2px; text-transform:uppercase;
                               color:#c0392b; margin:0; text-align:center;">Our Journey</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 16px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <!-- Days -->
                        <td align="center" style="background:rgba(255,255,255,0.06); border-radius:12px; padding:14px 8px;">
                          <p style="font-family:'Playfair Display',Georgia,serif; font-size:28px; font-weight:700; color:#ffffff; margin:0; line-height:1;">${daysTogether}</p>
                          <p style="font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,0.35); margin:6px 0 0;">Days</p>
                        </td>
                        <td width="10"></td>
                        <!-- Weeks -->
                        <td align="center" style="background:rgba(255,255,255,0.06); border-radius:12px; padding:14px 8px;">
                          <p style="font-family:'Playfair Display',Georgia,serif; font-size:28px; font-weight:700; color:#ffffff; margin:0; line-height:1;">${weeksTogether}</p>
                          <p style="font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,0.35); margin:6px 0 0;">Weeks</p>
                        </td>
                        <td width="10"></td>
                        <!-- Months -->
                        <td align="center" style="background:rgba(255,255,255,0.06); border-radius:12px; padding:14px 8px;">
                          <p style="font-family:'Playfair Display',Georgia,serif; font-size:28px; font-weight:700; color:#ffffff; margin:0; line-height:1;">${monthsTogether}</p>
                          <p style="font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,0.35); margin:6px 0 0;">Months</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Wedding date + anniversary -->
                <tr>
                  <td style="padding:0 16px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:10px 14px; border-top:1px solid rgba(255,255,255,0.07);">
                          <p style="font-size:12px; color:rgba(255,255,255,0.4); margin:0; font-weight:300;">
                            Married on <span style="color:rgba(255,255,255,0.75); font-weight:500;">1 September 2025</span>
                          </p>
                        </td>
                        <td align="right" style="padding:10px 14px; border-top:1px solid rgba(255,255,255,0.07); white-space:nowrap;">
                          <p style="font-size:11px; color:#c0392b; margin:0; font-weight:500; letter-spacing:0.5px;">
                            ${daysToAnniversary} days to anniversary &#9829;
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding:8px 36px 24px;">
              <p style="font-size:11px; font-weight:500; letter-spacing:2px; text-transform:uppercase;
                         color:#c0b0b0; margin:0 0 14px;">Today's Message</p>
              <div style="border-left:3px solid #c0392b; border-radius:0 16px 16px 0;
                          background:#fdf9f9; padding:22px 24px;">
                <p style="font-family:'Playfair Display', Georgia, serif; font-size:17px; font-style:italic;
                           line-height:2; color:#2a1010; margin:0; white-space:pre-line;">${randomMessage}</p>
              </div>
            </td>
          </tr>

          <!-- DAILY QUOTE -->
          <tr>
            <td style="padding:0 36px 28px;">
              <div style="background:#fff8f5; border:1px solid #f5dada; border-radius:16px; padding:20px 22px;">
                <p style="font-family:'Playfair Display', Georgia, serif; font-size:40px; color:#f5c6c6;
                           line-height:0.5; margin:0 0 14px;">&ldquo;</p>
                <p style="font-size:14px; color:#6b3535; font-style:italic; line-height:1.8; margin:0 0 10px;">${dailyQuote}</p>
                <p style="font-size:11px; color:#c0a0a0; font-weight:500; letter-spacing:1px;
                           text-transform:uppercase; margin:0;">— Today's love note</p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a0a0a; padding:36px 40px; text-align:center;">
              <div style="width:40px; height:2px; background:#c0392b; border-radius:2px; margin:0 auto 24px;"></div>
              <p style="font-family:'Playfair Display', Georgia, serif; font-size:28px; font-weight:700;
                         color:#ffffff; margin:0 0 6px;">Harshit ❤️</p>
              <p style="font-size:13px; color:rgba(255,255,255,0.3); font-weight:300; margin:0 0 28px; letter-spacing:0.5px;">
                Forever and Always
              </p>
              <p style="font-size:12px; color:rgba(255,255,255,0.15); letter-spacing:1px; text-transform:uppercase; margin:0;">
                Made with endless love · Every single morning
              </p>
            </td>
          </tr>

        </table>

        <p style="margin-top:20px; font-size:11px; color:#c0b0b0; letter-spacing:1px;
                   text-transform:uppercase; text-align:center;">Made with endless love 💕</p>

      </td>
    </tr>
  </table>

</body>
</html>`;

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