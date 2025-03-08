
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, generateAvailableDateOptions } from '@/utils/dateUtils';
import { getAvailableTimeSlotsForDay } from '@/utils/timeSlotUtils';
import { services } from '@/utils/serviceUtils';
import { handleWhatsAppChange } from '@/utils/formUtils';
import { submitAppointment, AppointmentFormData } from '@/utils/appointmentSubmission';

export const useAppointmentForm = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [notes, setNotes] = useState('');
  
  const resetTimeSlot = () => {
    setSelectedTimeSlot('');
  };

  const resetForm = () => {
    setSelectedDate(null);
    setSelectedService('');
    setSelectedTimeSlot('');
    setName('');
    setEmail('');
    setWhatsApp('');
    setNotes('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: AppointmentFormData = {
      selectedDate,
      selectedService,
      selectedTimeSlot,
      name,
      email,
      whatsApp,
      notes
    };
    
    await submitAppointment(formData, navigate, resetForm);
  };
  
  // Get available time slots for the selected date
  const availableTimeSlots = selectedDate ? getAvailableTimeSlotsForDay(selectedDate) : [];
  
  // Generate list of available dates
  const availableDates = generateAvailableDateOptions(getAvailableTimeSlotsForDay);

  return {
    formData: {
      selectedDate,
      selectedService,
      selectedTimeSlot,
      name,
      email,
      whatsApp,
      notes
    },
    setters: {
      setSelectedDate,
      setSelectedService,
      setSelectedTimeSlot,
      setName,
      setEmail,
      setNotes
    },
    handlers: {
      handleWhatsAppChange: (e: React.ChangeEvent<HTMLInputElement>) => 
        handleWhatsAppChange(e, setWhatsApp),
      resetTimeSlot,
      handleSubmit
    },
    data: {
      services,
      availableDates,
      availableTimeSlots,
      formatDate
    }
  };
};
