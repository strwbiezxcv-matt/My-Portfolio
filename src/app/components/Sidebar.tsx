import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Briefcase,
  FolderGit2,
  Building2,
  Network,
  GraduationCap,
  MessageSquareQuote,
  FileText,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Theme } from "../theme";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "work", label: "Committees", icon: Building2 },
  { id: "affiliations", label: "Affiliations", icon: Network },
  { id: "certifications", label: "Certifications", icon: GraduationCap },
  { id: "recommendations", label: "Recommendations", icon: MessageSquareQuote },
  { id: "materials", label: "Materials", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
];

interface SidebarProps {
  theme: Theme;
  isDark: boolean;
  activeSection: string;
  isMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onNavigate: (section: string) => void;
}

export default function Sidebar(props: SidebarProps) {
  const { theme, isDark, activeSection, isMenuOpen, onToggleTheme, onToggleMenu, onNavigate } = props;

  const panel = isDark
    ? "bg-[#0b0d0c]/90 border-white/10"
    : "bg-[#fafaf8]/85 border-gray-200";

  const Logo = (
    <button
      onClick={() => onNavigate("about")}
      className="group text-xl font-bold tracking-tight text-brand hover:text-brand-strong transition-colors cursor-pointer"
    >
      Matt Bianzon
      <span className="block h-[2px] w-0 bg-brand transition-all duration-300 group-hover:w-full" aria-hidden="true" />
    </button>
  );

  const ThemeToggle = (
    <button
      onClick={onToggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${theme.navBtn}`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );

  const NavButtons = ({ vertical }: { vertical: boolean }) => (
    <>
      {NAV_ITEMS.map((item, i) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <motion.button
            key={item.id}
            whileHover={{ x: vertical ? 3 : 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? "page" : undefined}
            className={`group relative flex items-center gap-3 rounded-md text-sm font-medium transition-colors duration-300 cursor-pointer will-change-transform ${
              vertical ? "w-full px-3 py-2 text-left" : "px-3 py-1.5"
            } ${isActive ? theme.navActive : theme.navBtn}`}
          >
            {/* Active left indicator — thin green bar */}
            {vertical && (
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-brand transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
              />
            )}
            <span
              className={`w-5 shrink-0 text-right font-mono text-[10px] tracking-widest ${
                isActive ? "text-brand" : "opacity-50"
              }`}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon size={16} className={isActive ? theme.icon : "opacity-70 transition-opacity group-hover:opacity-100"} />
            {item.label}
          </motion.button>
        );
      })}
    </>
  );

  return (
    <>
      {/* Desktop: fixed left sidebar — floating panel, glass blur */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`glass hidden lg:flex fixed left-0 top-0 bottom-0 z-50 w-64 flex-col border-r transition-colors duration-500 ${panel}`}
      >
        <div className="px-6 py-7 border-b transition-colors duration-500 border-inherit">
          {Logo}
          <p className={`mt-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] ${theme.faint}`}>
            <span className="status-dot" aria-hidden="true" />
            Creative Portfolio
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-0.5" aria-label="Main navigation">
          <NavButtons vertical />
        </nav>

        <div className="px-6 py-4 border-t flex items-center justify-between transition-colors duration-500 border-inherit">
          <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${theme.faint}`}>
            © 2026 Matt
          </span>
          {ThemeToggle}
        </div>
      </motion.aside>

      {/* Mobile / tablet: compact floating top bar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`glass lg:hidden sticky top-0 z-50 border-b transition-colors duration-500 ${panel}`}
      >
        <div className="px-5 py-3.5 flex items-center justify-between">
          {Logo}
          <div className="flex items-center gap-2">
            {ThemeToggle}
            <button
              onClick={onToggleMenu}
              className={`p-2 rounded-full transition-all duration-300 ${theme.navBtn}`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="border-t transition-colors duration-500 border-inherit"
              aria-label="Mobile navigation"
            >
              <div className="px-4 py-3 grid grid-cols-1 gap-1">
                <NavButtons vertical />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}