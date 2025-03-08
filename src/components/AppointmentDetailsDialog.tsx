import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, XCircle, Send, AlertTriangle, Mail, MessageSquare } from "lucide-react";
import { 
  sendWhatsApp, 
  sendEmail, 
  formatConfirmationMessage,
  formatReminderMessage,
  formatCancellationMessage
} from "@/utils/notifications";

interface Appointment {
  id?: string;
  date: string;
  time: string;
  status: string;
  service: string;
  notes?: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  whatsApp: string;
  birthDate: string;
  appointments: Appointment[];
}

interface AppointmentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onConfirmAppointment: (patientId: string, appointmentIndex: number) => void;
  onCancelAppointment: (patientId: string, appointmentIndex: number) => void;
  onCompleteAppointment?: (patientId: string, appointmentIndex: number) => void;
}

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  isOpen,
  onClose,
  patient,
  onConfirmAppointment,
  onCancelAppointment,
  onCompleteAppointment
}) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!patient) return null;

  const formatAppointmentDateTime = (date: string, time: string) => {
    try {
      const [year, month, day] = date.split('-').map(Number);
      const appointmentDate = new Date(year, month - 1, day);
      
      return {
        date: format(appointmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
        time: time
      };
    } catch (error) {
      console.error("Error formatting date:", error);
      return { date: "Data inválida", time };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pendente</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Agendada</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Concluída</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSendWhatsApp = async (appointment: Appointment) => {
    const { date, time } = formatAppointmentDateTime(appointment.date, appointment.time);
    
    let message = "";
    if (appointment.status === 'scheduled') {
      message = formatConfirmationMessage(patient.name, appointment.service, date, time);
    } else {
      message = formatReminderMessage(patient.name, appointment.service, date, time);
    }
    
    const success = await sendWhatsApp(patient.whatsApp, message);
    if (success) {
      toast.success('WhatsApp enviado com sucesso', {
        description: `Mensagem enviada para ${patient.whatsApp}`,
        icon: <MessageSquare className="h-4 w-4" />
      });
    } else {
      toast.error('Erro ao enviar WhatsApp', {
        description: 'Tente novamente mais tarde'
      });
    }
  };

  const handleSendEmail = async (appointment: Appointment) => {
    const { date, time } = formatAppointmentDateTime(appointment.date, appointment.time);
    
    let message = "";
    let subject = "";
    
    if (appointment.status === 'scheduled') {
      subject = `Confirmação de Consulta - ${appointment.service}`;
      message = formatConfirmationMessage(patient.name, appointment.service, date, time);
    } else {
      subject = `Lembrete de Consulta - ${appointment.service}`;
      message = formatReminderMessage(patient.name, appointment.service, date, time);
    }
    
    const success = await sendEmail(patient.email, subject, message);
    if (success) {
      toast.success('Email enviado com sucesso', {
        description: `Email enviado para ${patient.email}`,
        icon: <Mail className="h-4 w-4" />
      });
    } else {
      toast.error('Erro ao enviar email', {
        description: 'Tente novamente mais tarde'
      });
    }
  };

  const handleConfirm = (index: number) => {
    const appointment = patient.appointments[index];
    const { date, time } = formatAppointmentDateTime(appointment.date, appointment.time);
    
    onConfirmAppointment(patient.id, index);
    
    // Send confirmation messages
    const message = formatConfirmationMessage(patient.name, appointment.service, date, time);
    const subject = `Confirmação de Consulta - ${appointment.service}`;
    
    sendEmail(patient.email, subject, message);
    sendWhatsApp(patient.whatsApp, message);
  };

  const handleCancel = (index: number) => {
    const appointment = patient.appointments[index];
    const { date, time } = formatAppointmentDateTime(appointment.date, appointment.time);
    
    onCancelAppointment(patient.id, index);
    
    // Send cancellation messages
    const message = formatCancellationMessage(patient.name, appointment.service, date, time);
    const subject = `Cancelamento de Consulta - ${appointment.service}`;
    
    sendEmail(patient.email, subject, message);
    sendWhatsApp(patient.whatsApp, message);
    
    toast.success('Consulta cancelada', {
      description: 'O paciente foi notificado por email e WhatsApp',
    });
  };

  const handleComplete = (index: number) => {
    if (onCompleteAppointment) {
      onCompleteAppointment(patient.id, index);
      
      toast.success('Consulta marcada como concluída', {
        description: 'O horário foi liberado na agenda',
        icon: <CheckCircle className="h-4 w-4" />
      });
    }
  };

  const sendReminder = (appointment: Appointment) => {
    const { date, time } = formatAppointmentDateTime(appointment.date, appointment.time);
    const message = formatReminderMessage(patient.name, appointment.service, date, time);
    const subject = `Lembrete de Consulta - ${appointment.service}`;
    
    sendEmail(patient.email, subject, message);
    sendWhatsApp(patient.whatsApp, message);
    
    toast.success('Lembrete enviado', {
      description: 'O paciente foi notificado por WhatsApp e email',
      icon: <Send className="h-4 w-4" />
    });
  };

  const filteredAppointments = patient.appointments.filter(appointment => {
    if (activeTab === 'all') return true;
    return appointment.status === activeTab;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Consultas de {patient.name}</DialogTitle>
          <DialogDescription>
            Gerencie os agendamentos e consultas do paciente
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
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Nenhuma consulta encontrada nesta categoria</p>
              </div>
            ) : (
              filteredAppointments.map((appointment, index) => {
                const { date, time } = formatAppointmentDateTime(appointment.date, appointment.time);
                
                return (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{appointment.service}</h3>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{date}</span>
                          <Clock className="ml-2 mr-1 h-4 w-4" />
                          <span>{time}</span>
                        </div>
                      </div>
                      {getStatusBadge(appointment.status)}
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
                            onClick={() => handleConfirm(index)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" /> Confirmar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleCancel(index)}
                          >
                            <XCircle className="mr-1 h-4 w-4" /> Recusar
                          </Button>
                        </>
                      )}
                      
                      {appointment.status === 'scheduled' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleComplete(index)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" /> Marcar como Concluída
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleCancel(index)}
                          >
                            <XCircle className="mr-1 h-4 w-4" /> Cancelar
                          </Button>
                        </>
                      )}
                      
                      {(appointment.status === 'scheduled' || appointment.status === 'pending') && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendReminder(appointment)}
                        >
                          <Send className="mr-1 h-4 w-4" /> Enviar Lembrete
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
