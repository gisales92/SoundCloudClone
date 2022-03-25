const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song, User, Album, Comment } = require("../../db/models");
const {
  handleValidationErrors,
  validateSong,
  validateComment
} = require("../../utils/validation");
const router = express.Router();

// get all songs
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

// get song details
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
      next(err);
    }
  })
);

// edit a song
router.put(
  "/:songId",
  requireAuth,
  validateSong,
  asyncHandler(async (req, res, next) => {
    const songId = req.params.songId;
    const userId = req.user.id;
    const song = await Song.findByPk(songId);
    if (song) {
      if (song.userId === userId) {
        const { title, description, url, imageUrl } = req.body;
        await song.update({
          title,
          description,
          soundFileURL: url,
          previewImage: imageUrl,
        });
        const updatedSong = {
          id: song.id,
          userId: song.userId,
          albumId: song.albumId,
          title: song.title,
          description: song.description,
          url: song.soundFileURL,
          createdAt: song.createdAt,
          updatedAt: song.updatedAt,
          previewImage: song.previewImage,
        };
        return res.json(updatedSong);
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      res.status(404);
      return res.json({ message: "Song couldn't be found", statusCode: 404 });
    }
  })
);

// delete a song
router.delete(
  "/:songId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const songId = req.params.songId;
    const userId = req.user.id;
    const song = await Song.findByPk(songId);
    if (song) {
      if (song.userId === userId) {
        await song.destroy();
        res.status(200);
        return res.json({ message: "Successfully deleted", statusCode: 200 });
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      res.status(404);
      return res.json({ message: "Song couldn't be found", statusCode: 404 });
    }
  })
);

// Get all comments to a song
router.get(
  "/:songId/comments",
  asyncHandler(async (req, res, next) => {
    const song = await Song.findByPk(req.params.songId, {
      include: [
        {model: Comment,
          include: [User]},
      ],
    });
    if (song) {
      const Comments = song.Comments.map((commentObj, i) => ({
        id: commentObj.id,
        userId: commentObj.userId,
        songId: song.userId,
        body: commentObj.body,
        createdAt: commentObj.createdAt,
        updatedAt: commentObj.updatedAt,
        User: {
           id: commentObj.User.id,
           username: commentObj.User.username
        },
      }));
      res.status(200);
      return res.json({Comments});
    } else {
      const err = new Error("Song couldn't be found");
      err.status = 404;
      next(err);
    }
  })
);

// Create a comment for a song
router.post("/:songId/comments",
requireAuth,
validateComment,
asyncHandler(async (req, res, next) => {
  const song = await Song.findByPk(req.params.songId);
  if (song) {
    const {body} = req.body;
    const comment = await Comment.create({userId: req.user.id, songId: song.id, body});
    res.status(200);
    res.json(comment);
  } else {
    const err = new Error("Song couldn't be found");
      err.status = 404;
      next(err);
  }
}))

module.exports = router;
