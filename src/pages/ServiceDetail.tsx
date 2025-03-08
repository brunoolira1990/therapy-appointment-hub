
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchServices, type ServiceDetailProps } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import ServiceDetailHero from '@/components/services/ServiceDetailHero';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import RelatedServices from '@/components/services/RelatedServices';
import ServiceLoading from '@/components/services/ServiceLoading';
import ServiceNotFound from '@/components/services/ServiceNotFound';

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

  const handleScheduleClick = () => {
    navigate('/#booking-section');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {isLoading ? (
          <ServiceLoading />
        ) : service ? (
          <>
            <ServiceDetailHero 
              service={service} 
              onScheduleClick={handleScheduleClick} 
            />
            
            <ServiceDetailContent
              title={service.title}
              onScheduleClick={handleScheduleClick}
              onContactClick={handleContactClick}
            />
            
            <RelatedServices relatedServices={relatedServices} />
          </>
        ) : (
          <ServiceNotFound />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
