import './App.css';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
        completed: false, // Добавляем поле completed для отметки выполнения задачи
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const Task = (props) => {
    return (
      <Draggable draggableId={props.todo.id.toString()} index={props.index}>
        {(provided) => (
          <div
            className={`task ${props.todo.completed ? 'completed' : ''}`} // Добавляем класс для стилизации выполненных задач
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div key={props.todo.id}>
              <div>{props.todo.text}</div>
              
              <div className='button' onClick={() => handleRemoveTodo(props.todo.id)}>
                Remove
              </div>
              <span onClick={() => handleToggleComplete(props.todo.id)}>
                Done
              </span>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div>
      <div className='wrapper'>
        <h1 className='header'>Todo List</h1>
        <div className='text-wrapper'>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button className='button' onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div className='tasks' {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((todo, index) => (
                  <Task todo={todo} index={index} key={todo.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
