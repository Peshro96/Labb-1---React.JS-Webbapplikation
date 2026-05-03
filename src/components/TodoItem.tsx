import type { Todo } from "../types/todo";

// Props som komponenten tar emot från TodoList
type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: number) => Promise<void>;
};

// Visar en enskild todo som ett kort
export default function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoItemProps) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px",
        listStyle: "none",
      }}
    >
      <h3
        style={{
          margin: "0 0 4px 0",
          textDecoration: todo.done ? "line-through" : "none",
          color: todo.done ? "#888" : "#000",
        }}
      >
        {todo.title}
      </h3>
      <p style={{ margin: "0 0 8px 0" }}>
        Status: {todo.done ? "Klar" : "Inte klar"}
      </p>

      {/* Knapp som togglar done-status via callback till App */}
      <button
        onClick={() => onToggleTodo(todo)}
        style={{ marginRight: "0.5rem" }}
      >
        {todo.done ? "Markera som ej klar" : "Markera som klar"}
      </button>

      {/* aria-label ger skärmläsare en tydligare beskrivning av knappens funktion */}
      <button
        onClick={() => onDeleteTodo(todo.id)}
        aria-label={`Ta bort ${todo.title}`}
      >
        Ta bort
      </button>
    </li>
  );
}