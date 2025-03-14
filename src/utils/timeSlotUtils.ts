
import { format } from 'date-fns';
import { bookedAppointments } from './dateUtils';

export interface TimeSlot {
  id: string;
  time: string;
}

// Available time slots
export const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00' },
  { id: '2', time: '10:00' },
  { id: '3', time: '11:00' },
  { id: '4', time: '13:00' },
  { id: '5', time: '14:00' },
  { id: '6', time: '15:00' },
  { id: '7', time: '16:00' }
];

// Function to check available time slots for a specific date
export const getAvailableTimeSlotsForDay = (date: Date): TimeSlot[] => {
  if (!date) return [];
  
  const dateString = format(date, 'yyyy-MM-dd');
  const bookedTimes = bookedAppointments
    .filter(appointment => appointment.date === dateString)
    .map(appointment => appointment.time);
  
  return timeSlots.filter(slot => !bookedTimes.includes(slot.time));
};

// Utility to get time by slot ID
export const getTimeBySlotId = (id: string): string => {
  const timeSlot = timeSlots.find(slot => slot.id === id);
  return timeSlot ? timeSlot.time : '';
};
