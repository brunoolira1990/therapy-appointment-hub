
import React from 'react';
import { AlertTriangle } from "lucide-react";
import { Appointment, Patient } from "@/types/patient";
import AppointmentItem from './AppointmentItem';

interface AppointmentListProps {
  patient: Patient;
  activeTab: string;
  formatAppointmentDateTime: (date: string, time: string) => { date: string, time: string };
  onConfirm: (index: number) => void;
  onCancel: (index: number) => void;
  onComplete: (index: number) => void;
  onSendReminder: (appointment: Appointment) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  patient,
  activeTab,
  formatAppointmentDateTime,
  onConfirm,
  onCancel,
  onComplete,
  onSendReminder
}) => {
  const filteredAppointments = patient.appointments.filter(appointment => {
    if (activeTab === 'all') return true;
    return appointment.status === activeTab;
  });

  if (filteredAppointments.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">Nenhuma consulta encontrada nesta categoria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAppointments.map((appointment, index) => {
        const { date, time } = formatAppointmentDateTime(appointment.date, appointment.time);
        
        return (
          <AppointmentItem
            key={index}
            appointment={appointment}
            index={index}
            patient={patient}
            formattedDate={date}
            formattedTime={time}
            onConfirm={onConfirm}
            onCancel={onCancel}
            onComplete={onComplete}
            onSendReminder={onSendReminder}
          />
        );
      })}
    </div>
  );
};

export default AppointmentList;
