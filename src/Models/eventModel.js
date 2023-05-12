const mongoose = require("mongoose");

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
      type: String,
      trim: true,
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

module.exports = Event;
