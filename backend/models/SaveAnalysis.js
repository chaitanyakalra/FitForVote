import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

// Schema for IPC Sections
const IPCSectionSchema = new Schema({
  section: {
    type: String,
    trim: true,
  },
  offenseSummary: {
    type: String,
    trim: true,
  },
  severityLevel: {
    type: String,
    enum: ["Minor", "Moderate", "Cognizable", "Serious", "Very Serious"],
    default: "Moderate",
  },
});

// Schema for IPC Criminality Assessment
const IPCCriminalityAssessmentSchema = new Schema({
  ipcSections: [IPCSectionSchema],
  legalBackgroundJudgment: {
    type: String,
    trim: true,
    required: true,
  },
});

// Schema for Scoring Breakdown
const ScoringBreakdownSchema = new Schema({
  assessment: {
    type: String,
    enum: ["Poor", "Below Average", "Average", "Good", "Excellent"],
    required: true,
  },
  criminalScore: {
    type: Number,
    required: true,
    min: -50,
    max: 40,
  },
  educationScore: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  financialScore: {
    type: Number,
    required: true,
    min: -20,
    max: 25,
  },
  performanceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 15,
  },
  totalScore: {
    type: Number,
    required: true,
    min: -100,
    max: 100,
  },
});

// Schema for Candidate Summary
const SummarySchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  age: {
    type: Number,
    required: true,
    min: 25, // Minimum age requirement for most political positions
  },
  constituency: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  partyAffiliation: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  criminalCaseStatus: {
    type: String,
    trim: true,
  },
  educationalBackground: {
    type: String,
    trim: true,
  },
  electionExperience: {
    type: String,
    trim: true,
  },
  professionalDetails: {
    type: String,
    trim: true,
  },
});

// Main Candidate Affidavit Analysis Schema
const CandidateAffidavitAnalysisSchema = new Schema({
  summary: {
    type: SummarySchema,
    required: true,
  },
  scoringBreakdown: {
    type: ScoringBreakdownSchema,
    required: true,
  },
  ipcCriminalityAssessment: {
    type: IPCCriminalityAssessmentSchema,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    index: true,
  },
  // Add this field to associate with user accounts if needed
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  // Original document reference (if storing files separately)
  originalDocument: {
    type: String,
    trim: true,
  },
  // For versioning if you update analyses
  version: {
    type: Number,
    default: 1,
  },
});

// Add compound indexes for common queries
CandidateAffidavitAnalysisSchema.index({
  "summary.constituency": 1,
  "summary.partyAffiliation": 1,
});
CandidateAffidavitAnalysisSchema.index({ "scoringBreakdown.totalScore": -1 }); // For sorting by score

// Create and export the model
const CandidateAffidavitAnalysis = model(
  "CandidateAffidavitAnalysis",
  CandidateAffidavitAnalysisSchema
);

export default CandidateAffidavitAnalysis;
