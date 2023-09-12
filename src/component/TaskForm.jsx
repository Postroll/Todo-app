import '../App.css'
import { useState } from 'react';

export default function TaskForm({handleAddTask}){
    const [taskInput, setTaskInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskInput === "")
          return 0;
        const newTask = {id: new Date().getTime(), content: taskInput};
        setTaskInput("");
        handleAddTask(newTask);
      }
    
      const handleTaskInput = (event) => {
        setTaskInput(event.target.value);
      }

    return(
        <form action="submit" onSubmit={handleSubmit} className="searchBar">
            <input
                className='inputAddTask'
                value={taskInput}
                onChange={handleTaskInput} 
                type="text" 
                placeholder="What is the task today?"
            />
            <button className="AddTaskBtn">Add Task</button>
        </form>
    );
}