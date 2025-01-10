import {Playlist} from "../models/playlist.model.js";
import {UserLibrary} from "../models/userLibrary.model.js";
import cloudinary from "../lib/cloudinary.js";
import e from "express";
import mongoose from "mongoose";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return result.secure_url;
	} catch (error) {
		console.log("Error in uploadToCloudinary", error);
		throw new Error("Error uploading to cloudinary");
	}
};


export const getAllPlaylistsForUser = async (req, res, next) => {
    try{
        const {userId} = req.params;
        // console.log(userId);
        const playlistTable = await UserLibrary.findOne({"userId":userId}, { list: 1, _id:0}).populate({ path: "list", populate: "songs" });
        res.status(200).json(playlistTable.list);
    } catch (error){
        next(error);
    }
};


export const getPlaylistByTitle = async (req, res, next) => {
    try{

        const {userId, playlistTitle} = req.params;

        const playlistTable = await UserLibrary.findOne({"userId":userId}, { list: 1, _id:0}).populate({ path: "list", populate: "songs" });

        var playlists  = [];

        playlistTable.list.forEach((listObj, index) => {
            if (listObj.title === playlistTitle){
                playlists = listObj;
            }
        });

        // console.log(playlists)

        if (!playlists){
            console.log("Playlist not found");
            return res.status(404).json({message: "Playlist not found"});
        }

        res.status(200).json(playlists);

    }catch(error){
        console.log(error);
        next(error);
    }

};


export const createPlaylist = async (req, res, next) => {
	try {
		// if (!req.files || !req.files.imageFile) {
		// 	return res.status(400).json({ message: "Please upload all files" });
		// }

        const {userId, title} = req.body;
        // const imageFile = req.files.imageFile;
		// const imageUrl = await uploadToCloudinary(imageFile);

        let userPlaylistStore = await UserLibrary.findOne({"userId":userId});
        if (!userPlaylistStore){
            const listOfSongs = [];
            userPlaylistStore = new Playlist({
                userId,
                listOfSongs,
            });
            console.log("Created a new user ", userId," and added to the playlist database")
            await userPlaylistStore.save();
        }
        let songs = [];
        const playlist = new Playlist({
            title,
            // imageUrl,
            songs,
        });
        const newPlaylist = await UserLibrary.updateOne({ "userId":userId},
            {
                $push: {
                  "list": playlist,
                }
            }
        );
        console.log("Added new playlist called: ", newPlaylist);
		res.status(201).json(newPlaylist);
	} catch (error) {
		console.log("Error in creating a new playlist", error);
		next(error);
	}
};


export const deletePlaylist = async (req, res, next) => {
	try {
		const { userId, title } = req.body;

        const removePlaylist = await UserLibrary.updateOne({ "userId":userId},
            {
                $pull: {
                  "list": {"title":title},
                }
            }
        );
        console.log(userId, title);
		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleting playlist", error);
		next(error);
	}
};



export const addSongToPlaylist = async (req, res, next) => {
	try {
		const { userId, title, songId } = req.body;
        const addSong = await UserLibrary.updateOne({ "userId":userId, "list.title": title},
             {
                 $addToSet: {
                   "list.$.songs": songId,
                 }
             }
        );
        console.log(addSong);
		res.status(201).json(addSong);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const deleteSongFromPlaylist = async (req, res, next) => {
	try {
		const { userId, title, songId } = req.body;
        const songIDObj = new mongoose.Types.ObjectId(songId);
        console.log(userId, title, songIDObj);
        const deleteSong = await UserLibrary.updateOne({ "userId":userId, "list.title": title},
            {
                $pull: {
                  "list.$.songs": songIDObj,
                }
            }
        );
        console.log(deleteSong);
		res.status(200).json({ message: "Song deleted from playlist successfully" });
	} catch (error) {
		console.log("Error in deleting song from playlist", error);
		next(error);
	}
};
