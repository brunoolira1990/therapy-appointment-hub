
// Define tipos para o agendamento

export type AppointmentStatus = 'pending' | 'scheduled' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
}
