import dotenv from "dotenv";
dotenv.config();

import { sendMail } from "./mailer.js";

console.log("🚀 Running scheduled mail job...");

await sendMail();