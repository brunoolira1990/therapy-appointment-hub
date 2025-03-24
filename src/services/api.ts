
import { ArrowRight, MoveHorizontal, Activity, Stethoscope, FileHeart, UserCheck, ShieldCheck } from 'lucide-react';
import React, { memo } from 'react';

export interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  color: string;
}

// Cache for services data
let servicesCache: ServiceDetailProps[] | null = null;

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// This function simulates fetching services from an API with caching
export const fetchServices = async (): Promise<ServiceDetailProps[]> => {
  // Return cached data if available
  if (servicesCache) {
    return servicesCache;
  }
  
  // Simulate network delay only on first load
  await delay(800);
  
  // Serviços oferecidos pela Dra. Tatyane Lira
  const services = [
    {
      id: "1",
      title: "Reabilitação Física",
      description: "Tratamento especializado para restaurar a função e movimento após lesões, cirurgias ou condições médicas crônicas. Desenvolvemos planos de tratamento personalizados para atender às necessidades específicas de cada paciente.",
      benefits: [
        "Recuperação acelerada após cirurgias",
        "Aumento da mobilidade e amplitude de movimento",
        "Redução da dor e desconforto",
        "Fortalecimento muscular direcionado",
        "Prevenção de lesões futuras"
      ],
      icon: "MoveHorizontal",
      color: "bg-blue-50"
    },
    {
      id: "2",
      title: "Terapia Esportiva",
      description: "Tratamento especializado para atletas de todos os níveis. Oferecemos técnicas avançadas para prevenir lesões, melhorar o desempenho e garantir uma recuperação eficiente após lesões relacionadas ao esporte.",
      benefits: [
        "Avaliação biomecânica especializada",
        "Programas de prevenção de lesões personalizados",
        "Reabilitação específica para o esporte praticado",
        "Técnicas de recuperação acelerada",
        "Orientação para retorno seguro à atividade"
      ],
      icon: "Activity",
      color: "bg-green-50"
    },
    {
      id: "3",
      title: "Terapia Manual",
      description: "Técnicas especializadas de manipulação dos tecidos moles e articulações. Estas abordagens reduzem a dor, melhoram a mobilidade e promovem a recuperação natural do corpo.",
      benefits: [
        "Alívio eficaz da dor crônica e aguda",
        "Melhora da circulação sanguínea",
        "Redução da tensão muscular",
        "Aumento da amplitude de movimento",
        "Promoção do relaxamento e bem-estar"
      ],
      icon: "Stethoscope",
      color: "bg-purple-50"
    },
    {
      id: "4",
      title: "Terapia Neurológica",
      description: "Tratamento especializado para pacientes com condições neurológicas como AVC, esclerose múltipla e doença de Parkinson. Focamos em melhorar a função, independência e qualidade de vida.",
      benefits: [
        "Recuperação de habilidades motoras",
        "Melhora do equilíbrio e coordenação",
        "Adaptação às limitações funcionais",
        "Treinamento para atividades diárias",
        "Estratégias de compensação personalizadas"
      ],
      icon: "FileHeart",
      color: "bg-rose-50"
    },
    {
      id: "5",
      title: "Terapia Geriátrica",
      description: "Tratamento especializado para atender às necessidades dos idosos. Focamos em manter e melhorar a mobilidade, equilíbrio e força, permitindo maior independência e qualidade de vida.",
      benefits: [
        "Prevenção de quedas",
        "Manutenção da independência funcional",
        "Gerenciamento de condições crônicas",
        "Melhora da marcha e equilíbrio",
        "Orientação para atividades adequadas à idade"
      ],
      icon: "UserCheck",
      color: "bg-amber-50"
    },
    {
      id: "6",
      title: "Cuidados Preventivos",
      description: "Serviços preventivos para evitar lesões e promover o bem-estar geral. Oferecemos orientações ergonômicas, programas de exercícios e educação sobre hábitos saudáveis para prevenir problemas futuros.",
      benefits: [
        "Avaliação ergonômica personalizada",
        "Orientação postural para atividades diárias",
        "Programas de exercícios preventivos",
        "Educação sobre fatores de risco",
        "Estratégias para manutenção da saúde a longo prazo"
      ],
      icon: "ShieldCheck",
      color: "bg-teal-50"
    }
  ];
  
  // Cache the data for future requests
  servicesCache = services;
  
  return services;
};

// Memoize icon components to prevent unnecessary re-renders
const iconComponents = {
  MoveHorizontal: memo((props: any) => <MoveHorizontal {...props} />),
  Activity: memo((props: any) => <Activity {...props} />),
  Stethoscope: memo((props: any) => <Stethoscope {...props} />),
  FileHeart: memo((props: any) => <FileHeart {...props} />),
  UserCheck: memo((props: any) => <UserCheck {...props} />),
  ShieldCheck: memo((props: any) => <ShieldCheck {...props} />)
};

// Helper function to map icon names to actual React components
export const getIconComponent = (iconName: string, size = 24): React.ReactNode => {
  const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || iconComponents.MoveHorizontal;
  return <IconComponent size={size} />;
};
