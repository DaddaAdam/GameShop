import express from "express";
import {
  getGames,
  getGameById,
  deleteGame,
} from "../controllers/gameController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getGames);
router.route("/:id").get(getGameById).delete(protect, admin, deleteGame);

export default router;
