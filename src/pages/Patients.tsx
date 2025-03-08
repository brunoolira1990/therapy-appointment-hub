
import React, { useState } from 'react';
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
  
  const {
    patients,
    searchTerm,
    setSearchTerm,
    editingPatient,
    selectedPatient,
    filteredPatients,
    patientHasPendingAppointment,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments,
    handleConfirmAppointment,
    handleCancelAppointment
  } = usePatientsData();
  
  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verificar se o usuário tem papel de admin (doutora)
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide">
          <PatientsHeader onAddPatient={() => {
            handleAddPatient();
            setIsFormOpen(true);
          }} />
          
          <PatientsSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <PendingAppointmentsFilter
            patients={patients}
            patientHasPendingAppointment={patientHasPendingAppointment}
          />
          
          <PatientsList
            filteredPatients={filteredPatients}
            patients={patients}
            searchTerm={searchTerm}
            patientHasPendingAppointment={patientHasPendingAppointment}
            onEditPatient={(patient) => {
              handleEditPatient(patient);
              setIsFormOpen(true);
            }}
            onDeletePatient={handleDeletePatient}
            onViewAppointments={(patient) => {
              handleViewAppointments(patient);
              setIsAppointmentDialogOpen(true);
            }}
          />
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
