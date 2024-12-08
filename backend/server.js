const express = require('express');

//let's create server
const app= express();
app.use(express.json()); //JSON Parser

app.use('/api/todo',require('./todoRoute'));

module.exports=app;