const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => {
      if (!errors[`${error.param}`]) {
        errors[`${error.param}`] = error.msg;
      }
    });

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateSong = [
  check("title") // can check credential to check both email and username
    .exists({ checkFalsy: true })
    .withMessage("Song title is required")
    .notEmpty()
    .withMessage("Song title is required"),
  check("url")
    .exists({ checkFalsy: true })
    .withMessage("Audio is required"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors, validateSong
};
