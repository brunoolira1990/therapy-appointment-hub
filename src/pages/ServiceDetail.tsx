
import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import AppointmentFormDialog from '@/components/AppointmentFormDialog';
import { useAppointmentForm } from '@/contexts/AppointmentFormContext';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceDetailProps | null>(null);
  const [relatedServices, setRelatedServices] = useState<ServiceDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isFormOpen, closeAppointmentForm } = useAppointmentForm();

  // Use useCallback to memoize the loadService function
  const loadService = useCallback(async () => {
    if (!id) return;
    
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
  }, [id, navigate, toast]);

  useEffect(() => {
    loadService();
  }, [loadService]);

  // useCallback for event handlers
  const handleScheduleClick = useCallback(() => {
    // This function will be passed down but not directly used
    // Components will use the AppointmentFormContext instead
  }, []);

  const handleContactClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  // Memoize content to prevent unnecessary re-renders
  const ServiceContent = useMemo(() => {
    if (isLoading) {
      return <ServiceLoading />;
    } 
    
    if (!service) {
      return <ServiceNotFound />;
    }
    
    return (
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
    );
  }, [isLoading, service, relatedServices, handleScheduleClick, handleContactClick]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {ServiceContent}
      </main>
      
      <AppointmentFormDialog 
        open={isFormOpen} 
        onOpenChange={closeAppointmentForm} 
      />
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
