'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { Todo, todoService } from '../services/api';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Is the backend server running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const newTodo = await todoService.create({
        title: newTodoTitle,
        isCompleted: false,
      });
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      await todoService.update(id, {
        title: todo.title,
        isCompleted: !todo.isCompleted,
      });

      setTodos(
        todos.map(t =>
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="mb-6 text-2xl font-bold text-center w-full">
          Next.js + ASP.NET Core Todo App
        </h1>
      </div>

      <div className="relative flex flex-col place-items-center w-full max-w-lg">
        <form onSubmit={handleAddTodo} className="w-full mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-grow p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="w-full p-4 bg-red-100 text-red-700 rounded mb-4">
            {error}
            <p className="mt-2 text-sm">
              Make sure your backend is running on http://localhost:5000
            </p>
          </div>
        ) : (
          <ul className="w-full">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center">No todos yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-3 mb-2 border rounded"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleToggleTodo(todo.id)}
                      className="mr-2 h-5 w-5"
                    />
                    <span
                      className={
                        todo.isCompleted ? 'line-through text-gray-500' : ''
                      }
                    >
                      {todo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-8">
        <a
          href="https://nextjs.org/docs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-xl font-semibold">
            Next.js{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn more about Next.js and its features.
          </p>
        </a>

        <a
          href="https://learn.microsoft.com/en-us/aspnet/core/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-xl font-semibold">
            ASP.NET Core{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore ASP.NET Core documentation.
          </p>
        </a>

        <a
          href="https://github.com/your-username/nextjs-aspnetcore-todo"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-xl font-semibold">
            Source Code{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            View the source code on GitHub.
          </p>
        </a>
      </div>
    </div>
  );
}
