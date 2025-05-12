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
        // Optional: Add some configuration to improve JSON response
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            full_name: { type: "string" },
            email_address: { type: "string" },
            phone_number: { type: "string" },
            education: { type: "array", items: { type: "string" } },
            skills: { type: "array", items: { type: "string" } },
            work_experience: { type: "array", items: { type: "string" } },
            summary: { type: "string" },
            evaluation_score: { type: "number", minimum: 0, maximum: 10 },
            evaluation_justification: { type: "string" }
          },
          required: [
            "full_name", 
            "email_address", 
            "phone_number", 
            "education", 
            "skills", 
            "work_experience", 
            "summary", 
            "evaluation_score", 
            "evaluation_justification"
          ]
        }
      }
    });

    // Prepare PDF as multimodal content part
    const filePart = fileToGenerativePart(fileBuffer, "application/pdf");

    // Create detailed prompt with specific instructions
    const prompt = `You are an AI resume evaluator specializing in technical roles. 
Carefully analyze the uploaded PDF resume and extract the following information in a precise, structured manner:

1. Full Name: Extract the candidate's complete legal name
2. Contact Information:
   - Email Address (professional email preferred)
   - Phone Number (with country code if possible)
3. Education Details:
   - Degree(s)
   - Institution(s)
   - Graduation Year(s)
4. Technical Skills:
   - Programming Languages
   - Frameworks
   - Tools
   - Technologies
5. Work Experience:
   - Company Names
   - Job Titles
   - Key Responsibilities
   - Notable Achievements
6. Professional Summary:
   - Brief overview of the candidate's professional background
   - Key strengths and career objectives

7. Evaluation for Full Stack Developer Role:
   - Provide a comprehensive score out of 10
   - Consider factors like:
     * Technical skills relevance
     * Depth of experience
     * Breadth of technologies
     * Project complexity
     * Potential for growth

8. Detailed Evaluation Justification:
   - Explain the reasoning behind the assigned score
   - Highlight strengths and potential areas for improvement

IMPORTANT INSTRUCTIONS:
- Be extremely precise and accurate
- Only use information directly from the resume
- If any information is missing, use "N/A" or leave as an empty string
- Ensure the response is valid, parseable JSON
- The evaluation should be objective and professional`;

    // Generate content with both text prompt and PDF file
    const result = await model.generateContent([prompt, filePart]);
    let response = await result.response.text();

    // Clean response: remove markdown code block formatting if present
    response = response.replace(/```(json)?|```/g, "").trim();

    try {
      // Parse the response, with fallback for potential parsing issues
      const parsed = JSON.parse(response);
      
      // Validate the parsed JSON has all required keys
      const requiredKeys = [
        "full_name", 
        "email_address", 
        "phone_number", 
        "education", 
        "skills", 
        "work_experience", 
        "summary", 
        "evaluation_score", 
        "evaluation_justification"
      ];
      
      requiredKeys.forEach(key => {
        if (!parsed.hasOwnProperty(key)) {
          throw new Error(`Missing required key: ${key}`);
        }
      });

      res.json({ parsed });
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
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
    res.status(500).json({ 
      error: "Something went wrong with resume evaluation.",
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