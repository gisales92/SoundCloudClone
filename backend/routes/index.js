const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
const asyncHandler = require("express-async-handler");
const db = require("../db/models")

router.use("/api", apiRouter);

router.get("/", function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("Hello World! I have not created a homepage yet.");
});

// router.get("/test", asyncHandler(async (req, res) => {
//   const playlistTracks = await db.Playlist.findAll({
//     where: {id: 1},
//     include: db.Song
//   });
//   res.json({playlistTracks})
// }))
module.exports = router;