import { Todo } from "@/types/todo"

const STORAGE_KEY = "todos"

export function getTodos(): Todo[] {
  if (typeof window === "undefined") return []
  const todos = localStorage.getItem(STORAGE_KEY)
  return todos ? JSON.parse(todos) : []
}

export function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function groupTodosByDate(todos: Todo[]) {
  return todos.reduce((groups: { [key: string]: Todo[] }, todo) => {
    const date = todo.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(todo)
    return groups
  }, {})
}

export function getTodosByDate(date: string): Todo[] {
  const allTodos = getTodos()
  return allTodos.filter(todo => todo.date === date)
}

export function addTodo(todo: Todo) {
  const todos = getTodos()
  todos.push(todo)
  saveTodos(todos)
}

export function updateTodo(updatedTodo: Todo) {
  const todos = getTodos()
  const index = todos.findIndex(todo => todo.id === updatedTodo.id)
  if (index !== -1) {
    todos[index] = updatedTodo
    saveTodos(todos)
  }
}

export function deleteTodo(id: string) {
  const todos = getTodos()
  const updatedTodos = todos.filter(todo => todo.id !== id)
  saveTodos(updatedTodos)
}

