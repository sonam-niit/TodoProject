const express= require('express');
const router= express.Router();
const TodoModel= require('./todoModel'); //Import model
//To Get All todos
router.get('/',async(req,res)=>{
    try {
        const todos= await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
//create New Todo
router.post('/',async (req,res)=>{
    try {
        console.log(req.body);
        const todo= new TodoModel({task:req.body.task});
        const savedTodo= await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
//update Todo Status based on todo ID
router.put('/:id',async(req,res)=>{
    try {
        const id= req.params.id;
        await TodoModel.findByIdAndUpdate(id,{completed:true})
        res.status(200).json('Todo updated');
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
//delete existing todo based on ID
router.delete('/:id',async(req,res)=>{
    try {
        const id= req.params.id;
        await TodoModel.findByIdAndDelete(id)
        res.status(200).json('Todo Deleted');
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports=router;