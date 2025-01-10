import mongoose from "mongoose";


const playlistSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        imageUrl:{type: String, required: true},
        songs: [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    }, {timestamps: true}
)
export const Playlist = mongoose.model("Playlist", playlistSchema);
