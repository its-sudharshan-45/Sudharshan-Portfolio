import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Sun, Sparkles, Moon } from "lucide-react";
import { portfolioData } from "../portfolioData.ts";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
}

export default function Header({
  activeSection,
  onNavigate,
  onOpenContact,
  theme = "light",
  onToggleTheme,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ${
          scrolled
            ? theme === "dark"
              ? "bg-[#060b13]/95 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md py-3 border-b border-zinc-900/40"
              : "bg-white/90 shadow-[0_4px_25px_rgba(0,0,0,0.06)] backdrop-blur-md py-3 border-b border-slate-200/60"
            : "bg-transparent py-5 border-none"
        } ${theme === "dark" ? "text-white" : "text-slate-900"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-end px-6 md:px-12">
          {/* Desktop Right Side Nav Area */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative font-sans text-sm font-semibold transition-colors focus:outline-hidden cursor-pointer py-1 ${
                      isActive
                        ? theme === "dark"
                          ? "text-[#00f5b4]"
                          : "text-teal-600"
                        : theme === "dark"
                        ? "text-zinc-300 hover:text-[#00f5b4]"
                        : "text-slate-600 hover:text-teal-600"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${
                          theme === "dark" ? "bg-[#00f5b4]" : "bg-teal-600"
                        }`}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Glowing Theme Indicator Ring - matching the one in home.png */}
            <button
              id="header-theme-indicator-btn"
              onClick={onToggleTheme}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-95 cursor-pointer ${
                theme === "dark"
                  ? "bg-teal-950/30 border border-teal-500/35 text-[#00f5b4] shadow-[0_0_15px_rgba(0,245,180,0.22)] hover:bg-[#00f5b4]/10 hover:border-[#00f5b4]/70"
                  : "bg-teal-50 border border-teal-600/30 text-teal-600 shadow-[0_0_12px_rgba(13,148,136,0.15)] hover:bg-teal-100/50 hover:border-teal-600/60"
              }`}
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={15} className="animate-spin-slow text-[#00f5b4]" />
              ) : (
                <Moon size={15} className="text-teal-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Header Theme Toggle Button directly next to hamburger for easier light theme default experience access */}
            <button
              onClick={onToggleTheme}
              className={`flex h-8 w-8 items-center justify-center rounded-full active:scale-95 transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-teal-950/30 border border-teal-500/35 text-[#00f5b4]"
                  : "bg-teal-50 border border-teal-600/30 text-teal-600"
              }`}
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              id="mobile-cta-mini-btn"
              onClick={onOpenContact}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold active:scale-95 transition-all ${
                theme === "dark" ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"
              }`}
            >
              Connect
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg p-1.5 focus:outline-hidden ${
                theme === "dark" ? "text-neutral-200 hover:bg-neutral-800" : "text-slate-700 hover:bg-slate-100"
              }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-30 md:hidden">
            {/* Dark/Light Backdrop */}
            <motion.div
              id="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sidebar content */}
            <motion.div
              id="mobile-menu-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`absolute right-0 top-0 bottom-0 flex h-full w-4/5 max-w-sm flex-col p-6 sm:p-8 shadow-2xl justify-between outline-hidden overflow-y-auto ${
                theme === "dark" ? "bg-neutral-950 text-white" : "bg-white text-slate-900 border-l border-slate-100"
              }`}
            >
              {/* Header inside Menu */}
              <div className={`flex items-center justify-between border-b pb-6 mt-10 sm:mt-16 ${
                theme === "dark" ? "border-zinc-805" : "border-slate-100"
              }`}>
                <span className={`font-display text-lg font-bold tracking-wider uppercase ${
                  theme === "dark" ? "text-zinc-400" : "text-slate-455 text-slate-500"
                }`}>
                  Menu
                </span>
                <button
                  id="mobile-drawer-close-btn"
                  onClick={() => setIsOpen(false)}
                  className={`rounded-full p-1 transition-colors ${
                    theme === "dark" ? "text-neutral-400 hover:bg-zinc-800 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav lists */}
              <nav id="mobile-nav-list" className="flex flex-col gap-5 py-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      id={`mobile-nav-link-${link.id}`}
                      onClick={() => handleLinkClick(link.id)}
                      className={`flex items-center justify-between rounded-lg p-3 text-left text-base font-semibold transition-all ${
                        isActive
                          ? theme === "dark"
                            ? "bg-zinc-900 text-[#00f5b4]"
                            : "bg-teal-50 text-teal-600"
                          : theme === "dark"
                          ? "text-neutral-300 hover:bg-zinc-900"
                          : "text-slate-650 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        isActive
                          ? theme === "dark"
                            ? "bg-[#00f5b4]"
                            : "bg-teal-600"
                          : "bg-transparent"
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Bottom Info / CTA */}
              <div className={`mt-auto border-t pt-6 ${
                theme === "dark" ? "border-zinc-805" : "border-slate-100"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">Appearance</span>
                  <button
                    onClick={onToggleTheme}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                      theme === "dark"
                        ? "bg-teal-950/30 border border-teal-500/35 text-[#00f5b4]"
                        : "bg-teal-50 border border-teal-600/30 text-teal-600"
                    }`}
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                  </button>
                </div>

                <button
                  id="mobile-drawer-cta-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenContact();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0dbc95] hover:bg-[#0aa683] active:scale-95 px-4 py-3 text-sm font-bold text-white shadow-md transition-all cursor-pointer"
                >
                  <span>Connect Me</span>
                  <ArrowUpRight size={16} />
                </button>
                <div className="mt-6 text-center text-xs text-neutral-500">
                  © 2026 {portfolioData.name}. Built with React.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
