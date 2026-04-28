import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { getTodos } from "./api/todos";
import type { Todo } from "./types/todo";

export default function App() {
  // State för listan av todos som visas i appen
  const [todos, setTodos] = useState<Todo[]>([]);

  // Hämtar todos från API:t när komponenten mountas
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Att-göra-lista</h1>
      <TodoList todos={todos} />
    </div>
  );
}