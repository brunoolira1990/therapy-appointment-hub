
export interface Service {
  id: string;
  name: string;
  description: string;
}

// Dados dos serviços da Dra. Tatyane Lira
export const services: Service[] = [
  { id: '1', name: 'Reabilitação Física', description: 'Recuperação de lesões ou cirurgias' },
  { id: '2', name: 'Terapia Esportiva', description: 'Terapia especializada para atletas' },
  { id: '3', name: 'Terapia Manual', description: 'Técnicas manuais para alívio da dor' },
  { id: '4', name: 'Terapia Neurológica', description: 'Tratamento para condições neurológicas' },
  { id: '5', name: 'Terapia Geriátrica', description: 'Cuidados especializados para idosos' },
  { id: '6', name: 'Cuidados Preventivos', description: 'Prevenção de lesões e problemas futuros' }
];

// Utility to get service name by ID
export const getServiceNameById = (id: string): string => {
  const service = services.find(service => service.id === id);
  return service ? service.name : '';
};
