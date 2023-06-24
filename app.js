const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const url = "mongodb://localhost:27017/TODO_LIST";
const Task_controller = require("../Done/controllers/Task_controller");

const app = express();

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("Wooo...Hooo...Connected to database");
  } else {
    console.log("Error in connecting to database " + err);
  }
});

const con = mongoose.connection;

app.use(express.json());
app.use("/", Task_controller);

con.on("open", () => {
  console.log("Connected to MongoDB");

  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, "public")));

  // Catch-all route to serve the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // Start the server
  app.listen(5050, () => {
    console.log("Server is up and running on http://localhost:5050");
  });
});
