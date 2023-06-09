import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'



const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue !== '') {
      const newTodo = {
        id: todos.length + 1,
        text: inputValue,
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const Task = (props) => {
    return (
      <div className='task'>
        <div key={props.todo.id}>
          {props.todo.text}
          <button className='button' onClick={() => handleRemoveTodo(props.todo.id)}>Remove</button>
        </div>
      </div>
      
    )
  }
  return (
    <div>
      <div className='wrapper'>
      <h1 className ='header'>Todo List</h1>
      <div className = 'text-wrapper'>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button className = 'button' onClick={handleAddTodo}>Add</button>
        
      </div>
      
      <div className='tasks'>
        {todos.map((todo) => (
          <Task todo = {todo}/>
        ))}
      </div>
      </div>
    </div>
  );
};





export default App;
