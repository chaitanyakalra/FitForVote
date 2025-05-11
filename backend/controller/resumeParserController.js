import fs from 'fs';
import path from 'path';
import axios from 'axios';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

// const apiKey = process.env.RESUME_PARSER_API_KEY;
const apiKey = 'Q4Hp1Nocuhb8mnnaKgXEOsbOEdrGgZSY';
const upload = multer({ dest: 'uploads/' }); // temp location

// POST /api/uploadResume
export const uploadResume = async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      console.log("File received:", file);
  
      const fileData = fs.readFileSync(file.path);
  
      // Log API key for debugging purposes
      console.log("apiKey", apiKey);
  
      const response = await axios.post(
        'https://api.apilayer.com/resume_parser/upload',
        fileData,
        {
          headers: {
            'Content-Type': 'application/octet-stream',
            apikey: apiKey,
          },
          timeout: 10000
        }
      );
  
      console.log('Response Data:', response.data);
  
      // Clean up the uploaded file
      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.error('Error while deleting file:', err.message);
      }
  
      res.json({ parsed: response.data });
    } catch (error) {
      if (error.response) {
        console.error('Error in Resume Parser API:', error.response.data);
        res.status(500).json({ error: error.response.data });
      } else {
        console.error('General Error:', error.message);
        res.status(500).json({ error: error.message });
      }
    }
  };
  
export const resumeUploadMiddleware = upload.single('resume');
