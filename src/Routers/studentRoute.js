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
  validateUpdateUser,
} = require("../Middlewares/userValidation");

const studentRoute = Router();

studentRoute
  .route("/students")
  .get(getAllStudents) //get all speakers --> all users
  .post(userValidationRules(), validateUser, createStudent); //add new speaker --> admin only

studentRoute
  .route("/students/:id")
  .get(getStudentById) //get speaker by id
  .put(userUpdateValidationRules(), validateUpdateUser, updateStudent) //update speaker user data --> admins or speaker itself; //get speaker by id --> all users
  .delete(deleteStudent); //delete specified speaker --> admin only

module.exports = studentRoute;