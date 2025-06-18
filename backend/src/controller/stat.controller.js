import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

export const getStats = async (req,res) =>{
    try {
        const [totalSongs , totalAlbums , totalUsers,uniqueArtists] = await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(), 
        User.countDocuments(),
        
        Song.aggregate([
            {
                $unionwith:{
                    coll:"Albums",
                    pipeline:[]
                }
            },
            {
                $group:{
                    _id:"$artist",
                }
            },
            {
                $count: "count"
            }
        ])
    ]);
    res.status(200).json({totalSongs , totalAlbums , totalUsers ,totalArtists:uniqueArtists[0]?.$count || 0});
    
    } catch (error) {
        
    }
    
};