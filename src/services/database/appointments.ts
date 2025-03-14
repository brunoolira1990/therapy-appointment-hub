
import { Patient, Appointment } from '@/types/patient';
import { getPatients } from './patients';
import { saveLocalPatients, pgPool, isBrowser } from './init';

// Funções para gerenciar agendamentos
export const addAppointment = async (patientId: string, appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
  try {
    // Gerar ID para o agendamento
    const appointmentId = Date.now().toString();
    
    const newAppointment: Appointment = {
      id: appointmentId,
      ...appointment
    };
    
    // Navegador: usa localStorage
    if (isBrowser) {
      const patients = await getPatients();
      const patientIndex = patients.findIndex(p => p.id === patientId);
      
      if (patientIndex === -1) {
        throw new Error('Patient not found');
      }
      
      patients[patientIndex].appointments.push(newAppointment);
      saveLocalPatients(patients);
    } 
    // Servidor: usa PostgreSQL
    else if (pgPool) {
      await pgPool.query(
        `INSERT INTO appointments (id, patient_id, date, service, status, notes)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [newAppointment.id, patientId, newAppointment.date, newAppointment.service, 
         newAppointment.status, newAppointment.notes]
      );
    }
    
    return newAppointment;
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (appointmentId: string, status: string): Promise<void> => {
  try {
    // Navegador: usa localStorage
    if (isBrowser) {
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
    } 
    // Servidor: usa PostgreSQL
    else if (pgPool) {
      await pgPool.query(
        'UPDATE appointments SET status = $1 WHERE id = $2',
        [status, appointmentId]
      );
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};
