
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, generateAvailableDateOptions } from '@/utils/dateUtils';
import { getAvailableTimeSlotsForDay } from '@/utils/timeSlotUtils';
import { services } from '@/utils/serviceUtils';
import { handleWhatsAppChange } from '@/utils/formUtils';
import { submitAppointment, AppointmentFormData } from '@/utils/appointmentSubmission';
import { validateAppointmentForm } from '@/utils/formValidation';
import { toast } from 'sonner';

// Empty array for appointments
const APPOINTMENTS = [];

export const useAppointmentForm = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [notes, setNotes] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setErrors({});
  };

  const validateForm = (): boolean => {
    const { isValid, errors: validationErrors } = validateAppointmentForm(
      selectedDate,
      selectedService,
      selectedTimeSlot,
      name,
      email,
      whatsApp
    );

    setErrors(validationErrors);
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowConfirmation(true);
    } else {
      toast.error('Por favor, corrija os erros no formulário antes de continuar');
    }
  };

  const handleConfirmAppointment = async () => {
    const formData: AppointmentFormData = {
      selectedDate,
      selectedService,
      selectedTimeSlot,
      name,
      email,
      whatsApp,
      notes
    };
    
    setShowConfirmation(false);
    await submitAppointment(formData, navigate, resetForm);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };
  
  const availableTimeSlots = selectedDate ? getAvailableTimeSlotsForDay(APPOINTMENTS, selectedDate) : [];
  
  const getAvailableSlotsWrapper = (date: Date) => {
    return getAvailableTimeSlotsForDay(APPOINTMENTS, date);
  };
  
  const availableDates = generateAvailableDateOptions(getAvailableSlotsWrapper);

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
    validation: {
      errors,
      validateForm
    },
    confirmation: {
      showConfirmation,
      handleConfirmAppointment,
      handleCancelConfirmation
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
      handleSubmit: handleFormSubmit
    },
    data: {
      services,
      availableDates,
      availableTimeSlots,
      formatDate
    }
  };
};
