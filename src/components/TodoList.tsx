import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
};

// Renderar listan av todos. Visar ett meddelande om listan är tom.
export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <p>Inga todos att visa.</p>;
  }

  return (
    <ul style={{ padding: 0 }}>
      {/* map() loopar igenom arrayen, key behövs för React */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}