"use client"

import { useState } from "react"
import { format, isToday } from "date-fns"
import { CalendarStrip } from "@/components/calendar-strip"
import { TodoItem } from "@/components/todo-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTodoStore } from "@/store/todoStore"
import { Plus, Calendar } from 'lucide-react'

export default function TodoApp() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<{ id: string; title: string; description: string } | null>(null)
  const [newTodo, setNewTodo] = useState({ title: "", description: "" })

  const { addTodo, updateTodo, getTodosByDate } = useTodoStore()

  const handleAddOrUpdateTodo = () => {
    if (!newTodo.title.trim()) return

    if (editingTodo) {
      updateTodo(editingTodo.id, newTodo.title, newTodo.description)
    } else {
      addTodo(newTodo.title, newTodo.description, selectedDate)
    }

    handleCloseDialog()
  }

  const handleEditTodo = (todo: { id: string; title: string; description: string }) => {
    setEditingTodo(todo)
    setNewTodo({ title: todo.title, description: todo.description })
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingTodo(null)
    setNewTodo({ title: "", description: "" })
  }

  const todosForSelectedDate = getTodosByDate(selectedDate)

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <CalendarStrip selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold">
            {isToday(selectedDate) ? "Today" : format(selectedDate, "MMMM d, yyyy")}
          </h2>
          {isToday(selectedDate) && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              Today
            </span>
          )}
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-2 md:space-y-3">
        {todosForSelectedDate.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEditTodo}
          />
        ))}
        {todosForSelectedDate.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-2">No tasks for this day</p>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Task
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTodo ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Task title"
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Add a description"
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleAddOrUpdateTodo}>
              {editingTodo ? "Save Changes" : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

