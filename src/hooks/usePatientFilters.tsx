
import { useState } from 'react';
import { Patient } from '@/types/patient';

export const usePatientFilters = (patients: Patient[]) => {
  const [searchTerm, setSearchTerm] = useState('');

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

  return {
    searchTerm,
    setSearchTerm,
    filteredPatients,
    patientHasPendingAppointment
  };
};
