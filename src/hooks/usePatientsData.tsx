
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

  const {
    searchTerm,
    setSearchTerm,
    filteredPatients,
    patientHasPendingAppointment
  } = usePatientFilters(patients);

  const {
    handleConfirmAppointment,
    handleCancelAppointment
  } = useAppointmentManagement(patients, setPatients, selectedPatient, setSelectedPatient);

  // Carrega agendamentos pendentes do localStorage e migra para o banco
  usePendingAppointments(patients, setPatients);

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
    isLoading,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments,
    handleConfirmAppointment,
    handleCancelAppointment
  };
};
