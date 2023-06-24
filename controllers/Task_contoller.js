const express = require('express');
const router = express.Router();
const TaskSchema = require('../models/Task_model');

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskSchema.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await TaskSchema.findById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Create a new task
router.post('/tasks', async (req, res) => {
  const task = new TaskSchema({
    Task_description: req.body.Task_description,
    Task_completed: req.body.Task_completed
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await TaskSchema.findById(req.params.id);
    if (req.body.Task_description) {
      task.Task_description = req.body.Task_description;
    }
    if (req.body.Task_completed !== undefined) {
      task.Task_completed = req.body.Task_completed;
    }
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await TaskSchema.findByIdAndDelete(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
