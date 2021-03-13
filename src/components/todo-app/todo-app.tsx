import { FC } from "react";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";

export const TodoApp: FC = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};
