import { motion } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import type { Theme } from "../theme";

export const NAV_SECTIONS = [
  "home",
  "about",
  "experience",
  "projects",
  "work",
  "affiliations",
  "certifications",
  "contact",
];

interface NavProps {
  theme: Theme;

  isDark: boolean;
  activeSection: string;
  isMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onNavigate: (section: string) => void;
}

export default function Nav(props: NavProps) {
  const { theme, isDark, activeSection, isMenuOpen, onToggleTheme, onToggleMenu, onNavigate } = props;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-500 ${theme.nav}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="text-xl font-bold tracking-tight text-brand hover:text-brand-strong transition-colors cursor-pointer"
        >
          strwbiezxcv
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_SECTIONS.map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate(section)}
              className={`capitalize px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 will-change-transform ${
                activeSection === section ? theme.navActive : theme.navBtn
              }`}
            >
              {section}
            </motion.button>
          ))}
          <button
            onClick={onToggleTheme}
            className={`ml-1 p-2 rounded-full transition-all duration-300 ${theme.navBtn}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${theme.navBtn}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={onToggleMenu}
            className={`p-2 rounded-full transition-all duration-300 ${theme.navBtn}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t transition-colors duration-500"
        >
          <div className="px-6 py-4 flex flex-col gap-2">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className={`capitalize text-left py-2 px-3 rounded-md transition-all duration-300 ${
                  activeSection === section ? theme.navActive : theme.navBtn
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}