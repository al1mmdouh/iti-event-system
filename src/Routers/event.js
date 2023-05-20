const { Router } = require("express");

const { validate } = require("../Middlewares/validation");

const {
  getAllEvents,
  getEventByID,
  addEvent,
  editEvent,
  deleteEvent,
} = require("../Controllers/event");

const {
  eventValidationRules,
  eventUpdateValidationRules,
} = require("../Models/event");

const { authenticate, checkRole } = require("../Middlewares/authentication");

const eventRoute = Router();

eventRoute
  .route("/events")
  .get(getAllEvents)
  .post(
    authenticate,
    checkRole(["admin"]),
    validate(eventValidationRules),
    addEvent
  );

eventRoute
  .route("/events/:id")
  .get(getEventByID)
  .put(
    authenticate,
    checkRole(["admin"]),
    validate(eventUpdateValidationRules),
    editEvent
  )
  .delete(authenticate, checkRole(["admin"]), deleteEvent);

module.exports = eventRoute;
