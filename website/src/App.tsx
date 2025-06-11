import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import SimpleProfilePage from './pages/SimpleProfilePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/profile" element={<SimpleProfilePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
            </Routes>
          </div>
          <Analytics />
          <SpeedInsights />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;