
import { Pool } from 'pg';
import { Patient, Appointment } from '@/types/patient';

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: 'tatyanelira',
  host: 'pgsql.tatyanelira.com.br',
  database: 'tatyanelira',
  password: 'Fisio@2000',
  port: 5432,
});

// Função para inicializar o banco de dados (criar tabelas se não existirem)
export const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    // Criar tabela de pacientes
    await client.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        whatsapp VARCHAR(20) NOT NULL,
        birth_date DATE NOT NULL
      )
    `);

    // Criar tabela de agendamentos
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(20) REFERENCES patients(id),
        date DATE NOT NULL,
        time VARCHAR(10) NOT NULL,
        status VARCHAR(20) NOT NULL,
        service VARCHAR(100) NOT NULL,
        notes TEXT
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Funções para gerenciar pacientes
export const getPatients = async (): Promise<Patient[]> => {
  const client = await pool.connect();
  try {
    // Buscar todos os pacientes
    const patientsResult = await client.query('SELECT * FROM patients');
    
    // Pacientes sem agendamentos ainda
    const patients: Patient[] = patientsResult.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      whatsApp: row.whatsapp,
      birthDate: row.birth_date,
      appointments: []
    }));

    // Buscar agendamentos de cada paciente
    for (const patient of patients) {
      const appointmentsResult = await client.query(
        'SELECT * FROM appointments WHERE patient_id = $1', 
        [patient.id]
      );
      
      patient.appointments = appointmentsResult.rows.map(row => ({
        id: row.id.toString(),
        date: row.date,
        time: row.time,
        status: row.status,
        service: row.service,
        notes: row.notes
      }));
    }
    
    return patients;
  } catch (error) {
    console.error('Error getting patients:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const addPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  const client = await pool.connect();
  try {
    // Gerar novo ID para o paciente
    const patientId = `PT-${1000 + Math.floor(Math.random() * 9000)}`;
    
    // Inserir paciente no banco
    await client.query(
      'INSERT INTO patients (id, name, email, whatsapp, birth_date) VALUES ($1, $2, $3, $4, $5)',
      [patientId, patient.name, patient.email, patient.whatsApp, patient.birthDate]
    );
    
    return {
      id: patientId,
      name: patient.name,
      email: patient.email,
      whatsApp: patient.whatsApp,
      birthDate: patient.birthDate,
      appointments: []
    };
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const updatePatient = async (patient: Patient): Promise<Patient> => {
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE patients SET name = $1, email = $2, whatsapp = $3, birth_date = $4 WHERE id = $5',
      [patient.name, patient.email, patient.whatsApp, patient.birthDate, patient.id]
    );
    
    return patient;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const deletePatient = async (patientId: string): Promise<void> => {
  const client = await pool.connect();
  try {
    // Deletar agendamentos do paciente
    await client.query('DELETE FROM appointments WHERE patient_id = $1', [patientId]);
    
    // Deletar paciente
    await client.query('DELETE FROM patients WHERE id = $1', [patientId]);
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Funções para gerenciar agendamentos
export const addAppointment = async (patientId: string, appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO appointments (patient_id, date, time, status, service, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [patientId, appointment.date, appointment.time, appointment.status, appointment.service, appointment.notes]
    );
    
    return {
      id: result.rows[0].id.toString(),
      ...appointment
    };
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const updateAppointmentStatus = async (appointmentId: string, status: string): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE appointments SET status = $1 WHERE id = $2',
      [status, appointmentId]
    );
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Função para migrar dados do localStorage para o PostgreSQL
export const migrateLocalStorageToDatabase = async (): Promise<void> => {
  try {
    // Buscar agendamentos pendentes do localStorage
    const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
    
    for (const pendingAppointment of pendingAppointments) {
      // Verificar se o paciente já existe
      const client = await pool.connect();
      try {
        const patientResult = await client.query(
          'SELECT id FROM patients WHERE email = $1',
          [pendingAppointment.email.toLowerCase()]
        );
        
        let patientId: string;
        
        if (patientResult.rows.length === 0) {
          // Criar novo paciente
          const newPatient = {
            name: pendingAppointment.name,
            email: pendingAppointment.email,
            whatsApp: pendingAppointment.whatsApp || pendingAppointment.phone || '',
            birthDate: pendingAppointment.birthDate || new Date().toISOString().split('T')[0]
          };
          
          const patient = await addPatient(newPatient);
          patientId = patient.id;
        } else {
          patientId = patientResult.rows[0].id;
        }
        
        // Adicionar agendamentos
        for (const apt of pendingAppointment.appointments) {
          await addAppointment(patientId, apt);
        }
      } finally {
        client.release();
      }
    }
    
    // Limpar localStorage
    localStorage.removeItem('pendingAppointments');
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
};
