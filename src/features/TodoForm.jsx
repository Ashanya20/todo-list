import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  margin-top: 0.5rem;
  &:disabled {
    font-style: italic;
  }
`;

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
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        label="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodo(event.target.value)}
      />
      <StyledButton type="submit" disabled={workingTodoTitle === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
