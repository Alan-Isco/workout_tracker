import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    // th following code checks whether the id beings
    // passed if a mongodb based id
    // if not an error will be returned
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
    }
    res.status(200).json(workout);
}


// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    // we try to create a new workout to the workouts model 
    // we add doc to db


    /* error handling */
    // here we want to detect which fields are empty
    // before they are sent to the db

    let emptyFields = [];

    if(!title) emptyFields.push("title");
    if(!load) emptyFields.push("load");
    if(!reps) emptyFields.push("reps");

    if(emptyFields.length > 0) {

        console.log(emptyFields);
        return res.status(400).json({ error: `Workout cannot be created. Please provide ${emptyFields.join(" and ")}`, emptyFields})
    }
    
    // if there are no empty fields we can create the workout
    try {
        const workout = await Workout.create({
            title,
            load,
            reps
        });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "No such workout" });

    const workout = await Workout.findByIdAndDelete({_id: id});

    if(!workout) return res.status(404).json({ error: "Workout not found" });

    res.status(200).json(workout);
}


// update a  workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "No such workout"});
    // const { title, load, reps } = req.body;

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    });
    if(!workout) return res.status(404).json({ error: "Workout not found" });

    res.status(200).json(workout);
}


export default {
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    createWorkout
}
