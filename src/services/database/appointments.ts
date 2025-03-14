
import { Patient, Appointment } from '@/types/patient';
import { getPatients } from './patients';
import { saveLocalPatients } from './init';

// Funções para gerenciar agendamentos
export const addAppointment = async (patientId: string, appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
  try {
    const patients = await getPatients();
    const patientIndex = patients.findIndex(p => p.id === patientId);
    
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }
    
    // Gerar ID para o agendamento
    const appointmentId = Date.now().toString();
    
    const newAppointment: Appointment = {
      id: appointmentId,
      ...appointment
    };
    
    patients[patientIndex].appointments.push(newAppointment);
    saveLocalPatients(patients);
    
    return newAppointment;
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (appointmentId: string, status: string): Promise<void> => {
  try {
    const patients = await getPatients();
    let updated = false;
    
    for (const patient of patients) {
      const appointmentIndex = patient.appointments.findIndex(apt => apt.id === appointmentId);
      
      if (appointmentIndex !== -1) {
        patient.appointments[appointmentIndex].status = status;
        updated = true;
        break;
      }
    }
    
    if (updated) {
      saveLocalPatients(patients);
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};
