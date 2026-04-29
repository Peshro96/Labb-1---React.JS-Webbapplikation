import { useState } from "react";
import type { FormEvent } from "react";

// Props - en callback-funktion som anropas när formuläret submittas
type TodoFormProps = {
  onAddTodo: (title: string) => Promise<void>;
};

// Formulär för att lägga till nya todos
export default function TodoForm({ onAddTodo }: TodoFormProps) {
  // Controlled input - värdet på text-fältet sparas i state
  const [title, setTitle] = useState<string>("");

  // Hanterar submit av formuläret
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Stoppar sidans default-beteende (refresh)
    e.preventDefault();

    // Skickar upp den nya todon till App-komponenten
    await onAddTodo(title);

    // Tömmer fältet efter submit
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Ny todo: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <button type="submit">Lägg till</button>
    </form>
  );
}