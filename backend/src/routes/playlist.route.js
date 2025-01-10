import {Router} from "express";
import { getPlaylistByTitle, getAllPlaylistsForUser, addSongToPlaylist, deleteSongFromPlaylist,
    createPlaylist, deletePlaylist
 } from "../controller/playlist.controller.js";

const router = Router();
// app.use("/api/playlist", playlistRoutes);


router.get("/:userId", getAllPlaylistsForUser);
router.get("/:userId/:playlistTitle", getPlaylistByTitle);

router.post("/addSong", addSongToPlaylist);
router.delete("/deleteSong", deleteSongFromPlaylist);

router.post("/createPlaylist", createPlaylist);
router.delete("/deletePlaylist", deletePlaylist);


export default router;
