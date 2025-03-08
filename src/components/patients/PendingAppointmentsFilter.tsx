
import React from 'react';
import { Clock } from 'lucide-react';
import { Patient } from '@/types/patient';

interface PendingAppointmentsFilterProps {
  patients: Patient[];
  patientHasPendingAppointment: (patient: Patient) => boolean;
}

const PendingAppointmentsFilter: React.FC<PendingAppointmentsFilterProps> = ({ 
  patients, 
  patientHasPendingAppointment 
}) => {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center px-3 py-1 rounded-lg bg-amber-100 text-amber-800">
        <Clock size={14} className="mr-2" />
        <span className="text-sm">
          Pacientes com agendamentos pendentes: {patients.filter(patientHasPendingAppointment).length}
        </span>
      </div>
    </div>
  );
};

export default PendingAppointmentsFilter;
