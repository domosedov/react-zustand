import create, { State, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import produce, { Draft } from "immer";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Store = {
  todos: Todo[];
  visibilityFilter: "all" | "completed" | "active";
  setVisibilityFilter: (filter: "all" | "completed" | "active") => void;
  todoTitle: string;
  isLoading: boolean;
  addTodo: (todo: Todo) => void;
  setTodoTitle: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  fetchTodos: () => Promise<void>;
  resetTodos: () => void;
};

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

const useStore = create<Store>(
  persist(
    immer((set, get) => ({
      todos: [],
      todoTitle: "",
      isLoading: false,
      visibilityFilter: "all",
      setVisibilityFilter: (filter) =>
        set(() => ({ visibilityFilter: filter })),
      addTodo: (todo) =>
        set(({ todos }) => {
          todos.push(todo);
        }),
      setTodoTitle: (title: string) => set(() => ({ todoTitle: title })),
      removeTodo: (id) =>
        set(({ todos }) => {
          const index = todos.findIndex((todo) => todo.id === id);
          if (index !== -1) todos.splice(index, 1);
        }),
      fetchTodos: async () => {
        set(() => ({ isLoading: true }));
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
          );
          const todosJson: Todo[] = await response.json();
          set(({ todos }) => ({ todos: [...todos, ...todosJson] }));
          set(() => ({ isLoading: false }));
        } catch (err) {
          console.log(err);
        }
      },
      toggleTodo: (id) =>
        set(({ todos }) => {
          const index = todos.findIndex((todo) => todo.id === id);
          if (index !== -1) todos[index].completed = !todos[index].completed;
        }),
      resetTodos: () =>
        set(() => ({
          todos: [],
        })),
    })),
    {
      name: "todo-app1",
      getStorage: () => sessionStorage,
    }
  )
);

const todosSelector = (state: Store) => state.todos;
const addTodoSelector = (state: Store) => state.addTodo;
const toggleTodoSelector = (state: Store) => state.toggleTodo;

const useTodos = () => useStore(todosSelector);
const useAddTodo = () => useStore(addTodoSelector);
const useToggleTodo = () => useStore(toggleTodoSelector);

export type { Todo, Store };
export { useStore, useTodos, useAddTodo, useToggleTodo };
