
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import AppointmentForm from '@/components/AppointmentForm';

const BookingSection: React.FC = () => {
  return (
    <section id="booking-section" className="py-20">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Text Column */}
          <div className="flex flex-col justify-center">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
              Agende uma Sessão
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Agende Sua Próxima Consulta</h2>
            <p className="text-muted-foreground mb-6">
              Dar o primeiro passo em direção à recuperação agora é mais fácil do que nunca. Agende uma consulta com nossos fisioterapeutas especialistas e comece sua jornada para uma saúde melhor.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Sistema de agendamento online conveniente',
                'Horários de consulta flexíveis para se adequar à sua agenda',
                'Consultas no mesmo dia para casos urgentes',
                'Não é necessário encaminhamento para a maioria dos serviços',
                'Múltiplos terapeutas com diferentes especializações'
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1 text-primary" />
                <span>Disponível 6 dias por semana</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-primary" />
                <span>Horários estendidos disponíveis</span>
              </div>
            </div>
          </div>
          
          {/* Form Column */}
          <div>
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
