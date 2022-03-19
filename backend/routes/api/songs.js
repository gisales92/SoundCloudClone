const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song, User, Album } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    const Songs = songs.map((songObj, i) => ({
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
    res.json({ Songs });
  })
);

router.get(
  "/:songId",
  asyncHandler(async (req, res, next) => {
    const song = await Song.findByPk(req.params.songId, {
      include: [User, Album],
    });
    if (song) {
      const mappedSong = {
        id: song.id,
        userId: song.userId,
        albumId: song.albumId,
        title: song.title,
        description: song.description,
        url: song.soundFileURL,
        createdAt: song.createdAt,
        updatedAt: song.updatedAt,
        previewImage: song.previewImage,
        Artist: {
          id: song.User.id,
          username: song.User.username,
          previewImage: song.User.previewImage,
        },
        Album: {
          id: song.Album.id,
          title: song.Album.title,
          previewImage: song.Album.previewImage,
        },
      };
      res.json(mappedSong);
    } else {
        const err = new Error("Song couldn't be found");
        err.status = 404;
        next(err)
    }
  })
);

module.exports = router;
