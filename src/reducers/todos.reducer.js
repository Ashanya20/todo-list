const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
  setQueryString: 'setQueryString',
  setSortField: 'setSortField',
  setSortDirection: 'setSortDirection',
};

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  sortField: 'createdTime',
  sortDirection: 'desc',
  queryString: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // useEffect
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos: {
      const todos = action.records.map((record) => ({
        id: record.id,
        ...record.fields,
      }));
      return {
        ...state,
        todoList: todos,
        isLoading: false,
      };
    }
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    // addTodo
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo: {
      const record = action.records[0];
      const savedTodo = {
        id: record.id,
        ...record.fields,
        isCompleted: record.fields.isCompleted ?? false,
      };

      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    // updateTodo, revertTodo, completeTodo
    case actions.revertTodo:
    case actions.updateTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id ? action.editedTodo : todo
      );
      const updatedState = {
        ...state,
        todoList: updatedTodos,
      };
      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }
      return updatedState;
    }
    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.id ? { ...todo, isCompleted: true } : todo
      );
      return {
        ...state,
        todoList: updatedTodos,
      };
    }
    // clearError
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    case actions.setQueryString:
      return {
        ...state,
        queryString: action.queryString,
      };
    case actions.setSortField:
      return {
        ...state,
        sortField: action.sortField,
      };
    case actions.setSortDirection:
      return {
        ...state,
        sortDirection: action.sortDirection,
      };
    default:
      return state;
  }
}

export { reducer, initialState, actions };
