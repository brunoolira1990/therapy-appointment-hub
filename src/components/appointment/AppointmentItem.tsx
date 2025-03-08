
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, XCircle, Send } from "lucide-react";
import { Appointment, Patient } from "@/types/patient";

interface AppointmentItemProps {
  appointment: Appointment;
  index: number;
  patient: Patient;
  formattedDate: string;
  formattedTime: string;
  onConfirm: (index: number) => void;
  onCancel: (index: number) => void;
  onComplete: (index: number) => void;
  onSendReminder: (appointment: Appointment) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  index,
  patient,
  formattedDate,
  formattedTime,
  onConfirm,
  onCancel,
  onComplete,
  onSendReminder
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{appointment.service}</h3>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
            <Clock className="ml-2 mr-1 h-4 w-4" />
            <span>{formattedTime}</span>
          </div>
        </div>
        <StatusBadge status={appointment.status} />
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
              onClick={() => onConfirm(index)}
            >
              <CheckCircle className="mr-1 h-4 w-4" /> Confirmar
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onCancel(index)}
            >
              <XCircle className="mr-1 h-4 w-4" /> Recusar
            </Button>
          </>
        )}
        
        {appointment.status === 'scheduled' && (
          <>
            <Button 
              size="sm" 
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onComplete(index)}
            >
              <CheckCircle className="mr-1 h-4 w-4" /> Marcar como Concluída
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onCancel(index)}
            >
              <XCircle className="mr-1 h-4 w-4" /> Cancelar
            </Button>
          </>
        )}
        
        {(appointment.status === 'scheduled' || appointment.status === 'pending') && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onSendReminder(appointment)}
          >
            <Send className="mr-1 h-4 w-4" /> Enviar Lembrete
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentItem;

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pendente</Badge>;
    case 'scheduled':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Agendada</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Concluída</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
