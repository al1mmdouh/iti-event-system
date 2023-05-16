const express = require("express");
const mongoose = require("mongoose");
const notFound = require("./Routers/notFound");
const error = require("./Middlewares/error");
const speakerRoute = require("./Routers/speakerRoute");
const studentRoute = require("./Routers/studentRoute");
const morgan = require("morgan");
// const createRole = require("./Controllers/roleController")
// createRole()
// require('./Controllers/addAdmin');
const loginRoute = require("./Routers/login");
const registerRoute = require("./Routers/register");
const eventRoute = require("./Routers/eventRoute");
const accessLogStream = require("./Middlewares/morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev", { stream: accessLogStream }));

//register route
app.use(registerRoute);

//login route
app.use(loginRoute);

//event route
app.use(eventRoute);

//student route
app.use(studentRoute);

//speakers route
app.use(speakerRoute);

// not found
app.use(notFound);

// error MW
app.use(error);

mongoose
  .connect("mongodb://127.0.0.1:27017/eventSystem")
  .then(() => {
    console.log("DB Connected");

    app.listen(process.env.PORT, () => {
      console.log("Server started at port 5000");
    });
  })
  .catch((err) => console.log("DB Connection Error." + err));
