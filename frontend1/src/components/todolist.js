import {useEffect, useState} from 'react';
import axios from 'axios';
import AddTodo from './addTodo';
function TodoList() {
    const [todos,setTodos]=useState([]);

    //mark complete
    const completeTast=async(id)=>{
        try {
            const response=await axios.put('http://localhost:5000/api/todo/'+id);
            if(response.status==200){
                alert('Todo updated successfully');
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    //DeleteTask
    const deleteTast=async(id)=>{
        try {
            const response=await axios.delete('http://localhost:5000/api/todo/'+id);
            if(response.status==200){
                alert('Todo deleted successfully');
                setTodos(todos.filter(item=>item._id!==id));
            }
        } catch (error) {
            console.log(error);
        }
    }
    //fetchData from create API
    const fetchData=async()=>{
        try {
            const response=await axios.get('http://localhost:5000/api/todo');
            if(response.status==200){
                setTodos(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //This will run in Background (side effect)
    useEffect(()=>{
        fetchData()
    },[])
    return ( 
        <div>
            <h2>ToDo List</h2> <hr/>
            <ul>
                {
                    todos.map(item=>(
                        <li key={item._id}>{item.task} {item.completed?'Completed':'Pending'}
                        <button onClick={()=>completeTast(item._id)}>Complete</button>
                        <button onClick={()=>deleteTast(item._id)}>X</button>
                        </li>
                    ))
                }
            </ul>

            <AddTodo fetchData={fetchData}/>
        </div>
     );
}

export default TodoList;