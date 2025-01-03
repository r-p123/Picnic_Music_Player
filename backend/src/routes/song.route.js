import {Router} from "express";
import { getFeaturedSongs, getMadeForYouSongs, getTrendingSongs, querySongs} from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);
router.get("/:query", protectRoute, querySongs);


export default router;
