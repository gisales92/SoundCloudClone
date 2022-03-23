const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song, User, Album, Comment } = require("../../db/models");

const router = express.Router();

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
}))

module.exports = router;