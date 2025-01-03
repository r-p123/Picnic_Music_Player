import { Song } from "../models/song.model.js"


export const querySongs = async(req, res, next) => {
    try {
        console.log(req.query.text);
        const songs = await Song.aggregate(
            [{
                $search: {
                index: 'Songs_Index', // Name of the search index
                text: {
                    query: req.params.query,
                    path: ['artist', 'title'], // Fields to search
                    fuzzy: {
                        maxEdits: 1, // Allow up to 1 character edit
                    },
                    },
                }, 
                 
            },
            {   
                $project:{
                    _id:1, 
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl: 1,
                    createdAt: 1,
                    paginationToken : { $meta :"searchSequenceToken" },
                    score: { $meta: "searchScore" }
                } 
            },
            { $sort: { score: -1 } }, // Sort by relevance score
            // { $limit: 50 }, // Limit to 10 results
            ]
        );
        // let n = songs.length;
        // console.log("Last pagination token=",songs[n-1].paginationToken)
        res.json(songs);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    try {
        // fetch 6 random songs using mongodb's aggregation pipleline
        const songs = await Song.aggregate(
            [
                {
                    $sample:{size:6}
                },
                {
                   $project:{
                    _id:1, 
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl: 1
                   } 
                }
            ]);
        res.json(songs);

    } catch (error) {
        next(error);
    }
}

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs using mongodb's aggregation pipleline
        const songs = await Song.aggregate(
            [
                {
                    $sample:{size:4}
                },
                {
                   $project:{
                    _id:1, 
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl: 1
                   } 
                }
            ]);
        res.json(songs);

    } catch (error) {
        next(error);
    }
}


export const getTrendingSongs = async (req, res, next) => {
    
    try {
        // fetch 4 random songs using mongodb's aggregation pipleline
        const songs = await Song.aggregate(
            [
                {
                    $sample:{size:4}
                },
                {
                   $project:{
                    _id:1, 
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl: 1
                   } 
                }
            ]);
        res.json(songs);

    } catch (error) {
        next(error);
    }
    
}

