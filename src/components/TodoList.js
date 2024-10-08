import React, { useState } from 'react';
import Draggable from 'react-draggable';
import TodoItem from './TodoItem';

function TodoList() {
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
    <div className="todo-list">
      <h1>To Do List</h1>
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
      
      <div className="add-task-container">
        <input
          className="add-task-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task"
        />
        <button className="add-task-button" onClick={() => addTask(text)}>Add</button>
      </div>
    </div>

  );
}

export default TodoList;
