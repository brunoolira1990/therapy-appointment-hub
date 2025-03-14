
import { Patient } from '@/types/patient';

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

// Helper function to get patients from localStorage - used by other modules
export const getLocalPatients = (): Patient[] => {
  return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
};

// Helper function to save patients to localStorage - used by other modules
export const saveLocalPatients = (patients: Patient[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(patients));
};

export { localStorageKey };
