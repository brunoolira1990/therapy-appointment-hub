
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceDetailContentProps {
  title: string;
  onScheduleClick: () => void;
  onContactClick: () => void;
}

const ServiceDetailContent: React.FC<ServiceDetailContentProps> = ({ 
  title, 
  onScheduleClick, 
  onContactClick 
}) => {
  return (
    <section className="py-16">
      <div className="container-narrow">
        <h2 className="text-2xl font-bold mb-6">Sobre este Serviço</h2>
        <p className="text-muted-foreground mb-6">
          A {title} oferecida pela Dra. Tatyane Prado de Lira é um tratamento 
          especializado focado em recuperação, melhorando sua qualidade de vida e 
          garantindo resultados eficazes. Com técnicas modernas e personalizadas, 
          cada sessão é adaptada às necessidades individuais.
        </p>
        
        <p className="text-muted-foreground mb-8">
          O tratamento começa com uma avaliação completa para identificar as causas 
          do problema, seguida por um plano de tratamento personalizado. Ao longo do
          processo, seu progresso é monitorado constantemente, com ajustes conforme necessário
          para garantir os melhores resultados.
        </p>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
          <div>
            <p className="text-muted-foreground">
              Precisa de mais informações?
            </p>
            <h3 className="text-2xl font-bold mt-2">
              Entre em contato conosco
            </h3>
          </div>
          <div className="flex gap-4">
            <Button onClick={onScheduleClick}>
              Agendar Consulta
            </Button>
            <Button variant="outline" onClick={onContactClick}>
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailContent;
