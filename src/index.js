const express = require("express");
const mongoose = require("mongoose");
const notFound = require("./Routers/notFound");
const error = require("./Middlewares/error");
const speakerRoute = require("./Routers/speakerRoute");
const loginRoute = require("./Routers/login");

const app = express();

app.use(express.json());

//login route
app.use(loginRoute);

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

    app.listen(5000, () => {
      console.log("Server started at port 5000");
    });
  })
  .catch((err) => console.log("DB Connection Error." + err));
