
import { Patient, Appointment } from '@/types/patient';
import { addPatient } from './patients';
import { addAppointment } from './appointments';
import { pgPool, isBrowser } from './init';

// Função para migrar dados do localStorage para o sistema atual
export const migrateLocalStorageToDatabase = async (): Promise<void> => {
  try {
    // Buscar agendamentos pendentes do localStorage antigo
    const pendingAppointmentsKey = 'pendingAppointments';
    let pendingAppointments: any[] = [];
    
    if (isBrowser && localStorage.getItem(pendingAppointmentsKey)) {
      pendingAppointments = JSON.parse(localStorage.getItem(pendingAppointmentsKey) || '[]');
    } else if (!isBrowser && pgPool) {
      // Verificar se existe uma tabela para migração no PostgreSQL
      const { rows } = await pgPool.query(
        "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'pending_appointments')"
      );
      
      if (rows[0].exists) {
        const result = await pgPool.query('SELECT * FROM pending_appointments');
        pendingAppointments = result.rows;
      }
    }
    
    for (const pendingAppointment of pendingAppointments) {
      try {
        // Criar novo paciente
        const newPatient = {
          name: pendingAppointment.name,
          email: pendingAppointment.email,
          whatsApp: pendingAppointment.whatsApp || pendingAppointment.phone || '',
          birthDate: pendingAppointment.birthDate || new Date().toISOString().split('T')[0],
          appointments: [] // Adicionando appointments para satisfazer o tipo
        };
        
        // Adicionar o paciente e obter o ID
        const patient = await addPatient(newPatient);
        const patientId = patient.id;
        
        // Adicionar agendamentos
        for (const apt of pendingAppointment.appointments) {
          await addAppointment(patientId, apt);
        }
      } catch (innerError) {
        console.error('Error processing pending appointment:', innerError);
      }
    }
    
    // Limpar dados antigos
    if (isBrowser) {
      localStorage.removeItem(pendingAppointmentsKey);
    } else if (!isBrowser && pgPool) {
      try {
        await pgPool.query('DROP TABLE IF EXISTS pending_appointments');
      } catch (dropError) {
        console.error('Error dropping old table:', dropError);
      }
    }
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
};
