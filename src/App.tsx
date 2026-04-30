import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { getTodos, createTodo, updateTodo } from "./api/todos";
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

  // Lägger till en ny todo via API:t
  const addTodo = async (title: string) => {
    const newTodo = await createTodo(title);
    // Lägger till den nya todon sist i listan med spread operator
    setTodos((prev) => [...prev, newTodo]);
  };

  // Togglar done-status på en todo via API:t
  const toggleTodo = async (todo: Todo) => {
    // Skapar ett nytt objekt med samma data men inverterad done-status
    const updated = await updateTodo({ ...todo, done: !todo.done });

    // Byter ut den gamla todon i listan med den uppdaterade
    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Att-göra-lista</h1>

      <TodoForm onAddTodo={addTodo} />

      {loading && <p>Laddar todos...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <TodoList todos={todos} onToggleTodo={toggleTodo} />}
    </div>
  );
}