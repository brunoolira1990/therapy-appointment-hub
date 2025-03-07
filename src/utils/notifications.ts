
/**
 * Este arquivo contém funções para simulação de envio de notificações
 * Em um ambiente de produção, estas funções seriam substituídas por 
 * integração real com APIs de SMS e email
 */

// Simula o envio de um SMS
export const sendSMS = (phoneNumber: string, message: string): Promise<boolean> => {
  // Em um ambiente real, aqui haveria uma chamada para uma API de SMS como Twilio, MessageBird, etc.
  console.log(`Enviando SMS para ${phoneNumber}: ${message}`);
  
  // Simulando um tempo de resposta da API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`SMS enviado com sucesso para ${phoneNumber}`);
      resolve(true);
    }, 800);
  });
};

// Simula o envio de um email
export const sendEmail = (email: string, subject: string, message: string): Promise<boolean> => {
  // Em um ambiente real, aqui haveria uma chamada para uma API de email como SendGrid, Mailgun, etc.
  console.log(`Enviando email para ${email}`);
  console.log(`Assunto: ${subject}`);
  console.log(`Mensagem: ${message}`);
  
  // Simulando um tempo de resposta da API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email enviado com sucesso para ${email}`);
      resolve(true);
    }, 1000);
  });
};

// Formata mensagem para consultas confirmadas
export const formatConfirmationMessage = (patientName: string, serviceName: string, date: string, time: string): string => {
  return `Olá ${patientName}, sua consulta de ${serviceName} foi confirmada para ${date} às ${time}. Agradecemos a preferência! - FisioHub`;
};

// Formata mensagem para lembretes de consulta
export const formatReminderMessage = (patientName: string, serviceName: string, date: string, time: string): string => {
  return `Olá ${patientName}, lembramos que sua consulta de ${serviceName} está agendada para ${date} às ${time}. Contamos com sua presença! - FisioHub`;
};

// Formata mensagem para cancelamentos
export const formatCancellationMessage = (patientName: string, serviceName: string, date: string, time: string): string => {
  return `Olá ${patientName}, infelizmente sua consulta de ${serviceName} agendada para ${date} às ${time} foi cancelada. Entre em contato conosco para reagendar. - FisioHub`;
};
