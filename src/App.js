import './App.css';
import ListElement from './component/ListElement';
import TaskForm from './component/TaskForm';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    const tasksCpy = [...tasks];
    tasksCpy.push(newTask);
    setTasks(tasksCpy);
  }

  const handleDelete = (id) => {
    const tasksCpy = [...tasks];
    const updatedCpy = tasksCpy.filter((task) => task.id !== id);
    setTasks(updatedCpy);
  }

  const handleUpdate = (updatedTask) => {
    const tasksCpy = [...tasks];
    // const updatedCpy = tasksCpy.filter((task) => task.id !== updatedTask.id);
    // updatedCpy.push(updatedTask);
    tasksCpy.find((task) => task.id == updatedTask.id).content = updatedTask.content;
    setTasks(tasksCpy);
  }

  return (
    <div className="container">
      <div className="cardCentered">
        <h1>Get Things Done!</h1>
        <TaskForm handleAddTask={handleAddTask}/>
        <ul>
            {tasks.map((task) => (
                <ListElement 
                  task={task} 
                  handleDelete={() => handleDelete(task.id)}
                  handleUpdate={handleUpdate}
                  key={task.id}
                />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
