import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './components/chat/ChatProvider';
import { MapProvider } from './components/map/MapProvider';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';

export function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <MapProvider>
          <Router>
            <AppRoutes />
          </Router>
        </MapProvider>
      </ChatProvider>
    </AuthProvider>
  );
}