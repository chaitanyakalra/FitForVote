// import express from "express";
// import cors from "cors";
// import resumeRoutes from "./routes/api.js";

// const app = express();
// app.use(cors());
// app.use('/api', resumeRoutes);

// app.listen(3001, () => console.log("Server running at http://localhost:3001"));


// app.js - Express server setup
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { evaluateResume } from './controller/geminiContoller.js';
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File upload only supports PDF and Word documents"));
  }
});

// Ensure uploads directory exists
// const fs = require('fs');
import fs from 'fs';
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Routes
app.post('/api/evaluate', upload.single('resume'), evaluateResume);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: err.message || 'Something went wrong on the server' 
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
