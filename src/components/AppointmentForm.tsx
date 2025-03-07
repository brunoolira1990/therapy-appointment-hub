
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Processa envio do formulário
    console.log({
      name,
      email,
      phone,
      selectedDate,
      selectedService,
      selectedTimeSlot,
      notes
    });
    
    // Aqui você normalmente enviaria esses dados para o backend
    alert('Solicitação de consulta enviada. Entraremos em contato para confirmar.');
    
    // Reseta formulário
    setSelectedDate(null);
    setSelectedService('');
    setSelectedTimeSlot('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
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
              
              <input
                type="tel"
                placeholder="Número de Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
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
