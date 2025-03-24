
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
  // Reduced patients per page to improve performance
  const patientsPerPage = 6; 
  
  const {
    patients,
    searchTerm,
    setSearchTerm,
    filterPending,
    setFilterPending,
    editingPatient,
    selectedPatient,
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
  } = usePatientsData();
  
  // Pagination logic - memoized to prevent unnecessary calculations
  const paginatedPatients = useMemo(() => {
    if (!filteredPatients || filteredPatients.length === 0) return [];
    const startIndex = (currentPage - 1) * patientsPerPage;
    return filteredPatients.slice(startIndex, startIndex + patientsPerPage);
  }, [filteredPatients, currentPage, patientsPerPage]);
  
  const totalPages = useMemo(() => 
    Math.max(1, Math.ceil((filteredPatients?.length || 0) / patientsPerPage)),
    [filteredPatients, patientsPerPage]
  );
  
  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterPending]);
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <PatientsSearch 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
            </div>
            
            <div className="lg:col-span-1 flex items-center">
              <PendingAppointmentsFilter
                pendingCount={pendingPatientsCount}
                filterPending={filterPending}
                setFilterPending={setFilterPending}
              />
            </div>
          </div>
          
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
              <nav className="flex space-x-2" aria-label="Pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-secondary hover:bg-primary/20'
                    }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}
              </nav>
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
