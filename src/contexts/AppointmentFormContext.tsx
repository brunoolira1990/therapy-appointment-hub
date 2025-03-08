
import React, { createContext, useContext, useState } from 'react';

interface AppointmentFormContextType {
  isFormOpen: boolean;
  openAppointmentForm: () => void;
  closeAppointmentForm: () => void;
  toggleAppointmentForm: () => void;
}

const AppointmentFormContext = createContext<AppointmentFormContextType | undefined>(undefined);

export const AppointmentFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openAppointmentForm = () => setIsFormOpen(true);
  const closeAppointmentForm = () => setIsFormOpen(false);
  const toggleAppointmentForm = () => setIsFormOpen(prev => !prev);

  return (
    <AppointmentFormContext.Provider value={{
      isFormOpen,
      openAppointmentForm,
      closeAppointmentForm,
      toggleAppointmentForm
    }}>
      {children}
    </AppointmentFormContext.Provider>
  );
};

export const useAppointmentForm = () => {
  const context = useContext(AppointmentFormContext);
  
  if (context === undefined) {
    throw new Error('useAppointmentForm must be used within an AppointmentFormProvider');
  }
  
  return context;
};
