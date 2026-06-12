import { motion } from "motion/react";
import { Code, Globe, ArrowUpRight, Award } from "lucide-react";

interface EducationProps {
  theme?: "light" | "dark";
}

export default function Education({ theme = "light" }: EducationProps) {
  return (
    <section
      id="education"
      className={`relative bg-transparent py-10 sm:py-12 md:py-14 transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-slate-800"
      }`}
    >
      {/* Decorative Cyan Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-6 sm:px-12"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className={`text-xs font-extrabold tracking-widest uppercase ${
            theme === "dark" ? "text-teal-400" : "text-teal-600"
          }`}>
          </span>
          <h2 className={`mt-2 font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}>
            Education & Internships
          </h2>
          <p className={`mt-4 text-sm sm:text-base ${theme === "dark" ? "text-neutral-400" : "text-slate-600"}`}>
            Milestones That Shaped My Journey
          </p>
        </div>

        {/* Timeline Path Container - Perfectly styled to reproduce the image */}
        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Teal Line: Exactly centered on desktop, left-aligned on mobile */}
          <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 ${
            theme === "dark" ? "bg-teal-400" : "bg-teal-500"
          }`} />

          {/* Timeline Milestones Row list */}
          <div className="space-y-10 sm:space-y-12">
            
            {/* 1. Schooling (Aligned Left) */}
            <div className="relative flex flex-col md:flex-row items-stretch">
              {/* Left Side Content Box */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 md:text-right pl-12 md:pl-0 flex flex-col items-start md:items-end justify-center">
                
                {/* Schooling Timeline Circular Indicator */}
                <span className={`absolute left-6 md:left-1/2 top-10 md:top-1/2 h-7 w-7 md:h-8 md:w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 shadow-lg ${
                  theme === "dark" ? "bg-teal-400 border-[#060b13]" : "bg-teal-500 border-white"
                }`} />
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full text-left max-w-md rounded-2xl border-2 backdrop-blur-md p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
                    theme === "dark"
                      ? "border-teal-400/80 bg-[#1d2432]/80 hover:border-teal-350"
                      : "border-teal-500 bg-white hover:border-teal-600 shadow-md"
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-extrabold tracking-widest uppercase block mb-3 ${
                    theme === "dark" ? "text-white opacity-80" : "text-slate-550 text-slate-500"
                  }`}>
                    SCHOOLING
                  </span>
                  <div className="space-y-4 text-left">
                    <div>
                      <p className={`font-display text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug ${
                        theme === "dark" ? "text-[#2dd4bf]" : "text-teal-700"
                      }`}>
                        Universal Matriculation Higher Secondary School, Palladam
                      </p>
                      <p className={`mt-1 text-sm sm:text-base font-medium ${
                        theme === "dark" ? "text-neutral-300" : "text-slate-600"
                      }`}>
                        HSC: 88.5%
                      </p>
                    </div>
                    <div>
                      <p className={`font-display text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug ${
                        theme === "dark" ? "text-[#2dd4bf]" : "text-teal-700"
                      }`}>
                        Vikas Vidyalaya Juniors Matriculation Higher Secondary School, Tiruppur
                      </p>
                      <p className={`mt-1 text-sm sm:text-base font-medium ${
                        theme === "dark" ? "text-neutral-300" : "text-slate-600"
                      }`}>
                        SSLC: 88.6%
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Spacer on Right */}
              <div className="hidden md:block w-1/2" />
            </div>

            {/* 2. College (Aligned Right) */}
            <div className="relative flex flex-col md:flex-row items-stretch">
              {/* Spacer on Left */}
              <div className="hidden md:block w-1/2" />
              {/* Right Side Content Box */}
              <div className="w-full md:w-1/2 pl-12 md:pl-12 flex flex-col items-start justify-center">
                
                {/* College Timeline Circular Indicator */}
                <span className={`absolute left-6 md:left-1/2 top-10 md:top-1/2 h-7 w-7 md:h-8 md:w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 shadow-lg ${
                  theme === "dark" ? "bg-teal-400 border-[#060b13]" : "bg-teal-500 border-white"
                }`} />
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full text-left max-w-md rounded-2xl border-2 backdrop-blur-md p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
                    theme === "dark"
                      ? "border-teal-400/80 bg-[#1d2432]/80 hover:border-teal-350"
                      : "border-teal-500 bg-white hover:border-teal-600 shadow-md"
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-extrabold tracking-widest uppercase block mb-3 ${
                    theme === "dark" ? "text-white opacity-80" : "text-slate-550 text-slate-500"
                  }`}>
                    COLLEGE
                  </span>
                  <p className={`font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug ${
                    theme === "dark" ? "text-[#2dd4bf]" : "text-teal-700"
                  }`}>
                    KPR Institute of Engineering and Technology, Coimbatore
                  </p>
                  <div className={`mt-4 space-y-1.5 text-sm sm:text-base font-medium ${
                    theme === "dark" ? "text-neutral-300" : "text-slate-600"
                  }`}>
                    <p className={`text-xs sm:text-sm font-semibold ${
                      theme === "dark" ? "text-teal-200/90" : "text-teal-600"
                    }`}>
                      B.Tech-Artificial Intelligence and Data Science
                    </p>
                    <p>CGPA: 7.86</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 3. Internships (Aligned Left) */}
            <div className="relative flex flex-col md:flex-row items-stretch">
              {/* Left Side Content Box */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 md:text-right pl-12 md:pl-0 flex flex-col items-start md:items-end justify-center">
                
                {/* Internships Timeline Circular Indicator */}
                <span className={`absolute left-6 md:left-1/2 top-10 md:top-1/2 h-7 w-7 md:h-8 md:w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 shadow-lg ${
                  theme === "dark" ? "bg-teal-400 border-[#060b13]" : "bg-teal-500 border-white"
                }`} />
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full text-left max-w-md rounded-2xl border-2 backdrop-blur-md p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
                    theme === "dark"
                      ? "border-teal-400/80 bg-[#1d2432]/80 hover:border-teal-350"
                      : "border-teal-500 bg-white hover:border-teal-600 shadow-md"
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-extrabold tracking-widest uppercase block mb-3 ${
                    theme === "dark" ? "text-white opacity-80" : "text-slate-550 text-slate-500"
                  }`}>
                    INTERNSHIPS
                  </span>
                  <div className={`mt-4 space-y-3.5 text-sm sm:text-base font-medium tracking-wide ${
                    theme === "dark" ? "text-neutral-200" : "text-slate-600"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={`h-1.5 w-1.5 rounded-full ${theme === "dark" ? "bg-teal-400" : "bg-teal-500"}`} />
                      <span>OneDot Communications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`h-1.5 w-1.5 rounded-full ${theme === "dark" ? "bg-teal-400" : "bg-teal-500"}`} />
                      <span>Codec Technologies</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Spacer on Right */}
              <div className="hidden md:block w-1/2" />
            </div>

          </div>
        </div>

        {/* Dynamic Stats Row: Slightly scaled down for visual balance */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          
          {/* Box 1: Total Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`relative flex flex-col justify-between overflow-hidden rounded-xl border-2 p-5 lg:p-6 shadow-md transition-all duration-300 group ${
              theme === "dark"
                ? "border-teal-400/80 bg-[#0d1520] hover:border-teal-350"
                : "border-teal-500 bg-white hover:border-teal-600 shadow-sm"
            }`}
          >
            <div className="flex items-start justify-between">
              {/* Left Info Column */}
              <div className="space-y-1">
                {/* Icon wrapper inside circle */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-white/10 text-teal-400 group-hover:bg-[#00f5b4] group-hover:text-black"
                    : "bg-teal-100/60 text-teal-700 group-hover:bg-teal-600 group-hover:text-white"
                }`}>
                  <Code size={18} />
                </div>
                <h4 className={`mt-4 text-[11px] font-bold uppercase tracking-wider ${
                  theme === "dark" ? "text-neutral-400" : "text-slate-500"
                }`}>
                  TOTAL PROJECTS
                </h4>
                <p className={`text-[11px] font-medium leading-tight ${theme === "dark" ? "text-neutral-500" : "text-slate-400"}`}>
                  Innovative web solutions crafted
                </p>
              </div>

              {/* Big Value on the right */}
              <div className={`text-4xl font-extrabold font-display tracking-tight shrink-0 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                3
              </div>
            </div>

            {/* Tiny arrow accent on bottom right */}
            <div className={`mt-4 flex justify-end transition-colors ${
              theme === "dark" ? "text-neutral-500 group-hover:text-teal-400" : "text-slate-444 text-slate-400 group-hover:text-teal-600"
            }`}>
              <ArrowUpRight size={14} />
            </div>
          </motion.div>

          {/* Box 2: Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`relative flex flex-col justify-between overflow-hidden rounded-xl border-2 p-5 lg:p-6 shadow-md transition-all duration-300 group ${
              theme === "dark"
                ? "border-[#00f5b4]/80 bg-[#0d1520] hover:border-teal-350"
                : "border-teal-500 bg-white hover:border-teal-600 shadow-sm"
            }`}
          >
            <div className="flex items-start justify-between">
              {/* Left Info Column */}
              <div className="space-y-1">
                {/* Icon wrapper inside circle */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-white/10 text-teal-400 group-hover:bg-[#00f5b4] group-hover:text-black"
                    : "bg-teal-100/60 text-teal-700 group-hover:bg-teal-600 group-hover:text-white"
                }`}>
                  <Award size={18} />
                </div>
                <h4 className={`mt-4 text-[11px] font-bold uppercase tracking-wider ${
                  theme === "dark" ? "text-neutral-400" : "text-slate-500"
                }`}>
                  Certifications
                </h4>
                <p className={`text-[11px] font-medium leading-tight ${theme === "dark" ? "text-neutral-500" : "text-slate-400"}`}>
                  NPTEL & Industry Internships
                </p>
              </div>

              {/* Big Value on the right */}
              <div className={`text-4xl font-extrabold font-display tracking-tight shrink-0 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                4
              </div>
            </div>

            {/* Tiny arrow accent on bottom right */}
            <div className={`mt-4 flex justify-end transition-colors ${
              theme === "dark" ? "text-neutral-500 group-hover:text-teal-400" : "text-slate-444 text-slate-400 group-hover:text-teal-600"
            }`}>
              <ArrowUpRight size={14} />
            </div>
          </motion.div>

          {/* Box 3: Years of Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`relative flex flex-col justify-between overflow-hidden rounded-xl border-2 p-5 lg:p-6 shadow-md transition-all duration-300 group ${
              theme === "dark"
                ? "border-teal-400/80 bg-[#0d1520] hover:border-teal-350"
                : "border-teal-500 bg-white hover:border-teal-600 shadow-sm"
            }`}
          >
            <div className="flex items-start justify-between">
              {/* Left Info Column */}
              <div className="space-y-1">
                {/* Icon wrapper inside circle */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-white/10 text-teal-400 group-hover:bg-[#00f5b4] group-hover:text-black"
                    : "bg-teal-100/60 text-teal-700 group-hover:bg-teal-600 group-hover:text-white"
                }`}>
                  <Globe size={18} />
                </div>
                <h4 className={`mt-4 text-[11px] font-bold uppercase tracking-wider ${
                  theme === "dark" ? "text-neutral-400" : "text-slate-500"
                }`}>
                  YEARS OF EXPERIENCE
                </h4>
                <p className={`text-[11px] font-medium leading-tight ${theme === "dark" ? "text-neutral-500" : "text-slate-400"}`}>
                  Continuous learning journey
                </p>
              </div>

              {/* Big Value on the right */}
              <div className={`text-4xl font-extrabold font-display tracking-tight shrink-0 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                2
              </div>
            </div>

            {/* Tiny arrow accent on bottom right */}
            <div className={`mt-4 flex justify-end transition-colors ${
              theme === "dark" ? "text-neutral-500 group-hover:text-teal-400" : "text-slate-444 text-slate-400 group-hover:text-teal-600"
            }`}>
              <ArrowUpRight size={14} />
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
