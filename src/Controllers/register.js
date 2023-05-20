const express = require("express");

const Role = require("../Models/role");
const User = require("../Models/user");

const registerStudent = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existing = await User.findOne({ email }); //projection

    if (existing) {
      return res.status(400).json({
        status: "fail",
        message: "Email already registered",
      });
    }

    const studentRole = await Role.findOne({ role: "student" });

    const newStudent = await User.create({
      ...req.body,
      role: studentRole._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerStudent;
