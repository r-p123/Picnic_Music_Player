import { Router } from "express";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";
import { getStats } from "../controller/stats.controller.js";


const router = Router();

router.get("/", getStats );

export default router;
