
import React from 'react';
import { ArrowRight, MoveHorizontal, Activity, Stethoscope, FileHeart, UserCheck, ShieldCheck } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import Button from '@/components/Button';

const ServiceSection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços Especializados de Fisioterapia</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma ampla gama de tratamentos fisioterapêuticos adaptados às suas necessidades e condições específicas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            id="1"
            title="Reabilitação Física"
            description="Reabilitação abrangente para lesões, cirurgias e condições crônicas para restaurar a mobilidade e função."
            icon={<MoveHorizontal size={24} />}
          />
          
          <ServiceCard
            id="2"
            title="Terapia Esportiva"
            description="Terapia especializada para atletas com foco na prevenção de lesões, melhoria de desempenho e recuperação rápida."
            icon={<Activity size={24} />}
          />
          
          <ServiceCard
            id="3"
            title="Terapia Manual"
            description="Técnicas manuais para reduzir a dor, aumentar a amplitude de movimento e melhorar a cicatrização dos tecidos."
            icon={<Stethoscope size={24} />}
          />
          
          <ServiceCard
            id="4"
            title="Terapia Neurológica"
            description="Tratamentos especializados para pacientes com condições neurológicas para melhorar movimento, equilíbrio e coordenação."
            icon={<FileHeart size={24} />}
          />
          
          <ServiceCard
            id="5"
            title="Terapia Geriátrica"
            description="Terapia suave e eficaz projetada especificamente para idosos para manter a mobilidade e independência."
            icon={<UserCheck size={24} />}
          />
          
          <ServiceCard
            id="6"
            title="Cuidados Preventivos"
            description="Programas educacionais e exercícios para prevenir lesões e manter a saúde física ideal e bem-estar."
            icon={<ShieldCheck size={24} />}
          />
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            onClick={() => window.location.href = '/services'}
          >
            Ver Todos os Serviços
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
