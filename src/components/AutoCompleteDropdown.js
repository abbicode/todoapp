import React, { useState } from 'react';
import Draggable from 'react-draggable';
import TodoItem from './TodoItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {collegeList} from '../consts/collegeList';
function AutoCompleteDropdown({title,style}) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  

  function addTask(text) {
    if (text.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function updateTask(id, newText) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask(text);
    }
  }

  function onDragStart(e, id) {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.effectAllowed = "move"; // Only allow moving, not copying
  }

  function onDrop(e, id) {
    const draggedTaskId = e.dataTransfer.getData('id');
    const newTasks = [...tasks];
    const draggedTaskIndex = newTasks.findIndex(task => task.id === parseInt(draggedTaskId));
    const targetTaskIndex = newTasks.findIndex(task => task.id === id);
    
    // Swap the tasks
    const [draggedTask] = newTasks.splice(draggedTaskIndex, 1);
    newTasks.splice(targetTaskIndex, 0, draggedTask);

    setTasks(newTasks);
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"; // Prevent green plus icon by using move
  }

  return (
    <div className={`auto-completelist ${style}`}>
      <h1>{title}</h1>

      
      <div className="add-task-container">
      <Autocomplete styleOverrides='autocompletestyling'
        disablePortal
        options={collegeList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} placeholder="Add College" />}
      ></Autocomplete>
        
      
      </div>
    </div>

  );
}

export default AutoCompleteDropdown;
