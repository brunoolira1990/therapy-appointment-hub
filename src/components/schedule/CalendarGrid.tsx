
import React from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/schedule';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  appointments: Appointment[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
  getAvailableTimeSlotsForDay: (date: Date) => any[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  appointments,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  getAvailableTimeSlotsForDay
}) => {
  // Get days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <div className="flex space-x-2">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onPrevMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
          <div 
            key={index} 
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
        
        {/* Days of the month */}
        {daysInMonth.map((day, i) => {
          const availableSlots = getAvailableTimeSlotsForDay(day);
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const hasAvailableSlots = availableSlots.length > 0;
          
          return (
            <button
              key={i}
              onClick={() => hasAvailableSlots && onSelectDate(day)}
              disabled={!hasAvailableSlots}
              className={cn(
                "relative h-14 rounded-md flex flex-col items-center justify-center text-sm",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isCurrentDay && "bg-primary/10 text-primary",
                isSelected && "bg-primary text-primary-foreground",
                !isSelected && !isCurrentDay && hasAvailableSlots && "hover:bg-muted",
                !hasAvailableSlots && "opacity-50 cursor-not-allowed"
              )}
            >
              <span>{format(day, 'd')}</span>
              
              {hasAvailableSlots && (
                <div className="absolute bottom-1 flex space-x-0.5">
                  {availableSlots.length <= 3 ? (
                    availableSlots.map((slot, j) => (
                      <div
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                      />
                    ))
                  ) : (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[10px] text-muted-foreground ml-0.5">+{availableSlots.length - 3}</span>
                    </>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-1.5" />
          <span>Horários Disponíveis</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
