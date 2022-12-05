import express from "express";
import dotenv from "dotenv";
import games from "./data/games.js";

const app = express();
dotenv.config();

app.get("/api/games", (req, res) => {
  res.json(games);
});

app.get("/api/games/:id", (req, res) => {
  const game = games.find(g => g._id == req.params.id);
  res.json(game);
});

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}.`)
);
