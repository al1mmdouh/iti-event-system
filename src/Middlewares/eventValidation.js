const { body, validationResult, check } = require("express-validator");
const User = require("../Models/userModel");

const eventValidationRules = () => {
  return [
    body("title").isString().withMessage("Event title must be a string"),

    body("eventDate").isDate().withMessage("Date."),

    body("mainSpeaker")
      .trim()
      .notEmpty()
      .withMessage("Main speaker is required"),
    body("speakers").custom(async (value) => {
      const speakerIds = value.map((speakerId) =>
        mongoose.Types.ObjectId(speakerId)
      );
      const speakers = await User.find({
        _id: { $in: speakerIds },
        role: "speaker",
      });
      if (speakers.length !== value.length) {
        throw new Error("Invalid speakers");
      }
      return true;
    }),
    body("students").custom(async (value) => {
      const studentIds = value.map((studentId) =>
        mongoose.Types.ObjectId(studentId)
      );
      const students = await User.find({
        _id: { $in: studentIds },
        role: "student",
      });
      if (students.length !== value.length) {
        throw new Error("Invalid students");
      }
      return true;
    }),
  ];
};

const eventUpdateValidationRules = () => {
  return [
    check("title")
      .optional()
      .isString()
      .withMessage("Event title must be a string"),

    check("eventDate")
      .optional()
      .isDate()
      .withMessage("Password must be at least 8 characters."),

    check("mainSpeaker")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Main speaker is required"),
    check("speakers")
      .optional()
      .custom(async (value) => {
        const speakerIds = value.map((speakerId) =>
          mongoose.Types.ObjectId(speakerId)
        );
        const speakers = await User.find({
          _id: { $in: speakerIds },
          role: "speaker",
        });
        if (speakers.length !== value.length) {
          throw new Error("Invalid speakers");
        }
        return true;
      }),
    check("students")
      .optional()
      .custom(async (value) => {
        const studentIds = value.map((studentId) =>
          mongoose.Types.ObjectId(studentId)
        );
        const students = await User.find({
          _id: { $in: studentIds },
          role: "student",
        });
        if (students.length !== value.length) {
          throw new Error("Invalid students");
        }
        return true;
      }),
  ];
};

const validateEvent = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    status: "fail",
    errors: extractedErrors,
  });
};

module.exports = {
  eventValidationRules,
  validateEvent,
  eventUpdateValidationRules,
};
