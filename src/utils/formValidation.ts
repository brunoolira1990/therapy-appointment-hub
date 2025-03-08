
// Email validation using regex
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// WhatsApp validation for Brazilian format
export const isValidWhatsApp = (whatsApp: string): boolean => {
  // Check if the whatsApp contains the expected pattern: (XX) XXXXX-XXXX
  const whatsAppRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return whatsAppRegex.test(whatsApp);
};

// Form validation function
export const validateAppointmentForm = (
  selectedDate: Date | null,
  selectedService: string,
  selectedTimeSlot: string,
  name: string,
  email: string,
  whatsApp: string
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!selectedDate) {
    errors.date = 'Por favor, selecione uma data';
  }

  if (!selectedService) {
    errors.service = 'Por favor, selecione um serviço';
  }

  if (!selectedTimeSlot) {
    errors.timeSlot = 'Por favor, selecione um horário';
  }

  if (!name.trim()) {
    errors.name = 'Por favor, informe seu nome completo';
  } else if (name.trim().length < 3) {
    errors.name = 'Nome muito curto';
  }

  if (!email.trim()) {
    errors.email = 'Por favor, informe seu email';
  } else if (!isValidEmail(email)) {
    errors.email = 'Por favor, informe um email válido';
  }

  if (!whatsApp.trim()) {
    errors.whatsApp = 'Por favor, informe seu WhatsApp';
  } else if (!isValidWhatsApp(whatsApp)) {
    errors.whatsApp = 'Por favor, informe um número válido no formato (DD) XXXXX-XXXX';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
