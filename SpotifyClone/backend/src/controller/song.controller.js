import { Song } from '../models/song.model.js'

export const getAllSongs = async (req, res, next) => {
  try {
    // -1 = Descending => newest to oldest
    // 1 = Ascending => oldest to newest
    const songs = await Song.find().sort({createdAt: -1});
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
}

export const getSongById = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Song.find(songId);

    if(!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
}

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample:{size:6}
      },
      {
        // Whatever field you need - just set them to 1
        $project:{
          _id:1,
          title:1,
          artist:1,
          imageUrl:1,
          audioUrl:1
        }
      }
    ])

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
}

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample:{size:4}
      },
      {
        // Whatever field you need - just set them to 1
        $project:{
          _id:1,
          title:1,
          artist:1,
          imageUrl:1,
          audioUrl:1
        }
      }
    ])

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
}

export const getTrendingSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample:{size:4}
      },
      {
        // Whatever field you need - just set them to 1
        $project:{
          _id:1,
          title:1,
          artist:1,
          imageUrl:1,
          audioUrl:1
        }
      }
    ])

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
}