
import React from 'react';
import Button from '../Button';

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
  handleSubmit
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Suas Informações
      </label>
      
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="email"
            placeholder="Endereço de Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
          
          <div className="relative">
            <input
              type="tel"
              placeholder="WhatsApp (DD) XXXXX-XXXX"
              value={whatsApp}
              onChange={handleWhatsAppChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Formato brasileiro: (XX) XXXXX-XXXX
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
        variant="primary"
        size="lg"
        fullWidth
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
