
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  description: string;
}

interface TimeSlot {
  id: string;
  time: string;
}

interface AppointmentFormProps {
  className?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ className }) => {
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
  
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00' },
    { id: '2', time: '10:00' },
    { id: '3', time: '11:00' },
    { id: '4', time: '13:00' },
    { id: '5', time: '14:00' },
    { id: '6', time: '15:00' },
    { id: '7', time: '16:00' }
  ];
  
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Pula fins de semana (0 = Domingo, 6 = Sábado)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedService || !selectedTimeSlot || !name || !email || !whatsApp) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Formatar os dados do agendamento
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
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
          time: getTimeBySlotId(selectedTimeSlot),
          status: 'pending',
          service: getServiceNameById(selectedService),
          notes: notes
        }
      ]
    };
    
    // Em um aplicativo real, isso seria salvo no backend
    // Como estamos trabalhando com dados de exemplo, iremos armazenar temporariamente no localStorage
    const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
    pendingAppointments.push(patientAppointment);
    localStorage.setItem('pendingAppointments', JSON.stringify(pendingAppointments));
    
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
  
  return (
    <div className={cn('glass-card rounded-2xl overflow-hidden', className)}>
      <div className="bg-primary px-6 py-4 text-primary-foreground">
        <h3 className="text-xl font-bold">Agende Sua Consulta</h3>
        <p className="text-primary-foreground/80 text-sm">
          Preencha o formulário abaixo para agendar uma sessão
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Seleção de Serviço */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Selecione o Serviço
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={cn(
                  'border rounded-xl p-4 cursor-pointer transition-all',
                  selectedService === service.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {service.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Seleção de Data */}
        <div className="space-y-3">
          <label className="block text-sm font-medium flex items-center">
            <CalendarIcon size={16} className="mr-1 text-primary" />
            Selecione a Data
          </label>
          <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
            {generateDateOptions().map((date, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'flex-shrink-0 w-28 border rounded-xl p-3 cursor-pointer text-center transition-all',
                  selectedDate && selectedDate.toDateString() === date.toDateString()
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <div className="font-medium">{formatDate(date).split(',')[0]}</div>
                <div className="text-sm mt-1">{formatDate(date).split(',')[1]}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Seleção de Horário */}
        <div className="space-y-3">
          <label className="block text-sm font-medium flex items-center">
            <Clock size={16} className="mr-1 text-primary" />
            Selecione o Horário
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={cn(
                  'border rounded-lg py-2 px-3 cursor-pointer text-center transition-all',
                  selectedTimeSlot === slot.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <div className="text-sm">{slot.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Informações de Contato */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Suas Informações
          </label>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="email"
                placeholder="Endereço de Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
              
              <div className="relative">
                <input
                  type="tel"
                  placeholder="WhatsApp (DD) XXXXX-XXXX"
                  value={whatsApp}
                  onChange={handleWhatsAppChange}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Formato brasileiro: (XX) XXXXX-XXXX
                </p>
              </div>
            </div>
            
            <textarea
              placeholder="Observações Adicionais (Opcional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none h-24"
            />
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
        >
          Solicitar Agendamento
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          Ao enviar este formulário, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </form>
    </div>
  );
};

export default AppointmentForm;
