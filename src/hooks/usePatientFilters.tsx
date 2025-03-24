
import { useState, useMemo, useCallback } from 'react';
import { Patient } from '@/types/patient';

export const usePatientFilters = (patients: Patient[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPending, setFilterPending] = useState(false);

  // Memoized check for pending appointments
  const patientHasPendingAppointment = useCallback((patient: Patient) => {
    return patient?.appointments?.some(apt => apt.status === 'pending') || false;
  }, []);

  // Memoized count of pending patients
  const pendingPatientsCount = useMemo(() => {
    if (!patients || patients.length === 0) return 0;
    return patients.filter(patient => patientHasPendingAppointment(patient)).length;
  }, [patients, patientHasPendingAppointment]);

  // Performance optimized filtering
  const filteredPatients = useMemo(() => {
    if (!patients || patients.length === 0) return [];
    
    // Quick return if no filters are applied
    if (!searchTerm && !filterPending) return patients;
    
    // Compute lowercase search term once outside the loop
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return patients.filter(patient => {
      // Skip search check if no search term
      const matchesSearch = !searchTerm ? true : (
        (patient.name?.toLowerCase().includes(lowerSearchTerm)) || 
        (patient.email?.toLowerCase().includes(lowerSearchTerm)) || 
        (patient.whatsApp?.includes(searchTerm))
      );
      
      // Skip pending check if not filtering by pending
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
    patientHasPendingAppointment,
    pendingPatientsCount
  };
};
