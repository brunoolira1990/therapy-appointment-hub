
import React from 'react';
import { ArrowRight, MoveHorizontal, Activity, Stethoscope, FileHeart, UserCheck, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceDetailProps {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  color: string;
}

const Services = () => {
  // Serviços detalhados - no futuro estes viriam do backend/CMS
  const servicesData: ServiceDetailProps[] = [
    {
      title: "Reabilitação Física",
      description: "Nossa terapia de reabilitação física ajuda a restaurar a função e movimento após lesões, cirurgias ou condições médicas crônicas. Desenvolvemos planos de tratamento personalizados para atender às necessidades específicas de cada paciente.",
      benefits: [
        "Recuperação acelerada após cirurgias",
        "Aumento da mobilidade e amplitude de movimento",
        "Redução da dor e desconforto",
        "Fortalecimento muscular direcionado",
        "Prevenção de lesões futuras"
      ],
      icon: <MoveHorizontal size={24} />,
      color: "bg-blue-50"
    },
    {
      title: "Terapia Esportiva",
      description: "Nossa terapia esportiva é projetada para atletas de todos os níveis. Oferecemos tratamentos especializados para prevenir lesões, melhorar o desempenho e garantir uma recuperação eficiente após lesões relacionadas ao esporte.",
      benefits: [
        "Avaliação biomecânica especializada",
        "Programas de prevenção de lesões personalizados",
        "Reabilitação específica para o esporte praticado",
        "Técnicas de recuperação acelerada",
        "Orientação para retorno seguro à atividade"
      ],
      icon: <Activity size={24} />,
      color: "bg-green-50"
    },
    {
      title: "Terapia Manual",
      description: "Nossa terapia manual envolve técnicas especializadas de manipulação dos tecidos moles e articulações. Estas técnicas ajudam a reduzir a dor, melhorar a mobilidade e promover a cura natural do corpo.",
      benefits: [
        "Alívio eficaz da dor crônica e aguda",
        "Melhora da circulação sanguínea",
        "Redução da tensão muscular",
        "Aumento da amplitude de movimento",
        "Promoção do relaxamento e bem-estar"
      ],
      icon: <Stethoscope size={24} />,
      color: "bg-purple-50"
    },
    {
      title: "Terapia Neurológica",
      description: "Nossa terapia neurológica é especializada no tratamento de pacientes com condições neurológicas como AVC, esclerose múltipla e doença de Parkinson. Focamos em melhorar a função, independência e qualidade de vida.",
      benefits: [
        "Recuperação de habilidades motoras",
        "Melhora do equilíbrio e coordenação",
        "Adaptação às limitações funcionais",
        "Treinamento para atividades diárias",
        "Estratégias de compensação personalizadas"
      ],
      icon: <FileHeart size={24} />,
      color: "bg-rose-50"
    },
    {
      title: "Terapia Geriátrica",
      description: "Nossa terapia geriátrica é especialmente desenvolvida para atender às necessidades dos idosos. Focamos em manter e melhorar a mobilidade, equilíbrio e força, permitindo maior independência e qualidade de vida.",
      benefits: [
        "Prevenção de quedas",
        "Manutenção da independência funcional",
        "Gerenciamento de condições crônicas",
        "Melhora da marcha e equilíbrio",
        "Orientação para atividades adequadas à idade"
      ],
      icon: <UserCheck size={24} />,
      color: "bg-amber-50"
    },
    {
      title: "Cuidados Preventivos",
      description: "Nossos cuidados preventivos visam evitar lesões e promover o bem-estar geral. Oferecemos orientações ergonômicas, programas de exercícios e educação sobre hábitos saudáveis para prevenir problemas futuros.",
      benefits: [
        "Avaliação ergonômica personalizada",
        "Orientação postural para atividades diárias",
        "Programas de exercícios preventivos",
        "Educação sobre fatores de risco",
        "Estratégias para manutenção da saúde a longo prazo"
      ],
      icon: <ShieldCheck size={24} />,
      color: "bg-teal-50"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                Nossos Serviços
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Serviços de Fisioterapia Especializados</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Oferecemos uma ampla gama de tratamentos fisioterapêuticos adaptados às suas necessidades específicas, 
                com abordagens modernas e personalizadas para sua reabilitação e bem-estar.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Overview */}
        <section className="py-16">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesData.slice(0, 3).map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description.substring(0, 120) + "..."}
                  icon={service.icon}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {servicesData.slice(3, 6).map((service, index) => (
                <ServiceCard
                  key={index + 3}
                  title={service.title}
                  description={service.description.substring(0, 120) + "..."}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Detailed Services */}
        <section className="py-16 bg-secondary/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Conheça Nossos Serviços em Detalhes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cada um de nossos serviços é cuidadosamente desenvolvido para oferecer o melhor tratamento possível, 
                com base nas melhores práticas e evidências científicas atuais.
              </p>
            </div>
            
            <div className="space-y-12">
              {servicesData.map((service, index) => (
                <div 
                  key={index}
                  className={cn(
                    "rounded-2xl p-8 glass-card transition-all",
                    service.color
                  )}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        className="px-0 hover:bg-transparent hover:text-primary"
                      >
                        Agendar Consulta
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                    
                    <div className="md:w-1/3">
                      <div className="border border-primary/10 rounded-xl p-6 bg-white/80">
                        <h4 className="font-semibold mb-4">Benefícios</h4>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container-narrow text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para Começar Seu Tratamento?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Entre em contato conosco hoje mesmo para agendar uma avaliação inicial 
              e descobrir como nossos serviços de fisioterapia podem ajudar você a 
              alcançar seus objetivos de saúde e bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg">
                Agendar Consulta
              </Button>
              <Button variant="outline" size="lg">
                Fale Conosco
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
