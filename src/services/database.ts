
import { Patient, Appointment } from '@/types/patient';

// Usamos localStorage como fallback já que o PostgreSQL não funciona no navegador
const localStorageKey = 'fisioApp_patients';

// Inicializa o armazenamento local se não existir
export const initializeDatabase = async (): Promise<void> => {
  try {
    if (!localStorage.getItem(localStorageKey)) {
      localStorage.setItem(localStorageKey, JSON.stringify([]));
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Funções para gerenciar pacientes
export const getPatients = async (): Promise<Patient[]> => {
  try {
    const patients = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
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
    localStorage.setItem(localStorageKey, JSON.stringify(patients));
    
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
      localStorage.setItem(localStorageKey, JSON.stringify(patients));
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
    localStorage.setItem(localStorageKey, JSON.stringify(filteredPatients));
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
};

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
    localStorage.setItem(localStorageKey, JSON.stringify(patients));
    
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
      localStorage.setItem(localStorageKey, JSON.stringify(patients));
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

// Função para migrar dados do localStorage para o sistema atual
export const migrateLocalStorageToDatabase = async (): Promise<void> => {
  try {
    // Buscar agendamentos pendentes do localStorage antigo
    const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
    
    for (const pendingAppointment of pendingAppointments) {
      try {
        // Verificar se o paciente já existe
        const patients = await getPatients();
        const existingPatient = patients.find(
          p => p.email.toLowerCase() === pendingAppointment.email.toLowerCase()
        );
        
        let patientId: string;
        
        if (!existingPatient) {
          // Criar novo paciente
          const newPatient = {
            name: pendingAppointment.name,
            email: pendingAppointment.email,
            whatsApp: pendingAppointment.whatsApp || pendingAppointment.phone || '',
            birthDate: pendingAppointment.birthDate || new Date().toISOString().split('T')[0],
            appointments: [] // Incluindo a propriedade appointments
          };
          
          const patient = await addPatient(newPatient);
          patientId = patient.id;
        } else {
          patientId = existingPatient.id;
        }
        
        // Adicionar agendamentos
        for (const apt of pendingAppointment.appointments) {
          await addAppointment(patientId, apt);
        }
      } catch (innerError) {
        console.error('Error processing pending appointment:', innerError);
      }
    }
    
    // Limpar localStorage antigo
    localStorage.removeItem('pendingAppointments');
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
};
