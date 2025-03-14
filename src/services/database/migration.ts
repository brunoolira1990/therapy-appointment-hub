
import { addPatient } from './patients';
import { addAppointment } from './appointments';

// Função para migrar dados do localStorage para o sistema atual
export const migrateLocalStorageToDatabase = async (): Promise<void> => {
  try {
    // Buscar agendamentos pendentes do localStorage antigo
    const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
    
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
    
    // Limpar localStorage antigo
    localStorage.removeItem('pendingAppointments');
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
};
