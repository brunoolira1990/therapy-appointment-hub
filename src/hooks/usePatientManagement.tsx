
import { useState } from 'react';
import { toast } from 'sonner';
import { Patient } from '@/types/patient';

export const usePatientManagement = (initialPatients: Patient[] = []) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleAddPatient = () => {
    setEditingPatient(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleDeletePatient = (patientId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      const updatedPatients = patients.filter(patient => patient.id !== patientId);
      setPatients(updatedPatients);
      toast.success('Paciente excluído com sucesso');
    }
  };

  const handleFormSubmit = (patientData: Partial<Patient>) => {
    if (editingPatient) {
      // Atualizando paciente existente
      const updatedPatients = patients.map(patient => 
        patient.id === editingPatient.id ? { ...patient, ...patientData } : patient
      );
      setPatients(updatedPatients);
      toast.success('Paciente atualizado com sucesso');
    } else {
      // Adicionando novo paciente
      const newPatient = {
        id: `PT-${1000 + patients.length + 1}`,
        ...patientData,
        appointments: []
      } as Patient;
      setPatients([...patients, newPatient]);
      toast.success('Paciente adicionado com sucesso');
    }
    setEditingPatient(null);
  };

  const handleViewAppointments = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  return {
    patients,
    setPatients,
    editingPatient,
    setEditingPatient,
    selectedPatient,
    setSelectedPatient,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments
  };
};
