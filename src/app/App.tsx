import { useEffect, useRef, useState } from "react";
import { getTheme } from "./theme";
import Nav from "./components/Nav";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Organizations from "./components/sections/Organizations";
import Affiliations from "./components/sections/Affiliations";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Recommendations from "./components/sections/Recommendations";
import PubmatsModal from "./components/PubmatsModal";

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "projects",
  "work",
  "affiliations",
  "certifications",
  "contact",
  "recommendations",
];

/* Decorative divider between major sections — thin green lines,
   node dots and a technical label. */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-4 px-6 py-2" aria-hidden="true">
      <span className="h-px w-16 sm:w-24 bg-brand/30" />
      <span className="size-1.5 rounded-full bg-brand/60" />
      <span className="section-num">{label}</span>
      <span className="size-1.5 rounded-full bg-brand/60" />
      <span className="h-px w-16 sm:w-24 bg-brand/30" />
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isPubmatsOpen, setIsPubmatsOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("strwbiezxcv-theme");
    return stored ? stored === "dark" : false;
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const theme = getTheme(isDark);

  useEffect(() => {
    window.localStorage.setItem("strwbiezxcv-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const scrollToSection = (sectionId: string) => {
    const container = scrollContainerRef.current;
    const element = document.getElementById(sectionId);
    if (container && element) {
      container.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + container.clientHeight / 3;
      for (const section of SECTION_IDS) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollContainerRef} className={`size-full overflow-y-auto transition-colors duration-500 ${theme.root} ${isDark ? "dark" : ""}`}>
      <Nav
        theme={theme}
        isDark={isDark}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        onToggleTheme={() => setIsDark(!isDark)}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onNavigate={scrollToSection}
      />

      <main>
        <Hero theme={theme} onNavigate={scrollToSection} />
        <SectionDivider label="/ 02" />
        <About
          theme={theme}
          onViewPubmats={() => setIsPubmatsOpen(true)}
          onNavigate={scrollToSection}
        />
        <SectionDivider label="/ 03" />
        <Experience theme={theme} onNavigate={scrollToSection} />
        <SectionDivider label="/ 04" />
        <Projects theme={theme} isDark={isDark} onNavigate={scrollToSection} />
        <SectionDivider label="/ 05" />
        <Organizations theme={theme} isDark={isDark} onNavigate={scrollToSection} />
        <SectionDivider label="/ 06" />
        <Affiliations theme={theme} onNavigate={scrollToSection} />
        <SectionDivider label="/ 07" />
        <Certifications theme={theme} onNavigate={scrollToSection} />
        <SectionDivider label="/ 08" />
        <Contact
          theme={theme}
          onNavigate={scrollToSection}
          onViewWork={() => scrollToSection("home")}
        />
        <SectionDivider label="/ 09" />
        <Recommendations theme={theme} />
      </main>

      <footer className={`py-8 border-t text-center text-sm transition-colors duration-500 ${theme.footer}`}>
        <div className="mx-auto mb-4 flex items-center justify-center gap-3">
          <span className="section-num-rule" />
          <span className="section-num">STRWBIEZXCV · 2026</span>
          <span className="section-num-rule" />
        </div>
        <p>&copy; 2026 Matt Portfolio. All rights reserved.</p>
      </footer>

      {isPubmatsOpen && <PubmatsModal theme={theme} onClose={() => setIsPubmatsOpen(false)} />}
    </div>
  );
}