const { Router } = require("express");
const {
  speakerValidationRules,
  validateSpeaker,
  speakerUpdateValidationRules,
  validateUpdateSpeaker,
} = require("../Middlewares/speakerValidation");

const {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
} = require("../Controllers/speakerController");

const speakerRoute = Router();

speakerRoute
  .route("/speakers")
  .get(getAllSpeakers) //get all speakers --> all users
  .post(speakerValidationRules(), validateSpeaker, createSpeaker) //add new speaker --> admin only
  .delete(deleteSpeaker); //delete specified speaker --> admin only

speakerRoute
  .route("/speakers/:id")
  .get(getSpeakerById) //get speaker by id
  .put(speakerUpdateValidationRules(), validateUpdateSpeaker, updateSpeaker); //update speaker user data --> admins or speaker itself; //get speaker by id --> all users

module.exports = speakerRoute;
