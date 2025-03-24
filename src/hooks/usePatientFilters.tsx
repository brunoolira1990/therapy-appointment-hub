
import { useState, useMemo, useCallback } from 'react';
import { Patient } from '@/types/patient';

export const usePatientFilters = (patients: Patient[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPending, setFilterPending] = useState(false);

  // Check if patient has pending appointments - memoized for performance
  const patientHasPendingAppointment = useCallback((patient: Patient) => {
    return patient?.appointments?.some(apt => apt.status === 'pending') || false;
  }, []);

  // Calculate pending patients count only once per patients array update
  const pendingPatientsCount = useMemo(() => {
    if (!patients || patients.length === 0) return 0;
    return patients.filter(patient => patientHasPendingAppointment(patient)).length;
  }, [patients, patientHasPendingAppointment]);

  // Optimized filtering logic
  const filteredPatients = useMemo(() => {
    if (!patients || patients.length === 0) return [];
    
    // Skip filtering if no filters are applied
    if (!searchTerm && !filterPending) return patients;
    
    // Apply filters
    return patients.filter(patient => {
      // Search filter - skip if no search term
      const matchesSearch = !searchTerm ? true : (
        (patient.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (patient.email?.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (patient.whatsApp?.includes(searchTerm))
      );
      
      // Pending filter - skip if not filtering pending
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
