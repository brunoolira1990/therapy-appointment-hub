
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Patient } from "@/types/patient";
import { useAppointmentActions } from "@/hooks/useAppointmentActions";
import AppointmentList from "./appointment/AppointmentList";

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
  const {
    activeTab,
    setActiveTab,
    formatAppointmentDateTime,
    handleConfirm,
    handleCancel,
    handleComplete,
    sendReminder
  } = useAppointmentActions(
    patient,
    onConfirmAppointment,
    onCancelAppointment,
    onCompleteAppointment
  );

  if (!patient) return null;

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
            <AppointmentList
              patient={patient}
              activeTab={activeTab}
              formatAppointmentDateTime={formatAppointmentDateTime}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onComplete={handleComplete}
              onSendReminder={sendReminder}
            />
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
