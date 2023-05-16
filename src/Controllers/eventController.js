const Event = require("../Models/eventModel");

const getAllEvents = async (_req, res, next) => {
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
    const newEvent = await Event.create({
      ...req.body,
    });
    res.status(201).json({
      status: "success",
      data: {
        event: newEvent,
      },
    });
  } catch (error) {
    next(error);
  }
};

const editEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Event not Found",
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Event not Found",
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
  getAllEvents,
  getEventByID,
  addEvent,
  editEvent,
  deleteEvent,
};
