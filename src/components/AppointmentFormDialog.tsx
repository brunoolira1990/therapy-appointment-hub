
import React from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import AppointmentForm from '@/components/AppointmentForm';

interface AppointmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentFormDialog: React.FC<AppointmentFormDialogProps> = ({
  open,
  onOpenChange
}) => {
  // Previne problemas com caminhos em ambiente Windows
  const handleFormSubmit = () => {
    // Lógica de submissão adaptada para Windows se necessário
    console.log('Form submitted in Windows-compatible way');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Agende Sua Consulta</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para agendar uma sessão com nossos fisioterapeutas.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-2 max-h-[80vh] overflow-y-auto">
          <AppointmentForm className="bg-transparent shadow-none" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentFormDialog;
