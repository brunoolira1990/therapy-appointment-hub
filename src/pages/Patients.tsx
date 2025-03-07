
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ArrowRight, UserCheck, UserPlus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PatientCard from '@/components/PatientCard';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Patients = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verificar se o usuário tem papel de admin (doutora)
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  // Dados de amostra de pacientes
  const patients = [
    {
      name: 'Alexandre Silva',
      email: 'alexandre@exemplo.com',
      phone: '(11) 98765-4321',
      birthDate: '1985-06-15'
    },
    {
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      phone: '(11) 98765-4322',
      birthDate: '1990-03-22'
    },
    {
      name: 'David Costa',
      email: 'david@exemplo.com',
      phone: '(11) 98765-4323',
      birthDate: '1978-11-08'
    },
    {
      name: 'Ana Beatriz',
      email: 'ana@exemplo.com',
      phone: '(11) 98765-4324',
      birthDate: '1982-09-12'
    },
    {
      name: 'Carlos Eduardo',
      email: 'carlos@exemplo.com',
      phone: '(11) 98765-4325',
      birthDate: '1975-04-28'
    },
    {
      name: 'Isabela Martins',
      email: 'isabela@exemplo.com',
      phone: '(11) 98765-4326',
      birthDate: '1995-11-17'
    }
  ];

  const handleAddPatient = () => {
    toast('Funcionalidade em desenvolvimento', {
      description: 'A adição de novos pacientes estará disponível em breve.'
    });
  };

  const handleEditPatient = (name: string) => {
    toast('Edição de paciente', {
      description: `Você iniciou a edição do paciente ${name}.`
    });
  };

  const handleDeletePatient = (name: string) => {
    toast('Exclusão de paciente', {
      description: `Confirmação para excluir o paciente ${name}.`
    });
  };

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient, index) => (
              <PatientCard
                key={index}
                name={patient.name}
                email={patient.email}
                phone={patient.phone}
                birthDate={patient.birthDate}
                onEdit={() => handleEditPatient(patient.name)}
                onDelete={() => handleDeletePatient(patient.name)}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Carregar Mais Pacientes
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Patients;
