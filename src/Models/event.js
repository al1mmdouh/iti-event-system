const mongoose = require("mongoose");
const { body, check } = require("express-validator");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  mainSpeaker: {
    type: String,
    required: true,
    trim: true,
  },
  speakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speaker",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

const eventValidationRules = [
  body("title").isString().withMessage("Event title must be a string"),

  body("eventDate").isDate().withMessage("Date."),

  body("mainSpeaker").trim().notEmpty().withMessage("Main speaker is required"),
  body("speakers").custom(async (value) => {
    await User.validateIdsRole(value, "speaker");
  }),
  body("students").custom(async (value) => {
    await User.validateIdsRole(value, "student");
  }),
];

const eventUpdateValidationRules = [
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
      await User.validateIdsRole(value, "speaker");
    }),
  check("students")
    .optional()
    .custom(async (value) => {
      await User.validateIdsRole(value, "student");
    }),
];

module.exports = { Event, eventValidationRules, eventUpdateValidationRules };
