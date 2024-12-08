import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  date: string
}

interface TodoState {
  todos: Todo[]
  addTodo: (title: string, description: string, date: Date) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, title: string, description: string) => void
  deleteTodo: (id: string) => void
  getTodosByDate: (date: Date) => Todo[]
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (title, description, date) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: uuidv4(),
              title,
              description,
              completed: false,
              date: format(date, 'yyyy-MM-dd'),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      updateTodo: (id, title, description) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title, description } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      getTodosByDate: (date) => {
        const { todos } = get()
        return todos.filter((todo) => todo.date === format(date, 'yyyy-MM-dd'))
      },
    }),
    {
      name: 'todo-storage',
    }
  )
)

