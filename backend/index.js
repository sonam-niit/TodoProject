const express = require('express');
const mongoose = require('mongoose'); //import mongoose
const cors = require('cors');

const MONGO_URI='mongodb://localhost:27017/pwskills'
//DB Connection
mongoose.connect(MONGO_URI)
.then(()=>console.log('Connected'))
.catch((error)=>console.error('Error',error))

//let's create server
const app= express();
app.use(cors()); //allow frontend to access
app.use(express.json()); //JSON Parser
app.get("/",(req,res)=>{
    res.send("Welcome to Express Server")
})
//If request comes with /api/todo path redirect it to todoRoute file 
//This file works as a controller here
app.use('/api/todo',require('./todoRoute'));

app.listen(5000,()=>console.log('Server started'))