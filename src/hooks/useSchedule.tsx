
import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Appointment, TimeSlot } from '@/types/schedule';
import { getAvailableTimeSlotsForDay, getAppointmentsForDay } from '@/utils/scheduleUtils';

// Dummy data for demonstration - would come from an API in production
const DUMMY_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'João Silva',
    patientId: 'p1',
    service: 'Fisioterapia Geral',
    date: '2023-08-15',
    time: '09:00',
    status: 'scheduled',
  },
  {
    id: '2',
    patientName: 'Maria Oliveira',
    patientId: 'p2',
    service: 'Pilates',
    date: '2023-08-15',
    time: '14:30',
    status: 'scheduled',
  },
  {
    id: '3',
    patientName: 'Carlos Santos',
    patientId: 'p3',
    service: 'Fisioterapia Neurológica',
    date: '2023-08-17',
    time: '10:00',
    status: 'pending',
  },
  {
    id: '4',
    patientName: 'Ana Pereira',
    patientId: 'p4',
    service: 'Acupuntura',
    date: '2023-08-18',
    time: '15:00',
    status: 'scheduled',
  },
  {
    id: '5',
    patientName: 'Ricardo Almeida',
    patientId: 'p5',
    service: 'Fisioterapia Esportiva',
    date: '2023-08-22',
    time: '11:30',
    status: 'scheduled',
  }
];

export const useSchedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  
  // Function to go to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Function to go to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Function to handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    // Se a data tiver horários disponíveis, mostra o diálogo de horários disponíveis
    const availableSlots = getAvailableTimeSlotsForDay(DUMMY_APPOINTMENTS, date);
    if (availableSlots.length > 0) {
      setShowAvailableSlots(true);
    } else {
      setIsDetailsOpen(true);
    }
  };
  
  // Function to handle time slot selection
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setShowAvailableSlots(false);
    // Aqui você poderia redirecionar para o formulário de agendamento
    // ou abrir um diálogo de confirmação
  };
  
  // Function to handle appointment click
  const handleAppointmentClick = (appointment: Appointment) => {
    const [year, month, day] = appointment.date.split('-').map(Number);
    setSelectedDate(new Date(year, month - 1, day));
    setIsDetailsOpen(true);
  };
  
  // Get appointments for selected date
  const selectedDateAppointments = selectedDate 
    ? getAppointmentsForDay(DUMMY_APPOINTMENTS, selectedDate) 
    : [];
  
  // Get available time slots for selected date
  const availableTimeSlots = selectedDate
    ? getAvailableTimeSlotsForDay(DUMMY_APPOINTMENTS, selectedDate)
    : [];
  
  return {
    currentMonth,
    selectedDate,
    isDetailsOpen,
    activeTab,
    showAvailableSlots,
    appointments: DUMMY_APPOINTMENTS,
    selectedDateAppointments,
    availableTimeSlots,
    getAvailableTimeSlotsForDay: (date: Date) => getAvailableTimeSlotsForDay(DUMMY_APPOINTMENTS, date),
    actions: {
      nextMonth,
      prevMonth,
      handleDateSelect,
      handleTimeSlotSelect,
      handleAppointmentClick,
      setActiveTab,
      setIsDetailsOpen,
      setShowAvailableSlots
    }
  };
};
