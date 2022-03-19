const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const songsRouter = require("./songs");
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

router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user)
})

module.exports = router;
