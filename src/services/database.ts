
// This file is now just re-exporting from the modularized database services
export {
  initializeDatabase,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  addAppointment,
  updateAppointmentStatus,
  migrateLocalStorageToDatabase
} from './database/index';
