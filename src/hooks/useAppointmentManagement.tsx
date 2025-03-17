
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
      if (!patient || !patient.appointments[appointmentIndex]) {
        toast.error('Paciente ou agendamento não encontrado');
        return;
      }
      
      const appointmentId = patient.appointments[appointmentIndex].id;
      
      if (!appointmentId) {
        toast.error('ID do agendamento não encontrado');
        return;
      }
      
      // Atualizar status no banco
      await updateAppointmentStatus(appointmentId, 'scheduled');
      
      // Atualizar estado local de forma imutável
      const updatedPatients = patients.map(p => {
        if (p.id === patientId) {
          const updatedAppointments = [...p.appointments];
          if (updatedAppointments[appointmentIndex]) {
            updatedAppointments[appointmentIndex] = {
              ...updatedAppointments[appointmentIndex],
              status: 'scheduled'
            };
          }
          
          return {
            ...p,
            appointments: updatedAppointments
          };
        }
        return p;
      });
      
      setPatients(updatedPatients);
      
      // Atualizar paciente selecionado se necessário
      if (selectedPatient && selectedPatient.id === patientId) {
        const updatedAppointments = [...selectedPatient.appointments];
        if (updatedAppointments[appointmentIndex]) {
          updatedAppointments[appointmentIndex] = {
            ...updatedAppointments[appointmentIndex],
            status: 'scheduled'
          };
        }
        
        setSelectedPatient({
          ...selectedPatient,
          appointments: updatedAppointments
        });
      }
      
      toast.success('Consulta confirmada com sucesso', {
        description: 'O paciente receberá um WhatsApp e email com a confirmação'
      });
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Erro ao confirmar consulta');
    }
  };

  // Cancelar uma consulta
  const handleCancelAppointment = async (patientId: string, appointmentIndex: number) => {
    try {
      const patient = patients.find(p => p.id === patientId);
      if (!patient || !patient.appointments[appointmentIndex]) {
        toast.error('Paciente ou agendamento não encontrado');
        return;
      }
      
      const appointmentId = patient.appointments[appointmentIndex].id;
      
      if (!appointmentId) {
        toast.error('ID do agendamento não encontrado');
        return;
      }
      
      // Atualizar status no banco
      await updateAppointmentStatus(appointmentId, 'cancelled');
      
      // Atualizar estado local de forma imutável
      const updatedPatients = patients.map(p => {
        if (p.id === patientId) {
          const updatedAppointments = [...p.appointments];
          if (updatedAppointments[appointmentIndex]) {
            updatedAppointments[appointmentIndex] = {
              ...updatedAppointments[appointmentIndex],
              status: 'cancelled'
            };
          }
          
          return {
            ...p,
            appointments: updatedAppointments
          };
        }
        return p;
      });
      
      setPatients(updatedPatients);
      
      // Atualizar paciente selecionado se necessário
      if (selectedPatient && selectedPatient.id === patientId) {
        const updatedAppointments = [...selectedPatient.appointments];
        if (updatedAppointments[appointmentIndex]) {
          updatedAppointments[appointmentIndex] = {
            ...updatedAppointments[appointmentIndex],
            status: 'cancelled'
          };
        }
        
        setSelectedPatient({
          ...selectedPatient,
          appointments: updatedAppointments
        });
      }
      
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
