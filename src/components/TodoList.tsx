import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: number) => Promise<void>;
};

// Renderar listan av todos. Visar ett meddelande om listan är tom.
export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p>Inga todos att visa.</p>;
  }

  return (
    <ul style={{ padding: 0 }}>
      {/* map() loopar igenom arrayen, key behövs för React */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}