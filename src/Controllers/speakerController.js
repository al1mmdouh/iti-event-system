const Speaker = require("./../Models/speakerModel");

const createSpeaker = async (req, res, next) => {
  try {
    const newSpeaker = await Speaker.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        speaker: newSpeaker,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllSpeakers = async (req, res, next) => {
  try {
    const speakers = await Speaker.find();
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
