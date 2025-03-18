
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Info } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Appointment } from '@/types/schedule';
import { statusColorMap } from '@/utils/scheduleUtils';
import AppointmentListItem from './AppointmentListItem';

interface DailyAppointmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  appointments: Appointment[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const DailyAppointmentsDialog: React.FC<DailyAppointmentsDialogProps> = ({
  open,
  onOpenChange,
  selectedDate,
  appointments,
  activeTab,
  onTabChange
}) => {
  if (!selectedDate) return null;
  
  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'all') return true;
    return appointment.status === activeTab;
  });
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </DialogTitle>
          <DialogDescription>
            Consultas agendadas para este dia
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">
                  Nenhuma consulta encontrada nesta categoria
                </p>
              </div>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <AppointmentListItem 
                  key={index} 
                  appointment={appointment} 
                  statusColorMap={statusColorMap}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DailyAppointmentsDialog;
