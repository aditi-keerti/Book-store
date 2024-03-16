const express= require('express');
const {Connection}=require('./db')

const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(8080,async()=>{
    try{
        await Connection;
        console.log("Connected to db")
        console.log("Server running at port 8080")
    }catch(err){
        console.log("Internal Server Error")
    }
    
})
