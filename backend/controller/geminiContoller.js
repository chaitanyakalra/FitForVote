import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from "pdf-parse";
// Handle __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.GEMINI_API_KEY;
console.log("apiKey:", apiKey); // Should now print the actual key

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const evaluateResume = async (req, res) => {
  try {
    const file = req.file;
    const fileBuffer = fs.readFileSync(file.path);

    const pdfData = await pdf(fileBuffer); // ✅ Extract text
    const extractedText = pdfData.text;

    if (!extractedText.trim()) {
      return res.status(400).json({
        error: "Resume PDF contains no readable text. Try uploading a different file.",
      });
    }

    const prompt = `
You are an AI resume evaluator. From the resume text below, extract:
1. Full name
2. Email address
3. Phone number
4. Education details
5. Skills
6. Work experience (with responsibilities)
7. Summary of candidate
8. Evaluation score (out of 10) for a Full Stack Developer role
9. Justify the evaluation score.

Return your response as valid JSON with keys:
- full_name
- email_address
- phone_number
- education
- skills
- work_experience
- summary
- evaluation_score
- evaluation_justification

Resume Text:
${extractedText}
`;

    const result = await model.generateContent(prompt);
    let response = await result.response.text();

    // Clean response: remove markdown code block formatting
    response = response.replace(/```json|```/g, "").trim();

    try {
      const parsed = JSON.parse(response);
      res.json({ parsed });
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      console.error("Gemini raw response:", response); // Debugging
      res.status(500).json({ error: "Failed to parse Gemini response as JSON." });
    }
    // 👈 Parse and return the response
  } catch (error) {
    console.error("Gemini error:", error.message || error);
    res.status(500).json({ error: "Something went wrong with resume evaluation." });
  }
};