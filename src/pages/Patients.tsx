
import React, { useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PatientFormDialog from '@/components/PatientFormDialog';
import AppointmentDetailsDialog from '@/components/AppointmentDetailsDialog';
import PatientsHeader from '@/components/patients/PatientsHeader';
import PatientsSearch from '@/components/patients/PatientsSearch';
import PendingAppointmentsFilter from '@/components/patients/PendingAppointmentsFilter';
import PatientsList from '@/components/patients/PatientsList';
import { usePatientsData } from '@/hooks/usePatientsData';

const Patients = () => {
  const { user, isAuthenticated } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 9; // Show 9 patients per page (3x3 grid)
  
  const {
    patients,
    searchTerm,
    setSearchTerm,
    editingPatient,
    selectedPatient,
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
  } = usePatientsData();
  
  // Pagination logic - memoized to prevent unnecessary calculations
  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * patientsPerPage;
    return filteredPatients.slice(startIndex, startIndex + patientsPerPage);
  }, [filteredPatients, currentPage, patientsPerPage]);
  
  const totalPages = useMemo(() => 
    Math.ceil(filteredPatients.length / patientsPerPage),
  [filteredPatients.length, patientsPerPage]);
  
  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  
  // Memoize these handlers to prevent unnecessary re-renders
  const handleOpenForm = useCallback(() => {
    handleAddPatient();
    setIsFormOpen(true);
  }, [handleAddPatient]);
  
  const handleEditPatientClick = useCallback((patient) => {
    handleEditPatient(patient);
    setIsFormOpen(true);
  }, [handleEditPatient]);
  
  const handleViewAppointmentsClick = useCallback((patient) => {
    handleViewAppointments(patient);
    setIsAppointmentDialogOpen(true);
  }, [handleViewAppointments]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if user has admin role (doctor)
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando pacientes...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide">
          <PatientsHeader onAddPatient={handleOpenForm} />
          
          <PatientsSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <PendingAppointmentsFilter
            patients={patients}
            patientHasPendingAppointment={patientHasPendingAppointment}
          />
          
          <PatientsList
            filteredPatients={paginatedPatients}
            patients={patients}
            searchTerm={searchTerm}
            patientHasPendingAppointment={patientHasPendingAppointment}
            onEditPatient={handleEditPatientClick}
            onDeletePatient={handleDeletePatient}
            onViewAppointments={handleViewAppointmentsClick}
          />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-secondary hover:bg-primary/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <PatientFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingPatient}
      />
      
      <AppointmentDetailsDialog
        isOpen={isAppointmentDialogOpen}
        onClose={() => setIsAppointmentDialogOpen(false)}
        patient={selectedPatient}
        onConfirmAppointment={handleConfirmAppointment}
        onCancelAppointment={handleCancelAppointment}
      />
      
      <Footer />
    </div>
  );
};

export default Patients;
