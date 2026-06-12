import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

import Header from "./components/Header.tsx";
import Home from "./components/Home.tsx";
import Hero from "./components/Hero.tsx";
import Contact from "./components/Contact.tsx";
import Projects from "./components/Projects.tsx";
import Education from "./components/Education.tsx";
import ContactModal from "./components/ContactModal.tsx";
import CustomCursor from "./components/CustomCursor.tsx";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return (saved as "light" | "dark") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Motion Scroll Progress setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "education", "portfolio", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section occupies the screen's focus zone
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScrollTopBtn = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScrollTopBtn);

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener("scroll", handleScrollTopBtn);
    };
  }, []);

  const handleNavigationChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed header roughly
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleOpenInquiry = (serviceTitle: string) => {
    setInquiryService(serviceTitle);
    setIsContactOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div
      id="app-root-container"
      className={`min-h-screen font-sans antialiased transition-colors duration-300 selection:bg-teal-500/35 ${
        theme === "dark" 
          ? "bg-[#060b13] text-zinc-300 selection:text-white" 
          : "bg-[#f8fafc] text-slate-800 selection:text-slate-900"
      }`}
    >
      {/* Premium Custom Glowing Interactive Cursor */}
      <CustomCursor theme={theme} />
      
      {/* Global Seamless Grid/Dotted Background */}
      <div 
        className="fixed inset-0 pointer-events-none select-none z-0 transition-opacity duration-300" 
        style={theme === "dark" ? {
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          opacity: "0.03"
        } : {
          backgroundImage: "linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          opacity: "1"
        }} 
      />

      {/* Precision Scroll Progress Micro-bar */}
      <motion.div
        id="scroll-progress-indicator"
        className={`fixed top-0 left-0 right-0 z-50 h-1 origin-left ${
          theme === "dark" ? "bg-[#00f5b4]" : "bg-teal-600"
        }`}
        style={{ scaleX }}
      />

      {/* Main Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigationChange}
        onOpenContact={() => {
          setInquiryService("");
          setIsContactOpen(true);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Body Sections Content */}
      <main id="app-main-content">
        {/* 0. Home Section */}
        <Home
          onOpenContact={() => {
            setInquiryService("");
            setIsContactOpen(true);
          }}
          onNavigate={handleNavigationChange}
          theme={theme}
        />

        {/* 1. Hero / About Me Panel */}
        <Hero
          onOpenContact={() => {
            setInquiryService("");
            setIsContactOpen(true);
          }}
          onNavigate={handleNavigationChange}
          theme={theme}
        />

        {/* 2. Classroom Credentials & Academics */}
        <Education theme={theme} />

        {/* 3. Portfolio Showcase (with Projects, Certificates, Tech Stack tabs) */}
        <Projects theme={theme} />

        {/* 4. Contact Section */}
        <Contact theme={theme} />
      </main>



      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-floating-btn"
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#0dbc95] text-white shadow-lg active:scale-90 hover:bg-[#0aa683] transition-all cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Global Interactive Briefing form modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialService={inquiryService}
      />

    </div>
  );
}
