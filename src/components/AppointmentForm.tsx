
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  name: string;
  description: string;
}

interface TimeSlot {
  id: string;
  time: string;
}

interface AppointmentFormProps {
  className?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Sample data
  const services: Service[] = [
    { id: '1', name: 'Physical Rehabilitation', description: 'Recovery from injuries or surgeries' },
    { id: '2', name: 'Sports Therapy', description: 'Specialized therapy for athletes' },
    { id: '3', name: 'Manual Therapy', description: 'Hands-on techniques for pain relief' },
    { id: '4', name: 'Neurological Therapy', description: 'Treatment for neurological conditions' }
  ];
  
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00 AM' },
    { id: '2', time: '10:00 AM' },
    { id: '3', time: '11:00 AM' },
    { id: '4', time: '01:00 PM' },
    { id: '5', time: '02:00 PM' },
    { id: '6', time: '03:00 PM' },
    { id: '7', time: '04:00 PM' }
  ];
  
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates;
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission
    console.log({
      name,
      email,
      phone,
      selectedDate,
      selectedService,
      selectedTimeSlot,
      notes
    });
    
    // Here you would typically send this data to your backend
    alert('Appointment request submitted. We will contact you to confirm.');
    
    // Reset form
    setSelectedDate(null);
    setSelectedService('');
    setSelectedTimeSlot('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };
  
  return (
    <div className={cn('glass-card rounded-2xl overflow-hidden', className)}>
      <div className="bg-primary px-6 py-4 text-primary-foreground">
        <h3 className="text-xl font-bold">Book Your Appointment</h3>
        <p className="text-primary-foreground/80 text-sm">
          Fill out the form below to schedule a session
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Service Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Select Service
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={cn(
                  'border rounded-xl p-4 cursor-pointer transition-all',
                  selectedService === service.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {service.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Date Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium flex items-center">
            <CalendarIcon size={16} className="mr-1 text-primary" />
            Select Date
          </label>
          <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
            {generateDateOptions().map((date, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'flex-shrink-0 w-28 border rounded-xl p-3 cursor-pointer text-center transition-all',
                  selectedDate && selectedDate.toDateString() === date.toDateString()
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <div className="font-medium">{formatDate(date).split(',')[0]}</div>
                <div className="text-sm mt-1">{formatDate(date).split(',')[1]}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Time Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium flex items-center">
            <Clock size={16} className="mr-1 text-primary" />
            Select Time
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={cn(
                  'border rounded-lg py-2 px-3 cursor-pointer text-center transition-all',
                  selectedTimeSlot === slot.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/30'
                )}
              >
                <div className="text-sm">{slot.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Your Information
          </label>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
              
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            
            <textarea
              placeholder="Additional Notes (Optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none h-24"
            />
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
        >
          Request Appointment
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default AppointmentForm;
