const { Router } = require("express");
const {
    userValidationRules,
    validateUser,
    userUpdateValidationRules,
    validateUpdateUser,
} = require("../Middlewares/userValidation");

const {
    createSpeaker,
    getAllSpeakers,
    getSpeakerById,
    updateSpeaker,
    deleteSpeaker,
} = require("../Controllers/speakerController");

const authenticate = require("./../Middlewares/authentication");

const speakerRoute = Router();

speakerRoute
    .route("/speakers")
    .get(authenticate, getAllSpeakers) //get all speakers --> all users
    .post(userValidationRules(), validateUser, createSpeaker); //add new speaker --> admin only

speakerRoute
    .route("/speakers/:id")
    .get(getSpeakerById) //get speaker by id
    .put(userUpdateValidationRules(), validateUpdateUser, updateSpeaker) //update speaker user data --> admins or speaker itself; //get speaker by id --> all users
    .delete(deleteSpeaker); //delete specified speaker --> admin only

module.exports = speakerRoute;