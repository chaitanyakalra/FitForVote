import express from 'express';
import {
  uploadResume,
  resumeUploadMiddleware,
} from '../controller/resumeParserController.js';

const router = express.Router();

router.post('/uploadResume', resumeUploadMiddleware, uploadResume);

export default router;
// This code defines an Express router for handling resume uploads.
//  It imports the necessary modules and middleware, sets up a POST route for uploading resumes, and exports the router for use in the main application. The `uploadResume` function handles the file upload and parsing logic, while `resumeUploadMiddleware` is used to 
// handle the file upload process.