const mongoose = require('mongoose'); //import mongoose
const todoSchema= new mongoose.Schema({
    task: {type:String,required:true},
    completed:{type:Boolean,default:false}
})

module.exports = mongoose.model('Todo',todoSchema);