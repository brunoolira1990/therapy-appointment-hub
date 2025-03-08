
export interface Appointment {
  id?: string;
  date: string;
  time: string;
  status: string;
  service: string;
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  whatsApp: string;
  birthDate: string;
  appointments: Appointment[];
}
