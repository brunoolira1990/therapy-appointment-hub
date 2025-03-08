
import React from 'react';

const ServiceLoading: React.FC = () => {
  return (
    <div className="container-wide flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default ServiceLoading;
