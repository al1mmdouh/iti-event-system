const { body, validationResult, check } = require("express-validator");

const speakerValidationRules = () => {
  return [
    body("fullname").isString().withMessage("Full name must be a string"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),

    body("email").isEmail().withMessage("Invalid email address"),
  ];
};

const validateSpeaker = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

const speakerUpdateValidationRules = () => {
  return [
    check("fullname")
      .optional()
      .isString()
      .withMessage("Full name must be a string"),
    check("email").optional().isEmail().withMessage("Invalid email address"),
    check("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),
  ];
};
const validateUpdateSpeaker = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  speakerValidationRules,
  validateSpeaker,
  speakerUpdateValidationRules,
  validateUpdateSpeaker,
};
