import type { Todo } from "../types/todo";

// Props som komponenten tar emot från TodoList
type TodoItemProps = {
  todo: Todo;
};

// Visar en enskild todo som ett kort
export default function TodoItem({ todo }: TodoItemProps) {
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
      <h3 style={{ margin: "0 0 4px 0" }}>{todo.title}</h3>
      <p style={{ margin: 0 }}>
        Status: {todo.done ? "Klar" : "Inte klar"}
      </p>
    </li>
  );
}