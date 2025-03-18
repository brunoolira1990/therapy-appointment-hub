
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Appointment } from '@/types/schedule';

interface AppointmentListItemProps {
  appointment: Appointment;
  statusColorMap: Record<string, string>;
}

const AppointmentListItem: React.FC<AppointmentListItemProps> = ({ 
  appointment,
  statusColorMap
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{appointment.patientName}</h3>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <span>{appointment.service}</span>
          </div>
        </div>
        <Badge variant="outline" className={statusColorMap[appointment.status]}>
          {appointment.status === 'pending' ? 'Pendente' : 
            appointment.status === 'scheduled' ? 'Agendada' : 
            appointment.status === 'completed' ? 'Concluída' : 'Cancelada'}
        </Badge>
      </div>
      
      <div className="text-sm flex items-center">
        <Clock className="h-3.5 w-3.5 mr-1" />
        <span>Horário: {appointment.time}</span>
      </div>
      
      {appointment.notes && (
        <div className="text-sm bg-secondary/30 rounded p-2">
          <p className="text-muted-foreground">{appointment.notes}</p>
        </div>
      )}
      
      <div className="pt-2 flex flex-wrap gap-2">
        {appointment.status === 'pending' && (
          <>
            <Button 
              size="sm" 
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-1 h-4 w-4" /> Confirmar
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
            >
              <XCircle className="mr-1 h-4 w-4" /> Recusar
            </Button>
          </>
        )}
        
        {appointment.status === 'scheduled' && (
          <Button 
            size="sm" 
            variant="default"
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-1 h-4 w-4" /> Marcar como Concluída
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentListItem;
