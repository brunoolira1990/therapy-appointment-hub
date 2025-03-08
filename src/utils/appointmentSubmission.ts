
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { sendAppointmentConfirmation } from './notifications';
import { getServiceNameById } from './serviceUtils';
import { getTimeBySlotId } from './timeSlotUtils';
import { formatDatePtBR } from './dateUtils';

export interface AppointmentFormData {
  selectedDate: Date | null;
  selectedService: string;
  selectedTimeSlot: string;
  name: string;
  email: string;
  whatsApp: string;
  notes: string;
}

export const submitAppointment = async (
  formData: AppointmentFormData,
  navigate: ReturnType<typeof useNavigate>,
  resetForm: () => void
): Promise<void> => {
  const {
    selectedDate,
    selectedService,
    selectedTimeSlot,
    name,
    email,
    whatsApp,
    notes
  } = formData;
  
  if (!selectedDate || !selectedService || !selectedTimeSlot || !name || !email || !whatsApp) {
    toast.error('Por favor, preencha todos os campos obrigatórios');
    return;
  }
  
  // Format appointment data
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const formattedDatePtBR = selectedDate ? formatDatePtBR(selectedDate) : '';
  const appointmentTime = getTimeBySlotId(selectedTimeSlot);
  const serviceName = getServiceNameById(selectedService);
  
  // For debugging
  console.log({ ...formData, formattedDate, formattedDatePtBR, appointmentTime, serviceName });
  
  // Create a patient object with the appointment
  const patientAppointment = {
    name,
    email,
    whatsApp,
    birthDate: '', // This field would need to be filled on the patients page
    appointments: [
      {
        date: formattedDate,
        time: appointmentTime,
        status: 'pending',
        service: serviceName,
        notes
      }
    ]
  };
  
  // In a real app, this would be saved to a backend
  // As we're working with example data, we'll temporarily store in localStorage
  const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
  pendingAppointments.push(patientAppointment);
  localStorage.setItem('pendingAppointments', JSON.stringify(pendingAppointments));
  
  // Send notifications
  try {
    const notificationResult = await sendAppointmentConfirmation(
      name,
      email,
      whatsApp,
      serviceName,
      formattedDatePtBR,
      appointmentTime
    );
    
    if (notificationResult.email || notificationResult.whatsApp) {
      console.log('Notifications sent successfully!');
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
  
  // Show success message
  toast.success('Appointment request sent successfully!', {
    description: 'You will be redirected to the confirmation page.'
  });
  
  // Reset form
  resetForm();
  
  // Redirect to patients page (or confirmation page)
  setTimeout(() => {
    navigate('/patients');
  }, 2000);
};
