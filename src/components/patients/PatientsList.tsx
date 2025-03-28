
import React, { memo } from 'react';
import { UserCheck } from 'lucide-react';
import PatientCard from '@/components/PatientCard';
import { Patient } from '@/types/patient';

interface PatientsListProps {
  filteredPatients: Patient[];
  patients: Patient[];
  searchTerm: string;
  patientHasPendingAppointment: (patient: Patient) => boolean;
  onEditPatient: (patient: Patient) => void;
  onDeletePatient: (patientId: string) => void;
  onViewAppointments: (patient: Patient) => void;
}

// Fully memoized component to prevent unnecessary re-renders
const PatientsList: React.FC<PatientsListProps> = memo(({
  filteredPatients,
  patients,
  searchTerm,
  patientHasPendingAppointment,
  onEditPatient,
  onDeletePatient,
  onViewAppointments,
}) => {
  // Render empty state if no patients match filter
  if (!filteredPatients || filteredPatients.length === 0) {
    return (
      <div className="text-center py-12">
        <UserCheck size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-1">Nenhum paciente encontrado</h3>
        <p className="text-muted-foreground">
          {searchTerm 
            ? "Nenhum paciente corresponde aos critérios de pesquisa." 
            : "Comece adicionando um novo paciente."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            name={patient.name || ''}
            email={patient.email || ''}
            whatsApp={patient.whatsApp || ''}
            birthDate={patient.birthDate || ''}
            patientId={patient.id}
            appointmentsCount={patient.appointments?.length || 0}
            appointments={patient.appointments || []}
            hasPendingAppointment={patientHasPendingAppointment(patient)}
            onEdit={() => onEditPatient(patient)}
            onDelete={() => onDeletePatient(patient.id)}
            onViewAppointments={() => onViewAppointments(patient)}
          />
        ))}
      </div>
      
      {filteredPatients.length > 0 && filteredPatients.length < patients.length && (
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Mostrando {filteredPatients.length} de {patients.length} pacientes
        </div>
      )}
    </>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.filteredPatients === nextProps.filteredPatients &&
    prevProps.patients === nextProps.patients &&
    prevProps.searchTerm === nextProps.searchTerm &&
    prevProps.patientHasPendingAppointment === nextProps.patientHasPendingAppointment
  );
});

PatientsList.displayName = 'PatientsList';

export default PatientsList;
