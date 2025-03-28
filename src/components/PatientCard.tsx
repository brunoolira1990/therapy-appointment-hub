
import React from 'react';
import { cn } from '@/lib/utils';
import { Edit, Trash2, Phone, Mail, Calendar, ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface PatientCardProps {
  name: string;
  email: string;
  whatsApp: string;  // Changed from phone to whatsApp
  birthDate: string;
  patientId: string;
  appointmentsCount: number;
  appointments?: any[];
  hasPendingAppointment?: boolean;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewAppointments?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  name,
  email,
  whatsApp,  // Changed from phone to whatsApp
  birthDate,
  patientId,
  appointmentsCount,
  appointments = [],
  hasPendingAppointment = false,
  className,
  onEdit,
  onDelete,
  onViewAppointments,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Count appointments by status
  const pendingCount = appointments?.filter(a => a.status === 'pending').length || 0;
  const scheduledCount = appointments?.filter(a => a.status === 'scheduled').length || 0;
  const completedCount = appointments?.filter(a => a.status === 'completed').length || 0;

  return (
    <div
      className={cn(
        'relative rounded-2xl glass-card overflow-hidden transition-all duration-300',
        className
      )}
    >
      {hasPendingAppointment && (
        <div className="absolute top-3 right-3 flex items-center justify-center">
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full flex items-center">
            <Clock size={12} className="mr-1" /> Pendente
          </span>
        </div>
      )}
      
      <div className="p-6">
        {/* Avatar & Name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-3">
              <h3 className="font-bold text-lg">{name}</h3>
              <div className="flex items-center mt-1">
                <ClipboardList size={14} className="text-primary mr-1" />
                <span className="text-xs text-muted-foreground">
                  {appointmentsCount} {appointmentsCount === 1 ? 'consulta' : 'consultas'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={onEdit} 
              className="p-2 rounded-full text-foreground/60 hover:text-primary hover:bg-secondary transition-colors"
              aria-label="Editar paciente"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={onDelete} 
              className="p-2 rounded-full text-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
              aria-label="Excluir paciente"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail size={14} className="mr-2" />
            <span>{email}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone size={14} className="mr-2" />
            <span>{whatsApp}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={14} className="mr-2" />
            <span>Nascido em {formatDate(birthDate)}</span>
          </div>
        </div>

        {/* Appointment Status Summary */}
        {appointmentsCount > 0 && (
          <div className="mt-4 flex gap-2">
            {pendingCount > 0 && (
              <div className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full flex items-center">
                <Clock size={12} className="mr-1" /> {pendingCount} pendente{pendingCount !== 1 ? 's' : ''}
              </div>
            )}
            {scheduledCount > 0 && (
              <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center">
                <Calendar size={12} className="mr-1" /> {scheduledCount} agendada{scheduledCount !== 1 ? 's' : ''}
              </div>
            )}
            {completedCount > 0 && (
              <div className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full flex items-center">
                <CheckCircle size={12} className="mr-1" /> {completedCount} concluída{completedCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="border-t border-border px-6 py-3 bg-secondary/40 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          ID Paciente: {patientId}
        </span>
        <button 
          className="text-sm font-medium text-primary hover:underline"
          onClick={onViewAppointments}
        >
          Ver Consultas
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
