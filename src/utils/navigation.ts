
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
