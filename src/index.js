// require('dotenv').config({path : './env'})

import dotenv from "dotenv"

import connectDB from "./db/db.js";

dotenv.config({
    path:'./env'
})



/*
import express from "express"


////ifesss execute just afteR FUNCTION  

;( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" , (error) => {
            console.log("ERR",  error);
            throw error
            
        })
        app.listen(process.env.PORT ,() => {
            console.log(`app is listening on port ${process.env.PORT}`);
            
        })
    }
    catch(error){
        console.log("ERROR" , error);
        throw err
    }
})()
    */


connectDB()
.then(()=> {
    app.on("error" , (error) => {
        console.log("ERR",  error);
        throw error; 
        
    })
    app.listen(process.env.PORT || 8000 , ()=> {
        console.log(`server is running at port : ${process.env.PORT}`); 
    })
})
.catch((err) => {
    console.log("mongodb connection is failed try again ",err);
    
})