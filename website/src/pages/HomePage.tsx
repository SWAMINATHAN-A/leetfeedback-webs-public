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
    </>
  );
};

export default HomePage;
