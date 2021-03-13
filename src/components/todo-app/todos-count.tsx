import { memo, useMemo } from "react";
import { Todo } from "../../store";

type Props = {
  todos: Todo[];
};

export const TodosCount = memo<Props>(({ todos }) => {
  const count = useMemo(() => todos.length, [todos]);
  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Completed: {completedCount}</h2>
      <div>{Math.random()}</div>
      <hr />
    </div>
  );
});
