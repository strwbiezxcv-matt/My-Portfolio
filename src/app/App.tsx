import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getTheme } from "./theme";
import Sidebar from "./components/Sidebar";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Organizations from "./components/sections/Organizations";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Recommendations from "./components/sections/Recommendations";
import Materials from "./components/sections/Materials";
import PubmatsModal from "./components/PubmatsModal";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "work",
  "certifications",
  "recommendations",
  "materials",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

function sectionFromHash(): SectionId {
  const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  return (SECTION_IDS as readonly string[]).includes(hash) ? (hash as SectionId) : "about";
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    if (typeof window === "undefined") return "about";
    return sectionFromHash();
  });
  const [isPubmatsOpen, setIsPubmatsOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("strwbiezxcv-theme");
    return stored ? stored === "dark" : false;
  });

  const theme = getTheme(isDark);

  useEffect(() => {
    window.localStorage.setItem("strwbiezxcv-theme", isDark ? "dark" : "light");
  }, [isDark]);

  /* Section-based navigation: sets the URL hash and swaps the rendered
     section. No scrolling — only one section is visible at a time. */
  const navigate = useCallback((sectionId: string) => {
    const target = (SECTION_IDS as readonly string[]).includes(sectionId)
      ? (sectionId as SectionId)
      : "about";
    setActiveSection(target);
    setIsMenuOpen(false);
    if (window.location.hash !== `#/${target}`) {
      window.history.pushState(null, "", `#/${target}`);
    }
    window.scrollTo({ top: 0 });
  }, []);

  /* Support browser back/forward buttons via popstate + hashchange. */
  useEffect(() => {
    const syncFromLocation = () => setActiveSection(sectionFromHash());
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, []);

  /* Normalize the URL on first load (e.g. plain "/" → "#/home"). */
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", `#/${activeSection}`);
    }
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return (
          <About
            theme={theme}
            onViewPubmats={() => setIsPubmatsOpen(true)}
            onNavigate={navigate}
          />
        );
      case "experience":
        return <Experience theme={theme} onNavigate={navigate} />;
      case "projects":
        return <Projects theme={theme} isDark={isDark} onNavigate={navigate} />;
      case "work":
        return <Organizations theme={theme} isDark={isDark} onNavigate={navigate} />;
      case "certifications":
        return <Certifications theme={theme} onNavigate={navigate} />;
      case "recommendations":
        return <Recommendations theme={theme} />;
      case "materials":
        return <Materials theme={theme} />;
      case "contact":
        return (
          <Contact
            theme={theme}
            onNavigate={navigate}
            onViewWork={() => navigate("work")}
          />
        );
    }
  };

  return (
    <div className={`min-h-full transition-colors duration-500 ${theme.root} ${isDark ? "dark" : ""}`}>
      <Sidebar
        theme={theme}
        isDark={isDark}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        onToggleTheme={() => setIsDark(!isDark)}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onNavigate={navigate}
      />

      {/* Section-based main content: only the selected section renders. */}
      <main className="lg:pl-64">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 16, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.995 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderSection()}

            <footer className={`py-8 border-t text-center text-sm transition-colors duration-500 ${theme.footer}`}>
              <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                <span className="section-num-rule" />
                <span className="section-num">Matt Bianzon · 2026</span>
                <span className="section-num-rule" />
              </div>
              <p>&copy; 2026 Matt Portfolio. All rights reserved.</p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </main>

      {isPubmatsOpen && <PubmatsModal theme={theme} onClose={() => setIsPubmatsOpen(false)} />}
    </div>
  );
}