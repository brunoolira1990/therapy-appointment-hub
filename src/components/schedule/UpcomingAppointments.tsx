
import React from 'react';
import { CalendarIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/types/schedule';
import { statusColorMap } from '@/utils/scheduleUtils';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ 
  appointments,
  onAppointmentClick
}) => {
  return (
    <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border p-6">
      <h2 className="font-semibold flex items-center mb-4">
        Próximos Agendamentos
      </h2>
      
      <div className="space-y-3">
        {appointments.slice(0, 5).map((appointment, index) => (
          <div 
            key={index} 
            className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => onAppointmentClick(appointment)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{appointment.patientName}</h3>
                <div className="text-sm text-muted-foreground">{appointment.service}</div>
              </div>
              <Badge variant="outline" className={statusColorMap[appointment.status]}>
                {appointment.status === 'pending' ? 'Pendente' : 
                 appointment.status === 'scheduled' ? 'Agendada' : 
                 appointment.status === 'completed' ? 'Concluída' : 'Cancelada'}
              </Badge>
            </div>
            <div className="mt-2 text-sm flex items-center">
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              <span>
                {(() => {
                  const [year, month, day] = appointment.date.split('-').map(Number);
                  const date = new Date(year, month - 1, day);
                  return format(date, "dd 'de' MMMM", { locale: ptBR });
                })()} às {appointment.time}
              </span>
            </div>
          </div>
        ))}
        
        {appointments.length === 0 && (
          <div className="text-center py-8">
            <Info className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">
              Não há agendamentos próximos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
