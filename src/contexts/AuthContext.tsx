import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    try {
      console.log("🔐 SignUp: Iniciando cadastro para:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName || email
          },
          // Desabilitar email de confirmação padrão do Supabase
          captchaToken: undefined
        }
      });
      
      // Se o cadastro foi bem-sucedido, enviar email de boas-vindas
      if (!error && data.user) {
        console.log("🔐 SignUp: Cadastro realizado com sucesso, enviando email...");
        
        // Aguardar um pouco para garantir que o perfil foi criado
        setTimeout(async () => {
          try {
            // Enviar email de boas-vindas via edge function
            console.log("📧 Tentando enviar email de boas-vindas...");
            
            const emailResponse = await fetch(`https://cvbjtjmogseupckocmeb.supabase.co/functions/v1/mailtrap-integration`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ymp0am1vZ3NldXBja29jbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTUyODUsImV4cCI6MjA2Njk3MTI4NX0.pWIXaXFJZNbLeD5uVBkAHe97z7mY2APWiCsHk8matmc`
              },
              body: JSON.stringify({
                action: 'send_welcome',
                userEmail: email,
                userName: displayName || email,
                templateData: {
                  user_id: data.user.id,
                  created_at: new Date().toISOString()
                }
              })
            });
            
            if (emailResponse.ok) {
              const result = await emailResponse.json();
              console.log("📧 Email de boas-vindas enviado com sucesso!", result);
            } else {
              const errorText = await emailResponse.text();
              console.warn("📧 Falha ao enviar email de boas-vindas:", errorText);
            }
          } catch (emailError) {
            console.warn("📧 Erro ao enviar email de boas-vindas:", emailError);
            // Email é opcional - não falhar o cadastro
          }
        }, 2000); // Aguardar 2 segundos
      }
      
      return { error };
    } catch (signupError) {
      console.error("🔐 SignUp: Erro no cadastro:", signupError);
      return { error: signupError };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};