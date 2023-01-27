import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import gameRoutes from "./routes/gameRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
dotenv.config();

connectDB(process.env.CONNECTION_STRING);

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}.`)
);
