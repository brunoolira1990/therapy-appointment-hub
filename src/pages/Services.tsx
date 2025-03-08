
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchServices, type ServiceDetailProps } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesOverview from '@/components/services/ServicesOverview';
import ServicesDetailed from '@/components/services/ServicesDetailed';
import ServicesCTA from '@/components/services/ServicesCTA';
import { scrollToBookingSection } from '@/utils/navigation';

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
    scrollToBookingSection(navigate);
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <ServicesHero />
        <ServicesOverview services={services} isLoading={isLoading} />
        <ServicesDetailed 
          services={services} 
          isLoading={isLoading} 
          onScheduleClick={handleScheduleClick} 
        />
        <ServicesCTA 
          onScheduleClick={handleScheduleClick} 
          onContactClick={handleContactClick} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
