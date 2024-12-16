import { useState, useCallback } from 'react';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => ({
    token: localStorage.getItem('adminToken'),
    isAuthenticated: !!localStorage.getItem('adminToken')
  }));

  const login = useCallback(async (username: string, password: string) => {
    // Demo authentication
    if (username === 'admin@villagaleon.com' && password === 'villa123') {
      const token = 'demo-token';
      localStorage.setItem('adminToken', token);
      setAuthState({ token, isAuthenticated: true });
      return;
    }
    throw new Error('Invalid credentials');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setAuthState({ token: null, isAuthenticated: false });
  }, []);

  return {
    ...authState,
    login,
    logout
  };
}