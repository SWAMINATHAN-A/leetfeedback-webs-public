import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PolicySection {
  id: string;
  title: string;
}

interface PolicyNavbarProps {
  sections: PolicySection[];
}

export const PolicyNavbar: React.FC<PolicyNavbarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      // Check if footer is visible
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        const windowBottom = window.scrollY + window.innerHeight;

        // Hide navbar when footer comes into view
        setIsVisible(footerTop > windowBottom - 100);
      }

      // Update active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <aside
      className={cn(
        "hidden lg:block fixed left-8 top-32 w-64 z-30 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <nav className="sticky top-32 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="space-y-1 pr-4 pb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeSection === section.id
                  ? "bg-white text-black dark:bg-white dark:text-black shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};
