
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Patient } from '@/types/patient';
import { 
  getPatients, 
  addPatient, 
  updatePatient, 
  deletePatient, 
  initializeDatabase,
  migrateLocalStorageToDatabase
} from '@/services/database';

export const usePatientManagement = (initialPatients: Patient[] = []) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize database and load patients
  useEffect(() => {
    let isMounted = true;
    
    const initDB = async () => {
      try {
        // Initialize database
        await initializeDatabase();
        
        // Migrate data from localStorage to database if exists
        await migrateLocalStorageToDatabase();
        
        // Load patients from database
        const loadedPatients = await getPatients();
        
        if (isMounted) {
          setPatients(loadedPatients);
        }
      } catch (error) {
        console.error('Error initializing database:', error);
        
        if (isMounted) {
          toast.error('Erro ao carregar dados', {
            description: 'Usando dados locais temporariamente'
          });
          
          // Load from localStorage as fallback
          try {
            const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
            if (pendingAppointments.length > 0) {
              // Process localStorage data
              const updatedPatients = [...initialPatients];
              
              pendingAppointments.forEach((pendingAppointment: any) => {
                const existingPatientIndex = updatedPatients.findIndex(
                  p => p.email?.toLowerCase() === pendingAppointment.email?.toLowerCase()
                );
                
                if (existingPatientIndex >= 0) {
                  updatedPatients[existingPatientIndex].appointments = [
                    ...(updatedPatients[existingPatientIndex].appointments || []),
                    ...(pendingAppointment.appointments || [])
                  ];
                } else {
                  const newPatient = {
                    id: `PT-${1000 + updatedPatients.length + 1}`,
                    name: pendingAppointment.name || '',
                    email: pendingAppointment.email || '',
                    whatsApp: pendingAppointment.phone || pendingAppointment.whatsApp || '',
                    birthDate: pendingAppointment.birthDate || new Date().toISOString().split('T')[0],
                    appointments: pendingAppointment.appointments || []
                  };
                  
                  updatedPatients.push(newPatient);
                }
              });
              
              setPatients(updatedPatients);
            }
          } catch (storageError) {
            console.error('Error processing localStorage data:', storageError);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    initDB();
    
    return () => {
      isMounted = false;
    };
  }, [initialPatients]);

  // Memoize handlers with useCallback to prevent unnecessary re-renders
  const handleAddPatient = useCallback(() => {
    setEditingPatient(null);
  }, []);

  const handleEditPatient = useCallback((patient: Patient) => {
    setEditingPatient(patient);
  }, []);

  const handleDeletePatient = useCallback(async (patientId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        // Delete patient from database
        await deletePatient(patientId);
        
        // Update local state
        setPatients(prev => prev.filter(patient => patient.id !== patientId));
        
        toast.success('Paciente excluído com sucesso');
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('Erro ao excluir paciente');
      }
    }
  }, []);

  const handleFormSubmit = useCallback(async (patientData: Partial<Patient>) => {
    try {
      if (editingPatient) {
        // Update existing patient
        const updatedPatient = {
          ...editingPatient,
          ...patientData
        } as Patient;
        
        // Update in database
        await updatePatient(updatedPatient);
        
        // Update local state
        setPatients(prev => prev.map(patient => 
          patient.id === editingPatient.id ? updatedPatient : patient
        ));
        
        toast.success('Paciente atualizado com sucesso');
      } else {
        // Add new patient
        const newPatientData = {
          name: patientData.name || '',
          email: patientData.email || '',
          whatsApp: patientData.whatsApp || '',
          birthDate: patientData.birthDate || '',
          appointments: []
        };
        
        // Add to database
        const newPatient = await addPatient(newPatientData);
        
        // Update local state
        setPatients(prev => [...prev, newPatient]);
        toast.success('Paciente adicionado com sucesso');
      }
      
      setEditingPatient(null);
    } catch (error) {
      console.error('Error saving patient:', error);
      toast.error('Erro ao salvar paciente');
    }
  }, [editingPatient]);

  const handleViewAppointments = useCallback((patient: Patient) => {
    setSelectedPatient(patient);
  }, []);

  return {
    patients,
    setPatients,
    editingPatient,
    setEditingPatient,
    selectedPatient,
    setSelectedPatient,
    isLoading,
    handleAddPatient,
    handleEditPatient,
    handleDeletePatient,
    handleFormSubmit,
    handleViewAppointments
  };
};
