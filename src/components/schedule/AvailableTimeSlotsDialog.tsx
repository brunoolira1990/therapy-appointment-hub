
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TimeSlot } from '@/types/schedule';

interface AvailableTimeSlotsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  availableTimeSlots: TimeSlot[];
  onTimeSlotClick: (slot: TimeSlot) => void;
}

const AvailableTimeSlotsDialog: React.FC<AvailableTimeSlotsDialogProps> = ({
  open,
  onOpenChange,
  selectedDate,
  availableTimeSlots,
  onTimeSlotClick
}) => {
  if (!selectedDate) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </DialogTitle>
          <DialogDescription>
            Horários disponíveis para agendamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          {availableTimeSlots.map((slot) => (
            <Button
              key={slot.id}
              variant="outline"
              className="text-center py-6"
              onClick={() => onTimeSlotClick(slot)}
            >
              {slot.time}
            </Button>
          ))}
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvailableTimeSlotsDialog;
