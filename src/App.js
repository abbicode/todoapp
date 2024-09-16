import React from 'react';
import './App.css';
import TodoList from './components/TodoList';


function App() {
  return (
    <div className="App">
      {/* post it note */}
      <TodoList /> 
      {/* college post it note non movable */}
      <TodoList /> 
    </div>
  ); 
}

export default App;