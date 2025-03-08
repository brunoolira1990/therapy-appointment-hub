
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppointmentFormProvider } from "@/contexts/AppointmentFormContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppointmentFormDialog from "@/components/AppointmentFormDialog";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Schedule from "./pages/Schedule";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import { useAppointmentForm } from "./contexts/AppointmentFormContext";

// Wrapper component to use the context hook
const AppDialogs = () => {
  const { isFormOpen, closeAppointmentForm } = useAppointmentForm();
  return <AppointmentFormDialog open={isFormOpen} onOpenChange={closeAppointmentForm} />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppointmentFormProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppDialogs />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/patients" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Patients />
                  </ProtectedRoute>
                } 
              />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route 
                path="/schedule" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Schedule />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppointmentFormProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
