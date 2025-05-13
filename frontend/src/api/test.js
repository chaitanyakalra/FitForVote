import request from 'supertest';
import mongoose from 'mongoose';
import app from '../App.jsx'; // Make sure your Express app is exported from app.js
import CandidateAffidavitAnalysis from '../models/SaveAnalysis.js';

// Dummy data for tests
const dummyData = {
  summary: {
    fullName: "John Doe",
    constituency: "North Central",
    partyAffiliation: "Example Party"
  },
  scoringBreakdown: {
    totalScore: 85,
    details: {
      integrity: 40,
      transparency: 45
    }
  },
  ipcCriminalityAssessment: {
    ipcSections: ["IPC 420", "IPC 376"]
  }
};

let createdAnalysisId;

beforeAll(async () => {
  // Connect to test DB
  const url = process.env.TEST_MONGO_URI || 'mongodb://127.0.0.1:27017/affidavit_test';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Candidate Affidavit Analysis Routes", () => {
  it("should save a new analysis", async () => {
    const res = await request(app)
      .post("/api/candidate-analysis/save-analysis")
      .send(dummyData);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.summary.fullName).toBe(dummyData.summary.fullName);
    createdAnalysisId = res.body.analysisId;
  });

  it("should fetch all analyses with pagination", async () => {
    const res = await request(app)
      .get("/api/candidate-analysis/analyses?page=1&limit=5");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.analyses)).toBe(true);
  });

  it("should fetch a specific analysis by ID", async () => {
    const res = await request(app)
      .get(`/api/candidate-analysis/analysis/${createdAnalysisId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdAnalysisId);
  });

  it("should return 404 for non-existing analysis", async () => {
    const res = await request(app)
      .get(`/api/candidate-analysis/analysis/65f0d706a71a416b86c00000`);

    expect(res.statusCode === 404 || res.statusCode === 400).toBe(true); // Either invalid or not found
  });

  it("should search analyses by name and criminal record", async () => {
    const res = await request(app)
      .get("/api/candidate-analysis/search")
      .query({
        name: "john",
        hasCriminalRecord: "true"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.analyses.length).toBeGreaterThanOrEqual(1);
  });
});
