const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song } = require("../../db/models");
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

module.exports = router;
