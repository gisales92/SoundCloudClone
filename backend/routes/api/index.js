const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const songsRouter = require("./songs");
const albumRouter = require("./albums");
const commentRouter = require("./comments");
const myRouter = require("./my");
const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/songs", songsRouter);

router.use("/albums", albumRouter);

router.use("/comments", commentRouter);

router.use("/my", myRouter);

module.exports = router;
