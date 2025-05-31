// index.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import examRoutes from './routes/examRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config({ path: "config.env" });

const app = express();
app.use(express.json());

dbConnection();

app.use("/examApi", authRoutes);
app.use("/examApi", examRoutes);
app.use("/examApi", questionRoutes);
app.use("/examApi", submissionRoutes);
app.use("/examApi", notificationRoutes);

app.get("/test", (req, res) => {
  res.send("Server working!");
});

export default app;
