
import { ArrowRight, MoveHorizontal, Activity, Stethoscope, FileHeart, UserCheck, ShieldCheck } from 'lucide-react';

// This is a simulation of data that would come from a database
// In a real application, this would be an API call to your backend

export interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string; // We'll store icon names in the database and map them to components
  color: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// This function simulates fetching services from an API
export const fetchServices = async (): Promise<ServiceDetailProps[]> => {
  // Simulate network delay
  await delay(800);
  
  // This is mock data - in a real app this would come from your backend
  return [
    {
      id: "1",
      title: "Reabilitação Física",
      description: "Nossa terapia de reabilitação física ajuda a restaurar a função e movimento após lesões, cirurgias ou condições médicas crônicas. Desenvolvemos planos de tratamento personalizados para atender às necessidades específicas de cada paciente.",
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
      description: "Nossa terapia esportiva é projetada para atletas de todos os níveis. Oferecemos tratamentos especializados para prevenir lesões, melhorar o desempenho e garantir uma recuperação eficiente após lesões relacionadas ao esporte.",
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
      description: "Nossa terapia manual envolve técnicas especializadas de manipulação dos tecidos moles e articulações. Estas técnicas ajudam a reduzir a dor, melhorar a mobilidade e promover a cura natural do corpo.",
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
      description: "Nossa terapia neurológica é especializada no tratamento de pacientes com condições neurológicas como AVC, esclerose múltipla e doença de Parkinson. Focamos em melhorar a função, independência e qualidade de vida.",
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
      description: "Nossa terapia geriátrica é especialmente desenvolvida para atender às necessidades dos idosos. Focamos em manter e melhorar a mobilidade, equilíbrio e força, permitindo maior independência e qualidade de vida.",
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
      description: "Nossos cuidados preventivos visam evitar lesões e promover o bem-estar geral. Oferecemos orientações ergonômicas, programas de exercícios e educação sobre hábitos saudáveis para prevenir problemas futuros.",
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
};

// Helper function to map icon names to actual React components
export const getIconComponent = (iconName: string, size = 24) => {
  switch (iconName) {
    case 'MoveHorizontal':
      return <MoveHorizontal size={size} />;
    case 'Activity':
      return <Activity size={size} />;
    case 'Stethoscope':
      return <Stethoscope size={size} />;
    case 'FileHeart':
      return <FileHeart size={size} />;
    case 'UserCheck':
      return <UserCheck size={size} />;
    case 'ShieldCheck':
      return <ShieldCheck size={size} />;
    default:
      return <MoveHorizontal size={size} />;
  }
};
