const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  singleMulterUpload,
  singlePublicFileUpload,
} = require("../../coudinary");
const { requireAuth } = require("../../utils/auth");
const { Song, User, Playlist, Playlist_Song } = require("../../db/models");
const {
  handleValidationErrors,
  validatePlaylist,
} = require("../../utils/validation");
const router = express.Router();

// get playlist details
router.get(
  "/:playlistId",
  asyncHandler(async (req, res, next) => {
    const playlist = await Playlist.findByPk(req.params.playlistId, {
      include: [
        {
          model: Song,
          include: [User],
        },
        User,
      ],
    });
    if (playlist) {
      const mappedPlaylist = {
        id: playlist.id,
        userId: playlist.userId,
        artist: playlist.User.username,
        name: playlist.name,
        createdAt: playlist.createdAt,
        updatedAt: playlist.updatedAt,
        previewImage: playlist.previewImage,
        Songs: [],
      };
      playlist.Songs.forEach((songObj, i) => {
        mappedPlaylist.Songs[i] = {
          id: songObj.id,
          userId: songObj.userId,
          artist: songObj.User.username,
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
      return res.json(mappedPlaylist);
    } else {
      const err = new Error("Playlist couldn't be found");
      err.status = 404;
      return next(err);
    }
  })
);

// create a playlist
router.post(
  "/",
  requireAuth,
  singleMulterUpload("image"),
  validatePlaylist,
  asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    try {
      let image;
      req.file ? (image = await singlePublicFileUpload(req.file)) : null;
      const playlist = await Playlist.create({
        userId: req.user.id,
        name,
        previewImage: image?.url || null,
      });
      res.status(201);
      return res.json(playlist);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// add a song to a playlist
router.post(
  "/:playlistId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const playlist = await Playlist.findByPk(req.params.playlistId);
    if (playlist) {
      if (playlist.userId === userId) {
        const { songId } = req.body;
        const song = await Song.findByPk(songId);
        if (song) {
          const prevAdded = await Playlist_Song.findOne({
            where: { playlistId: playlist.id, songId: song.id },
          });
          if (prevAdded) {
            res.status(200);
            return res.json(prevAdded);
          } else {
            const newPlaylistSong = await Playlist_Song.create({
              playlistId: playlist.id,
              songId,
            });

            res.status(200);
            return res.json(newPlaylistSong);
          }
        } else {
          const err = new Error("Song couldn't be found");
          err.status = 404;
          return next(err);
        }
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      const err = new Error("Playlist couldn't be found");
      err.status = 404;
      return next(err);
    }
  })
);

// edit a playlist
router.put(
  "/:playlistId",
  requireAuth,
  singleMulterUpload("image"),
  validatePlaylist,
  asyncHandler(async (req, res, next) => {
    const playlistId = req.params.playlistId;
    const userId = req.user.id;
    const playlist = await Playlist.findByPk(playlistId);
    if (playlist) {
      if (playlist.userId === userId) {
        const { name } = req.body;

        try {
          let image;
          req.file ? (image = await singlePublicFileUpload(req.file)) : null;
          if (image) {
            await playlist.update({
              name,
              previewImage: image.url,
            });
          } else {
            await playlist.update({
              name,
            });
          }

          const updatedPlaylist = {
            id: await playlist.id,
            userId: await playlist.userId,
            name: await playlist.name,
            createdAt: await playlist.createdAt,
            updatedAt: await playlist.updatedAt,
            previewImage: await playlist.previewImage,
          };

          res.status(200);
          return res.json(updatedPlaylist);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      const err = new Error("Playlist couldn't be found");
      err.status = 404;
      return next(err);
    }
  })
);

// delete a playlist
router.delete(
  "/:playlistId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const playlistId = req.params.playlistId;
    const userId = req.user.id;
    const playlist = await Playlist.findByPk(playlistId);
    if (playlist) {
      if (playlist.userId === userId) {
        await playlist.destroy();
        res.status(200);
        return res.json({ message: "Successfully deleted", statusCode: 200 });
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      const err = new Error("Playlist couldn't be found");
      err.status = 404;
      return next(err);
    }
  })
);

// remove song from a playlist
router.put(
  "/:playlistId/songs",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // console.log("HERRO")
    // return res.json({message: "HI"})
    const userId = req.user.id;
    const playlist = await Playlist.findByPk(req.params.playlistId);
    if (playlist) {
      if (playlist.userId === userId) {
        const { songId } = req.body;
        const song = await Song.findByPk(songId);
        if (song) {
          const prevAdded = await Playlist_Song.findAll({
            where: { playlistId: playlist.id, songId: song.id },
          });
          if (prevAdded.length) {
            prevAdded.forEach(async (record) => {
              await record.destroy();
            });
            res.status(200);
            return res.json({
              message: "Successfully deleted",
              statusCode: 200,
            });
          }
        } else {
          const err = new Error("Song couldn't be found");
          err.status = 404;
          return next(err);
        }
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      const err = new Error("Playlist couldn't be found");
      err.status = 404;
      return next(err);
    }
  })
);

module.exports = router;
