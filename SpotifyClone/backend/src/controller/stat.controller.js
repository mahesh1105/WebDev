import { Song } from '../models/song.model.js';
import { Album } from '../models/album.model.js';
import { User } from '../models/user.model.js';

export const getStats = async (req, res, next) => {
  try {
    // const totalSongs = await Song.countDocuments();
    // const totalAlbums = await Album.countDocuments();
    // const totalUsers = await User.countDocuments();

    // Count
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
      Song.countDocuments(),
      Album.countDocuments(),
      User.countDocuments(),

      Song.aggregate([
        {
          // Union with all the albums
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        {
          // Group all the artists together
          $group: {
            _id: "$artist",
          },
        },
        {
          // Then count all of them
          $count: "count",
        },
      ]),
    ]);

    res.status(200).json({
      totalSongs,
      totalAlbums,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0
    });

  } catch (error) {
    next(error);
  }
}