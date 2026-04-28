import type { Todo } from '../types/todo'

const API_URL = "http://localhost:3001/todos";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta todos");
  }

  const data: Todo[] = await response.json();
  return data;
}