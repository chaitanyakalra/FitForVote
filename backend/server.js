import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/api.js";

const app = express();
app.use(cors());
app.use('/api', resumeRoutes);

app.listen(3001, () => console.log("Server running at http://localhost:3001"));
