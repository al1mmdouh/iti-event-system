const { Router } = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../Controllers/student");

const {
  userCreateValidationRules,
  userUpdateValidationRules,
} = require("../Models/user");

const { validate } = require("../Middlewares/validation");

const { authenticate, checkRole } = require("../Middlewares/authentication"); // paths alias import

const studentRoute = Router();

studentRoute
  .route("/students")
  .get(getAllStudents) //get all speakers --> all users
  .post(
    authenticate,
    checkRole(["student", "admin"]),
    validate(userCreateValidationRules),
    createStudent
  ); //add new speaker --> admin only

studentRoute
  .route("/students/:id")
  .get(getStudentById) //get speaker by id
  .put(
    authenticate,
    checkRole(["student", "admin"]), //req.userId
    validate(userUpdateValidationRules),
    updateStudent
  ) //update speaker user data --> admins or speaker itself; //get speaker by id --> all users
  .delete(authenticate, checkRole(["admin"]), deleteStudent); //delete specified speaker --> admin only

module.exports = studentRoute;
