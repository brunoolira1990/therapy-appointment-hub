
/**
 * Este arquivo contém funções para simulação de envio de notificações
 * Em um ambiente de produção, estas funções seriam substituídas por 
 * integração real com APIs de WhatsApp e email
 */

// Configurações do servidor de email
const EMAIL_CONFIG = {
  host: 'smtp.tatyanelira.com.br',
  port: 465,
  secure: true,
  auth: {
    user: 'contato@tatyanelira.com.br', // Substitua pelo email correto
    pass: 'Tatyane@Tatyane'
  }
};

// Simula o envio de uma mensagem de WhatsApp
export const sendWhatsApp = (whatsAppNumber: string, message: string): Promise<boolean> => {
  // Em um ambiente real, aqui haveria uma chamada para a API do WhatsApp Business
  console.log(`Enviando WhatsApp para ${whatsAppNumber}: ${message}`);
  
  // Simulando um tempo de resposta da API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`WhatsApp enviado com sucesso para ${whatsAppNumber}`);
      resolve(true);
    }, 800);
  });
};

// Simula o envio de um email usando as configurações fornecidas
export const sendEmail = (email: string, subject: string, message: string): Promise<boolean> => {
  // Em um ambiente real, aqui haveria uma chamada usando nodemailer ou similar
  // com as configurações fornecidas
  console.log(`Enviando email para ${email} usando o servidor ${EMAIL_CONFIG.host}`);
  console.log(`Assunto: ${subject}`);
  console.log(`Mensagem: ${message}`);
  
  // Simulando um tempo de resposta do servidor de email
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
