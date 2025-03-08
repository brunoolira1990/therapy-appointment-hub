
import React from 'react';
import { Search } from 'lucide-react';

interface PatientsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PatientsSearch: React.FC<PatientsSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Buscar pacientes por nome, email ou WhatsApp..."
          className="pl-10 pr-4 py-2 w-full border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PatientsSearch;
