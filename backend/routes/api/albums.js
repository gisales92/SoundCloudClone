const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song, User, Album } = require("../../db/models");
const {
  handleValidationErrors,
  validateSong,
  validateAlbum,
} = require("../../utils/validation");
const {
  singleMulterUpload,
  singlePublicFileUpload,
} = require("../../coudinary");

const router = express.Router();

// Get all albums
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

// Get album details
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
        mappedAlbum.Songs[i] = {
          id: songObj.id,
          userId: songObj.userId,
          albumId: songObj.albumId,
          title: songObj.title,
          description: songObj.description,
          url: songObj.soundFileURL,
          createdAt: songObj.createdAt,
          updatedAt: songObj.updatedAt,
          previewImage: songObj.previewImage,
        };
      });
      res.status(200);
      return res.json(mappedAlbum);
    } else {
      const err = new Error("Album couldn't be found");
      err.status = 404;
      next(err);
    }
  })
);

// create an album
router.post(
  "/",
  requireAuth,
  singleMulterUpload("image"),
  validateAlbum,
  asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    try {
      let coverImage;
      req.file ? (coverImage = await singlePublicFileUpload(req.file)) : null;
      const newAlbum = await Album.create({
        userId: req.user.id,
        title,
        description,
        previewImage: coverImage?.url || null,
      });
      res.status(201);
      return res.json(newAlbum);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// edit an album
router.put(
  "/:albumId",
  requireAuth,
  validateAlbum,
  asyncHandler(async (req, res, next) => {
    const albumId = req.params.albumId;
    const userId = req.user.id;
    const album = await Album.findByPk(albumId);
    if (album) {
      if (album.userId === userId) {
        const { title, description, imageUrl } = req.body;
        await album.update({
          title,
          description,
          previewImage: imageUrl,
        });
        const updatedAlbum = {
          id: album.id,
          userId: album.userId,
          title: album.title,
          description: album.description,
          createdAt: album.createdAt,
          updatedAt: album.updatedAt,
          previewImage: album.previewImage,
        };
        res.status(200);
        return res.json(updatedAlbum);
      } else {
        res.status(403);
        res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      res.status(404);
      return res.json({ message: "Album couldn't be found", statusCode: 404 });
    }
  })
);

// delete an album
router.delete(
  "/:albumId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const albumId = req.params.albumId;
    const userId = req.user.id;
    const album = await Album.findByPk(albumId);
    if (album) {
      if (album.userId === userId) {
        await album.destroy();
        res.status(200);
        return res.json({ message: "Successfully deleted", statusCode: 200 });
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      res.status(404);
      return res.json({ message: "Album couldn't be found", statusCode: 404 });
    }
  })
);

// create a song for a specified album
router.post(
  "/:albumId",
  requireAuth,
  validateSong,
  asyncHandler(async (req, res, next) => {
    const { title, description, url, imageUrl } = req.body;
    const albumId = req.params.albumId;
    const newSong = await Song.create({
      userId: req.user.id,
      albumId,
      title,
      description,
      soundFileURL: url,
      previewImage: imageUrl,
    });
    const mappedSong = {
      id: newSong.id,
      userId: newSong.userId,
      albumId: newSong.albumId,
      title: newSong.title,
      description: newSong.description,
      url: newSong.soundFileURL,
      createdAt: newSong.createdAt,
      updatedAt: newSong.updatedAt,
    };
    res.json(mappedSong);
  })
);

module.exports = router;
