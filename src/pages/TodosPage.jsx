import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';

function TodosPage({
    todoList,
    isLoading,
    isSaving,
    sortField,
    sortDirection,
    queryString,
    dispatch,
    onAddTodo,
    onCompleteTodo,
    onUpdateTodo,
}) {
    return (
        <>
            <TodoForm onAddTodo={onAddTodo} isSaving={isSaving} />
            <TodoList
                todoList={todoList}
                isLoading={isLoading}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
            />
            <hr />
            <TodosViewForm
                sortDirection={sortDirection}
                sortField={sortField}
                queryString={queryString}
                dispatch={dispatch}
            />
        </>
    );
}

export default TodosPage;
