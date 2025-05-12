// import dotenv from "dotenv";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import pdf from "pdf-parse";
// // Handle __dirname in ES Module context
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load .env from backend/.env
// dotenv.config({ path: path.resolve(__dirname, "../.env") });

// const apiKey = process.env.GEMINI_API_KEY;
// console.log("apiKey:", apiKey); // Should now print the actual key

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });



// // Helper function to convert file to base64
// function fileToGenerativePart(buffer, mimeType) {
//   return {
//     inlineData: {
//       data: buffer.toString("base64"),
//       mimeType
//     },
//   };
// }

// export const evaluateResume = async (req, res) => {
//   try {
//     // Get uploaded file
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Read file buffer
//     const fileBuffer = fs.readFileSync(file.path);
    
//     // Get Gemini model that supports multimodal input
//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
//     // Prepare PDF as multimodal content part
//     const filePart = fileToGenerativePart(fileBuffer, "application/pdf");

//     // Create prompt with both text instructions and PDF file
//     const prompt = `You are an AI resume evaluator. From the resume PDF I'm providing, extract:
// 1. Full name
// 2. Email address
// 3. Phone number
// 4. Education details
// 5. Skills
// 6. Work experience (with responsibilities)
// 7. Summary of candidate
// 8. Evaluation score (out of 10) for a Full Stack Developer role
// 9. Justify the evaluation score.

// Return your response as valid JSON with keys:
// - full_name
// - email_address
// - phone_number
// - education
// - skills
// - work_experience
// - summary
// - evaluation_score
// - evaluation_justification`;

//     // Generate content with both text prompt and PDF file
//     const result = await model.generateContent([prompt, filePart]);
//     let response = await result.response.text();
    
//     // Clean response: remove markdown code block formatting if present
//     response = response.replace(/```json|```/g, "").trim();
    
//     try {
//       const parsed = JSON.parse(response);
//       res.json({ parsed });
//     } catch (parseError) {
//       console.error("JSON parse error:", parseError.message);
//       console.error("Gemini raw response:", response); // For debugging
//       res.status(500).json({ error: "Failed to parse Gemini response as JSON." });
//     }
    
//     // Clean up: remove uploaded file after processing
//     fs.unlinkSync(file.path);
    
//   } catch (error) {
//     console.error("Gemini error:", error.message || error);
//     res.status(500).json({ error: "Something went wrong with resume evaluation." });
//   }
// };

import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Handle __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: No Gemini API key found in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Helper function to convert file to base64
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType
    },
  };
}

