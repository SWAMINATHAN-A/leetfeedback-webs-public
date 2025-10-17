import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PolicySection {
  id: string;
  title: string;
}

interface PolicyNavbarProps {
  sections: PolicySection[];
}

export const PolicyNavbar: React.FC<PolicyNavbarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border py-3 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
