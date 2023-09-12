import { useEffect, useState } from 'react';
import '../App.css'
import delete_icon from '../assets/delete.png';
import edit_icon from '../assets/edit.png';
import { useRef } from 'react';
import useFirstRender from './Custom';

export default function ListElement({task, handleDelete, handleUpdate}){
    const [displayedTask, setDisplayTask] = useState("");
    const [editMode, setEditMode] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [textClassName, setTextClassName] = useState("");
    const inputRef = useRef();
    const checkboxRef = useRef();
    const firstRender = useFirstRender();

    document.addEventListener('mousedown', (e) => {
        if (e.target.className !== 'inputEdit' && editMode === 1) {
            setEditMode(0);
        }
    })

    useEffect(() => {
        if (completed)
            setTextClassName("listContent completed");
        else
            setTextClassName("listContent");
    }, [completed])

    useEffect(() => {
        if (!task)
            return 0;
        setDisplayTask(task.content);
    }, [task])

    useEffect(() => {
        if (editMode == 1){
            inputRef.current.focus();
            inputRef.current.setSelectionRange(displayedTask.length, displayedTask.length);
        }
    }, [displayedTask])

    useEffect(() => {
        if (!firstRender)
            editModeEffect();
    }, [editMode])

    const editModeEffect = () =>{
        if (editMode == 1){
            setDisplayTask(task.content);
            inputRef.current.focus();
            inputRef.current.setSelectionRange(displayedTask.length, displayedTask.length);
        }
        else{
            const newTask = {id: task.id, content: displayedTask};
            handleUpdate(newTask);
            setDisplayTask(task.content);
        }
    }

    const handleUpdateInput = (event) =>{
        setDisplayTask(event.target.value);
    }

    const handleEsc = (event) => {
        if(event.key === "Escape") {
            setDisplayTask(task.content);
            setEditMode(0);
        }
    };

    const handleCheckBox = (e) =>{
        setCompleted(e.target.checked);
    }

    if (editMode){
        return(
            <li>
                <form action="submit" onSubmit={() => setEditMode(0)} onKeyDown={handleEsc}>
                    <input className="inputEdit" ref={inputRef} value={displayedTask} onChange={handleUpdateInput}/>
                </form>
            </li>
        );
    }
    return(
        <li className='listElement'>
            <div title={task.content} className={textClassName}>
                {displayedTask}
            </div>
            <div className='btnList'>
                <input ref={checkboxRef} defaultChecked={completed} type='checkbox' onChange={handleCheckBox}/>
                <img className='EditBtn' src={edit_icon} onClick={() => setEditMode(1)}/>
                <img className='DeleteBtn' src={delete_icon} onClick={handleDelete}/>
            </div>
        </li>
    );
}