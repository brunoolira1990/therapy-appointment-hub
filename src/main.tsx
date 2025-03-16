
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Polyfill para o objeto process.env para evitar erros
// @ts-ignore - Ignoring the type error for this polyfill
window.process = { env: {} } as any;

// Verifica se estamos em produção e configura console.log para evitar erros
if (process.env.NODE_ENV === 'production') {
  console.log = (...args) => {
    // Silencia ou filtra logs em produção se necessário
  };
}

// Elemento root para montagem do React
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
