import React, { createContext, useContext, useState, useCallback } from 'react';
import { loginAdmin } from '../services/auth';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => ({
    token: localStorage.getItem('adminToken'),
    isAuthenticated: !!localStorage.getItem('adminToken')
  }));

  const login = useCallback(async (username: string, password: string) => {
    try {
      const token = await loginAdmin(username, password);
      localStorage.setItem('adminToken', token);
      setAuthState({ token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setAuthState({ token: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}