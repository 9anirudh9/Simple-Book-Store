import express from "express";
import { Book } from "../models/bookModels.js";

const router  = express.Router();

router.post('/', async(req,res)=>{
    try{
        if(!req.body.title ||
           !req.body.author ||
           !req.body.publishYear
        ) {
            return res.status(400).send(
                { message: 'Send all req fields: title,author,pubYear' }
            );
        }
        const newBook = {
            title: req.body.title,
            author:req.body.author,
            publishYear: req.body.publishYear,
        };

        const book= await Book.create(newBook);

        return res.status(201).send(book);

    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

//all books
router.get('/', async (req,res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).json({
            count:books.length,
            data: books
        }); 
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

//single book
router.get('/:id', async (req,res)=>{
    try{

        const {id} =req.params;

        const book = await Book.findById(id);

        return res.status(200).json({book});  
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

//update 
router.put('/:id', async(req,res)=>{
    try{
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({
                message: error.message
            });
        } 
        const {id} =req.params;

        const result= await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            console.log(error.message);
        res.status(404).json({
            message: 'Book Not Found'
        });
        }
        return

    }catch(error){
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

router.put('/:id', async (req,res)=>{
    try{
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({
                message: 'Send all required fields'
            });
        }
        const {id}= req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({
                message: 'Book Not found'
            })
        }
        return res.status(200).send({ message : 'Updated :)'})
    }
    catch(e){
        console.log(e.message)
        res.status(500).send({ message : e.message})
    }
});

//deleting
router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({
                message: 'Book Not found'
            })
        }

    }catch(e){
        console.log(e);
        res.status(500).send({message: 'Not found'})
    }
})

export default router;