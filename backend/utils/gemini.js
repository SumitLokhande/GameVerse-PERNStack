import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// initialize gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

if (!process.env.GEMINI_KEY) {
  console.log("WARNING: GEMINI_KEY is not set. AI features will be blocked");
}

export default {};
