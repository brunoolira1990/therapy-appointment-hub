
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MessageSquare, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
                Fale Conosco
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
              <p className="text-muted-foreground text-lg mb-4">
                Estamos aqui para responder suas dúvidas e ajudar a agendar sua consulta.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Info & Form Section */}
        <section className="py-16">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
                <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
                <ContactForm />
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Telefone</h3>
                      <p className="text-muted-foreground">(83) 99999-9999</p>
                      <p className="text-muted-foreground">Seg - Sex: 8h às 18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">WhatsApp</h3>
                      <p className="text-muted-foreground">(83) 99999-9999</p>
                      <p className="text-muted-foreground">Resposta rápida via mensagem</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-muted-foreground">contato@fisioterapiatatyane.com.br</p>
                      <p className="text-muted-foreground">Respondemos em até 24 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Endereço</h3>
                      <p className="text-muted-foreground">Av. Epitácio Pessoa, 1234</p>
                      <p className="text-muted-foreground">João Pessoa, PB - CEP 58030-000</p>
                    </div>
                  </div>
                </div>
                
                {/* Map Placeholder */}
                <div className="mt-8 bg-secondary/20 rounded-xl aspect-video flex items-center justify-center p-4 text-center text-muted-foreground">
                  <div>
                    <p className="mb-2">Mapa da Localização</p>
                    <p className="text-sm">Uma imagem ou iframe do Google Maps seria exibida aqui</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
