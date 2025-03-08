
import React from 'react';
import { UserPlus } from 'lucide-react';
import Button from '@/components/Button';

interface PatientsHeaderProps {
  onAddPatient: () => void;
}

const PatientsHeader: React.FC<PatientsHeaderProps> = ({ onAddPatient }) => {
  return (
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
          onClick={onAddPatient}
        >
          Adicionar Novo Paciente
        </Button>
      </div>
    </div>
  );
};

export default PatientsHeader;
