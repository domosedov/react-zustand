import { FC, FormEvent, useCallback } from "react";
import { useAddTodo, useStore } from "../../store";

export const TodoForm: FC = () => {
  const title = useStore(useCallback((state) => state.todoTitle, []));
  const setTitle = useStore(useCallback((state) => state.setTodoTitle, []));
  const addTodo = useAddTodo();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    addTodo({ id: Date.now(), title, completed: false });
    setTitle("");
  };

  return (
    <div>
      <h2>Todo Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <div>{Math.random()}</div>
    </div>
  );
};
