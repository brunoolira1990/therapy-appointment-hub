
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getServiceNameById } from '@/utils/serviceUtils';
import { getTimeBySlotId } from '@/utils/timeSlotUtils';
import { formatDatePtBR } from '@/utils/dateUtils';

interface AppointmentConfirmationProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  appointmentData: {
    selectedDate: Date | null;
    selectedService: string;
    selectedTimeSlot: string;
    name: string;
    email: string;
    whatsApp: string;
  };
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  open,
  onConfirm,
  onCancel,
  appointmentData
}) => {
  const { selectedDate, selectedService, selectedTimeSlot, name, email, whatsApp } = appointmentData;
  
  if (!selectedDate) return null;
  
  const serviceName = getServiceNameById(selectedService);
  const appointmentTime = getTimeBySlotId(selectedTimeSlot);
  const formattedDate = formatDatePtBR(selectedDate);
  
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Agendamento</DialogTitle>
          <DialogDescription>
            Por favor, confirme os detalhes do seu agendamento abaixo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-3">
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="font-medium text-muted-foreground">Paciente:</div>
            <div>{name}</div>
            
            <div className="font-medium text-muted-foreground">Serviço:</div>
            <div>{serviceName}</div>
            
            <div className="font-medium text-muted-foreground">Data:</div>
            <div>{formattedDate}</div>
            
            <div className="font-medium text-muted-foreground">Horário:</div>
            <div>{appointmentTime}</div>
            
            <div className="font-medium text-muted-foreground">Email:</div>
            <div className="truncate">{email}</div>
            
            <div className="font-medium text-muted-foreground">WhatsApp:</div>
            <div>{whatsApp}</div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={onCancel}>
            Voltar e Editar
          </Button>
          <Button onClick={onConfirm}>
            Confirmar Agendamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentConfirmation;
