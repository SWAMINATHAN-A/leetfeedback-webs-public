import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { DockDemo } from './components/DockDemo';
import RoadmapPage from './pages/RoadmapPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
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
                <DockDemo />
              </>
            } />
            <Route path="/roadmap" element={<RoadmapPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;