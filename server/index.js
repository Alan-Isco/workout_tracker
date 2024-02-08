import express from "express";
import dotenv from "dotenv";
import router from './routes/workouts.js';
import mongoose from "mongoose";

// we invole the express app
const app = express();
dotenv.config();

// GLOBAL MIDDLEWARE \
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// ROUTES
app.use('/api/workouts', router);

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // we listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db. Server is running on port ", process.env.PORT);
        });
    }).catch((err) => {
        console.log(err);
    });

