
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, XCircle, Send, AlertTriangle, Mail, Phone } from "lucide-react";

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
  phone: string;
  birthDate: string;
  appointments: Appointment[];
}

interface AppointmentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onConfirmAppointment: (patientId: string, appointmentIndex: number) => void;
  onCancelAppointment: (patientId: string, appointmentIndex: number) => void;
}

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  isOpen,
  onClose,
  patient,
  onConfirmAppointment,
  onCancelAppointment
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

  const handleSendSMS = (phone: string, appointmentInfo: string) => {
    // Simulação de envio de SMS
    toast.success('SMS enviado com sucesso', {
      description: `Enviado para ${phone}`,
      icon: <Phone className="h-4 w-4" />
    });
    console.log(`Simulando envio de SMS para ${phone}: ${appointmentInfo}`);
  };

  const handleSendEmail = (email: string, appointmentInfo: string) => {
    // Simulação de envio de email
    toast.success('Email enviado com sucesso', {
      description: `Enviado para ${email}`,
      icon: <Mail className="h-4 w-4" />
    });
    console.log(`Simulando envio de email para ${email}: ${appointmentInfo}`);
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
                            onClick={() => {
                              onConfirmAppointment(patient.id, index);
                              const appointmentInfo = `Consulta de ${appointment.service} confirmada para ${date} às ${time}`;
                              handleSendEmail(patient.email, appointmentInfo);
                              handleSendSMS(patient.phone, appointmentInfo);
                            }}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" /> Confirmar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => onCancelAppointment(patient.id, index)}
                          >
                            <XCircle className="mr-1 h-4 w-4" /> Recusar
                          </Button>
                        </>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          const appointmentInfo = `Lembrete: Sua consulta de ${appointment.service} está agendada para ${date} às ${time}`;
                          handleSendEmail(patient.email, appointmentInfo);
                          handleSendSMS(patient.phone, appointmentInfo);
                        }}
                      >
                        <Send className="mr-1 h-4 w-4" /> Enviar Lembrete
                      </Button>
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
