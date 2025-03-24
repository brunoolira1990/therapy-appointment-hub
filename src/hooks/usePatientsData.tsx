
import { useCallback, useMemo } from 'react';
import { usePatientManagement } from './usePatientManagement';
import { usePatientFilters } from './usePatientFilters';
import { useAppointmentManagement } from './useAppointmentManagement';
import { usePendingAppointments } from './usePendingAppointments';

export const usePatientsData = () => {
  const {
    patients,
    setPatients,
    editingPatient,
    setEditingPatient,
    selectedPatient,
    setSelectedPatient,
    isLoading,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments
  } = usePatientManagement();

  // Use memoized patients for filtering to prevent unnecessary recalculations
  const {
    searchTerm,
    setSearchTerm,
    filterPending,
    setFilterPending,
    filteredPatients,
    patientHasPendingAppointment,
    pendingPatientsCount
  } = usePatientFilters(patients);

  const {
    handleConfirmAppointment,
    handleCancelAppointment
  } = useAppointmentManagement(patients, setPatients, selectedPatient, setSelectedPatient);

  // Load pending appointments once
  usePendingAppointments(patients, setPatients);

  // Memoize the return object to ensure reference stability
  return useMemo(() => ({
    patients,
    setPatients,
    searchTerm,
    setSearchTerm,
    filterPending,
    setFilterPending,
    editingPatient,
    setEditingPatient,
    selectedPatient,
    setSelectedPatient,
    filteredPatients,
    patientHasPendingAppointment,
    pendingPatientsCount,
    isLoading,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments,
    handleConfirmAppointment,
    handleCancelAppointment
  }), [
    patients,
    setPatients,
    searchTerm,
    setSearchTerm,
    filterPending,
    setFilterPending,
    editingPatient,
    setEditingPatient,
    selectedPatient,
    setSelectedPatient,
    filteredPatients,
    patientHasPendingAppointment,
    pendingPatientsCount,
    isLoading,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments,
    handleConfirmAppointment,
    handleCancelAppointment
  ]);
};
