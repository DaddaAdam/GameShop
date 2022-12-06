import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();
dotenv.config();

connectDB(process.env.CONNECTION_STRING);

app.use("/api/games", gameRoutes);

const port = process.env.PORT;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}.`)
);
