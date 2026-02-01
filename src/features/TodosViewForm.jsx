import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 1rem;
  padding: 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  margin-top: 6px;
`;

const StyledButton = styled.button`
  padding: 0.3rem 0.6rem;
`;

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);
  function preventRefresh(event) {
    event.preventDefault();
  }
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);
  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledDiv>
        <StyledLabel htmlFor="searchTodos">Search todos:</StyledLabel>
        <input
          type="text"
          id="searchTodos"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <StyledButton type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </StyledButton>
      </StyledDiv>

      <StyledDiv>
        <label htmlFor="sortField">Sort by</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(event) => setSortField(event.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="sortDirection">Direction</label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(event) => setSortDirection(event.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </StyledDiv>
    </StyledForm>
  );
}

export default TodosViewForm;
