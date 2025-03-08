
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fetchServices, getIconComponent, type ServiceDetailProps } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState<ServiceDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to load services:", error);
        toast({
          title: "Erro ao carregar serviços",
          description: "Não foi possível carregar a lista de serviços. Por favor, tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, [toast]);

  const handleScheduleClick = () => {
    navigate('/#booking-section');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

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
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {services.slice(0, 3).map((service) => (
                    <ServiceCard
                      key={service.id}
                      title={service.title}
                      description={service.description.substring(0, 120) + "..."}
                      icon={getIconComponent(service.icon)}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {services.slice(3, 6).map((service) => (
                    <ServiceCard
                      key={service.id}
                      title={service.title}
                      description={service.description.substring(0, 120) + "..."}
                      icon={getIconComponent(service.icon)}
                    />
                  ))}
                </div>
              </>
            )}
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
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className={cn(
                      "rounded-2xl p-8 glass-card transition-all",
                      service.color
                    )}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-2/3">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4">
                            {getIconComponent(service.icon)}
                          </div>
                          <h3 className="text-2xl font-bold">{service.title}</h3>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">
                          {service.description}
                        </p>
                        
                        <Button 
                          variant="ghost" 
                          className="px-0 hover:bg-transparent hover:text-primary"
                          onClick={handleScheduleClick}
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
            )}
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
              <Button size="lg" onClick={handleScheduleClick}>
                Agendar Consulta
              </Button>
              <Button variant="outline" size="lg" onClick={handleContactClick}>
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
