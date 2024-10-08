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
         <TodoList title="To-Do List"  />
        </div>
       
      </Draggable>


      {/* Second Todo List (College To-Do List, non-draggable) */}
      <div id="fixed">
        <TodoList title="College List" style="wide"/>
      </div>
    </div>
  );
}

export default App;
