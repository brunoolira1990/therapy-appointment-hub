
import { useState, useEffect } from 'react';
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

  // Inicializar o banco de dados e carregar pacientes
  useEffect(() => {
    const initDB = async () => {
      try {
        // Inicializar banco de dados
        await initializeDatabase();
        
        // Migrar dados do localStorage para o banco, se houver
        await migrateLocalStorageToDatabase();
        
        // Carregar pacientes do banco
        const loadedPatients = await getPatients();
        setPatients(loadedPatients);
      } catch (error) {
        console.error('Error initializing database:', error);
        toast.error('Erro ao conectar ao banco de dados', {
          description: 'Usando dados locais temporariamente'
        });
        
        // Carrega do localStorage como fallback
        const pendingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
        if (pendingAppointments.length > 0) {
          // Processar os dados do localStorage como antes
          const updatedPatients = [...initialPatients];
          
          pendingAppointments.forEach((pendingAppointment: any) => {
            const existingPatientIndex = updatedPatients.findIndex(
              p => p.email.toLowerCase() === pendingAppointment.email.toLowerCase()
            );
            
            if (existingPatientIndex >= 0) {
              updatedPatients[existingPatientIndex].appointments = [
                ...updatedPatients[existingPatientIndex].appointments,
                ...pendingAppointment.appointments
              ];
            } else {
              const newPatient = {
                id: `PT-${1000 + updatedPatients.length + 1}`,
                name: pendingAppointment.name,
                email: pendingAppointment.email,
                whatsApp: pendingAppointment.phone || pendingAppointment.whatsApp || '',
                birthDate: pendingAppointment.birthDate || new Date().toISOString().split('T')[0],
                appointments: pendingAppointment.appointments
              };
              
              updatedPatients.push(newPatient);
            }
          });
          
          setPatients(updatedPatients);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    initDB();
  }, [initialPatients]);

  const handleAddPatient = () => {
    setEditingPatient(null);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleDeletePatient = async (patientId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        // Deletar paciente no banco
        await deletePatient(patientId);
        
        // Atualizar estado local
        const updatedPatients = patients.filter(patient => patient.id !== patientId);
        setPatients(updatedPatients);
        
        toast.success('Paciente excluído com sucesso');
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('Erro ao excluir paciente');
      }
    }
  };

  const handleFormSubmit = async (patientData: Partial<Patient>) => {
    try {
      if (editingPatient) {
        // Atualizando paciente existente
        const updatedPatient = {
          ...editingPatient,
          ...patientData
        } as Patient;
        
        // Atualizar no banco
        await updatePatient(updatedPatient);
        
        // Atualizar estado local
        const updatedPatients = patients.map(patient => 
          patient.id === editingPatient.id ? updatedPatient : patient
        );
        
        setPatients(updatedPatients);
        toast.success('Paciente atualizado com sucesso');
      } else {
        // Adicionando novo paciente
        const newPatientData = {
          name: patientData.name || '',
          email: patientData.email || '',
          whatsApp: patientData.whatsApp || '',
          birthDate: patientData.birthDate || '',
          appointments: []
        };
        
        // Adicionar no banco
        const newPatient = await addPatient(newPatientData);
        
        // Atualizar estado local
        setPatients([...patients, newPatient]);
        toast.success('Paciente adicionado com sucesso');
      }
      
      setEditingPatient(null);
    } catch (error) {
      console.error('Error saving patient:', error);
      toast.error('Erro ao salvar paciente');
    }
  };

  const handleViewAppointments = (patient: Patient) => {
    setSelectedPatient(patient);
  };

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
