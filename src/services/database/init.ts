
import { Patient } from '@/types/patient';

// Chave para o localStorage como fallback
const localStorageKey = 'fisioApp_patients';

// Verifica se estamos em um ambiente de navegador ou servidor
const isBrowser = typeof window !== 'undefined';

// Pool de conexão PostgreSQL (apenas para ambiente de servidor)
let pgPool: any = null;

// No navegador, não tentamos importar ou usar o módulo pg
if (!isBrowser) {
  try {
    // Importação dinâmica para evitar que o código do pg seja incluído no bundle do cliente
    const { Pool } = require('pg');
    
    pgPool = new Pool({
      host: process.env.PG_HOST || 'pgsql52-farm1.kinghost.net',
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || '',
      database: process.env.PG_DATABASE || 'fisioapp',
      port: parseInt(process.env.PG_PORT || '5432'),
      ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : undefined
    });
    
    console.log('PostgreSQL connection pool created');
  } catch (err) {
    console.error('Error creating PostgreSQL pool:', err);
  }
}

// Inicializa o armazenamento apropriado
export const initializeDatabase = async (): Promise<void> => {
  try {
    if (isBrowser) {
      // Inicializa localStorage no navegador
      if (!localStorage.getItem(localStorageKey)) {
        localStorage.setItem(localStorageKey, JSON.stringify([]));
      }
      console.log('LocalStorage database initialized successfully');
    } else if (pgPool) {
      // Inicializa tabelas no PostgreSQL
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS patients (
          id VARCHAR(20) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          whatsapp VARCHAR(20),
          birthdate DATE
        );
        
        CREATE TABLE IF NOT EXISTS appointments (
          id VARCHAR(20) PRIMARY KEY,
          patient_id VARCHAR(20) REFERENCES patients(id),
          date TIMESTAMP NOT NULL,
          service VARCHAR(255),
          status VARCHAR(50),
          notes TEXT
        );
      `);
      console.log('PostgreSQL tables initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Helper para obter pacientes do localStorage - usado apenas no navegador
export const getLocalPatients = (): Patient[] => {
  if (isBrowser) {
    return JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  }
  return [];
};

// Helper para salvar pacientes no localStorage - usado apenas no navegador
export const saveLocalPatients = (patients: Patient[]): void => {
  if (isBrowser) {
    localStorage.setItem(localStorageKey, JSON.stringify(patients));
  }
};

// Exporta o pool e a flag de ambiente para outros módulos
export { pgPool, isBrowser, localStorageKey };
