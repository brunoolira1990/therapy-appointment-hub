
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ArrowRight, UserCheck, UserPlus, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PatientCard from '@/components/PatientCard';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import PatientFormDialog from '@/components/PatientFormDialog';

const Patients = () => {
  const { user, isAuthenticated } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verificar se o usuário tem papel de admin (doutora)
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  // Dados de amostra de pacientes
  const [patients, setPatients] = useState([
    {
      id: 'PT-1001',
      name: 'Alexandre Silva',
      email: 'alexandre@exemplo.com',
      phone: '(11) 98765-4321',
      birthDate: '1985-06-15',
      appointments: [
        { date: '2023-10-15', time: '14:00', status: 'completed', service: 'Fisioterapia Ortopédica' },
        { date: '2023-11-05', time: '10:00', status: 'scheduled', service: 'Avaliação de Rotina' }
      ]
    },
    {
      id: 'PT-1002',
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      phone: '(11) 98765-4322',
      birthDate: '1990-03-22',
      appointments: [
        { date: '2023-11-10', time: '15:30', status: 'scheduled', service: 'Fisioterapia Neurológica' }
      ]
    },
    {
      id: 'PT-1003',
      name: 'David Costa',
      email: 'david@exemplo.com',
      phone: '(11) 98765-4323',
      birthDate: '1978-11-08',
      appointments: []
    },
    {
      id: 'PT-1004',
      name: 'Ana Beatriz',
      email: 'ana@exemplo.com',
      phone: '(11) 98765-4324',
      birthDate: '1982-09-12',
      appointments: [
        { date: '2023-09-20', time: '09:00', status: 'completed', service: 'Terapia Manual' },
        { date: '2023-10-25', time: '11:00', status: 'completed', service: 'Fisioterapia Esportiva' },
        { date: '2023-11-15', time: '09:00', status: 'scheduled', service: 'Avaliação de Rotina' }
      ]
    },
    {
      id: 'PT-1005',
      name: 'Carlos Eduardo',
      email: 'carlos@exemplo.com',
      phone: '(11) 98765-4325',
      birthDate: '1975-04-28',
      appointments: [
        { date: '2023-11-12', time: '16:00', status: 'scheduled', service: 'Fisioterapia Ortopédica' }
      ]
    },
    {
      id: 'PT-1006',
      name: 'Isabela Martins',
      email: 'isabela@exemplo.com',
      phone: '(11) 98765-4326',
      birthDate: '1995-11-17',
      appointments: []
    }
  ]);

  const handleAddPatient = () => {
    setEditingPatient(null);
    setIsFormOpen(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setIsFormOpen(true);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      const updatedPatients = patients.filter(patient => patient.id !== patientId);
      setPatients(updatedPatients);
      toast.success('Paciente excluído com sucesso');
    }
  };

  const handleFormSubmit = (patientData) => {
    if (editingPatient) {
      // Atualizando paciente existente
      const updatedPatients = patients.map(patient => 
        patient.id === editingPatient.id ? { ...patient, ...patientData } : patient
      );
      setPatients(updatedPatients);
      toast.success('Paciente atualizado com sucesso');
    } else {
      // Adicionando novo paciente
      const newPatient = {
        id: `PT-${1000 + patients.length + 1}`,
        ...patientData,
        appointments: []
      };
      setPatients([...patients, newPatient]);
      toast.success('Paciente adicionado com sucesso');
    }
    setIsFormOpen(false);
    setEditingPatient(null);
  };

  const handleViewAppointments = (patient) => {
    // Aqui mostraria as consultas do paciente
    toast('Consultas do paciente', {
      description: `${patient.name} tem ${patient.appointments.length} consultas.`
    });
  };

  // Filtrar pacientes com base no termo de pesquisa
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Gerenciamento de Pacientes</h1>
              <p className="text-muted-foreground mt-2">
                Gerencie todos os pacientes da clínica em um só lugar
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="primary"
                size="md"
                icon={<UserPlus size={16} />}
                iconPosition="left"
                onClick={handleAddPatient}
              >
                Adicionar Novo Paciente
              </Button>
            </div>
          </div>
          
          {/* Barra de pesquisa */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Buscar pacientes por nome, email ou telefone..."
                className="pl-10 pr-4 py-2 w-full border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-1">Nenhum paciente encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? "Nenhum paciente corresponde aos critérios de pesquisa." 
                  : "Comece adicionando um novo paciente."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  name={patient.name}
                  email={patient.email}
                  phone={patient.phone}
                  birthDate={patient.birthDate}
                  patientId={patient.id}
                  appointmentsCount={patient.appointments.length}
                  onEdit={() => handleEditPatient(patient)}
                  onDelete={() => handleDeletePatient(patient.id)}
                  onViewAppointments={() => handleViewAppointments(patient)}
                />
              ))}
            </div>
          )}
          
          {filteredPatients.length > 0 && filteredPatients.length < patients.length && (
            <div className="text-center mt-6 text-sm text-muted-foreground">
              Mostrando {filteredPatients.length} de {patients.length} pacientes
            </div>
          )}
        </div>
      </main>
      
      <PatientFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingPatient}
      />
      
      <Footer />
    </div>
  );
};

export default Patients;
