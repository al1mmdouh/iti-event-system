const Event = require("../Models/eventModel");

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    if (!events) {
      return res.status(404).json({
        status: "fail",
        message: "Events not found",
      });
    }
    res.status(200).json({
      status: "success",
      result: events.length,
      data: {
        events,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getEventByID = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addEvent = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
