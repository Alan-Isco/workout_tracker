import express from "express";
import workoutController from "../controllers/workoutController.js";


const router = express.Router();

router.get('/', workoutController.getWorkouts);

// GET single workout
router.get('/:id', workoutController.getWorkout);

// POST a new workout
router.post('/', workoutController.createWorkout);

// DELETE a new workout
router.delete('/:id', workoutController.deleteWorkout);

// UPDATE a new workout
router.patch('/:id', workoutController.updateWorkout);

export default router;