import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileupload from 'express-fileupload';


import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import adminRoute from './routes/admin.route.js';
import songsRoute from './routes/songs.route.js';
import albumRoute from './routes/albums.route.js';
import statsRoute from './routes/stats.route.js';
import { connect } from 'mongoose';
import { connectDB } from './lib/db.js';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json()) //to parse json data
app.use(clerkMiddleware())

app.use(fileupload({
    useTempFiles : true ,
    tempFileDir : path.join(__dirname , "tmp"),
    createParentPath : true ,
    limits:{
        fileSize : 10 * 1024 * 1024 ,//max file size
    }
}))

app.use('/api/user' , userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/admin' , adminRoute);
app.use('/api/songs' , songsRoute);
app.use('/api/albums' , albumRoute);
app.use('/api/stats' , statsRoute);

app.use((err,req,res,next)=>{
    res.status(500).json({message : process.env.NODE_ENV==="production" ? "Internal Server Error" : err.message});
})

app.listen(port,()=>{
    console.log("Server is Running on Port " + port);
    connectDB();
})
