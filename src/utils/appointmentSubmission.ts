
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { sendAppointmentConfirmation } from './notifications';
import { getServiceNameById } from './serviceUtils';
import { getTimeBySlotId } from './timeSlotUtils';
import { formatDatePtBR } from './dateUtils';
import { addPatient, addAppointment } from '@/services/database';

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
  
  try {
    // Criar novo agendamento no banco de dados
    
    // 1. Verificar se o paciente já existe ou adicionar novo
    // Primeiro tente salvar no banco de dados
    const newPatient = {
      name,
      email,
      whatsApp,
      birthDate: new Date().toISOString().split('T')[0], // Data atual como fallback
      appointments: []
    };
    
    const patient = await addPatient(newPatient);
    
    // 2. Adicionar o agendamento ao paciente
    const appointment = {
      date: formattedDate,
      time: appointmentTime,
      status: 'pending',
      service: serviceName,
      notes
    };
    
    await addAppointment(patient.id, appointment);
    
    // Enviar notificações
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
    } catch (notificationError) {
      console.error('Error sending notifications:', notificationError);
    }
    
    // Mostrar mensagem de sucesso
    toast.success('Agendamento enviado com sucesso!', {
      description: 'Você será redirecionado para a página de confirmação.'
    });
    
    // Resetar formulário
    resetForm();
    
    // Redirecionar para a página de pacientes
    setTimeout(() => {
      navigate('/patients');
    }, 2000);
  } catch (error) {
    console.error('Error saving appointment:', error);
    
    // Fallback para localStorage em caso de erro na conexão com o banco
    toast.error('Erro ao conectar ao banco de dados', {
      description: 'Salvando localmente por enquanto'
    });
    
    // Criar um objeto de paciente com o agendamento
    const patientAppointment = {
      name,
      email,
      whatsApp,
      birthDate: '',
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
    
    // Salvar no localStorage como fallback
    const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
    pendingAppointments.push(patientAppointment);
    localStorage.setItem('pendingAppointments', JSON.stringify(pendingAppointments));
    
    // Ainda mostrar mensagem de sucesso e redirecionar
    toast.success('Agendamento enviado com sucesso!', {
      description: 'Você será redirecionado para a página de confirmação.'
    });
    
    // Resetar formulário
    resetForm();
    
    // Redirecionar para a página de pacientes
    setTimeout(() => {
      navigate('/patients');
    }, 2000);
  }
};
