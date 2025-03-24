
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchServices, type ServiceDetailProps } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesOverview from '@/components/services/ServicesOverview';
import ServicesDetailed from '@/components/services/ServicesDetailed';
import ServicesCTA from '@/components/services/ServicesCTA';
import AppointmentFormDialog from '@/components/AppointmentFormDialog';
import { useAppointmentForm } from '@/contexts/AppointmentFormContext';
import ServiceLoading from '@/components/services/ServiceLoading';

const Services = () => {
  const [services, setServices] = useState<ServiceDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isFormOpen, closeAppointmentForm } = useAppointmentForm();

  // Use useCallback to prevent this function from being recreated on each render
  const loadServices = useCallback(async () => {
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
  }, [toast]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Use useCallback for event handlers to maintain referential identity between renders
  const handleScheduleClick = useCallback(() => {
    // This function will be passed down but not directly used
    // Components will use the AppointmentFormContext instead
  }, []);

  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  // For performance optimization, memoize the content section
  const ServicesContent = useMemo(() => {
    if (isLoading) {
      return <ServiceLoading />;
    }
    
    return (
      <>
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
      </>
    );
  }, [services, isLoading, handleScheduleClick, handleContactClick]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <ServicesHero />
        {ServicesContent}
      </main>
      
      <AppointmentFormDialog 
        open={isFormOpen} 
        onOpenChange={closeAppointmentForm} 
      />
      
      <Footer />
    </div>
  );
};

export default Services;
