import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import PDFParser from "pdf2json";
import fs from "fs";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });

// Fetch API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Debugging: Check if the API key is correctly loaded
console.log("Loaded API Key:", apiKey ? "Success" : "Not Found");

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in .env file");
}

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });