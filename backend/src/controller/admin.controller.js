import {Song} from '../models/song.model.js';
import {Album} from '../models/album.model.js';
import cloudinary from '../lib/cloudinary.js';

const uploadToColudinary =async(file)=>{
    try {
        const results= await cloudinary.uploader.upload(file.tempFilePath , {
            resource_type : "auto",
        })
        return results.secure_url
    } catch (error) {
        console.log("error in upload to cloudinary" , error);
        throw new Error("error uploading to cloudinary");

    }
}

export const createSong = async (req,res , next) =>{
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "Please Upload All Files"});
        }
        const {title,artist,albumId,duration} = req.body
        const audioFile=req.files.audioFile;
        const imageFile=req.files.imageFile;

        const audioUrl= await uploadToColudinary(audioFile);
        const imageUrl= await uploadToColudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId : albumId || null,
        })

        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id},

            })
        }
        res.status(201).json(song)

    } catch (error) {
        console.log("error creating a song" ,error);
        next(error)
    }
}

export const deleteSong =  async (req,res , next) =>{ 
    try {
        const {id} = req.params;
        const song = await Song.findById(id);
        if(song.albumID){
            await Album.findByIdAndUpdate(song.albumID,{
                $pull:{songs:song._id}
            })
        }
        await Song.findByIdAndDelete(id)
        res.status(200).json({message:"SOng Deleted"});
    } catch (error) {
        console.log('error in delete song' ,error);
        next(error)
    }
}

export const createAlbum = async (req,res,next) =>{
    try {
        const {title,artist, releaseYear} = req.body
        const {imageFile} = req.files

        const imageUrl = await uploadToColudinary(imageFile)

        const album = new album({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await album.save();
        res.status(200).json(album);
    } catch (error) {
        console.log("Error in creatAlbum" ,error);
        next(error);
    }
}

export const deleteAlbum = async (req,res,next) =>{
    try {
        const {id} = req.params;
        await Song.deleteMany({albumID:id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:"Album Deleted"})
    } catch (error) {
        console.log("Error in DeleteAlbum" ,error);
        next(error);
    }
}

export const checkAdmin = async (req,res,next) =>{
    res.status(200).json({admin:true});
}
