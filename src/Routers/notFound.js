const { Router } = require("express");

const notFount = Router();

notFount.route("/*").all((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = notFount;
