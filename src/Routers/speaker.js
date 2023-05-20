const { Router } = require("express");
const { validate } = require("../Middlewares/validation");

const {
  userCreateValidationRules,
  userUpdateValidationRules,
} = require("../Models/user");

const {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
} = require("../Controllers/speaker");

const { authenticate, checkRole } = require("../Middlewares/authentication");

const speakerRoute = Router();

speakerRoute
  .route("/speakers")
  .get(getAllSpeakers) //get all speakers --> all users
  .post(
    authenticate,
    checkRole(["admin"]),
    validate(userCreateValidationRules),
    createSpeaker
  ); //add new speaker --> admin only

speakerRoute
  .route("/speakers/:id")
  .get(getSpeakerById) //get speaker by id
  .put(
    authenticate,
    checkRole(["admin", "speaker"]),
    validate(userUpdateValidationRules),
    updateSpeaker
  ) //update speaker user data --> admins or speaker itself; //get speaker by id --> all users
  .delete(authenticate, checkRole(["admin"]), deleteSpeaker); //delete specified speaker --> admin only

module.exports = speakerRoute;
