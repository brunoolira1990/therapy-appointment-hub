
import React, { memo } from 'react';
import { Clock } from 'lucide-react';

interface PendingAppointmentsFilterProps {
  pendingCount: number;
  filterPending: boolean;
  setFilterPending: (value: boolean) => void;
}

// Using memo to prevent unnecessary re-renders
const PendingAppointmentsFilter: React.FC<PendingAppointmentsFilterProps> = memo(({ 
  pendingCount,
  filterPending,
  setFilterPending
}) => {
  // Clicking the button will toggle the filter state
  const handleToggleFilter = React.useCallback(() => {
    setFilterPending(!filterPending);
  }, [filterPending, setFilterPending]);

  return (
    <div className="mb-6">
      <button 
        className={`inline-flex items-center px-3 py-1 rounded-lg transition-colors ${
          filterPending 
            ? 'bg-amber-500 text-white' 
            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
        }`}
        onClick={handleToggleFilter}
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
