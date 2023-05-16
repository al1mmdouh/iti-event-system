const { Router } = require("express");

const {
  eventValidationRules,
  validateEvent,
  eventUpdateValidationRules,
} = require("./../Middlewares/eventValidation");

const {
  getAllEvents,
  getEventByID,
  addEvent,
  editEvent,
  deleteEvent,
} = require("./../Controllers/eventController");

const { authenticate, checkRole } = require("./../Middlewares/authentication");

const eventRoute = Router();

eventRoute
  .route("/events")
  .get(getAllEvents)
  .post(
    authenticate,
    checkRole(["admin"]),
    eventValidationRules(),
    validateEvent,
    addEvent
  );

eventRoute
  .route("/events/:id")
  .get(getEventByID)
  .put(
    authenticate,
    checkRole(["admin"]),
    eventUpdateValidationRules(),
    validateEvent,
    editEvent
  )
  .delete(authenticate, checkRole(["admin"]), deleteEvent);

module.exports = eventRoute;
