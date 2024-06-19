import Task from "../models/taskModel.js";
import asyncHandler from "express-async-handler";

const errorHandler = (res, status, message) => {
  res.status(status).json({ error: message });
};


export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  if (!title || !description || !dueDate || !priority) {
    return errorHandler(res, 400, "Title, description, due date, and priority are required fields.");
  }

  const newTask = new Task({
    title,
    description,
    dueDate,
    priority,
    user: req.user.id,
  });
  
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
});

// Get a task by ID
export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id, user: req.user._id });

  if (!task) {
    return errorHandler(res, 404, "Task not found.");
  }

  res.status(200).json(task);
});

// Get all tasks for a user
export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(tasks);
  });

// Update a task by ID
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;

  if (!title || !description || !dueDate || !priority) {
    return errorHandler(res, 400, "Title, description, due date, and priority are required fields.");
  }

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { title, description, dueDate, priority, status },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    return errorHandler(res, 404, "Task not found or user not authorized.");
  }

  res.status(200).json(updatedTask);
});

// Delete a task by ID
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user._id });

  if (!deletedTask) {
    return errorHandler(res, 404, "Task not found or user not authorized.");
  }

  res.status(200).json({ message: "Task successfully deleted." });
});

