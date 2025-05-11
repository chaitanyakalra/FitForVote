import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();
app.use(cors());
app.use("/api", apiRoutes);

app.listen(3001, () => console.log("Server running at http://localhost:3001"));
