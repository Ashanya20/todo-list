import { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodo] = useState('');
  function handleAddTodo(event) {
    event.preventDefault(); // prevent the page from refreshing
    onAddTodo(workingTodoTitle);
    setWorkingTodo('');
    todoTitleInput.current.focus(); // refocus input
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
      />
      <button type="submit" disabled={workingTodoTitle === ''}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
