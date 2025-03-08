
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { sendAppointmentConfirmation } from '@/utils/notifications';

interface Service {
  id: string;
  name: string;
  description: string;
}

interface TimeSlot {
  id: string;
  time: string;
}

export interface AppointmentFormData {
  selectedDate: Date | null;
  selectedService: string;
  selectedTimeSlot: string;
  name: string;
  email: string;
  whatsApp: string;
  notes: string;
}

export const useAppointmentForm = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [notes, setNotes] = useState('');
  
  // Dados de exemplo
  const services: Service[] = [
    { id: '1', name: 'Reabilitação Física', description: 'Recuperação de lesões ou cirurgias' },
    { id: '2', name: 'Terapia Esportiva', description: 'Terapia especializada para atletas' },
    { id: '3', name: 'Terapia Manual', description: 'Técnicas manuais para alívio da dor' },
    { id: '4', name: 'Terapia Neurológica', description: 'Tratamento para condições neurológicas' }
  ];
  
  // Horários disponíveis
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00' },
    { id: '2', time: '10:00' },
    { id: '3', time: '11:00' },
    { id: '4', time: '13:00' },
    { id: '5', time: '14:00' },
    { id: '6', time: '15:00' },
    { id: '7', time: '16:00' }
  ];
  
  // Exemplo de consultas agendadas (em produção viria de uma API)
  const bookedAppointments = [
    { date: '2023-09-10', time: '09:00' },
    { date: '2023-09-10', time: '14:00' },
    { date: '2023-09-11', time: '10:00' },
  ];
  
  // Função para verificar horários disponíveis para uma data específica
  const getAvailableTimeSlotsForDay = (date: Date): TimeSlot[] => {
    if (!date) return [];
    
    const dateString = format(date, 'yyyy-MM-dd');
    const bookedTimes = bookedAppointments
      .filter(appointment => appointment.date === dateString)
      .map(appointment => appointment.time);
    
    return timeSlots.filter(slot => !bookedTimes.includes(slot.time));
  };
  
  const generateAvailableDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Pula fins de semana (0 = Domingo, 6 = Sábado)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        // Verifica se há pelo menos um horário disponível neste dia
        const availableSlots = getAvailableTimeSlotsForDay(date);
        if (availableSlots.length > 0) {
          dates.push(date);
        }
      }
    }
    
    return dates;
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };
  
  const getServiceNameById = (id: string) => {
    const service = services.find(service => service.id === id);
    return service ? service.name : '';
  };
  
  const getTimeBySlotId = (id: string) => {
    const timeSlot = timeSlots.find(slot => slot.id === id);
    return timeSlot ? timeSlot.time : '';
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Remove non-digit characters
    let digits = value.replace(/\D/g, '');
    
    // Format according to Brazilian phone number pattern
    if (digits.length <= 2) {
      setWhatsApp(digits);
    } else if (digits.length <= 7) {
      setWhatsApp(`(${digits.slice(0, 2)}) ${digits.slice(2)}`);
    } else if (digits.length <= 11) {
      setWhatsApp(`(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`);
    } else {
      // Limit to 11 digits (Brazilian standard: 2 for area code + 9 for number)
      setWhatsApp(`(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`);
    }
  };

  const resetTimeSlot = () => {
    setSelectedTimeSlot('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedService || !selectedTimeSlot || !name || !email || !whatsApp) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Formatar os dados do agendamento
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
    const formattedDatePtBR = selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : '';
    const appointmentTime = getTimeBySlotId(selectedTimeSlot);
    const serviceName = getServiceNameById(selectedService);
    
    const appointmentData = {
      name,
      email,
      whatsApp,
      selectedDate,
      selectedService,
      selectedTimeSlot,
      notes
    };
    
    // Log dos dados para debug
    console.log(appointmentData);
    
    // Criar um objeto de paciente com o agendamento
    const patientAppointment = {
      name,
      email,
      whatsApp,
      birthDate: '', // Este campo precisará ser preenchido na página de pacientes
      appointments: [
        {
          date: formattedDate,
          time: appointmentTime,
          status: 'pending',
          service: serviceName,
          notes: notes
        }
      ]
    };
    
    // Em um aplicativo real, isso seria salvo no backend
    // Como estamos trabalhando com dados de exemplo, iremos armazenar temporariamente no localStorage
    const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
    pendingAppointments.push(patientAppointment);
    localStorage.setItem('pendingAppointments', JSON.stringify(pendingAppointments));
    
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
        console.log('Notificações enviadas com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar notificações:', error);
    }
    
    // Mostrar mensagem de sucesso
    toast.success('Solicitação de consulta enviada com sucesso!', {
      description: 'Você será redirecionado para a página de confirmação.'
    });
    
    // Resetar formulário
    setSelectedDate(null);
    setSelectedService('');
    setSelectedTimeSlot('');
    setName('');
    setEmail('');
    setWhatsApp('');
    setNotes('');
    
    // Redirecionar para página de pacientes (ou página de confirmação)
    setTimeout(() => {
      navigate('/patients');
    }, 2000);
  };
  
  // Lista de datas disponíveis
  const availableDates = generateAvailableDateOptions();
  
  // Obtenha os horários disponíveis para a data selecionada
  const availableTimeSlots = selectedDate ? getAvailableTimeSlotsForDay(selectedDate) : [];

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
      handleWhatsAppChange,
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
