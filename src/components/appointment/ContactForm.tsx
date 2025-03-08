import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  whatsApp: string;
  handleWhatsAppChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  notes: string;
  setNotes: (notes: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: {
    name?: string;
    email?: string;
    whatsApp?: string;
  };
}

const ContactForm: React.FC<ContactFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  whatsApp,
  handleWhatsAppChange,
  notes,
  setNotes,
  handleSubmit,
  errors
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Suas Informações
      </label>
      
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn(
              "w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
              errors.name ? "border-destructive focus:ring-destructive/20" : ""
            )}
            required
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <input
              type="email"
              placeholder="Endereço de Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.email ? "border-destructive focus:ring-destructive/20" : ""
              )}
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="relative">
            <input
              type="tel"
              placeholder="WhatsApp (DD) XXXXX-XXXX"
              value={whatsApp}
              onChange={handleWhatsAppChange}
              className={cn(
                "w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.whatsApp ? "border-destructive focus:ring-destructive/20" : ""
              )}
              required
            />
            <p className={cn(
              "text-xs mt-1",
              errors.whatsApp ? "text-destructive" : "text-muted-foreground"
            )}>
              {errors.whatsApp || "Formato brasileiro: (XX) XXXXX-XXXX"}
            </p>
          </div>
        </div>
        
        <textarea
          placeholder="Observações Adicionais (Opcional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none h-24"
        />
      </div>
      
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full"
      >
        Solicitar Agendamento
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-3">
        Ao enviar este formulário, você concorda com nossos Termos de Serviço e Política de Privacidade.
      </p>
    </div>
  );
};

export default ContactForm;
