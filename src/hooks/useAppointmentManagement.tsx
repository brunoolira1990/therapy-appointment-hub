
import { toast } from 'sonner';
import { Patient } from '@/types/patient';
import { updateAppointmentStatus } from '@/services/database';

export const useAppointmentManagement = (
  patients: Patient[], 
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>,
  selectedPatient: Patient | null,
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>
) => {
  // Confirmar uma consulta pendente
  const handleConfirmAppointment = async (patientId: string, appointmentIndex: number) => {
    try {
      const patient = patients.find(p => p.id === patientId);
      if (!patient || !patient.appointments[appointmentIndex]) return;
      
      const appointmentId = patient.appointments[appointmentIndex].id;
      
      if (!appointmentId) {
        toast.error('ID do agendamento não encontrado');
        return;
      }
      
      // Atualizar status no banco
      await updateAppointmentStatus(appointmentId, 'scheduled');
      
      // Atualizar estado local
      const updatedPatients = patients.map(patient => {
        if (patient.id === patientId) {
          const updatedAppointments = [...patient.appointments];
          if (updatedAppointments[appointmentIndex]) {
            updatedAppointments[appointmentIndex] = {
              ...updatedAppointments[appointmentIndex],
              status: 'scheduled'
            };
          }
          
          // Atualize o paciente selecionado se estiver aberto no dialog
          if (selectedPatient && selectedPatient.id === patientId) {
            setSelectedPatient({
              ...patient,
              appointments: updatedAppointments
            });
          }
          
          return {
            ...patient,
            appointments: updatedAppointments
          };
        }
        return patient;
      });
      
      setPatients(updatedPatients);
      toast.success('Consulta confirmada com sucesso', {
        description: 'O paciente receberá um WhatsApp e email com a confirmação'
      });
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Erro ao confirmar consulta');
    }
  };

  // Cancelar uma consulta pendente
  const handleCancelAppointment = async (patientId: string, appointmentIndex: number) => {
    try {
      const patient = patients.find(p => p.id === patientId);
      if (!patient || !patient.appointments[appointmentIndex]) return;
      
      const appointmentId = patient.appointments[appointmentIndex].id;
      
      if (!appointmentId) {
        toast.error('ID do agendamento não encontrado');
        return;
      }
      
      // Atualizar status no banco
      await updateAppointmentStatus(appointmentId, 'cancelled');
      
      // Atualizar estado local
      const updatedPatients = patients.map(patient => {
        if (patient.id === patientId) {
          const updatedAppointments = [...patient.appointments];
          if (updatedAppointments[appointmentIndex]) {
            updatedAppointments[appointmentIndex] = {
              ...updatedAppointments[appointmentIndex],
              status: 'cancelled'
            };
          }
          
          // Atualize o paciente selecionado se estiver aberto no dialog
          if (selectedPatient && selectedPatient.id === patientId) {
            setSelectedPatient({
              ...patient,
              appointments: updatedAppointments
            });
          }
          
          return {
            ...patient,
            appointments: updatedAppointments
          };
        }
        return patient;
      });
      
      setPatients(updatedPatients);
      toast.success('Consulta cancelada', {
        description: 'O paciente será notificado sobre o cancelamento'
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Erro ao cancelar consulta');
    }
  };

  return {
    handleConfirmAppointment,
    handleCancelAppointment,
  };
};
