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
    const albums = await Album.findAll();
    const Albums = albums.map((albumObj, i) => ({
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

router.get(
  "/:albumId",
  asyncHandler(async (req, res, next) => {
    const album = await Album.findByPk(req.params.albumId, {
      include: [User, Song],
    });
    if (album) {
      const mappedAlbum = {
        id: album.id,
        userId: album.userId,
        title: album.title,
        description: album.description,
        createdAt: album.createdAt,
        updatedAt: album.updatedAt,
        previewImage: album.previewImage,
        Artist: {
          id: album.User.id,
          username: album.User.username,
          previewImage: album.User.previewImage,
        },
        Songs: [],
      };
      album.Songs.forEach((songObj, i) => {
        mappedAlbum.Songs[i] = ({
            id: songObj.id,
            userId: songObj.userId,
            albumId: songObj.albumId,
            title: songObj.title,
            description: songObj.description,
            url: songObj.soundFileURL,
            createdAt: songObj.createdAt,
            updatedAt: songObj.updatedAt,
            previewImage: songObj.previewImage,
          })
      });
      res.json(mappedAlbum);
    } else {
        const err = new Error("Album couldn't be found");
        err.status = 404;
        next(err)
    }
  })
);

module.exports = router;