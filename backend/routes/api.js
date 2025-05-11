import express from "express";
import multer from "multer";
import { evaluateResume } from "../controller/geminiContoller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/evaluate", upload.single("resume"), evaluateResume);

export default router;
