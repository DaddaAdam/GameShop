import express from "express";
import {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  createNewReview,
} from "../controllers/gameController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getGames).post(protect, admin, createGame);
router
  .route("/:id")
  .get(getGameById)
  .put(protect, admin, updateGame)
  .delete(protect, admin, deleteGame);
router.route("/:id/reviews").post(protect, createNewReview);

export default router;
