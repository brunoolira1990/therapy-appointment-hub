
import React from 'react';

interface AppointmentFormHeaderProps {
  title: string;
  subtitle: string;
}

const AppointmentFormHeader: React.FC<AppointmentFormHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-primary px-6 py-4 text-primary-foreground">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-primary-foreground/80 text-sm">{subtitle}</p>
    </div>
  );
};

export default AppointmentFormHeader;
