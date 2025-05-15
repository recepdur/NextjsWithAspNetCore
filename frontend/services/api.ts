// Types
export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

// API url
const API_URL = 'http://localhost:5000/api';

// API services
export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/todo`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_URL}/todo/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch todo with id ${id}`);
    }
    return response.json();
  },

  create: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await fetch(`${API_URL}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  update: async (id: number, todo: Omit<Todo, 'id'>): Promise<void> => {
    const response = await fetch(`${API_URL}/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, id }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update todo with id ${id}`);
    }
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/todo/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete todo with id ${id}`);
    }
  },
};
