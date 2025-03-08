
import React from 'react';
import { Calendar } from 'lucide-react';
import Button from '@/components/Button';

const CTASection: React.FC = () => {
  const scrollToBookingForm = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-primary/5 relative overflow-hidden">
      <div className="container-narrow relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Iniciar Sua Jornada de Recuperação?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Dê o primeiro passo em direção a uma saúde e mobilidade melhores agendando uma consulta com nossos fisioterapeutas especialistas hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<Calendar size={18} />}
              iconPosition="left"
              onClick={scrollToBookingForm}
            >
              Agendar uma Consulta
            </Button>
            <Button
              variant="outline"
              size="lg"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 animate-float"></div>
        <div className="absolute top-1/2 -left-12 w-40 h-40 rounded-full bg-primary/10 animate-pulse-slow"></div>
        <div className="absolute -bottom-8 right-1/4 w-20 h-20 rounded-full bg-primary/5 animate-float animation-delay-500"></div>
      </div>
    </section>
  );
};

export default CTASection;
