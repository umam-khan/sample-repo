import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from 'cors'
const app = express();

//.use for middleware
app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
  res.send("hello world");
});

//middleware to use bookRoutes, for book model
//we will create separate routes for separate models

app.use("/books",bookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is listening on port - ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

