import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Draggable from 'react-draggable';

function App() {
  return (
    <div className="App">
      {/* First Todo List (Post-it note) */}
      <Draggable>
        <div>
         <TodoList title="Personal To-Do List"  />
        </div>
       
      </Draggable>


      {/* Second Todo List (College To-Do List, non-draggable) */}
      <div id="fixed">
        <TodoList title="College To-Do List" />
      </div>
    </div>
  );
}

export default App;
