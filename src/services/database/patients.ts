
import { Patient } from '@/types/patient';
import { getLocalPatients, saveLocalPatients } from './init';

// Funções para gerenciar pacientes
export const getPatients = async (): Promise<Patient[]> => {
  try {
    const patients = getLocalPatients();
    return patients;
  } catch (error) {
    console.error('Error getting patients:', error);
    throw error;
  }
};

export const addPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  try {
    const patients = await getPatients();
    
    // Gerar novo ID para o paciente
    const patientId = `PT-${1000 + Math.floor(Math.random() * 9000)}`;
    
    const newPatient: Patient = {
      id: patientId,
      name: patient.name,
      email: patient.email,
      whatsApp: patient.whatsApp,
      birthDate: patient.birthDate,
      appointments: patient.appointments || []
    };
    
    patients.push(newPatient);
    saveLocalPatients(patients);
    
    return newPatient;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatient = async (patient: Patient): Promise<Patient> => {
  try {
    const patients = await getPatients();
    const index = patients.findIndex(p => p.id === patient.id);
    
    if (index !== -1) {
      patients[index] = patient;
      saveLocalPatients(patients);
    }
    
    return patient;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const deletePatient = async (patientId: string): Promise<void> => {
  try {
    const patients = await getPatients();
    const filteredPatients = patients.filter(patient => patient.id !== patientId);
    saveLocalPatients(filteredPatients);
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
};
