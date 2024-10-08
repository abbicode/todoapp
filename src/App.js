import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      {/* First Todo List (Post-it note) */}
      <TodoList title="Personal To-Do List" draggable={true} />
      
      {/* Second Todo List (College To-Do List, non-draggable) */}
      <TodoList title="College To-Do List" draggable={false} />
    </div>
  );
}

export default App;
