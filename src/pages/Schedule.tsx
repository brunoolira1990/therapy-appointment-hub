
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CalendarGrid from '@/components/schedule/CalendarGrid';
import UpcomingAppointments from '@/components/schedule/UpcomingAppointments';
import AvailableTimeSlotsDialog from '@/components/schedule/AvailableTimeSlotsDialog';
import DailyAppointmentsDialog from '@/components/schedule/DailyAppointmentsDialog';
import { useSchedule } from '@/hooks/useSchedule';

const Schedule: React.FC = () => {
  const {
    currentMonth,
    selectedDate,
    isDetailsOpen,
    activeTab,
    showAvailableSlots,
    appointments,
    availableTimeSlots,
    selectedDateAppointments,
    actions
  } = useSchedule();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-wide">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Agenda de Consultas</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie seus agendamentos e veja os compromissos da semana
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Calendar Side */}
            <div className="lg:col-span-3">
              <CalendarGrid 
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                appointments={appointments}
                onPrevMonth={actions.prevMonth}
                onNextMonth={actions.nextMonth}
                onSelectDate={actions.handleDateSelect}
                getAvailableTimeSlotsForDay={(date) => actions.getAvailableTimeSlotsForDay(appointments, date)}
              />
            </div>
            
            {/* Appointment List */}
            <UpcomingAppointments 
              appointments={appointments}
              onAppointmentClick={actions.handleAppointmentClick}
            />
          </div>
        </div>
      </main>
      
      {/* Available Time Slots Dialog */}
      <AvailableTimeSlotsDialog 
        open={showAvailableSlots}
        onOpenChange={actions.setShowAvailableSlots}
        selectedDate={selectedDate}
        availableTimeSlots={availableTimeSlots}
        onTimeSlotClick={actions.handleTimeSlotSelect}
      />
      
      {/* Daily Appointments Dialog */}
      <DailyAppointmentsDialog 
        open={isDetailsOpen}
        onOpenChange={actions.setIsDetailsOpen}
        selectedDate={selectedDate}
        appointments={selectedDateAppointments}
        activeTab={activeTab}
        onTabChange={actions.setActiveTab}
      />
      
      <Footer />
    </div>
  );
};

export default Schedule;
