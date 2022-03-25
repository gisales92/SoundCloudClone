const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song, User, Album, Playlist } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// get a user's songs
router.get(
  "/songs",
  requireAuth,
  asyncHandler(async (req, res, next) => {
      const userSongs = await Song.byUser(req.user.id);
      const Songs = userSongs.map((songObj) => ({
        id: songObj.id,
        userId: songObj.userId,
        albumId: songObj.albumId,
        title: songObj.title,
        description: songObj.description,
        url: songObj.soundFileURL,
        createdAt: songObj.createdAt,
        updatedAt: songObj.updatedAt,
        previewImage: songObj.previewImage,
      }));
      return res.json({ Songs });
  })
);

// get a user's albums
router.get(
    "/albums",
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const userAlbums = await Album.byUser(req.user.id);
        const Albums = userAlbums.map((albumObj) => ({
            id: albumObj.id,
            userId: albumObj.userId,
            title: albumObj.title,
            description: albumObj.description,
            createdAt: albumObj.createdAt,
            updatedAt: albumObj.updatedAt,
            previewImage: albumObj.previewImage,
          }));
          res.json({ Albums });
    })
  );

  // get a user's playlists
router.get(
  "/playlists",
  requireAuth,
  asyncHandler(async (req, res, next) => {
      const userPlaylists = await Playlist.byUser(req.user.id);
      const playlists = userPlaylists.map((playlistObj) => ({
          id: playlistObj.id,
          userId: playlistObj.userId,
          name: playlistObj.name,
          createdAt: playlistObj.createdAt,
          updatedAt: playlistObj.updatedAt,
          previewImage: playlistObj.previewImage,
        }));
        res.status(200);
        return res.json({Playlists: playlists});
  })
);

module.exports = router;
