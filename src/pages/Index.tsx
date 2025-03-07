
import React from 'react';
import { ArrowRight, Calendar, UserCheck, Stethoscope, FileHeart, ShieldCheck, MoveHorizontal, Activity, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import AppointmentForm from '@/components/AppointmentForm';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

const Index = () => {
  // Sample reviews
  const testimonials = [
    {
      name: 'Sara Thompson',
      role: 'Paciente em Recuperação',
      content: "O cuidado e atenção que recebi na FisioHub foi excepcional. Os fisioterapeutas são muito capacitados e minha recuperação foi muito mais rápida do que o esperado.",
      avatar: '1'
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Lesão Esportiva',
      content: "Como atleta, eu precisava de cuidados especializados para minha lesão no joelho. A equipe criou um plano de recuperação personalizado que me permitiu voltar aos treinos em tempo recorde.",
      avatar: '2'
    },
    {
      name: 'Emília Silva',
      role: 'Paciente com Dor Crônica',
      content: "Depois de anos com dor crônica nas costas, finalmente encontrei alívio através do programa de terapia manual. Agora posso aproveitar atividades que pensei que nunca mais faria.",
      avatar: '3'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Services Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                Nossos Serviços
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços Especializados de Fisioterapia</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Oferecemos uma ampla gama de tratamentos fisioterapêuticos adaptados às suas necessidades e condições específicas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Reabilitação Física"
                description="Reabilitação abrangente para lesões, cirurgias e condições crônicas para restaurar a mobilidade e função."
                icon={<MoveHorizontal size={24} />}
              />
              
              <ServiceCard
                title="Terapia Esportiva"
                description="Terapia especializada para atletas com foco na prevenção de lesões, melhoria de desempenho e recuperação rápida."
                icon={<Activity size={24} />}
              />
              
              <ServiceCard
                title="Terapia Manual"
                description="Técnicas manuais para reduzir a dor, aumentar a amplitude de movimento e melhorar a cicatrização dos tecidos."
                icon={<Stethoscope size={24} />}
              />
              
              <ServiceCard
                title="Terapia Neurológica"
                description="Tratamentos especializados para pacientes com condições neurológicas para melhorar movimento, equilíbrio e coordenação."
                icon={<FileHeart size={24} />}
              />
              
              <ServiceCard
                title="Terapia Geriátrica"
                description="Terapia suave e eficaz projetada especificamente para idosos para manter a mobilidade e independência."
                icon={<UserCheck size={24} />}
              />
              
              <ServiceCard
                title="Cuidados Preventivos"
                description="Programas educacionais e exercícios para prevenir lesões e manter a saúde física ideal e bem-estar."
                icon={<ShieldCheck size={24} />}
              />
            </div>
            
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Ver Todos os Serviços
              </Button>
            </div>
          </div>
        </section>
        
        {/* Booking Section */}
        <section className="py-20">
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
        
        {/* Testimonials Section */}
        <section className="py-20 overflow-hidden bg-secondary/30">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                Depoimentos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Pacientes Dizem</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Veja o que alguns de nossos pacientes têm a dizer sobre sua experiência com nossos serviços de fisioterapia.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-2xl hover-card"
                >
                  {/* Quote Icon */}
                  <div className="mb-4 text-primary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.3 5.2H5.1c-.4 0-.7.4-.6.8l1.2 3.9H1.9c-.3 0-.6.3-.6.6v6.8c0 .3.3.6.6.6h7.6c.3 0 .6-.3.6-.6V9.4c0-.3 0-.5-.1-.8l-1.1-3.5h2.9c.4 0 .8-.3.8-.8 0-.5-.4-.9-.9-.9zM22.8 5.1h-6.2c-.4 0-.7.4-.6.8l1.2 3.9h-3.8c-.3 0-.6.3-.6.6v6.8c0 .3.3.6.6.6h7.6c.3 0 .6-.3.6-.6V9.4c0-.3 0-.5-.1-.8l-1.1-3.5h2.9c.4 0 .8-.3.8-.8 0-.5-.5-.9-.9-.9z"/>
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <p className="mb-6 text-muted-foreground">
                    {testimonial.content}
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
