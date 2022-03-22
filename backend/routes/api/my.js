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

router.get(
  "/songs",
  requireAuth,
  asyncHandler(async (req, res, next) => {
      const userSongs = await Song.byUser(req.user.id);
      const Songs = userSongs.map((songObj, i) => ({
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

module.exports = router;
