
import React from 'react';

// WhatsApp formatter
export const formatWhatsApp = (value: string): string => {
  // Remove non-digit characters
  let digits = value.replace(/\D/g, '');
  
  // Format according to Brazilian phone number pattern
  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else {
    // Limit to 11 digits (Brazilian standard: 2 for area code + 9 for number)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
};

// WhatsApp change handler
export const handleWhatsAppChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setWhatsApp: (value: string) => void
) => {
  const value = e.target.value;
  setWhatsApp(formatWhatsApp(value));
};
