const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
  Task_description: {
    type: String,
    required: true
  },
  Task_completed: {
    type: Boolean,
    required: true,
    default: false
  },
});

module.exports = mongoose.model("Task", TaskSchema);
