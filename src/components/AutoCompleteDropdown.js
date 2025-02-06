import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import TodoItem from './TodoItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import { collegeList } from '../consts/collegeList';
import { fetchCollegeData } from '../helpers/collegeAPI';


function AutoCompleteDropdown({ title, style }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const collegeDupe = ['brown', 'wheaton', 'university of iowa', 'yale', 'american'];
  const [collegeNames, setCollegeNames] = useState(null);
  useEffect(() => { fetchCollegeData().then((data) => { setCollegeNames(data);}); }, []);
  const resultsArray = Object.values(collegeNames.results); // Convert to an array 
  const collegeNamesList = resultsArray .map(result => result["latest.school.name"]) .filter(name => name); // Removes null/undefined values
  console.log(collegeNamesList);
  console.log(typeof(collegeNamesList));
  // const collegeList = [
  //   'Abilene Christian University', 
  //   'Abraham Baldwin Agricultural College',
  //   'Academy of Art University',
  //   'Acadia University',
  //   'Adams State University',
  //   'Adelphi University',
  //   'Adrian College',
  //   'Adventist University of Health Sciences',
  //   'Agnes Scott College',
  //   'AIB College of Business',
    
  // ];



  function addTask(text) {
    console.log("!!!!", text);
    if (text=== '') return;
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
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e, id) {
    const draggedTaskId = e.dataTransfer.getData('id');
    const newTasks = [...tasks];
    const draggedTaskIndex = newTasks.findIndex(task => task.id === parseInt(draggedTaskId));
    const targetTaskIndex = newTasks.findIndex(task => task.id === id);
    
    const [draggedTask] = newTasks.splice(draggedTaskIndex, 1);
    newTasks.splice(targetTaskIndex, 0, draggedTask);

    setTasks(newTasks);
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  const filterOptions = (options, { inputValue }) => {
    return options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    ).sort((a, b) => {
      // Sort by proximity of match start
      return a.toLowerCase().indexOf(inputValue.toLowerCase()) - b.toLowerCase().indexOf(inputValue.toLowerCase());
    });
  };

  const [collegeData, setCollegeData] = useState(null);
  useEffect(() => { fetchCollegeData().then((data) => { setCollegeData(data);}); }, []);
 

  return (
    <div className={`auto-completelist ${style}`}>
      <h1>{title}</h1>

      <div className="tasks-container">
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateTask={updateTask}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        ))}
      </div>
      <div>
        <p>
          {collegeData ? collegeData.results[0]["latest.school.name"] : "Loading..."}

        </p>

      </div>

      <div className="add-task-container">
        <Autocomplete
          styleOverrides='autocompletestyling'
          disablePortal
          options={collegeNamesList}
          sx={{ width: 300 }}
          onChange={(event, newValue) => setText(newValue)} 
       
          renderInput={(params) => <TextField {...params} placeholder="Add College" />}
          
        ></Autocomplete>
         <button className="add-task-button" onClick={() => addTask(text)}>Add</button>
      </div>
    </div>
  );
}

export default AutoCompleteDropdown;
