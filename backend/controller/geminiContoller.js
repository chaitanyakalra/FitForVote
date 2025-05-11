import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const evaluateResume = async (req, res) => {
  try {
    const file = req.file;
    const fileBuffer = fs.readFileSync(file.path);
    const base64Data = fileBuffer.toString("base64");

    const prompt = `
You are an AI resume parser and evaluator. 
Given the following PDF content in base64, extract:
1. Full Name
2. Email Address
3. Phone Number
4. Education Details
5. Skills
6. Work Experience (with duration)
7. Generate a brief summary of this candidate.
8. Evaluate against the role of "Full Stack Developer" and give a score out of 10.
9. Return everything as a JSON object.

PDF (base64): ${base64Data}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.json({ result: response });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini processing failed" });
  }
};
