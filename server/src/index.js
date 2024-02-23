import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
dotenv.config();


import { recipesRouter } from "./routes/recipes.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const URI = process.env.MONGO_URL;
mongoose.connect(URI);  



app.listen(3001, ()=> 
console.log("Server Started on 3001"))

   
