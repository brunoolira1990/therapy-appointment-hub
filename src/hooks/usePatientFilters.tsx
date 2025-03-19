
import { useState, useMemo } from 'react';
import { Patient } from '@/types/patient';

export const usePatientFilters = (patients: Patient[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Check if patient has pending appointments - memoized for performance
  const patientHasPendingAppointment = useMemo(() => {
    return (patient: Patient) => {
      return patient.appointments.some(apt => apt.status === 'pending');
    };
  }, []);

  // Filter patients based on search term - memoized for performance
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.whatsApp.includes(searchTerm)
    );
  }, [patients, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredPatients,
    patientHasPendingAppointment
  };
};
