import { Router } from "express";
const router = Router();
import SaveAnalysis from "../models/SaveAnalysis.js";

// POST route to save candidate affidavit analysis from Gemini API
router.post("/save-analysis", async (req, res) => {
  try {
    // Extract the analysis data from the request body
    const { summary, scoringBreakdown, ipcCriminalityAssessment } = req.body;

    // Validate required fields
    if (!summary || !scoringBreakdown || !ipcCriminalityAssessment) {
      return res
        .status(400)
        .json({ error: "Missing required fields in analysis data" });
    }

    // Create a new SaveAnalysis document
    const newAnalysis = new SaveAnalysis({
      summary,
      scoringBreakdown,
      ipcCriminalityAssessment,
      // Optional: Associate with a user if authentication is implemented
      // userId: req.user._id,

      // Optional: Add reference to original document if storing separately
      // originalDocument: req.body.originalDocumentId
    });

    // Save the analysis to MongoDB
    const savedAnalysis = await newAnalysis.save();

    // Return the saved analysis with its MongoDB ID
    res.status(201).json({
      message: "Candidate affidavit analysis saved successfully",
      analysisId: savedAnalysis._id,
      data: savedAnalysis,
    });
  } catch (error) {
    console.error("Error saving candidate analysis:", error);

    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation error",
        details: Object.values(error.errors).map((e) => e.message),
      });
    }

    res.status(500).json({ error: "Failed to save analysis" });
  }
});

export default router;

// // GET route to retrieve a specific analysis by ID
// router.get('/analysis/:id', async (req, res) => {
//   try {
//     const analysis = await SaveAnalysis.findById(req.params.id);

//     if (!analysis) {
//       return res.status(404).json({ error: 'Analysis not found' });
//     }

//     res.status(200).json(analysis);

//   } catch (error) {
//     console.error('Error retrieving analysis:', error);
//     res.status(500).json({ error: 'Failed to retrieve analysis' });
//   }
// });
