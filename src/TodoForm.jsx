import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  function handleAddTodo(event) {
    event.preventDefault(); // prevent the page from refreshing
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = ''; // clear input
    todoTitleInput.current.focus(); // refocus input
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input ref={todoTitleInput} type="text" id="todoTitle" name="title" />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
