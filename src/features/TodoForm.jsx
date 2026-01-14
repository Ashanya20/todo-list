import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodo] = useState('');
  function handleAddTodo(event) {
    event.preventDefault(); // prevent the page from refreshing
    onAddTodo({
      title: workingTodoTitle,
      isCompleted: false,
    });
    setWorkingTodo('');
    todoTitleInput.current.focus(); // refocus input
  }
  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        label="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
      />
      <button type="submit" disabled={workingTodoTitle === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
