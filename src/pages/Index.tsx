
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DoctorBio from '@/components/DoctorBio';
import ServiceSection from '@/components/home/ServiceSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BookingSection from '@/components/home/BookingSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Services Section */}
        <ServiceSection />
        
        {/* Doctor Bio Section */}
        <DoctorBio />
        
        {/* Booking Section */}
        <BookingSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
