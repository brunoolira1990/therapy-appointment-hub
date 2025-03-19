
import { format } from 'date-fns';
import { Appointment, TimeSlot } from '@/types/schedule';

// Horários disponíveis para agendamento baseados no horário de trabalho da doutora
export const AVAILABLE_TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '08:00' },
  { id: '2', time: '09:00' },
  { id: '3', time: '10:00' },
  { id: '4', time: '11:00' },
  { id: '5', time: '14:00' },
  { id: '6', time: '15:00' },
  { id: '7', time: '16:00' },
  { id: '8', time: '17:00' }
];

// Função para verificar horários disponíveis para uma data específica
export const getAvailableTimeSlotsForDay = (appointments: Appointment[], date: Date): TimeSlot[] => {
  if (!date) return [];
  
  const dateString = format(date, 'yyyy-MM-dd');
  const bookedTimes = appointments
    .filter(appointment => appointment.date === dateString && 
           (appointment.status === 'scheduled' || appointment.status === 'pending'))
    .map(appointment => appointment.time);
  
  // If there are no appointments, return all available time slots
  return AVAILABLE_TIME_SLOTS.filter(slot => !bookedTimes.includes(slot.time));
};

// Function to get appointments for a specific day
export const getAppointmentsForDay = (appointments: Appointment[], date: Date): Appointment[] => {
  if (!date) return [];
  const dateString = format(date, 'yyyy-MM-dd');
  return appointments.filter(appointment => appointment.date === dateString);
};

// Color map for appointment status
export const statusColorMap = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};
