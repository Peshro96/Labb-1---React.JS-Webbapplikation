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