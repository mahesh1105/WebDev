import { Song } from '../models/song.model.js'
import { Album } from '../models/album.model.js'
import cloudinary from '../lib/cloudinary.js'

// Helper Function for Cloudinary Upload
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    })

    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error Uploading to Cloudinary: ", error);
  }
}

export const createSong = async (req, res, next) => {
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all the files" });
    }

    const { title, artist, duration, albumId } = req.body;
    const audioFile = req.files.audioFile
    const imageFile = req.files.imageFile

    // Below Function are used to upload the files to Cloudinary and will return the URL
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // You will get the document object
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null
    })

    // Every document in mongoose will have a built-in save method
    // This method will - Validates the Schema, Inserts the documents in MongoDB, and
    // Returns a promise (which is why you can use await)
    await song.save();

    // if song belongs to an album, update the album's song array
    if(albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);

  } catch(error) {
    console.log("Error in createSong", error);
    next(error);
  }
}

export const deleteSong = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const id = req.params.id;

    // Find the song by Id
    const song = await Song.findById(id);
    
    // If song belongs to an album, update the album's songs array
    if(song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      })
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });

  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
}

export const createAlbum = async (req, res, next) => {
  try {
    if(!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload the image file" });
    }

    // request is sent by the client with all the necessary details
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;

    // Below Function are used to upload the files to Cloudinary and will return the URL
    const imageUrl = await uploadToCloudinary(imageFile);

    // You will get the document object
    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    })

    await album.save();

    res.status(201).json(album);

  } catch(error) {
    console.log("Error in createAlbum", error);
    next(error);
  }
}

export const deleteAlbum = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const id = req.params.id;
    
    // Each Song belong to some Album then
    // With deletion of that album, all those songs belong to it must be deleted
    await Song.deleteMany({ albumId: id });

    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully" });

  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
}

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
}