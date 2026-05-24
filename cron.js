import dotenv from "dotenv";
dotenv.config();   // 👈 MUST be FIRST

import cron from "node-cron";
import { sendMail } from "./mailer.js";

console.log("🚀 Cron service started...");

// test run
sendMail();

// 6:30 AM IST
cron.schedule("0 1 * * *", async () => {
  console.log("⏰ Sending Good Morning Mail...");
  await sendMail();
});