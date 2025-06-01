import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { DockDemo } from './components/DockDemo';
import RoadmapPage from './pages/RoadmapPage';
import SimpleProfilePage from './pages/SimpleProfilePage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-background">
            <Routes>
              <Route path="/" element={
                <>
                  <Header />
                  <main>
                    <Hero />
                    <Features />
                    <HowItWorks />
                    <Pricing />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/profile" element={<SimpleProfilePage />} />
            </Routes>
            <DockDemo />
          </div>
          <Analytics />
          <SpeedInsights />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;