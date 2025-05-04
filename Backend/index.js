import express from "express";
import path from "path";
import dotenv from "dotenv";

import dbConnection from "./dbConfig/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
dotenv.config({ path: "config.env" });

dbConnection();

app.use("/examApi", authRoutes);
app.get("/test", (req, res) => {
  res.send("Server working!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
