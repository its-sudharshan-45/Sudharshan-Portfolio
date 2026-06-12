import { motion } from "motion/react";
import { Sparkles, FileText, Code } from "lucide-react";
import { portfolioData } from "../portfolioData.ts";

interface HeroProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
  theme?: "light" | "dark";
}

export default function Hero({ onOpenContact, onNavigate, theme = "light" }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // clean custom dynamic ease
      },
    },
  };

  return (
    <section
      id="about"
      className={`relative flex flex-col items-center justify-center bg-transparent py-10 sm:py-12 md:py-14 transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-slate-800"
      }`}
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl px-6 sm:px-12 flex flex-col items-center relative z-10"
      >
        
        {/* Section Header at the Top of Hero: Exactly matches the image */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 md:mb-24 mt-4">
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`font-display text-3xl xs:text-4xl sm:text-5xl md:text-[52px] font-black tracking-tight bg-clip-text ${
              theme === "dark" ? "text-[#00f5b4]" : "text-teal-700"
            }`}
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`mt-3.5 flex items-center justify-center gap-2 font-medium text-xs sm:text-sm tracking-wide ${
              theme === "dark" ? "text-teal-400" : "text-teal-600"
            }`}
          >
            <Sparkles size={14} className={`flex-shrink-0 animate-pulse ${theme === "dark" ? "text-[#00f5b4]" : "text-teal-650 text-teal-600"}`} />
            <span className="opacity-90">Turning Vision into Intelligent Solutions</span>
            <Sparkles size={14} className={`flex-shrink-0 animate-pulse ${theme === "dark" ? "text-[#00f5b4]" : "text-teal-650 text-teal-600"}`} />
          </motion.p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16 lg:gap-24 w-full">
          
          {/* Left Side Content Column */}
          <motion.div
            id="hero-left-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1"
          >
            
            <motion.p
              id="hero-greeting"
              variants={itemVariants}
              className={`font-display text-2xl sm:text-3xl font-bold tracking-tight ${
                theme === "dark" ? "text-[#00f5b4]" : "text-teal-600"
              }`}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              id="hero-heading-name"
              variants={itemVariants}
              className={`mt-2 font-display text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-tight ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {portfolioData.name}
            </motion.h1>

            <motion.p
              id="hero-description"
              variants={itemVariants}
              className={`mt-6 text-sm sm:text-base leading-relaxed max-w-xl font-normal ${
                theme === "dark" ? "text-neutral-300" : "text-slate-600"
              }`}
            >
            Aspiring AI Engineer & Full-Stack Developer passionate about transforming ideas into intelligent digital products through AI, Full-Stack Development, and modern technologies. Focused on building scalable solutions that combine innovation, performance, and exceptional user experiences while creating technology with real-world impact.
            </motion.p>

            {/* Action Buttons: Download CV and View Projects */}
            <motion.div
              id="hero-actions-container"
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                id="hero-cv-btn"
                href={portfolioData.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#0dbc95] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#0aa683] hover:-translate-y-0.5 active:scale-98 shadow-[0_0_15px_rgba(13,188,149,0.3)] hover:shadow-[0_0_25px_rgba(13,188,149,0.55)] focus:outline-hidden cursor-pointer"
              >
                <FileText size={18} />
                <span>Download CV</span>
              </a>
              <button
                id="hero-projects-btn"
                onClick={() => onNavigate("portfolio")}
                className={`flex items-center gap-2 rounded-lg border-2 px-6 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 active:scale-98 focus:outline-hidden cursor-pointer ${
                  theme === "dark"
                    ? "border-teal-500/20 bg-[#020617]/30 text-[#00f5b4] hover:bg-[#1e293b]/40 hover:border-[#00f5b4]/40 shadow-[0_0_15px_rgba(0,245,180,0.15)] hover:shadow-[0_0_25px_rgba(0,245,180,0.35)]"
                    : "border-slate-400 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-500 hover:text-slate-900 shadow-[0_0_12px_rgba(13,148,136,0.15)] hover:shadow-[0_0_20px_rgba(13,148,136,0.35)]"
                }`}
              >
                <Code size={18} />
                <span>View Projects</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side Image Column */}
          <div id="hero-right-col" className="md:col-span-5 flex items-center justify-center order-1 md:order-2">
            <motion.div
              id="hero-avatar-wrapper"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", damping: 20 }}
              className="relative"
            >
              {/* Intense cyan/teal backing glows match the image glow */}
              <div className="absolute inset-0 rounded-full bg-teal-500/25 blur-3xl scale-125 pointer-events-none" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-teal-400/40 to-emerald-500/10 blur-xl opacity-80 pointer-events-none" />
              
              {/* Main Portrait Circle */}
              <div className={`relative aspect-square w-[220px] h-[220px] xs:w-[260px] xs:h-[260px] sm:w-[310px] sm:h-[310px] md:w-[280px] md:h-[280px] lg:w-[360px] lg:h-[360px] overflow-hidden rounded-full border-4 shadow-2xl flex items-center justify-center transition-all duration-300 ${
                theme === "dark"
                  ? "border-teal-500/40 shadow-[0_0_50px_rgba(45,212,191,0.25)] bg-slate-900"
                  : "border-teal-600/35 shadow-[0_0_50px_rgba(13,148,136,0.1)] bg-white"
              }`}>
                <img
                  id="hero-portrait-img"
                  src={portfolioData.imagePath}
                  alt="Sudharshan N Portrait"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </motion.div>
          </div>

        </div>

      </motion.div>


    </section>
  );
}
