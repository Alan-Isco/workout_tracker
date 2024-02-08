import mongoose from "mongoose";

const Schema =  mongoose.Schema;


// this schema defines the structure of a paticular 
// document in the collection
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// a model applies that schema to a paticular 
// model
// we use a model to interact with a collection
// of thay name

export default mongoose.model('Workout', workoutSchema);