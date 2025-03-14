
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import Button from '@/components/Button';
import { Lock, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Login realizado com sucesso!');
        navigate('/patients');
      } else {
        toast.error('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-heading font-bold text-2xl">TL</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold">Tatyane Lira</h2>
          <p className="mt-2 text-muted-foreground">
            Acesse sua área administrativa
          </p>
        </div>
        
        <div className="mt-8 glass-card p-8 rounded-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tatyanelira"
                  className="block w-full pl-10 pr-3 py-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-background"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2 border border-border rounded-md shadow-sm focus:ring-primary focus:border-primary bg-background"
                />
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-sm text-primary cursor-pointer hover:underline">
                  Esqueceu a senha?
                </span>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>

            <div className="text-center text-sm">
              <p className="text-muted-foreground mt-4">
                Para demonstração: <br />
                <span className="font-medium">Usuário: tatyanelira</span><br />
                <span className="font-medium">Senha: Fisio@2000</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
