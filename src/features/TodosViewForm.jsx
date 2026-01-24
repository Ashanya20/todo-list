import { useState, useEffect } from 'react';

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
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor="searchTodos">Search todos:</label>
        <input
          type="text"
          id="searchTodos"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>

      <div>
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
      </div>
    </form>
  );
}

export default TodosViewForm;
