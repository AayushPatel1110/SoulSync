import pkg from 'cloudinary'; // Import the entire CommonJS module
import dotenv from 'dotenv';

dotenv.config();

const cloudinary = pkg.v2; // Destructure v2 API

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;