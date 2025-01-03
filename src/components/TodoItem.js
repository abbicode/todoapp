import React, { useState } from 'react';


function TodoItem({ task, deleteTask, toggleCompleted, updateTask, onDragStart, onDrop, onDragOver }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isDragging, setIsDragging] = useState(false); // State to track dragging



  function handleChange() {
    toggleCompleted(task.id);
  }

  function handleDoubleClick() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
    updateTask(task.id, editText);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setIsEditing(false);
      updateTask(task.id, editText);
    }
  }

  return (
    <div
      className={`todo-item ${task.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
      onDoubleClick={handleDoubleClick}
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, task.id);
      }}
      onDragEnd={() => setIsDragging(false)} // Remove dragging state
      onDrop={(e) => {
        setIsDragging(false);
        onDrop(e, task.id);
      }}
      onDragOver={(e) => onDragOver(e)}
    >
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={handleChange}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <p>{task.text}</p>
      )}

     
      <button onClick={() => deleteTask(task.id)}>
        X
      </button>
    </div>
  );
}

export default TodoItem;
