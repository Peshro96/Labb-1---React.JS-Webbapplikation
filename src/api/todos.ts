import type { Todo } from "../types/todo";

// Bas-URL för json-server. Alla API-anrop går mot denna.
const API_URL = "http://localhost:3001/todos";

// Hämtar alla todos från API:t
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  // Kasta fel om svaret inte är OK (404, 500 osv)
  if (!response.ok) {
    throw new Error("Kunde inte hämta todos");
  }

  const data: Todo[] = await response.json();
  return data;
}