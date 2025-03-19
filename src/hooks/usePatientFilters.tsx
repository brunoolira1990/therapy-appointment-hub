
import { useState, useMemo, useCallback } from 'react';
import { Patient } from '@/types/patient';

export const usePatientFilters = (patients: Patient[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPending, setFilterPending] = useState(false);

  // Check if patient has pending appointments - memoized for performance
  const patientHasPendingAppointment = useCallback((patient: Patient) => {
    return patient.appointments.some(apt => apt.status === 'pending');
  }, []);

  // Filter patients based on search term and pending filter - memoized for performance
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      // Search filter
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.whatsApp.includes(searchTerm);
      
      // Pending filter
      const matchesPending = !filterPending || patientHasPendingAppointment(patient);
      
      return matchesSearch && matchesPending;
    });
  }, [patients, searchTerm, filterPending, patientHasPendingAppointment]);

  return {
    searchTerm,
    setSearchTerm,
    filterPending,
    setFilterPending,
    filteredPatients,
    patientHasPendingAppointment
  };
};
