const { Router } = require("express");

const notFount = Router();

notFount.route("/*").all((_req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not Found",
  });
});

module.exports = notFount;
