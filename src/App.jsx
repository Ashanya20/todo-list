import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import { useReducer, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const {
    todoList,
    isLoading,
    isSaving,
    errorMessage,
    sortField,
    sortDirection,
    queryString,
  } = todoState;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };
      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const data = await resp.json();
        // const { records } = data;
        dispatch({
          type: todoActions.loadTodos,
          records: data.records,
        });
      } catch (error) {
        dispatch({
          type: todoActions.setLoadError,
          error,
        });
        // } finally {
        //   setIsLoading(false);
      }
    };
    fetchTodos();
    // }, [sortField, sortDirection, queryString]);
  }, [encodeUrl, token]);

  const addTodo = async (newTodo) => {
    dispatch({ type: todoActions.startRequest });
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      dispatch({
        type: todoActions.addTodo,
        records,
      });
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };
  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);
    dispatch({
      type: todoActions.completeTodo,
      id,
    });
    // setTodoList((prevTodos) =>
    //   prevTodos.map((todo) =>
    //     todo.id === id ? { ...todo, isCompleted: true } : todo
    //   )
    // );
    const payload = {
      records: [
        {
          id: id, // just id (?)
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      // setIsSaving(true);
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      // console.error(error);
      // setErrorMessage(`${error.message}. Reverting todo...`);
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
      //   const revertedTodos = todoList.map((todo) =>
      //     todo.id === originalTodo.id ? originalTodo : todo
      //   );
      //   setTodoList(revertedTodos);
      // } finally {
      //   setIsSaving(false);
    }
  };
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    dispatch({
      type: todoActions.updateTodo,
      editedTodo,
    });
    // setTodoList((prevTodos) =>
    //   prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    // );
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      // setIsSaving(true);
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      // console.error(error);
      // setErrorMessage(`${error.message}. Reverting todo...`);
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
      // } finally {
      //   setIsSaving(false);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1>My Todos</h1>
        <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
        <TodoList
          todoList={todoList}
          isLoading={isLoading}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
        />
        <hr />
        <TodosViewForm
          sortDirection={sortDirection}
          sortField={sortField}
          queryString={queryString}
          dispatch={dispatch}
        />
        {errorMessage && (
          <div className={styles.error}>
            <hr />
            <p>{errorMessage}</p>
            <button onClick={() => dispatch({ type: todoActions.clearError })}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
