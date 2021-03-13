import { FC, useCallback, useEffect, useMemo } from "react";
import { useStore, useTodos, useToggleTodo } from "../../store";
import { TodosCount } from "./todos-count";

export const TodoList: FC = () => {
  const todos = useTodos();
  const toggleTodo = useToggleTodo();
  const removeTodo = useStore(useCallback((state) => state.removeTodo, []));
  const fetchTodos = useStore(useCallback((state) => state.fetchTodos, []));
  const loading = useStore(useCallback((state) => state.isLoading, []));
  const resetTodos = useStore(useCallback((state) => state.resetTodos, []));
  const filter = useStore(useCallback((state) => state.visibilityFilter, []));
  const setFilter = useStore(
    useCallback((state) => state.setVisibilityFilter, [])
  );

  useEffect(() => {
    // fetchTodos();
  }, [fetchTodos]);

  const todoList = useMemo(
    () =>
      todos.filter((todo) => {
        switch (filter) {
          case "active":
            return todo.completed === false;
          case "completed":
            return todo.completed === true;
          default:
            return true;
        }
      }),
    [filter, todos]
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <TodosCount todos={todos} />
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul>
        {todoList.map(({ title, id, completed }) => (
          <li
            style={{ color: completed ? "green" : "red" }}
            key={id}
            onClick={() => toggleTodo(id)}
          >
            {title}
            <button onClick={() => removeTodo(id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => resetTodos()}>Reset</button>
      <div>{Math.random()}</div>
    </div>
  );
};
