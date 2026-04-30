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

// Uppdaterar en befintlig todo i API:t
export async function updateTodo(todo: Todo): Promise<Todo> {
  try {
    // PUT-anrop till specifik todo via id i URL:en
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Skickar hela objektet eftersom PUT ersätter den befintliga
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Kunde inte uppdatera todo");
    }

    // Servern skickar tillbaka den uppdaterade todo:n
    const updatedTodo: Todo = await response.json();
    return updatedTodo;
  } catch {
    throw new Error("Kunde inte uppdatera todo");
  }
}