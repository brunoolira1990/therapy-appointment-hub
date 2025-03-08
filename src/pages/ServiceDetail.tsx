
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { fetchServices, getIconComponent, type ServiceDetailProps } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceDetailProps | null>(null);
  const [relatedServices, setRelatedServices] = useState<ServiceDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadService = async () => {
      try {
        setIsLoading(true);
        const servicesData = await fetchServices();
        
        const selectedService = servicesData.find(s => s.id === id);
        if (!selectedService) {
          toast({
            title: "Serviço não encontrado",
            description: "O serviço solicitado não foi encontrado.",
            variant: "destructive",
          });
          navigate('/services');
          return;
        }
        
        setService(selectedService);
        
        // Get related services (excluding current one)
        const related = servicesData
          .filter(s => s.id !== id)
          .slice(0, 3); // Get up to 3 related services
        setRelatedServices(related);
      } catch (error) {
        console.error("Failed to load service:", error);
        toast({
          title: "Erro ao carregar serviço",
          description: "Não foi possível carregar os detalhes do serviço. Por favor, tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadService();
    }
  }, [id, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {isLoading ? (
          <div className="container-wide flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : service ? (
          <>
            {/* Hero Section */}
            <section className={`py-16 ${service.color}`}>
              <div className="container-wide">
                <Link 
                  to="/services" 
                  className="inline-flex items-center mb-6 text-sm font-medium text-primary hover:underline"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar para todos os serviços
                </Link>
                
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4">
                        {getIconComponent(service.icon)}
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
                    </div>
                    
                    <p className="text-muted-foreground text-lg mb-8">
                      {service.description}
                    </p>
                    
                    <Button>
                      Agendar Consulta
                    </Button>
                  </div>
                  
                  <div className="w-full md:w-1/3 rounded-xl overflow-hidden">
                    <div className="border border-primary/10 rounded-xl p-6 bg-white/80">
                      <h3 className="font-semibold text-xl mb-4">Benefícios</h3>
                      <ul className="space-y-3">
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
            </section>
            
            {/* Detailed Information */}
            <section className="py-16">
              <div className="container-narrow">
                <h2 className="text-2xl font-bold mb-6">Sobre este Serviço</h2>
                <p className="text-muted-foreground mb-6">
                  A {service.title} oferecida pela Dra. Tatyane Prado de Lira é um tratamento 
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
                    <Button>
                      Agendar Consulta
                    </Button>
                    <Button variant="outline">
                      Fale Conosco
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Related Services */}
            {relatedServices.length > 0 && (
              <section className="py-16 bg-secondary/30">
                <div className="container-wide">
                  <h2 className="text-2xl font-bold mb-8">Outros Serviços Relacionados</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedServices.map((relatedService) => (
                      <div 
                        key={relatedService.id}
                        className="group relative p-6 rounded-2xl glass-card hover-card overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/services/${relatedService.id}`)}
                      >
                        {/* Icon Container */}
                        <div className="w-12 h-12 mb-6 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          {getIconComponent(relatedService.icon)}
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-xl font-bold mb-3">{relatedService.title}</h3>
                        <p className="text-muted-foreground mb-6">{relatedService.description.substring(0, 120)}...</p>
                        
                        <Button 
                          variant="ghost" 
                          className="px-0 hover:bg-transparent hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/services/${relatedService.id}`);
                          }}
                        >
                          Saiba mais
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                        
                        {/* Subtle Gradient Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="container-wide py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Serviço não encontrado</h2>
            <p className="text-muted-foreground mb-8">
              O serviço que você está procurando não foi encontrado.
            </p>
            <Button onClick={() => navigate('/services')}>
              Ver Todos os Serviços
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
