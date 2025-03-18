
import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Appointment, TimeSlot } from '@/types/schedule';
import { getAvailableTimeSlotsForDay, getAppointmentsForDay } from '@/utils/scheduleUtils';

// Empty array instead of dummy data
const APPOINTMENTS: Appointment[] = [];

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
    
    // Always show available time slots since there are no appointments
    setShowAvailableSlots(true);
  };
  
  // Function to handle time slot selection
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setShowAvailableSlots(false);
    // Here you could redirect to the appointment form with the selected slot
  };
  
  // Function to handle appointment click
  const handleAppointmentClick = (appointment: Appointment) => {
    const [year, month, day] = appointment.date.split('-').map(Number);
    setSelectedDate(new Date(year, month - 1, day));
    setIsDetailsOpen(true);
  };
  
  // Get appointments for selected date
  const selectedDateAppointments = selectedDate 
    ? getAppointmentsForDay(APPOINTMENTS, selectedDate) 
    : [];
  
  // Get available time slots for selected date
  const availableTimeSlots = selectedDate
    ? getAvailableTimeSlotsForDay(APPOINTMENTS, selectedDate)
    : [];
  
  return {
    currentMonth,
    selectedDate,
    isDetailsOpen,
    activeTab,
    showAvailableSlots,
    appointments: APPOINTMENTS,
    selectedDateAppointments,
    availableTimeSlots,
    getAvailableTimeSlotsForDay,
    actions: {
      nextMonth,
      prevMonth,
      handleDateSelect,
      handleTimeSlotSelect,
      handleAppointmentClick,
      setActiveTab,
      setIsDetailsOpen,
      setShowAvailableSlots,
      getAvailableTimeSlotsForDay
    }
  };
};