export const evaluateResume = async (req, res) => {
  try {
    // Get uploaded file
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(file.path);

    // Use the latest recommended model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro", 
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            Summary: {
              type: "object",
              properties: {
                fullName: { type: "string" },
                age: { type: "number" },
                partyAffiliation: { type: "string" },
                constituency: { type: "string" },
                educationalBackground: { type: "string" },
                professionalDetails: { type: "string" },
                electionExperience: { type: "string" },
                criminalCaseStatus: { type: "string" }
              }
            },
            "Scoring Breakdown": {
              type: "object",
              properties: {
                CriminalScore: { type: "number" },
                FinancialScore: { type: "number" },
                EducationScore: { type: "number" },
                PerformanceScore: { type: "number" },
                TotalScore: { type: "number" },
                Assessment: { type: "string" }
              }
            },
            "IPC Criminality Assessment": {
              type: "object",
              properties: {
                IPCSections: { 
                  type: "array", 
                  items: { 
                    type: "object",
                    properties: {
                      section: { type: "string" },
                      severityLevel: { type: "string" },
                      offenseSummary: { type: "string" }
                    }
                  }
                },
                LegalBackgroundJudgment: { type: "string" }
              }
            }
          },
          required: ["Summary", "Scoring Breakdown", "IPC Criminality Assessment"]
        }
      }
    });

    // Prepare PDF as multimodal content part
    const filePart = fileToGenerativePart(fileBuffer, "application/pdf");

    // Create detailed prompt
    const prompt = `You are an expert analyst reviewing an Indian election candidate's affidavit. Carefully examine the PDF document and provide a comprehensive analysis following these guidelines:

🟠 1. Candidate Summary:
Generate a concise and readable summary of the candidate's profile. This summary should include:
- Full name, age, party affiliation, and constituency.
- Educational background.
- Key professional and financial details.
- Any previous election experience or results.
- A brief mention (if applicable) of any criminal case status.

🟠 2. Candidate Scoring:
Implement the following scoring system and return the score for each parameter, along with the final total score (max 100):
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

Provide a scoring breakdown and an overall assessment.

🟠 3. IPC-Based Criminality Assessment:
Based on any IPC sections mentioned in the document, identify:
- The legal names of those IPC sections.
- The severity level: Petty, Cognizable, Non-bailable, Bailable, or Serious Crime.
- A short summary of what kind of offense(s) they refer to.
- Provide a judgment of whether the candidate's legal background poses a significant concern or is minor.

🔍 IMPORTANT INSTRUCTIONS:
- Be extremely precise and extract only information present in the document.
- Use clear, objective language.
- If any information is not clear or missing, state "Not Available" or provide the most accurate inference possible.
- Ensure the response is a valid, well-structured JSON format.`;

    // Generate content with both text prompt and PDF file
    const result = await model.generateContent([prompt, filePart]);
    let response = await result.response.text();

    // Clean response: remove markdown code block formatting if present
    response = response.replace(/```(json)?|```/g, "").trim();

    try {
      // Parse the response
      const parsed = JSON.parse(response);
      
      // Validate the parsed JSON has all required keys
      const requiredTopLevelKeys = [
        "Summary", 
        "Scoring Breakdown", 
        "IPC Criminality Assessment"
      ];
      
      requiredTopLevelKeys.forEach(key => {
        if (!parsed.hasOwnProperty(key)) {
          throw new Error(`Missing required key: ${key}`);
        }
      });

      res.json({ parsed });
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      console.error("Gemini raw response:", response); // Debugging
      res
        .status(500)
        .json({ error: "Failed to parse Gemini response as JSON." });
      console.error("Gemini raw response:", response);
      res.status(500).json({ 
        error: "Failed to parse Gemini response. Please try again.",
        rawResponse: response
      });
    }

    // Clean up: remove uploaded file after processing
    fs.unlinkSync(file.path);

  } catch (error) {
    console.error("Gemini error:", error.message || error);
    res
      .status(500)
      .json({ error: "Something went wrong with resume evaluation." });
  }
};

    res.status(500).json({ 
      error: "Something went wrong with affidavit analysis.",
      details: error.message 
    });
  }
};


// export const evaluateResume = async (req, res) => {
//   try {
//     const file = req.file;
//     const fileBuffer = fs.readFileSync(file.path);

//     const pdfData = await pdf(fileBuffer); // ✅ Extract text
//     const extractedText = pdfData.text;

//     if (!extractedText.trim()) {
//       return res.status(400).json({
//         error: "Resume PDF contains no readable text. Try uploading a different file.",
//       });
//     }

//     const prompt = `
// You are an AI resume evaluator. From the resume text below, extract:
// 1. Full name
// 2. Email address
// 3. Phone number
// 4. Education details
// 5. Skills
// 6. Work experience (with responsibilities)
// 7. Summary of candidate
// 8. Evaluation score (out of 10) for a Full Stack Developer role
// 9. Justify the evaluation score.

// Return your response as valid JSON with keys:
// - full_name
// - email_address
// - phone_number
// - education
// - skills
// - work_experience
// - summary
// - evaluation_score
// - evaluation_justification

// Resume Text:
// ${extractedText}
// `;

//     const result = await model.generateContent(prompt);
//     let response = await result.response.text();

//     // Clean response: remove markdown code block formatting
//     response = response.replace(/```json|```/g, "").trim();

//     try {
//       const parsed = JSON.parse(response);
//       res.json({ parsed });
//     } catch (parseError) {
//       console.error("JSON parse error:", parseError.message);
//       console.error("Gemini raw response:", response); // Debugging
//       res.status(500).json({ error: "Failed to parse Gemini response as JSON." });
//     }
//     // 👈 Parse and return the response
//   } catch (error) {
//     console.error("Gemini error:", error.message || error);
//     res.status(500).json({ error: "Something went wrong with resume evaluation." });
//   }
// };