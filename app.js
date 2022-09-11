const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/TODO_LIST";
const Task_controller = require("../CRUD_Using_Nodejs/controllers/Task_contoller.js");

const app = express();

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log("Error in connecting to database " + err);
  }
});

const con = mongoose.connection;

app.use(express.json());
app.use("/", Task_controller);

con.on("open", () => {
  console.log("Woo...hoooo....wooooho..ho.ho");
});
app.listen(5050, () => {
  console.log("Server is up and walking....");
});
