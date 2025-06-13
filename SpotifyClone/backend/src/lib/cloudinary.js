import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'

// The dotenv package in Node.js is used to load environment variables from a .env file into process.env.
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;

// By using the cloudinary object above, we can upload the files or images to our cloudinary account