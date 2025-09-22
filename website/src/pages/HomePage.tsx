import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
