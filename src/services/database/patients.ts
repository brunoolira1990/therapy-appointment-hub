
import { Patient } from '@/types/patient';
import { getLocalPatients, saveLocalPatients, pgPool, isBrowser } from './init';

// Funções para gerenciar pacientes
export const getPatients = async (): Promise<Patient[]> => {
  try {
    // Navegador: usa localStorage
    if (isBrowser) {
      const patients = getLocalPatients();
      return patients;
    } 
    // Servidor: usa PostgreSQL
    else if (pgPool) {
      const { rows } = await pgPool.query(`
        SELECT p.id, p.name, p.email, p.whatsapp as "whatsApp", p.birthdate as "birthDate",
          json_agg(
            json_build_object(
              'id', a.id,
              'date', a.date,
              'service', a.service,
              'status', a.status,
              'notes', a.notes
            )
          ) FILTER (WHERE a.id IS NOT NULL) as appointments
        FROM patients p
        LEFT JOIN appointments a ON p.id = a.patient_id
        GROUP BY p.id
      `);

      // Converte os resultados para o formato esperado
      const patients = rows.map(row => ({
        ...row,
        appointments: row.appointments || []
      }));
      
      return patients;
    }
    
    // Fallback em caso de erro
    return [];
  } catch (error) {
    console.error('Error getting patients:', error);
    throw error;
  }
};

export const addPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  try {
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
    
    // Navegador: usa localStorage
    if (isBrowser) {
      const patients = await getPatients();
      patients.push(newPatient);
      saveLocalPatients(patients);
    } 
    // Servidor: usa PostgreSQL
    else if (pgPool) {
      await pgPool.query(
        `INSERT INTO patients (id, name, email, whatsapp, birthdate) 
         VALUES ($1, $2, $3, $4, $5)`,
        [newPatient.id, newPatient.name, newPatient.email, newPatient.whatsApp, newPatient.birthDate]
      );
      
      // Adiciona os agendamentos, se existirem
      if (newPatient.appointments && newPatient.appointments.length > 0) {
        for (const apt of newPatient.appointments) {
          await pgPool.query(
            `INSERT INTO appointments (id, patient_id, date, service, status, notes)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [apt.id, newPatient.id, apt.date, apt.service, apt.status, apt.notes]
          );
        }
      }
    }
    
    return newPatient;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatient = async (patient: Patient): Promise<Patient> => {
  try {
    // Navegador: usa localStorage
    if (isBrowser) {
      const patients = await getPatients();
      const index = patients.findIndex(p => p.id === patient.id);
      
      if (index !== -1) {
        patients[index] = patient;
        saveLocalPatients(patients);
      }
    } 
    // Servidor: usa PostgreSQL
    else if (pgPool) {
      await pgPool.query(
        `UPDATE patients 
         SET name = $1, email = $2, whatsapp = $3, birthdate = $4
         WHERE id = $5`,
        [patient.name, patient.email, patient.whatsApp, patient.birthDate, patient.id]
      );
      
      // Atualiza agendamentos (opção mais simples: remover e recriar)
      await pgPool.query('DELETE FROM appointments WHERE patient_id = $1', [patient.id]);
      
      for (const apt of patient.appointments) {
        await pgPool.query(
          `INSERT INTO appointments (id, patient_id, date, service, status, notes)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [apt.id, patient.id, apt.date, apt.service, apt.status, apt.notes]
        );
      }
    }
    
    return patient;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const deletePatient = async (patientId: string): Promise<void> => {
  try {
    // Navegador: usa localStorage
    if (isBrowser) {
      const patients = await getPatients();
      const filteredPatients = patients.filter(patient => patient.id !== patientId);
      saveLocalPatients(filteredPatients);
    } 
    // Servidor: usa PostgreSQL
    else if (pgPool) {
      // Primeiro remove os agendamentos relacionados
      await pgPool.query('DELETE FROM appointments WHERE patient_id = $1', [patientId]);
      // Depois remove o paciente
      await pgPool.query('DELETE FROM patients WHERE id = $1', [patientId]);
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
};
