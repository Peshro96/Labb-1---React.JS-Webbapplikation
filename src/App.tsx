import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { getTodos } from "./api/todos";
import type { Todo } from "./types/todo";

export default function App() {
  // State för listan av todos som visas i appen
  const [todos, setTodos] = useState<Todo[]>([]);

  // Loading-state visar laddningsindikator medan vi hämtar data
  const [loading, setLoading] = useState<boolean>(true);

  // Error-state visar felmeddelande om något går snett
  const [error, setError] = useState<string>("");

  // Hämtar todos från API:t när komponenten mountas
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        // Visa fel om API:t inte svarar eller skickar ett dåligt svar
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Något gick fel.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Att-göra-lista</h1>

      {loading && <p>Laddar todos...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <TodoList todos={todos} />}
    </div>
  );
}