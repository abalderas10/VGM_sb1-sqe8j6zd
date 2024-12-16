import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { AdminLogin } from '../pages/auth/AdminLogin';
import { Dashboard } from '../pages/admin/Dashboard';
import { PhotoManager } from '../pages/admin/photos/PhotoManager';
import { Experience } from '../pages/Experience';
import { PostPage } from '../pages/PostPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/photos" 
        element={
          <ProtectedRoute>
            <PhotoManager />
          </ProtectedRoute>
        } 
      />
      <Route path="/experience" element={<Experience />} />
      <Route path="/experience/:slug" element={<PostPage />} />
    </Routes>
  );
}