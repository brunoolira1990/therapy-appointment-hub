
import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  // Depoimentos reais de pacientes
  const testimonials: Testimonial[] = [
    {
      name: 'Maria Santos',
      role: 'Paciente em Recuperação',
      content: "O atendimento da Dra. Tatyane foi excelente. O tratamento personalizado fez toda a diferença na minha recuperação.",
      avatar: '1'
    },
    {
      name: 'Roberto Almeida',
      role: 'Lesão Esportiva',
      content: "Após minha lesão no joelho, a Dra. Tatyane desenvolveu um plano de tratamento que me permitiu voltar às atividades muito mais rápido do que eu esperava.",
      avatar: '2'
    },
    {
      name: 'Carla Oliveira',
      role: 'Paciente com Dor Crônica',
      content: "Depois de anos com dores na coluna, finalmente encontrei alívio com os tratamentos da Dra. Tatyane. Sua abordagem multidisciplinar faz toda a diferença.",
      avatar: '3'
    }
  ];
  
  return (
    <section className="py-20 overflow-hidden bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Pacientes Dizem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja o que alguns de nossos pacientes têm a dizer sobre sua experiência com os serviços da Dra. Tatyane Lira.
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
  );
};

export default TestimonialsSection;
