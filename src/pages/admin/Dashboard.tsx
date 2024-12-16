import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Image, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PostList } from './PostList';
import { cn } from '../../utils/cn';

export function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-caribbean-50">
      <nav className="bg-caribbean-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-display font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-caribbean-100 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/admin/photos"
            className={cn(
              "bg-white p-6 rounded-lg shadow-md",
              "flex items-center gap-4",
              "hover:shadow-lg transition-shadow"
            )}
          >
            <div className="p-3 bg-caribbean-50 rounded-lg">
              <Image className="w-6 h-6 text-caribbean-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-caribbean-900">
                Photo Manager
              </h2>
              <p className="text-sm text-caribbean-600">
                Manage website photos and galleries
              </p>
            </div>
          </Link>

          <Link
            to="/admin/dashboard"
            className={cn(
              "bg-white p-6 rounded-lg shadow-md",
              "flex items-center gap-4",
              "hover:shadow-lg transition-shadow"
            )}
          >
            <div className="p-3 bg-caribbean-50 rounded-lg">
              <FileText className="w-6 h-6 text-caribbean-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-caribbean-900">
                Post Manager
              </h2>
              <p className="text-sm text-caribbean-600">
                Manage blog posts and content
              </p>
            </div>
          </Link>
        </div>

        <PostList />
      </main>
    </div>
  );
}