import express from "express";

import { Book } from "../models/bookModel.js";

const router = express.Router();

//route to save a new book
router.post("/",async (req,res) => {
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
router.get("/",async (req,res) => {
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
router.get("/:id",async (req,res) => {
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
router.put("/:id",async(req,res)=> {
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
router.delete("/:id",async(req,res) => {
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

export default router;

