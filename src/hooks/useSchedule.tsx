
import React, { useState, useCallback, useMemo } from 'react';
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
  
  // Memoize functions to prevent unnecessary re-renders
  const nextMonth = useCallback(() => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  }, []);
  
  const prevMonth = useCallback(() => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  }, []);
  
  // Function to handle date selection
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    // Always show available time slots since there are no appointments
    setShowAvailableSlots(true);
  }, []);
  
  // Function to handle time slot selection
  const handleTimeSlotSelect = useCallback((slot: TimeSlot) => {
    setShowAvailableSlots(false);
    // Here you could redirect to the appointment form with the selected slot
  }, []);
  
  // Function to handle appointment click
  const handleAppointmentClick = useCallback((appointment: Appointment) => {
    const [year, month, day] = appointment.date.split('-').map(Number);
    setSelectedDate(new Date(year, month - 1, day));
    setIsDetailsOpen(true);
  }, []);
  
  // Get appointments for selected date - memoized to improve performance
  const selectedDateAppointments = useMemo(() => 
    selectedDate ? getAppointmentsForDay(APPOINTMENTS, selectedDate) : [],
  [selectedDate]);
  
  // Get available time slots for selected date - memoized to improve performance
  const availableTimeSlots = useMemo(() => 
    selectedDate ? getAvailableTimeSlotsForDay(APPOINTMENTS, selectedDate) : [],
  [selectedDate]);
  
  // Memoize the getAvailableTimeSlotsForDay function to avoid unnecessary calculations
  const getAvailableTimeSlotsForDay = useCallback((date: Date) => {
    return getAvailableTimeSlotsForDay(APPOINTMENTS, date);
  }, []);
  
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
      setShowAvailableSlots
    }
  };
};
