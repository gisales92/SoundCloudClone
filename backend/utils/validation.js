const { validationResult, check, query, } = require("express-validator");

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
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Song title is required")
    .notEmpty()
    .withMessage("Song title is required"),
  check("url")
    .exists({ checkFalsy: true })
    .withMessage("Audio is required"),
  handleValidationErrors,
];

const validateAlbum = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required")
    .notEmpty()
    .withMessage("Album title is required"),
  handleValidationErrors,
];


const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Comment body text is required")
    .notEmpty()
    .withMessage("Comment body text is required"),
  handleValidationErrors,
];

const validatePlaylist = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Playlist name is required")
    .notEmpty()
    .withMessage("Playlist name is required"),
  handleValidationErrors,
];

const validateQuery = [
  check("page")
    .optional()
    .isInt({gt: -1})
    .withMessage("Page must be greater than or equal to 0")
    .isInt({lt: 11})
    .withMessage("Page must be less than or equal to 10"),
  check("size")
    .optional()
    .isInt({gt: -1})
    .withMessage("Size must be greater than or equal to 0")
    .isInt({lt: 21})
    .withMessage("Size must be less than or equal to 20"),
  check("createdAt")
    .optional()
    .isISO8601()
    .custom(value => {
      const formattedDate = new Date(value);
      let today = new Date();
      return (formattedDate<today);
    })
    .withMessage("CreatedAt is invalid"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors, validateSong, validateAlbum, validateComment, validatePlaylist, validateQuery
};
