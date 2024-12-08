import { format, eachDayOfInterval, startOfWeek, endOfWeek, isToday } from "date-fns"

interface CalendarStripProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export function CalendarStrip({ selectedDate, onDateSelect }: CalendarStripProps) {
  const weekStart = startOfWeek(selectedDate)
  const weekEnd = endOfWeek(selectedDate)
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">{format(selectedDate, "MMMM yyyy")}</h1>
      <div className="flex justify-center">
        <div className="flex gap-1 md:gap-2 overflow-x-auto">
          {days.map((day) => {
            const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
            const isCurrentDay = isToday(day)
            return (
              <button
                key={day.toString()}
                onClick={() => onDateSelect(day)}
                className={`flex flex-col items-center p-1 md:p-2 rounded-lg min-w-[40px] md:min-w-[48px] transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isCurrentDay
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <span className="text-xs md:text-sm font-medium">
                  {format(day, "EEE")}
                </span>
                <span className={`text-lg md:text-xl font-bold ${isCurrentDay && !isSelected ? "text-primary" : ""}`}>
                  {format(day, "d")}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

