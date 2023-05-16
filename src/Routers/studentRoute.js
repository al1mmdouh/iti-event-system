const { Router } = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../Controllers/studentController");

const {
  userValidationRules,
  validateUser,
  userUpdateValidationRules,
} = require("../Middlewares/userValidation");

const { authenticate, checkRole } = require("./../Middlewares/authentication");

const studentRoute = Router();

studentRoute
  .route("/students")
  .get(getAllStudents) //get all speakers --> all users
  .post(
    authenticate,
    checkRole(["student", "admin"]),
    userValidationRules,
    validateUser,
    createStudent
  ); //add new speaker --> admin only

studentRoute
  .route("/students/:id")
  .get(getStudentById) //get speaker by id
  .put(
    authenticate,
    checkRole(["student", "admin"]),//req.userId
    userUpdateValidationRules,
    validateUser,
    updateStudent
  ) //update speaker user data --> admins or speaker itself; //get speaker by id --> all users
  .delete(authenticate, checkRole(["admin"]), deleteStudent); //delete specified speaker --> admin only

module.exports = studentRoute;
