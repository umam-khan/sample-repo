import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

//route to save a new book
app.post("/books",async (req,res) => {
  try{
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Please fill all required fields" });
    }

    // we can create an object here as well as directly
    const newBook = {
      title:req.body.title,
      author:req.body.author,
      publishYear:req.body.publishYear,
    }
    
    const book = await Book.create(newBook);

    res.status(201).json(book);
  } catch (error) {
    console.log(error);
  }
})

//route to get all books
app.get("/books",async (req,res) => {
  try{
    const books = await Book.find({});
    res.status(200).json({
      count : books.length,
      data : books
    });
  } catch(error)
  {
    console.log(error);
    res.status(500).send({message:"Internal Server Error"});
  }
})

//route to get a book by id
app.get("/books/:id",async (req,res) => {
  try{
    const {id} = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch(error)
  {
    console.log(error.message);
    res.status(500).send({message:"Internal Server Error"});
  }
})
//update a book by id
app.put("/books/:id",async(req,res)=> {
  try{
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Please fill all required fields" });
    }

    const {id} = req.params;
    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }

    const book = await Book.findByIdAndUpdate(id,updatedBook,{ new: true });

    if(!book){
      return res.status(404).send({message: "book not found"});
    }
    res.status(200).json(book);
  }catch(error){
    console.log(error.message);
    res.status(500).send({message: "Internal Server Error"});
  }
})
//delete a book by id
app.delete("/books/:id",async(req,res) => {
  try{
    const {id} = req.params;
    const book = await Book.findByIdAndDelete(id);
    if(!book){
      return res.status(404).send({message: "book not found"})
    }

    res.status(200).send({message: "book deleted successfully", deletedBook: book});
  }catch(error){
    console.log(error.message);
    res.status(500).send({message: "Internal Server Error"});
  }
})
//connection with mongoDB
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

