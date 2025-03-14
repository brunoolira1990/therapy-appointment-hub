
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Patient } from '@/types/patient';

export const usePendingAppointments = (
  patients: Patient[], 
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
) => {
  // Verificar se há agendamentos pendentes no localStorage
  useEffect(() => {
    const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
    
    if (pendingAppointments.length > 0) {
      // Atualizar os pacientes existentes ou adicionar novos
      const updatedPatients = [...patients];
      
      pendingAppointments.forEach((pendingAppointment: any) => {
        // Verificar se o paciente já existe (por email)
        const existingPatientIndex = updatedPatients.findIndex(
          p => p.email.toLowerCase() === pendingAppointment.email.toLowerCase()
        );
        
        if (existingPatientIndex >= 0) {
          // Adicionar o novo agendamento ao paciente existente
          updatedPatients[existingPatientIndex].appointments = [
            ...updatedPatients[existingPatientIndex].appointments,
            ...pendingAppointment.appointments
          ];
        } else {
          // Criar um novo paciente com o agendamento pendente
          const newPatient = {
            id: `PT-${1000 + updatedPatients.length + 1}`,
            name: pendingAppointment.name,
            email: pendingAppointment.email,
            whatsApp: pendingAppointment.phone || pendingAppointment.whatsApp || '',
            birthDate: pendingAppointment.birthDate || new Date().toISOString().split('T')[0],
            appointments: pendingAppointment.appointments
          };
          
          updatedPatients.push(newPatient);
          
          toast.info(`Novo paciente ${pendingAppointment.name} adicionado com agendamento pendente`, {
            description: 'O paciente deve confirmar suas informações.',
            duration: 5000
          });
        }
      });
      
      setPatients(updatedPatients);
      // Limpar os agendamentos pendentes do localStorage
      localStorage.removeItem('pendingAppointments');
    }
  }, []);
};
