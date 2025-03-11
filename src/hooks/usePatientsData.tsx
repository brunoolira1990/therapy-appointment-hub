
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Patient } from '@/types/patient';

export const usePatientsData = () => {
  // Iniciando com lista vazia de pacientes
  const [patients, setPatients] = useState<Patient[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Verificar se o paciente tem agendamentos pendentes
  const patientHasPendingAppointment = (patient: Patient) => {
    return patient.appointments.some(apt => apt.status === 'pending');
  };

  // Filtrar pacientes com base no termo de pesquisa
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.whatsApp.includes(searchTerm)
  );

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

  const handleAddPatient = () => {
    setEditingPatient(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleDeletePatient = (patientId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      const updatedPatients = patients.filter(patient => patient.id !== patientId);
      setPatients(updatedPatients);
      toast.success('Paciente excluído com sucesso');
    }
  };

  const handleFormSubmit = (patientData: Partial<Patient>) => {
    if (editingPatient) {
      // Atualizando paciente existente
      const updatedPatients = patients.map(patient => 
        patient.id === editingPatient.id ? { ...patient, ...patientData } : patient
      );
      setPatients(updatedPatients);
      toast.success('Paciente atualizado com sucesso');
    } else {
      // Adicionando novo paciente
      const newPatient = {
        id: `PT-${1000 + patients.length + 1}`,
        ...patientData,
        appointments: []
      } as Patient;
      setPatients([...patients, newPatient]);
      toast.success('Paciente adicionado com sucesso');
    }
    setEditingPatient(null);
  };

  const handleViewAppointments = (patient: Patient) => {
    setSelectedPatient(patient);
  };

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
    patients,
    setPatients,
    searchTerm,
    setSearchTerm,
    editingPatient,
    setEditingPatient,
    selectedPatient,
    setSelectedPatient,
    filteredPatients,
    patientHasPendingAppointment,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments,
    handleConfirmAppointment,
    handleCancelAppointment
  };
};
