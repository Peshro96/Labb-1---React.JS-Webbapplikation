import type { Todo } from "../types/todo";

// Bas-URL för json-server. Alla API-anrop går mot denna.
const API_URL = "http://localhost:3001/todos";

// Hämtar alla todos från API:t
export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(API_URL);

    // Kasta fel om svaret inte är OK
    if (!response.ok) {
      throw new Error("Kunde inte hämta todos");
    }

    const data: Todo[] = await response.json();
    return data;
  } catch {
    // Fångar både nätverksfel och JSON-parse-fel och kastar ett tydligt meddelande
    throw new Error("Kunde inte hämta todos");
  }
}

// Skapar en ny todo i API:t
export async function createTodo(title: string): Promise<Todo> {
  try {
    // POST-anrop med JSON i body
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Skickar bara title och done. id genereras av json-server automatiskt.
      body: JSON.stringify({
        title,
        done: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Kunde inte skapa todo");
    }

    // Servern skickar tillbaka den nya todo:n med ett id
    const newTodo: Todo = await response.json();
    return newTodo;
  } catch {
    throw new Error("Kunde inte skapa todo");
  }
}