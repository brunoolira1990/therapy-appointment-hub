
import React, { memo } from 'react';
import { Clock } from 'lucide-react';

interface PendingAppointmentsFilterProps {
  pendingCount: number;
  filterPending: boolean;
  setFilterPending: (value: boolean) => void;
}

// Memoized component to prevent unnecessary re-renders
const PendingAppointmentsFilter: React.FC<PendingAppointmentsFilterProps> = memo(({ 
  pendingCount,
  filterPending,
  setFilterPending
}) => {
  return (
    <div className="mb-6">
      <button 
        className={`inline-flex items-center px-3 py-1 rounded-lg transition-colors ${
          filterPending 
            ? 'bg-amber-500 text-white' 
            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
        }`}
        onClick={() => setFilterPending(!filterPending)}
        disabled={pendingCount === 0}
        aria-pressed={filterPending}
      >
        <Clock size={14} className="mr-2" />
        <span className="text-sm">
          Pacientes com agendamentos pendentes: {pendingCount}
          {filterPending && " (filtrando)"}
        </span>
      </button>
    </div>
  );
});

PendingAppointmentsFilter.displayName = 'PendingAppointmentsFilter';

export default PendingAppointmentsFilter;
