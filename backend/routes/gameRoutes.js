import express, { json } from "express";
import { getGames, getGameById } from "../controllers/gameController.js";
const router = express.Router();

router.route("/").get(getGames);
router.route("/:id").get(getGameById);

export default router;
