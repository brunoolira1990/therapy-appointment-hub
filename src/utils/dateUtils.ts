
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface for booked appointments
export interface BookedAppointment {
  date: string;
  time: string;
}

// Example of booked appointments (in production would come from an API)
export const bookedAppointments: BookedAppointment[] = [
  { date: '2023-09-10', time: '09:00' },
  { date: '2023-09-10', time: '14:00' },
  { date: '2023-09-11', time: '10:00' },
];

// Function to format date for UI display
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(date);
};

// Function to format a date to Brazil's format
export const formatDatePtBR = (date: Date) => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

// Generate available date options for the next 14 days
export const generateAvailableDateOptions = (getAvailableTimeSlots: (date: Date) => any[]) => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      // Check if there's at least one available time slot on this day
      const availableSlots = getAvailableTimeSlots(date);
      if (availableSlots.length > 0) {
        dates.push(date);
      }
    }
  }
  
  return dates;
};
