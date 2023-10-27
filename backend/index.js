import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoutes from "./routes/booksRoutes.js"
import cors from "cors";
const app= express();

//middlewear
app.use(express.json());
app.use(cors())
// cors as middlewear
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','PUT','POST','DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));


app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('Welcome ');
});

app.use('/books',booksRoutes)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('Connected to DB');
        app.listen(PORT, ()=>{
            console.log(`Listening on ${PORT}`);
        });
    })
    
    .catch((error) => {
        console.log(error);
    });

