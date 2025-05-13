// routes/candidateAnalysis.js
import { Router } from "express";
const router = Router();
import CandidateAffidavitAnalysis from "../models/SaveAnalysis.js";

// POST route to save candidate affidavit analysis (you already have this)
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
    const newAnalysis = new CandidateAffidavitAnalysis({
      summary,
      scoringBreakdown,
      ipcCriminalityAssessment,
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

// GET route to fetch all candidate analyses with pagination
router.get("/analyses", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalCount = await CandidateAffidavitAnalysis.countDocuments();
    
    // Fetch analyses with pagination
    const analyses = await CandidateAffidavitAnalysis.find()
      .sort({ uploadDate: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      analyses,
      pagination: {
        total: totalCount,
        page,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching candidate analyses:", error);
    res.status(500).json({ error: "Failed to fetch analyses" });
  }
});

// GET route to fetch a specific analysis by ID
router.get("/analysis/:id", async (req, res) => {
  try {
    const analysis = await CandidateAffidavitAnalysis.findById(req.params.id);
    
    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    
    res.status(200).json(analysis);
  } catch (error) {
    console.error("Error fetching analysis:", error);
    
    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid analysis ID format" });
    }
    
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
});

// GET route to search analyses by various criteria
router.get("/search", async (req, res) => {
  try {
    const {
      name,
      constituency,
      party,
      minScore,
      maxScore,
      hasCriminalRecord,
      page = 1,
      limit = 10
    } = req.query;
    
    const query = {};
    
    // Build search query based on provided parameters
    if (name) query["summary.fullName"] = { $regex: name, $options: "i" };
    if (constituency) query["summary.constituency"] = { $regex: constituency, $options: "i" };
    if (party) query["summary.partyAffiliation"] = { $regex: party, $options: "i" };
    
    // Handle score range
    if (minScore !== undefined || maxScore !== undefined) {
      query["scoringBreakdown.totalScore"] = {};
      if (minScore !== undefined) query["scoringBreakdown.totalScore"].$gte = parseInt(minScore);
      if (maxScore !== undefined) query["scoringBreakdown.totalScore"].$lte = parseInt(maxScore);
    }
    
    // Handle criminal record filter
    if (hasCriminalRecord === 'true') {
      query["ipcCriminalityAssessment.ipcSections"] = { $exists: true, $ne: [] };
    } else if (hasCriminalRecord === 'false') {
      query["ipcCriminalityAssessment.ipcSections"] = { $size: 0 };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get total count for pagination
    const totalCount = await CandidateAffidavitAnalysis.countDocuments(query);
    
    // Execute the search
    const analyses = await CandidateAffidavitAnalysis.find(query)
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    res.status(200).json({
      analyses,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        pages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Error searching analyses:", error);
    res.status(500).json({ error: "Failed to search analyses" });
  }
});

export default router;