
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
}

interface TimeSelectionProps {
  selectedDate: Date | null;
  availableTimeSlots: TimeSlot[];
  selectedTimeSlot: string;
  setSelectedTimeSlot: (id: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedDate,
  availableTimeSlots,
  selectedTimeSlot,
  setSelectedTimeSlot
}) => {
  if (!selectedDate) return null;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium flex items-center">
        <Clock size={16} className="mr-1 text-primary" />
        Selecione o Horário
      </label>
      
      {availableTimeSlots.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {availableTimeSlots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => setSelectedTimeSlot(slot.id)}
              className={cn(
                'border rounded-lg py-2 px-3 cursor-pointer text-center transition-all',
                selectedTimeSlot === slot.id
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border hover:border-primary/30'
              )}
            >
              <div className="text-sm">{slot.time}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-amber-600">
          Não há horários disponíveis nesta data. Por favor, selecione outra data.
        </p>
      )}
    </div>
  );
};

export default TimeSelection;
