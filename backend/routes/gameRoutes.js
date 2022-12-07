import express, { json } from "express";
import Game from "../models/gameModel.js";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();

// @desc    Récuperer tous les jeux
// @route   GET /api/games
// @access  Public
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const games = await Game.find({});
      res.json(games);
    } catch (err) {
      console.log(err.message);
    }
  })
);

// @desc    Récuperer un jeu par ID
// @route   GET /api/games/:id
// @access  Public
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);
    try {
      if (game) {
        res.json(game);
      } else
        res.status(404).json({
          message: "Game does not exist.",
        });
    } catch (err) {
      console.log(err.message);
    }
  })
);

export default router;
