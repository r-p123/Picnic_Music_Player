import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(

{
    userId:{type:String, required:true},
    madeForYou_1:   [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    madeForYou_2:   [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    madeForYou_3:   [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    trending:       [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    recently_played:[{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
}, {timestamps: true}

);

export const QueueLibrary = mongoose.model("QueueLibrary", queueSchema);
