
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Patient } from '@/types/patient';
import { migrateLocalStorageToDatabase } from '@/services/database';

export const usePendingAppointments = (
  patients: Patient[], 
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
) => {
  // Verificar se há agendamentos pendentes no localStorage e migrar para o banco
  useEffect(() => {
    const migratePendingAppointments = async () => {
      try {
        await migrateLocalStorageToDatabase();
      } catch (error) {
        console.error('Error migrating pending appointments:', error);
        // Silenciosamente falha - já temos um fallback no usePatientManagement
      }
    };
    
    migratePendingAppointments();
  }, []);
};
