const fs = require("fs");
const path = require("path");

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "as",
  encoding: "utf-8",
  
});

module.exports = accessLogStream;
