const express = require("express");
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { Song, User, Playlist, Playlist_Song } = require("../../db/models");
const {
  handleValidationErrors,
  validatePlaylist,
} = require("../../utils/validation");
const router = express.Router();

// get playlist details
router.get("/:playlistId",
asyncHandler(async (req, res, next) => {
    const playlist = await Playlist.findByPk(req.params.playlistId, {
        include: [Song],
    });
    if (playlist) {
        const mappedPlaylist = {
            id: playlist.id,
            userId: playlist.userId,
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
    }  else {
      const err = new Error("Playlist couldn't be found");
      err.status = 404;
      return next(err);
    }
}))

// create a playlist
router.post(
  "/",
  requireAuth,
  validatePlaylist,
  asyncHandler(async (req, res, next) => {
    const { name, imageUrl } = req.body;
    const playlist = await Playlist.create({
      userId: req.user.id,
      name,
      previewImage: imageUrl,
    });
    res.status(201);
    return res.json(playlist);
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
           const newPlaylistSong = await Playlist_Song.create({playlistId: playlist.id, songId});
           const addedEntry = await Playlist_Song.findAll({
              attributes: ["id"],
              order: [["id", "DESC"]],
              limit: 1
          });
           const returnObj = {
               id: addedEntry[0].id,
               playlistId: newPlaylistSong.playlistId,
               songId: newPlaylistSong.songId,
            }
           res.status(200);
           return res.json(returnObj);
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
    validatePlaylist,
    asyncHandler(async (req, res, next) => {
      const playlistId = req.params.playlistId;
      const userId = req.user.id;
      const playlist = await Playlist.findByPk(playlistId);
      if (playlist) {
        if (playlist.userId === userId) {
          const { name, imageUrl } = req.body;
          await playlist.update({
            name,
            previewImage: imageUrl,
          });
          const updatedPlaylist = {
            id: playlist.id,
            userId: playlist.userId,
            name: playlist.name,
            createdAt: playlist.createdAt,
            updatedAt: playlist.updatedAt,
            previewImage: playlist.previewImage,
          };
          res.status(200);
          return res.json(updatedPlaylist);
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

module.exports = router;
