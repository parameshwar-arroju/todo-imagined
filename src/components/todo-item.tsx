import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTodoStore, Todo } from "@/store/todoStore"

interface TodoItemProps {
  todo: Todo
  onEdit: (todo: { id: string; title: string; description: string }) => void
}

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore()

  return (
    <div className="flex items-start space-x-2 md:space-x-4 p-3 md:p-4 rounded-lg hover:bg-muted/50 transition-colors">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-semibold leading-none mb-1 truncate",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p
            className={cn(
              "text-sm text-muted-foreground mt-1 line-clamp-2",
              todo.completed && "line-through"
            )}
          >
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex gap-1 md:gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(todo)}
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTodo(todo.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  )
}

