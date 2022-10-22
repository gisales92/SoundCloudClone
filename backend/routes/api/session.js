const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateLogin = [
  check("email") // can check credential to check both email and username
    .exists({ checkFalsy: true })
    .withMessage("A valid email is required")
    .notEmpty()
    .withMessage("A valid email is required")
    .isEmail()
    .withMessage("A valid email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

// Log in
router.post(
  "/",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      next(err);
      return err;
    }

    const token = await setTokenCookie(res, user);
    user.token = token;

    return res.json(user);
  })
);

// Restore session user
router.get("/", requireAuth, (req, res, next) => {
  const { user } = req;
  if (user) {
    user.token = req.cookies.token;
    return res.json(user);
  } else {
    next();
    // res.status(401);
    // return res.json({});
  }
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
