
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, loginLoading } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Usuário já autenticado, redirecionando...');
      navigate('/patients');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      console.log('Enviando solicitação de login:', { username });
      const success = await login(username, password);
      
      if (success) {
        console.log('Login bem sucedido, redirecionando...');
        navigate('/patients');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      toast.error('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Voltar
      </Button>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-heading font-bold text-2xl">TL</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold">Dra. Tatyane Lira</h2>
          <p className="mt-2 text-muted-foreground">
            Acesse sua área administrativa
          </p>
        </div>
        
        <div className="mt-8 glass-card p-8 rounded-2xl shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User size={18} />
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  disabled={loginLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu usuário"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={loginLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
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
                variant="default"
                size="lg"
                disabled={loginLoading}
                className="w-full relative"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
