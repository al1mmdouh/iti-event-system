const Student = require("../Models/userModel");
const Role = require("../Models/roleModel");

const createStudent = async (req, res, next) => {
  try {
    const studentRole = await Role.findOne({ role: "student" });
    const newStudent = await Student.create({
      ...req.body,
      role: studentRole._id,
    });

    console.log(newStudent);
    res.status(200).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (_req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      status: "success",
      result: students.length,
      data: {
        students,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "Student not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "Speaker not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "Speaker not Found",
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
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};