import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import { LoginFeaturesDynamicIsland } from "../components/LoginFeaturesDynamicIsland";

const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />

      {/* Mobile-only Dynamic Island Dock */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 block md:hidden max-w-[90vw] mobile-dock">
        <LoginFeaturesDynamicIsland />
      </div>
    </>
  );
};

export default HomePage;
