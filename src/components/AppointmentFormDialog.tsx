
import React from 'react';
import { X } from 'lucide-react';
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Agende Sua Consulta</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para agendar uma sessão com nossos fisioterapeutas.
          </DialogDescription>
        </DialogHeader>
        
        <div className="pt-4">
          <AppointmentForm className="bg-transparent shadow-none" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentFormDialog;
