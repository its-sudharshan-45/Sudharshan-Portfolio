import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, Github, Linkedin, Sparkles, Instagram } from "lucide-react";
import { portfolioData } from "../portfolioData.ts";
import ThreeDStack from "./ThreeDStack.tsx";

interface HomeProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
  theme?: "light" | "dark";
}

export default function Home({ onOpenContact, onNavigate, theme = "light" }: HomeProps) {
  const [currentText, setCurrentText] = useState("");
  const titles = ["AI Explorer", "Web Developer", "Tech Enthusiast"];
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(120);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker); };
  }, [currentText, delta, isDeleting, loopNum]);

  const tick = () => {
    const i = loopNum % titles.length;
    const fullText = titles[i];
    const updatedText = isDeleting 
      ? fullText.substring(0, currentText.length - 1) 
      : fullText.substring(0, currentText.length + 1);

    setCurrentText(updatedText);

    if (isDeleting) {
      setDelta(50); // Fast delete
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(1600); // Hold full text for 1.6s
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(250); // Pause before next word
    }
  };

  const skills = portfolioData.skills;

  return (
    <section
      id="home"
      className="relative min-h-screen lg:h-screen flex items-center justify-center bg-transparent pt-24 pb-12 lg:py-0 px-6 sm:px-12"
    >
      {/* Background Gradients and Glows - Matching home.png */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Left deep purple glow */}
        <div className={`absolute top-1/4 left-0 w-[45rem] h-[45rem] -translate-x-[35%] -translate-y-1/4 rounded-full blur-[130px] transition-all ${
          theme === "dark" ? "bg-indigo-950/20" : "bg-indigo-400/5"
        }`} />
        
        {/* Central blue tint */}
        <div className={`absolute top-1/2 left-1/3 w-[35rem] h-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] transition-all ${
          theme === "dark" ? "bg-blue-950/10" : "bg-blue-400/5"
        }`} />

        {/* Right deep cyan/teal glow behind the illustration */}
        <div className={`absolute bottom-1/4 right-0 w-[50rem] h-[50rem] translate-x-[25%] translate-y-1/4 rounded-full blur-[140px] transition-all ${
          theme === "dark" ? "bg-teal-950/15" : "bg-teal-400/5"
        }`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side Content Block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1 pt-4 lg:pt-0 pl-3 sm:pl-6 md:pl-12">

            {/* Giant Display Title */}
            <h1 className="font-sans tracking-tight leading-[0.92] text-left select-none text-4xl xs:text-5xl sm:text-[62px] md:text-[74px] lg:text-[78px] xl:text-[86px] font-black">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={`block transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Full Stack
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`block bg-gradient-to-r ${
                  theme === "dark" 
                    ? "from-teal-400 via-[#00f5b4] to-[#00f5b4] to-emerald-400 drop-shadow-[0_0_35px_rgba(0,245,180,0.3)]" 
                    : "from-teal-600 via-[#0dbc95] to-emerald-600 drop-shadow-[0_0_20px_rgba(13,188,149,0.15)]"
                } bg-clip-text text-transparent filter`}
              >
                Developer
              </motion.span>
            </h1>

            {/* Subtitle / cursor line exactly as in home.png */}
            <div
              className={`text-lg md:text-xl font-light h-12 flex items-center mt-3 mb-2 select-none ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}
            >
              <span>{currentText}</span>
              <span className={`w-[2.5px] h-[0.9em] ml-2 animate-pulse inline-block shadow-[0_0_8px_rgba(0,245,180,0.8)] ${
                theme === "dark" ? "bg-[#00f5b4]" : "bg-teal-500"
              }`} />
            </div>

            {/* Paragraph Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-sans font-light antialiased pr-4 transition-colors ${
                theme === "dark" ? "text-zinc-400" : "text-slate-605 text-slate-650 text-slate-600"
              }`}
            >
              Crafting Intelligent Experiences with AI & Full-Stack magic.
            </motion.p>

            {/* Skill tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-5 flex flex-wrap gap-2.5 max-w-xl"
            >
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`border px-5 py-2 rounded-full text-xs sm:text-sm font-medium select-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${
                    theme === "dark"
                      ? "bg-[#0b1222]/80 hover:bg-[#101930]/90 border-teal-500/10 hover:border-teal-400/40 text-zinc-300"
                      : "bg-white hover:bg-slate-50 border-slate-205 text-slate-705 text-slate-700 hover:border-teal-500/40"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-4 w-full"
            >
              <button
                onClick={() => onNavigate("portfolio")}
                className={`flex items-center gap-2 rounded-lg border px-8 py-3.5 text-sm font-semibold hover:-translate-y-0.5 active:scale-97 transition-all duration-300 cursor-pointer ${
                  theme === "dark"
                    ? "border-[#00f5b4]/35 bg-[#09111e]/90 text-white hover:text-[#00f5b4] hover:border-[#00f5b4]/85 shadow-[0_0_20px_rgba(0,245,180,0.15)] hover:shadow-[0_0_30px_rgba(0,245,180,0.4)]"
                    : "border-teal-600/35 bg-teal-600 text-white hover:bg-teal-700 hover:border-teal-700 shadow-[0_0_15px_rgba(13,148,136,0.3)] hover:shadow-[0_0_25px_rgba(13,148,136,0.55)]"
                }`}
              >
                <span>Projects</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                onClick={() => onNavigate("contact")}
                className={`flex items-center gap-2 rounded-lg border-2 px-8 py-3.5 text-sm font-semibold hover:-translate-y-0.5 active:scale-97 transition-all duration-300 cursor-pointer ${
                  theme === "dark"
                    ? "border-[#00f5b4]/35 bg-[#09111e]/90 text-white hover:text-[#00f5b4] hover:border-[#00f5b4]/85 shadow-[0_0_20px_rgba(0,245,180,0.15)] hover:shadow-[0_0_30px_rgba(0,245,180,0.4)]"
                    : "border-slate-400 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-500 hover:text-slate-900 shadow-[0_0_12px_rgba(13,148,136,0.15)] hover:shadow-[0_0_20px_rgba(13,148,136,0.35)]"
                }`}
              >
                <span>Contact</span>
                <Mail size={15} />
              </button>
            </motion.div>

            {/* Social handles */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6 flex flex-wrap gap-4"
            >
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noreferrer"
                className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 hover:-translate-y-1 active:scale-95 transition-all duration-305 cursor-pointer ${
                  theme === "dark"
                    ? "border-[#00f5b4]/40 bg-[#09111e]/90 text-slate-300 hover:text-[#00f5b4] hover:border-[#00f5b4] shadow-[0_0_15px_rgba(0,245,180,0.2)] hover:shadow-[0_0_25px_rgba(0,245,180,0.65)]"
                    : "border-slate-400 bg-white text-slate-700 hover:text-teal-600 hover:border-teal-600 shadow-[0_0_12px_rgba(15,23,42,0.15)] hover:shadow-[0_0_22px_rgba(13,148,136,0.45)]"
                }`}
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>

              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 hover:-translate-y-1 active:scale-95 transition-all duration-305 cursor-pointer ${
                  theme === "dark"
                    ? "border-[#00f5b4]/40 bg-[#09111e]/90 text-slate-300 hover:text-[#00f5b4] hover:border-[#00f5b4] shadow-[0_0_15px_rgba(0,245,180,0.2)] hover:shadow-[0_0_25px_rgba(0,245,180,0.65)]"
                    : "border-slate-400 bg-white text-slate-700 hover:text-teal-600 hover:border-teal-600 shadow-[0_0_12px_rgba(15,23,42,0.15)] hover:shadow-[0_0_22px_rgba(13,148,136,0.45)]"
                }`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>

              <a
                href={portfolioData.socials.instagram || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 hover:-translate-y-1 active:scale-95 transition-all duration-305 cursor-pointer ${
                  theme === "dark"
                    ? "border-[#00f5b4]/40 bg-[#09111e]/90 text-slate-300 hover:text-[#00f5b4] hover:border-[#00f5b4] shadow-[0_0_15px_rgba(0,245,180,0.2)] hover:shadow-[0_0_25px_rgba(0,245,180,0.65)]"
                    : "border-slate-400 bg-white text-slate-700 hover:text-teal-600 hover:border-teal-600 shadow-[0_0_12px_rgba(15,23,42,0.15)] hover:shadow-[0_0_22px_rgba(13,148,136,0.45)]"
                }`}
                aria-label="Instagram Profile"
              >
                <Instagram size={20} />
              </a>
            </motion.div>

          </div>

          {/* Right Side 3D Interactive Stack Column */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 w-full max-w-[325px] sm:max-w-[420px] lg:max-w-none mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-square flex items-center justify-center"
            >
              {/* Animated backdrop grid lines and glows */}
              <div className="absolute inset-0 rounded-full bg-teal-500/5 blur-3xl pointer-events-none scale-110" />
              <div className="absolute w-[280px] h-[280px] rounded-full bg-indigo-500/5 blur-2xl pointer-events-none" />
              
              {/* Isometric responsive interactable Tech Stack component */}
              <ThreeDStack theme={theme} />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
