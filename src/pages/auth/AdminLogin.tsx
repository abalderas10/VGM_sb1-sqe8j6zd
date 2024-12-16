import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials. Use admin@villagaleon.com / villa123');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-caribbean-900 to-caribbean-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-caribbean-100 mb-4">
              <Lock className="w-8 h-8 text-caribbean-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-caribbean-900">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-caribbean-600">
              Demo: admin@villagaleon.com / villa123
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-caribbean-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-md border",
                  "focus:ring-2 focus:ring-caribbean-500 focus:border-transparent",
                  "placeholder:text-gray-400"
                )}
                placeholder="admin@villagaleon.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-caribbean-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-md border",
                  "focus:ring-2 focus:ring-caribbean-500 focus:border-transparent",
                  "placeholder:text-gray-400"
                )}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-3 px-4 rounded-md",
                "bg-caribbean-600 text-white",
                "hover:bg-caribbean-700 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-caribbean-500",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}