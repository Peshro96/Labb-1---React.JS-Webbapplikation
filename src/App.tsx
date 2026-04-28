import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";

// Tillfällig dummy-data tills vi kopplar på API:t i nästa steg
const dummyTodos: Todo[] = [
  { id: 1, title: "Test 1", done: false },
  { id: 2, title: "Test 2", done: true },
];

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Att-göra-lista</h1>
      <TodoList todos={dummyTodos} />
    </div>
  );
}