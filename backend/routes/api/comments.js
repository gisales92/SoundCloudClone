const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Song, User, Album, Comment } = require("../../db/models");
const {
  handleValidationErrors,
  validateSong,
  validateComment,
} = require("../../utils/validation");
const router = express.Router();

// Edit a comment
router.put(
  "/:commentId",
  requireAuth,
  validateComment,
  asyncHandler(async (req, res, next) => {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const comment = await Comment.findByPk(commentId);
    if (comment) {
      if (comment.userId === userId) {
        const { body } = req.body;
        await comment.update({
          body,
        });
        res.status(200);
        return res.json(comment);
      } else {
        res.status(403);
        return res.json({ message: "Forbidden", statusCode: 403 });
      }
    } else {
      const err = new Error("Comment couldn't be found");
      err.status = 404;
      next(err);
    }
  })
);

// Delete a comment
router.delete(
    "/:commentId",
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const commentId = req.params.commentId;
      const userId = req.user.id;
      const comment = await Comment.findByPk(commentId);
      if (comment) {
        if (comment.userId === userId) {
            await comment.destroy();
            res.status(200);
            return res.json({ message: "Successfully deleted", statusCode: 200 });
        } else {
          res.status(403);
          return res.json({ message: "Forbidden", statusCode: 403 });
        }
      } else {
        const err = new Error("Comment couldn't be found");
        err.status = 404;
        next(err);
      }
    })
  );

module.exports = router;
