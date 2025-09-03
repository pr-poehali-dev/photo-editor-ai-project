import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'team';
  credits: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохраненную сессию при загрузке
    const savedUser = localStorage.getItem('ai_photo_editor_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('ai_photo_editor_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // В реальном проекте здесь был бы вызов API авторизации
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          plan: 'free',
          credits: 5,
        };
        
        setUser(mockUser);
        localStorage.setItem('ai_photo_editor_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Неверные данные для входа');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // В реальном проекте здесь был бы вызов API регистрации
      if (name && email && password) {
        const mockUser: User = {
          id: Date.now().toString(),
          name,
          email,
          plan: 'free',
          credits: 5,
        };
        
        setUser(mockUser);
        localStorage.setItem('ai_photo_editor_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Заполните все поля');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai_photo_editor_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};