
import React from 'react';
import { cn } from '@/lib/utils';
import { useAppointmentForm } from '@/hooks/useAppointmentForm';

// Import components
import ServiceSelection from './appointment/ServiceSelection';
import DateSelection from './appointment/DateSelection';
import TimeSelection from './appointment/TimeSelection';
import ContactForm from './appointment/ContactForm';
import AppointmentFormHeader from './appointment/AppointmentFormHeader';

interface AppointmentFormProps {
  className?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ className }) => {
  const {
    formData,
    setters,
    handlers,
    data
  } = useAppointmentForm();
  
  const {
    selectedDate,
    selectedService,
    selectedTimeSlot,
    name,
    email,
    whatsApp,
    notes
  } = formData;
  
  const {
    setSelectedDate,
    setSelectedService,
    setSelectedTimeSlot,
    setName,
    setEmail,
    setNotes
  } = setters;
  
  const {
    handleWhatsAppChange,
    resetTimeSlot,
    handleSubmit
  } = handlers;
  
  const {
    services,
    availableDates,
    availableTimeSlots,
    formatDate
  } = data;
  
  return (
    <div className={cn('glass-card rounded-2xl overflow-hidden', className)}>
      <AppointmentFormHeader 
        title="Agende Sua Consulta" 
        subtitle="Preencha o formulário abaixo para agendar uma sessão" 
      />
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Service Selection Component */}
        <ServiceSelection
          services={services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
        
        {/* Date Selection Component */}
        <DateSelection
          availableDates={availableDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          resetTimeSlot={resetTimeSlot}
          formatDate={formatDate}
        />
        
        {/* Time Selection Component */}
        <TimeSelection
          selectedDate={selectedDate}
          availableTimeSlots={availableTimeSlots}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />
        
        {/* Contact Form Component */}
        <ContactForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          whatsApp={whatsApp}
          handleWhatsAppChange={handleWhatsAppChange}
          notes={notes}
          setNotes={setNotes}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AppointmentForm;
