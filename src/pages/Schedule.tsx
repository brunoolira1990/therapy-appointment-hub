
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// Horários disponíveis para agendamento
const AVAILABLE_TIME_SLOTS = [
  { id: '1', time: '09:00' },
  { id: '2', time: '10:00' },
  { id: '3', time: '11:00' },
  { id: '4', time: '13:00' },
  { id: '5', time: '14:00' },
  { id: '6', time: '15:00' },
  { id: '7', time: '16:00' }
];

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

// Função para verificar horários disponíveis para uma data específica
const getAvailableTimeSlotsForDay = (appointments: Appointment[], date: Date): typeof AVAILABLE_TIME_SLOTS => {
  const dateString = format(date, 'yyyy-MM-dd');
  const bookedTimes = appointments
    .filter(appointment => appointment.date === dateString && 
           (appointment.status === 'scheduled' || appointment.status === 'pending'))
    .map(appointment => appointment.time);
  
  return AVAILABLE_TIME_SLOTS.filter(slot => !bookedTimes.includes(slot.time));
};

// Function to get appointments for a specific day
const getAppointmentsForDay = (appointments: Appointment[], date: Date): Appointment[] => {
  const dateString = format(date, 'yyyy-MM-dd');
  return appointments.filter(appointment => appointment.date === dateString);
};

// Color map for appointment status
const statusColorMap = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const Schedule: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  
  // Get days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
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
  
  // Get appointments for selected date
  const selectedDateAppointments = selectedDate 
    ? getAppointmentsForDay(DUMMY_APPOINTMENTS, selectedDate) 
    : [];
  
  // Get available time slots for selected date
  const availableTimeSlots = selectedDate
    ? getAvailableTimeSlotsForDay(DUMMY_APPOINTMENTS, selectedDate)
    : [];
  
  // Filter appointments based on active tab
  const filteredAppointments = selectedDateAppointments.filter(appointment => {
    if (activeTab === 'all') return true;
    return appointment.status === activeTab;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Agenda de Consultas</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie seus agendamentos e veja os compromissos da semana
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Calendar Side */}
            <div className="lg:col-span-3 bg-card rounded-xl shadow-sm border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                </h2>
                <div className="flex space-x-2">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={prevMonth}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={nextMonth}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday headers */}
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                  <div 
                    key={index} 
                    className="text-center text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
                
                {/* Days of the month */}
                {daysInMonth.map((day, i) => {
                  const appointments = getAppointmentsForDay(DUMMY_APPOINTMENTS, day);
                  const availableSlots = getAvailableTimeSlotsForDay(DUMMY_APPOINTMENTS, day);
                  const isCurrentDay = isToday(day);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const hasAvailableSlots = availableSlots.length > 0;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => handleDateSelect(day)}
                      disabled={!hasAvailableSlots}
                      className={cn(
                        "relative h-14 rounded-md flex flex-col items-center justify-center text-sm",
                        !isCurrentMonth && "text-muted-foreground opacity-50",
                        isCurrentDay && "bg-primary/10 text-primary",
                        isSelected && "bg-primary text-primary-foreground",
                        !isSelected && !isCurrentDay && hasAvailableSlots && "hover:bg-muted",
                        !hasAvailableSlots && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <span>{format(day, 'd')}</span>
                      
                      {hasAvailableSlots && (
                        <div className="absolute bottom-1 flex space-x-0.5">
                          {availableSlots.length <= 3 ? (
                            availableSlots.map((slot, j) => (
                              <div
                                key={j}
                                className="w-1.5 h-1.5 rounded-full bg-green-400"
                              />
                            ))
                          ) : (
                            <>
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              <span className="text-[10px] text-muted-foreground ml-0.5">+{availableSlots.length - 3}</span>
                            </>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-1.5" />
                  <span>Horários Disponíveis</span>
                </div>
              </div>
            </div>
            
            {/* Appointment List */}
            <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border p-6">
              <h2 className="font-semibold flex items-center mb-4">
                Próximos Agendamentos
              </h2>
              
              <div className="space-y-3">
                {DUMMY_APPOINTMENTS.slice(0, 5).map((appointment, index) => (
                  <div 
                    key={index} 
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      const [year, month, day] = appointment.date.split('-').map(Number);
                      setSelectedDate(new Date(year, month - 1, day));
                      setIsDetailsOpen(true);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <div className="text-sm text-muted-foreground">{appointment.service}</div>
                      </div>
                      <Badge variant="outline" className={statusColorMap[appointment.status]}>
                        {appointment.status === 'pending' ? 'Pendente' : 
                         appointment.status === 'scheduled' ? 'Agendada' : 
                         appointment.status === 'completed' ? 'Concluída' : 'Cancelada'}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {(() => {
                          const [year, month, day] = appointment.date.split('-').map(Number);
                          const date = new Date(year, month - 1, day);
                          return format(date, "dd 'de' MMMM", { locale: ptBR });
                        })()} às {appointment.time}
                      </span>
                    </div>
                  </div>
                ))}
                
                {DUMMY_APPOINTMENTS.length === 0 && (
                  <div className="text-center py-8">
                    <Info className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      Não há agendamentos próximos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Available Time Slots Dialog */}
      <Dialog open={showAvailableSlots} onOpenChange={setShowAvailableSlots}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </DialogTitle>
            <DialogDescription>
              Horários disponíveis para agendamento
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            {availableTimeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant="outline"
                className="text-center py-6"
                onClick={() => {
                  // Aqui você poderia redirecionar para o formulário de agendamento
                  // ou abrir um diálogo de confirmação
                  setShowAvailableSlots(false);
                }}
              >
                {slot.time}
              </Button>
            ))}
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAvailableSlots(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Daily Appointments Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </DialogTitle>
            <DialogDescription>
              Consultas agendadas para este dia
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    Nenhuma consulta encontrada nesta categoria
                  </p>
                </div>
              ) : (
                filteredAppointments.map((appointment, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{appointment.patientName}</h3>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <span>{appointment.service}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={statusColorMap[appointment.status]}>
                        {appointment.status === 'pending' ? 'Pendente' : 
                         appointment.status === 'scheduled' ? 'Agendada' : 
                         appointment.status === 'completed' ? 'Concluída' : 'Cancelada'}
                      </Badge>
                    </div>
                    
                    <div className="text-sm flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>Horário: {appointment.time}</span>
                    </div>
                    
                    {appointment.notes && (
                      <div className="text-sm bg-secondary/30 rounded p-2">
                        <p className="text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}
                    
                    <div className="pt-2 flex flex-wrap gap-2">
                      {appointment.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Confirmar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                          >
                            Recusar
                          </Button>
                        </>
                      )}
                      
                      {appointment.status === 'scheduled' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Marcar como Concluída
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Schedule;

