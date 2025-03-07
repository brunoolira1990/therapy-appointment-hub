
import React from 'react';
import { Stethoscope, Award, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DoctorBioProps {
  className?: string;
}

const DoctorBio: React.FC<DoctorBioProps> = ({ className }) => {
  return (
    <section className={cn('py-20 overflow-hidden', className)}>
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
            Conheça Nossa Especialista
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dra. Fernanda Silva</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fisioterapeuta especializada com mais de 10 anos de experiência em reabilitação física e tratamentos inovadores.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Foto da Doutora */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-primary/10 animate-pulse-slow"></div>
            <div className="glass-card p-3 rounded-2xl relative z-10">
              <img 
                src="/doctor-profile.jpg" 
                alt="Dra. Fernanda Silva" 
                className="w-full h-auto rounded-xl object-cover" 
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white shadow-subtle rounded-xl p-3 flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Award size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">Premiada</p>
                <p className="text-xs text-muted-foreground">Melhor Fisioterapeuta 2023</p>
              </div>
            </div>
          </div>
          
          {/* Biografia */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Especialista em Fisioterapia Ortopédica e Neurológica</h3>
            
            <p className="text-muted-foreground">
              A Dra. Fernanda Silva é formada pela Universidade Federal do Rio de Janeiro (UFRJ) com especialização 
              em Fisioterapia Ortopédica pela USP e Neurológica pela UNIFESP.
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 mt-1">
                  <Stethoscope size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Experiência Clínica</h4>
                  <p className="text-sm text-muted-foreground">
                    Mais de 10 anos atuando no tratamento de pacientes com diversas condições físicas, 
                    desde lesões esportivas até reabilitações pós-cirúrgicas complexas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 mt-1">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Formação Acadêmica</h4>
                  <p className="text-sm text-muted-foreground">
                    - Graduação em Fisioterapia (UFRJ)<br />
                    - Especialização em Fisioterapia Ortopédica (USP)<br />
                    - Especialização em Fisioterapia Neurológica (UNIFESP)<br />
                    - Mestrado em Ciências da Reabilitação (UFRJ)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 mt-1">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Prêmios e Reconhecimentos</h4>
                  <p className="text-sm text-muted-foreground">
                    - Prêmio Excelência em Fisioterapia 2023<br />
                    - Membro da Sociedade Brasileira de Fisioterapia<br />
                    - Palestrante em congressos nacionais e internacionais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorBio;
