import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { getTodos } from "./api/todos";
import type { Todo } from "./types/todo";

export default function App() {
  // State för listan av todos som visas i appen
  const [todos, setTodos] = useState<Todo[]>([]);

  // Loading-state visar laddningsindikator medan vi hämtar data
  const [loading, setLoading] = useState<boolean>(true);

  // Hämtar todos från API:t när komponenten mountas
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Att-göra-lista</h1>

      {loading ? (
        <p>Laddar todos...</p>
      ) : (
        <TodoList todos={todos} />
      )}
    </div>
  );
}