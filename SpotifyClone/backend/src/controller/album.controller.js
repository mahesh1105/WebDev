import { Album } from '../models/album.model.js'

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    return res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
}

export const getAlbumById = (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = Album.findById(albumId).populate("songs");
    
    if(!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    return res.status(200).json(album);
  } catch (error) {
    next(error);
  }
}