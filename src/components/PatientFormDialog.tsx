
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PatientFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: any | null;
}

const PatientFormDialog: React.FC<PatientFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsApp: '',
    birthDate: '',
  });

  // Reset form when opening/closing or changing initialData
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          email: initialData.email || '',
          whatsApp: initialData.whatsApp || '',
          birthDate: initialData.birthDate || '',
        });
      } else {
        setFormData({
          name: '',
          email: '',
          whatsApp: '',
          birthDate: '',
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format Brazilian phone number as user types
    if (name === 'whatsApp') {
      // Remove non-digit characters
      let digits = value.replace(/\D/g, '');
      
      // Format according to Brazilian phone number pattern
      if (digits.length <= 2) {
        setFormData(prev => ({ ...prev, [name]: digits }));
      } else if (digits.length <= 7) {
        setFormData(prev => ({ 
          ...prev, 
          [name]: `(${digits.slice(0, 2)}) ${digits.slice(2)}` 
        }));
      } else if (digits.length <= 11) {
        setFormData(prev => ({ 
          ...prev, 
          [name]: `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}` 
        }));
      } else {
        // Limit to 11 digits (Brazilian standard: 2 for area code + 9 for number)
        setFormData(prev => ({ 
          ...prev, 
          [name]: `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}` 
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-xl font-bold">
            {initialData ? 'Editar Paciente' : 'Adicionar Novo Paciente'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome Completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="whatsApp" className="text-sm font-medium">
              WhatsApp
            </label>
            <input
              id="whatsApp"
              name="whatsApp"
              type="tel"
              required
              value={formData.whatsApp}
              onChange={handleChange}
              placeholder="(DD) XXXXX-XXXX"
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <p className="text-xs text-muted-foreground">
              Formato brasileiro: (XX) XXXXX-XXXX
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="birthDate" className="text-sm font-medium">
              Data de Nascimento
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              required
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-input rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {initialData ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientFormDialog;
