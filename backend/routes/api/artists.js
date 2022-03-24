const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song, User, Album, Comment } = require("../../db/models");

const router = express.Router();

// Get artist details
router.get("/:artistId",
asyncHandler(async (req, res, next) => {
    const artist = await User.findByPk(req.params.artistId, {
        include: [Song, Album]
    });
    if (artist) {
        const mappedArtist = {
            id: artist.id,
            username: artist.username,
            totalSongs: artist.Songs.length,
            totalAlbums: artist.Albums.length,
            previewImage: artist.previewImage,
        }
        return res.json(mappedArtist);
    } else {
        const err = new Error("Artist couldn't be found");
        err.status = 404;
        next(err);
    }
}));

//Get all songs by an artist
router.get("/:artistId/songs",
asyncHandler(async (req, res, next) => {
    const artist = await User.findByPk(req.params.artistId, {
        include: [Song]
    });
    if (artist) {
        const songs = artist.Songs.map((songObj) => (
            {
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
        )
        res.status(200);
        return res.json({Songs: songs});
    } else {
        const err = new Error("Artist couldn't be found");
        err.status = 404;
        next(err);
    }
}))

//Get all albums by an artist
router.get("/:artistId/albums",
asyncHandler(async (req, res, next) => {
    const artist = await User.findByPk(req.params.artistId, {
        include: [Album]
    });
    if (artist) {
        const albums = artist.Albums.map((albumObj) => (
            {
                id: albumObj.id,
                userId: albumObj.userId,
                title: albumObj.title,
                description: albumObj.description,
                createdAt: albumObj.createdAt,
                updatedAt: albumObj.updatedAt,
                previewImage: albumObj.previewImage,
            })
        )
        res.status(200);
        return res.json({Albums: albums});
    } else {
        const err = new Error("Artist couldn't be found");
        err.status = 404;
        next(err);
    }
}))

module.exports = router;