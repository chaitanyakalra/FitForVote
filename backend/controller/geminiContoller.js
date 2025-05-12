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
        error:
          "Resume PDF contains no readable text. Try uploading a different file.",
      });
    }

    const prompt = `
You are given an affidavit PDF document submitted by a candidate contesting in an Indian election. Carefully read and analyze the content of the document and perform the following tasks:

🟠 1. Candidate Summary:
Generate a concise and readable summary of the candidate's profile. This summary should include:

Full name, age, party affiliation, and constituency.

Educational background.

Key professional and financial details.

Any previous election experience or results.

A brief mention (if applicable) of any criminal case status.

🟠 2. Candidate Scoring:
Implement the following scoring system and return the score for each parameter, along with the final total score (max 100). Do not summarize here—just return a breakdown.

🔹 Criminal Record (40% weight)

+10 for no criminal cases.

-5 for pending criminal cases.

-10 for serious criminal charges (e.g., murder, rape, kidnapping).

-15 for criminal convictions.

🔹 Financial Assets (25% weight)

+10 if assets are below ₹1 crore.

+5 if between ₹1 crore and ₹5 crore.

0 if above ₹5 crore.

-5 if there is significant asset increase without a clear source.

🔹 Educational Qualifications (20% weight)

+10 for Doctorate.

+8 for Postgraduate degree.

+5 for Graduate degree.

+2 for Below graduate level.

0 for no formal education.

-10 for false education declaration.

🔹 Electoral Performance (15% weight)

+10 for past MP/MLA term with positive performance.

+5 for neutral performance.

+2 for no experience.

0 for prior negative performance.

Return the result as:
{
"Criminal Score": X,
"Financial Score": Y,
"Education Score": Z,
"Performance Score": W,
"Total Score": TOTAL,
"Assessment": "Excellent/Good/Average/Poor Candidate"
}

🟠 3. IPC-Based Criminality Assessment:
Based on any IPC sections mentioned in the document, search and identify:

The legal names of those IPC sections.

The severity level: Petty, Cognizable, Non-bailable, Bailable, or Serious Crime.

A short summary of what kind of offense(s) they refer to.

Return a judgment of whether the candidate’s legal background poses a significant concern or is minor.

Please be objective and concise, and format the output clearly under the headings:
▶ Summary
▶ Scoring Breakdown
▶ IPC Criminality Assessment


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
      res
        .status(500)
        .json({ error: "Failed to parse Gemini response as JSON." });
    }
    // 👈 Parse and return the response
  } catch (error) {
    console.error("Gemini error:", error.message || error);
    res
      .status(500)
      .json({ error: "Something went wrong with resume evaluation." });
  }
};
