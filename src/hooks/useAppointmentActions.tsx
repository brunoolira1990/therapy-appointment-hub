import { useState } from 'react';
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, Mail, MessageSquare, Send } from "lucide-react";
import { 
  sendWhatsApp, 
  sendEmail, 
  formatConfirmationMessage,
  formatReminderMessage,
  formatCancellationMessage
} from "@/utils/notifications";
import { Appointment, Patient } from "@/types/patient";

export const useAppointmentActions = (
  patient: Patient | null,
  onConfirmAppointment: (patientId: string, appointmentIndex: number) => void,
  onCancelAppointment: (patientId: string, appointmentIndex: number) => void,
  onCompleteAppointment?: (patientId: string, appointmentIndex: number) => void
) => {
  const [activeTab, setActiveTab] = useState('all');

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

  const handleSendWhatsApp = async (appointment: Appointment) => {
    if (!patient) return;

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
    if (!patient) return;

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
    if (!patient) return;

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
    if (!patient) return;

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
    if (!patient || !onCompleteAppointment) return;
    
    onCompleteAppointment(patient.id, index);
    
    toast.success('Consulta marcada como concluída', {
      description: 'O horário foi liberado na agenda',
      icon: <CheckCircle className="h-4 w-4" />
    });
  };

  const sendReminder = (appointment: Appointment) => {
    if (!patient) return;

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

  return {
    activeTab,
    setActiveTab,
    formatAppointmentDateTime,
    handleSendWhatsApp,
    handleSendEmail,
    handleConfirm,
    handleCancel,
    handleComplete,
    sendReminder
  };
};
