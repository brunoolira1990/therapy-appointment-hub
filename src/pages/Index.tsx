
import React from 'react';
import { ArrowRight, Calendar, UserCheck, Stethoscope, FileHeart, ShieldCheck, MoveHorizontal, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import AppointmentForm from '@/components/AppointmentForm';
import PatientCard from '@/components/PatientCard';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

const Index = () => {
  // Sample patient data
  const featuredPatients = [
    {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '(123) 456-7890',
      birthDate: '1985-06-15'
    },
    {
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '(123) 456-7891',
      birthDate: '1990-03-22'
    },
    {
      name: 'David Chen',
      email: 'david@example.com',
      phone: '(123) 456-7892',
      birthDate: '1978-11-08'
    }
  ];
  
  // Sample reviews
  const testimonials = [
    {
      name: 'Sarah Thompson',
      role: 'Recovery Patient',
      content: 'The care and attention I received at PhysioHub was exceptional. Their therapists are knowledgeable and my recovery was much faster than expected.',
      avatar: '1'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Sports Injury',
      content: 'As an athlete, I needed specialized care for my knee injury. The team designed a personalized recovery plan that got me back to training in record time.',
      avatar: '2'
    },
    {
      name: 'Emily Wilson',
      role: 'Chronic Pain Patient',
      content: 'After years of chronic back pain, I finally found relief through their manual therapy program. I can now enjoy activities I thought I'd never do again.',
      avatar: '3'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Services Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Physiotherapy Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer a comprehensive range of physical therapy treatments tailored to your specific needs and conditions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Physical Rehabilitation"
                description="Comprehensive rehabilitation for injuries, surgeries, and chronic conditions to restore mobility and function."
                icon={<MoveHorizontal size={24} />}
              />
              
              <ServiceCard
                title="Sports Therapy"
                description="Specialized therapy for athletes focusing on injury prevention, performance enhancement, and quick recovery."
                icon={<Activity size={24} />}
              />
              
              <ServiceCard
                title="Manual Therapy"
                description="Hands-on techniques to reduce pain, increase range of motion, and improve tissue healing through expert manipulation."
                icon={<Stethoscope size={24} />}
              />
              
              <ServiceCard
                title="Neurological Therapy"
                description="Specialized treatments for patients with neurological conditions to improve movement, balance, and coordination."
                icon={<FileHeart size={24} />}
              />
              
              <ServiceCard
                title="Geriatric Therapy"
                description="Gentle and effective therapy designed specifically for older adults to maintain mobility and independence."
                icon={<UserCheck size={24} />}
              />
              
              <ServiceCard
                title="Preventive Care"
                description="Educational programs and exercises to prevent injuries and maintain optimal physical health and wellbeing."
                icon={<ShieldCheck size={24} />}
              />
            </div>
            
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                View All Services
              </Button>
            </div>
          </div>
        </section>
        
        {/* Booking Section */}
        <section className="py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Text Column */}
              <div className="flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                  Book a Session
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Schedule Your Next Appointment</h2>
                <p className="text-muted-foreground mb-6">
                  Taking the first step towards recovery is now easier than ever. Schedule an appointment with our expert physiotherapists and start your journey to better health.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Convenient online scheduling system',
                    'Flexible appointment times to suit your schedule',
                    'Same-day appointments for urgent cases',
                    'No referral needed for most services',
                    'Multiple therapists with different specializations'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 12 5 5L20 7" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-primary" />
                    <span>Available 6 days a week</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1 text-primary" />
                    <span>Extended hours available</span>
                  </div>
                </div>
              </div>
              
              {/* Form Column */}
              <div>
                <AppointmentForm />
              </div>
            </div>
          </div>
        </section>
        
        {/* Patients Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                  Patient Management
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">Manage Your Patients</h2>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  variant="primary"
                  size="md"
                  icon={<UserCheck size={16} />}
                  iconPosition="left"
                >
                  Add New Patient
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPatients.map((patient, index) => (
                <PatientCard
                  key={index}
                  name={patient.name}
                  email={patient.email}
                  phone={patient.phone}
                  birthDate={patient.birthDate}
                  onEdit={() => console.log(`Edit patient: ${patient.name}`)}
                  onDelete={() => console.log(`Delete patient: ${patient.name}`)}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                View All Patients
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 overflow-hidden">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Here's what some of our patients have to say about their experience with our physiotherapy services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-2xl hover-card"
                >
                  {/* Quote Icon */}
                  <div className="mb-4 text-primary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.3 5.2H5.1c-.4 0-.7.4-.6.8l1.2 3.9H1.9c-.3 0-.6.3-.6.6v6.8c0 .3.3.6.6.6h7.6c.3 0 .6-.3.6-.6V9.4c0-.3 0-.5-.1-.8l-1.1-3.5h2.9c.4 0 .8-.3.8-.8 0-.5-.4-.9-.9-.9zM22.8 5.1h-6.2c-.4 0-.7.4-.6.8l1.2 3.9h-3.8c-.3 0-.6.3-.6.6v6.8c0 .3.3.6.6.6h7.6c.3 0 .6-.3.6-.6V9.4c0-.3 0-.5-.1-.8l-1.1-3.5h2.9c.4 0 .8-.3.8-.8 0-.5-.5-.9-.9-.9z"/>
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <p className="mb-6 text-muted-foreground">
                    {testimonial.content}
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5 relative overflow-hidden">
          <div className="container-narrow relative z-10">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Recovery Journey?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Take the first step towards improved health and mobility by scheduling an appointment with our expert physiotherapists today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Calendar size={18} />}
                  iconPosition="left"
                >
                  Book an Appointment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 animate-float"></div>
            <div className="absolute top-1/2 -left-12 w-40 h-40 rounded-full bg-primary/10 animate-pulse-slow"></div>
            <div className="absolute -bottom-8 right-1/4 w-20 h-20 rounded-full bg-primary/5 animate-float animation-delay-500"></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
