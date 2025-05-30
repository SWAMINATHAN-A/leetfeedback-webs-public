import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { DockDemo } from './components/DockDemo';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
        </main>
        <Footer />
        <DockDemo />
      </div>
    </ThemeProvider>
  );
}

export default App;