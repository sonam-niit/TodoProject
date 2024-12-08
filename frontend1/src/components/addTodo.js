import axios from "axios";
import { useState } from "react";

function AddTodo({fetchData}){
    const [input,setInput]=useState('');

    const handleClick=async()=>{
        try {
            const response=await axios.post('http://localhost:5000/api/todo',{task:input})
            console.log(response);
            if(response.status===201){
                alert('Todo added successfully');
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div>
            <h2>Add Todo:</h2>
            <input type="text" placeholder="Enter Your Task" 
            value={input} onChange={(e)=>setInput(e.target.value)} />

            <button onClick={handleClick}>Add todo</button>
        </div>
    )
}
export default AddTodo;