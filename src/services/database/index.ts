
// Re-export everything from the modules
export { initializeDatabase } from './init';
export { getPatients, addPatient, updatePatient, deletePatient } from './patients';
export { addAppointment, updateAppointmentStatus } from './appointments';
export { migrateLocalStorageToDatabase } from './migration';
