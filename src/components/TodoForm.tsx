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

  // Felmeddelande som visas om formuläret inte är giltigt
  const [error, setError] = useState<string>("");

  // Hanterar submit av formuläret
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Stoppar sidans default-beteende (refresh)
    e.preventDefault();

    // Validering: titeln får inte vara tom eller bara mellanslag
    if (!title.trim()) {
      setError("Titeln får inte vara tom.");
      return;
    }

    // Validering: titeln måste vara minst 2 tecken
    if (title.trim().length < 2) {
      setError("Titeln måste vara minst 2 tecken lång.");
      return;
    }

    // Allt OK - rensa felmeddelandet och skicka upp till App
    setError("");
    await onAddTodo(title.trim());

    // Tömmer fältet efter submit
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        {/* htmlFor kopplar ihop label med input för skärmläsare */}
        <label htmlFor="todo-title">Ny todo: </label>
        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // aria-invalid talar om för skärmläsare att fältet har ett fel
          aria-invalid={error ? "true" : "false"}
          // aria-describedby pekar på det element som beskriver felet
          aria-describedby={error ? "todo-title-error" : undefined}
        />
      </div>

      <button type="submit">Lägg till</button>

      {/* role="alert" gör att skärmläsare läser upp meddelandet direkt */}
      {error && (
        <p
          id="todo-title-error"
          role="alert"
          style={{ color: "red", marginTop: "0.5rem" }}
        >
          {error}
        </p>
      )}
    </form>
  );
}