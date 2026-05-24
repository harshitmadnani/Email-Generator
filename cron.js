import dotenv from "dotenv";
dotenv.config();

import cron from "node-cron";
import { sendMail } from "./mailer.js";

console.log("🚀 Cron service started...");

// ✅ Runs daily at 6:30 AM IST
cron.schedule(
  "30 6 * * *",
  async () => {
    console.log("⏰ Sending Good Morning Mail...");
    await sendMail();
  },
  {
    timezone: "Asia/Kolkata",
  }
);