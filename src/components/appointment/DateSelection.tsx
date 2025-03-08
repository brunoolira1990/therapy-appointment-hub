
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateSelectionProps {
  availableDates: Date[];
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  resetTimeSlot: () => void;
  formatDate: (date: Date) => string;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  availableDates,
  selectedDate,
  setSelectedDate,
  resetTimeSlot,
  formatDate
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium flex items-center">
        <CalendarIcon size={16} className="mr-1 text-primary" />
        Selecione a Data
      </label>
      {availableDates.length > 0 ? (
        <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
          {availableDates.map((date, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedDate(date);
                resetTimeSlot();
              }}
              className={cn(
                'flex-shrink-0 w-28 border rounded-xl p-3 cursor-pointer text-center transition-all',
                selectedDate && selectedDate.toDateString() === date.toDateString()
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border hover:border-primary/30'
              )}
            >
              <div className="font-medium">{formatDate(date).split(',')[0]}</div>
              <div className="text-sm mt-1">{formatDate(date).split(',')[1]}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-amber-600">
          Não há datas disponíveis para agendamento no momento.
        </p>
      )}
    </div>
  );
};

export default DateSelection;
