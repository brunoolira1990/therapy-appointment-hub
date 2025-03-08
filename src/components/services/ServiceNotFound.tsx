
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServiceNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-wide py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Serviço não encontrado</h2>
      <p className="text-muted-foreground mb-8">
        O serviço que você está procurando não foi encontrado.
      </p>
      <Button onClick={() => navigate('/services')}>
        Ver Todos os Serviços
      </Button>
    </div>
  );
};

export default ServiceNotFound;
