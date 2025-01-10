import mongoose from "mongoose";
import { Playlist } from "./playlist.model.js";

const userLibrarySchema = new mongoose.Schema(

    {
        userId:{type:String, required:true},
        list: [Playlist.schema],
    
    }, {timestamps: true}
    
    );
    
export const UserLibrary = mongoose.model("UserLibrary", userLibrarySchema);
    