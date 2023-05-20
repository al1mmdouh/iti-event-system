const { User: Speaker } = require("../Models/user");
const Role = require("../Models/role");

const createSpeaker = async (req, res, next) => {
  try {
    const speakerRole = await Role.findOne({ role: "speaker" });

    const newSpeaker = await Speaker.create({
      ...req.body,
      role: speakerRole._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        speaker: newSpeaker,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Only records with speaker role retrieved
const getAllSpeakers = async (_req, res, next) => {
  try {
    const role = await Role.findOne({ role: "speaker" });
    if (!role) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid role",
      });
    }
    const speakers = await Speaker.find({ role: role._id }).exec();
    res.status(200).json({
      status: "success",
      result: speakers.length,
      data: {
        speakers,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSpeakerById = async (req, res, next) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker) {
      return res.status(404).json({
        status: "fail",
        message: "Speaker not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        speaker,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSpeaker = async (req, res, next) => {
  try {
    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!speaker) {
      return res.status(404).json({
        status: "fail",
        message: "Speaker not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        speaker,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteSpeaker = async (req, res, next) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker) {
      return res.status(404).json({
        status: "fail",
        message: "Speaker not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
};
