// Import required modules
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/taskController.js";
import express from 'express';
import protect from "../middleWare/authMiddleware.js";

// Initialize router
const router = express.Router();

// Route for creating a new task
router.post("/", protect,createTask);

// Route for retrieving all tasks
router.get("/", protect,getTasks);

// Route for retrieving a specific task by ID
router.get("/:id", protect,getTask);

// Route for updating a specific task by ID
router.patch("/:id", protect,updateTask);

// Route for deleting a specific task by ID
router.delete("/:id", protect,deleteTask);

// Export the router
export default router;
