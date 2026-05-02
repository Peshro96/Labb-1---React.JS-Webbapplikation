import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todos";
import type { Todo } from "./types/todo";

// Tillåtna filtervärden för listan
type Filter = "all" | "done" | "undone";

export default function App() {
  // State för listan av todos som visas i appen
  const [todos, setTodos] = useState<Todo[]>([]);

  // Loading-state visar laddningsindikator medan vi hämtar data
  const [loading, setLoading] = useState<boolean>(true);

  // Error-state visar felmeddelande om något går snett
  const [error, setError] = useState<string>("");

  // Filter-state styr vilka todos som visas (alla / klara / oklara)
  const [filter, setFilter] = useState<Filter>("all");

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

  // Tar bort en todo via API:t
  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    // Filtrerar bort todon med matchande id från listan
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Beräknar vilka todos som ska visas baserat på filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "undone") return !todo.done;
    return true; // "all" - visa allt
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Att-göra-lista</h1>

      <TodoForm onAddTodo={addTodo} />

      {loading && <p>Laddar todos...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={removeTodo}
        />
      )}
    </div>
  );
}