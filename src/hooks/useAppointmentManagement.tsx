
import { toast } from 'sonner';
import { Patient } from '@/types/patient';

export const useAppointmentManagement = (
  patients: Patient[], 
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>,
  selectedPatient: Patient | null,
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>
) => {
  // Confirmar uma consulta pendente
  const handleConfirmAppointment = (patientId: string, appointmentIndex: number) => {
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
  };

  // Cancelar uma consulta pendente
  const handleCancelAppointment = (patientId: string, appointmentIndex: number) => {
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
  };

  return {
    handleConfirmAppointment,
    handleCancelAppointment,
  };
};
