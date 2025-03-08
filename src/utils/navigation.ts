
import { useAppointmentForm } from '@/contexts/AppointmentFormContext';

/**
 * Scrolls to the booking section on the homepage
 * If not on the homepage, navigates to the homepage first
 */
export const scrollToBookingSection = (navigate: any) => {
  // Check if we're already on the homepage
  if (window.location.pathname === '/') {
    // If yes, just scroll to the booking section
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // If not, navigate to homepage with booking section hash
    navigate('/#booking-section');
  }
};

/**
 * Opens the appointment form popup dialog
 */
export const openAppointmentDialog = () => {
  // This is just a placeholder. The actual function will be 
  // handled by the AppointmentFormContext when components use it
  console.log('Opening appointment dialog');
};

/**
 * Convenience hook for handling appointments
 * Provides methods for opening the form dialog or scrolling to the form section
 */
export const useAppointmentNavigation = () => {
  const { openAppointmentForm } = useAppointmentForm();
  
  return {
    openAppointmentForm,
    scrollToBookingSection,
    // You can add more appointment-related navigation functions here
  };
};
