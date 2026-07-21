import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Layers, ExternalLink, ArrowRight, Code, Cpu, ArrowLeft, Star, Github, Award, FileText, Link2, BadgeCheck, Calendar, Hash } from "lucide-react";

// Project Type Definition
interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  demoUrl: string;
  githubUrl: string;
  detailsUrl: string;
  imageUrl?: string;
  screenContent?: ReactNode;
  techCount: number;
  featureCount: number;
  tags: string[];
  keyFeatures: string[];
}


interface ProjectsProps {
  theme?: "light" | "dark";
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credId: string;
  pdfUrl: string;
  imageUrl: string;
  driveUrl?: string;
  category: string;
  accentColor: string;
  element: ReactNode;
}

interface CertificateCardProps {
  key?: string | number;
  cert: Certificate;
  theme: "light" | "dark";
  index: number;
}

function CertificateCard({ cert, theme, index }: CertificateCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group relative"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient glow halo */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${cert.accentColor}40, transparent 70%)` }}
      />

      {/* Card shell */}
      <div
        className={`relative rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2 ${
          theme === "dark"
            ? "border-white/8 bg-linear-to-b from-[#111827] to-[#0c1220]"
            : "border-slate-200/80 bg-white"
        }`}
        style={{ boxShadow: theme === "dark" ? `0 0 0 1px ${cert.accentColor}20, 0 20px 60px rgba(0,0,0,0.4)` : `0 4px 30px rgba(0,0,0,0.08), 0 0 0 1px ${cert.accentColor}30` }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cert.accentColor}, ${cert.accentColor}60)` }} />

        {/* Certificate image area with 3D flip effect */}
        <div
          className="relative w-full cursor-pointer select-none"
          style={{ aspectRatio: "16/9", perspective: "800px" }}
          onClick={() => setFlipped(!flipped)}
          title="Click to flip"
        >
          {/* Flip container */}
          <div
            className="relative w-full h-full transition-all duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            {/* Front face – certificate image */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* Hover overlay with hint text */}
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === "dark" ? "bg-black/40" : "bg-black/20"
              }`}>
                <span className="text-white text-xs font-bold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full tracking-widest uppercase">
                  Click to flip
                </span>
              </div>
            </div>

            {/* Back face – credential details */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 ${
                theme === "dark" ? "bg-[#0c1220]" : "bg-slate-50"
              }`}
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="h-14 w-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: `${cert.accentColor}25`, border: `2px solid ${cert.accentColor}60` }}>
                <BadgeCheck size={28} style={{ color: cert.accentColor }} />
              </div>
              <p className={`text-center text-xs font-bold uppercase tracking-widest ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>Credential ID</p>
              <p className={`text-center text-sm font-mono font-semibold break-all ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{cert.credId}</p>
              <div className={`w-full border-t mt-2 pt-3 flex flex-col items-center gap-1 ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}>Issued by</p>
                <p className={`text-sm font-extrabold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{cert.issuer}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          {/* Category badge + date */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: `${cert.accentColor}20`, color: cert.accentColor }}
            >
              <Hash size={9} />
              {cert.category}
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${theme === "dark" ? "text-zinc-500" : "text-slate-400"}`}>
              <Calendar size={10} />
              {cert.date}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-display text-base sm:text-lg font-extrabold leading-snug mb-1 transition-colors ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}>
            {cert.title}
          </h3>

          {/* Issuer */}
          <p className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
            {cert.issuer}
          </p>

          {/* Divider */}
          <div className={`my-4 h-px ${theme === "dark" ? "bg-white/8" : "bg-slate-100"}`} />

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {cert.driveUrl && (
              <a
                href={cert.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ background: `${cert.accentColor}20`, color: cert.accentColor, border: `1px solid ${cert.accentColor}40` }}
              >
                <Link2 size={12} />
                <span>View Certificate</span>
              </a>
            )}
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-200 active:scale-95 ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
              }`}
            >
              <FileText size={12} />
              <span>Open PDF</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ theme = "light" }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "tech-stack">("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 1. PROJECTS LIST
  const projects: Project[] = [
    {
      id: "SemesterSwap",
      title: "SemesterSwap",
      shortDescription: "SemesterSwap is an AI-powered student marketplace that enables verified college students to securely buy, sell, and exchange academic essentials through trusted peer-to-peer transactions.",
      longDescription: "SemesterSwap is a full-stack, AI-powered marketplace built exclusively for verified college students. The platform enables secure peer-to-peer trading of textbooks, lab equipment, notes, and other academic essentials within a trusted campus community. Key features include AI-driven listing optimization with product title enhancement and description generation powered by Anthropic Claude, Groq, and Google Gemini, personalized recommendations, real-time chat, SMTP-based email notifications, campus meeting coordination, and structured transaction workflows. By combining verified student authentication, trust-focused interactions, and intelligent automation, SemesterSwap delivers a safer, smarter, and more efficient marketplace experience for students.",
      demoUrl: "https://semester-swap-seven.vercel.app/",
      githubUrl: "https://github.com/its-sudharshan-45/SemesterSwap",
      detailsUrl: "#",
      imageUrl: "/Project_Images/SemesterSwap.png",
      techCount: 13,
      featureCount: 5,
      tags: ["React","TypeScript","Vite", "Tailwind CSS", "Python", "FastAPI", "SQLAlchemy", "Supabase PostgreSQL", "Supabase Auth","JWT","Anthropic Claude","Groq","Google Gemini"],
      keyFeatures: [
        "AI-Powered Listing Optimization (Product Title Enhancement & Description Generation)",
        "Multi-Provider AI Integration (Anthropic Claude, Groq, Google Gemini)",
        "Real-Time Chat & Messaging System",
        "SMTP-Based Email Notifications",
        "Campus Meeting Coordination",
        "Structured Transaction Workflows",
        "Secure Authentication & Authorization (JWT)"
      ],
    },
    {
      id: "JobGuard",
      title: "JobGuard",
      shortDescription: "JobGuard provides an intelligent and reliable solution for detecting recruitment scams, improving trust, transparency, and safety in online job marketplaces.",
      longDescription: "JobGuard is a full-stack machine learning application that detects fraudulent job postings using natural language processing and predictive analytics. The system analyzes job descriptions in real time and classifies them as legitimate or potentially fraudulent, helping job seekers and recruitment platforms make safer decisions.",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com/its-sudharshan-45/JobGuard",
      detailsUrl: "#",
      imageUrl: "/Project_Images/JobGuard.png",
      techCount: 9,
      featureCount: 5,
      tags: ["React","Vite", "Tailwind CSS", "Python", "FastAPI", "Scikit-learn", "NLP-based text classification", "MLflow", "PostgreSQL"],
      keyFeatures: [
        "Real-time fake job posting detection",
        "Machine learning-powered classification",
        "Interactive analytics and confidence scoring",
        "Fast and scalable REST API architecture",
        "Experiment and model tracking with MLflow"
      ],
    },
    {
      id: "Spot4Notes",
      title: "Spot4Notes",
      shortDescription: "Spot4Notes is an AI-powered academic resource sharing platform exclusively for college students, enabling secure note sharing, smart search, automated content moderation, and an interactive AI Study Assistant.",
      longDescription: "Spot4Notes is a centralized AI-enhanced academic platform designed to simplify the way college students upload, discover, and learn from study materials across 14 departments. The platform ensures a secure and trusted community through college email verification, automated content moderation using OCR and document processing, and an admin approval workflow. It features advanced search capabilities, real-time notifications, and an AI Study Assistant that helps students generate quizzes, summarize notes, and receive personalized learning support. Built with React, Node.js, Express, PostgreSQL, and OpenAI APIs, Spot4Notes delivers a scalable, intelligent, and seamless learning experience.",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com/its-sudharshan-45/Spot4Notes",
      detailsUrl: "#",
      imageUrl: "/Project_Images/Spot4Notes.png",
      techCount: 15,
      featureCount: 9,
      tags: ["React.js","Vite","Tailwind CSS","React Router","Zustand","Node.js","Express.js","PostgreSQL","JWT","bcrypt","Email Verification","pdf-parse","Mammoth","Tesseract.js (OCR)","OpenAI API"],
      keyFeatures: [
        "College Email Authentication",
        "14 Department Resource Hub",
        "Smart File Upload & Management",
        "AI-Based Content Moderation",
        "Advanced Search & Filtering",
        "AI Study Assistant (Quiz, Summary & Tutor)",
        "Admin Dashboard & Analytics",
        "Real-Time Notifications",
        "User & Content Management"
      ],
    },
    {
      id: "StudentHub",
      title: "StudentHub",
      shortDescription: "A web-based student management system that enables administrators to efficiently manage student records through CRUD operations, including adding, updating, searching, viewing, and deleting student information.",
      longDescription: "Student Record Management System is a full-stack web application developed to streamline the management of student information. It provides administrators with a centralized platform to perform CRUD operations on student records, including registration, modification, searching, and deletion. Built using Node.js, Express.js, MongoDB, Mongoose, and EJS, the application follows an MVC architecture to deliver a structured, scalable, and efficient record management solution.",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com/its-sudharshan-45/StudentHub",
      detailsUrl: "#",
      imageUrl: "/Project_Images/StudentHub.png",
      techCount: 10,
      featureCount: 4,
      tags: ["Node.js","Express.js","MongoDB","EJS","HTML","CSS","JavaScript","Body-Parser","Nodemon"],
      keyFeatures: [
        "Student Registration & Record Management",
        "Complete CRUD Operations (Create, Read, Update, Delete)",
        "Student Search & Data Retrieval",
        "MongoDB Database Integration",
        "MVC Architecture for Scalable Code Organization",
        "User-Friendly Web Interface"
      ],
      
    }
  ];



  // 2. CERTIFICATES LIST
  const certificates = [
    {
      id: "cert-learn-java-codechef",
      title: "Learn Java",
      issuer: "CodeChef",
      date: "9th July 2026",
      credId: "eaeac5d | sudharsmarty00",
      pdfUrl: "/Certificates/Learn Java Certificate.pdf",
      imageUrl: "/Certificates/Learn Java.png",
      driveUrl: "https://drive.google.com/file/d/1h3ZLHaCXdFppByUXsOwZorYRp9zoPiev/view?usp=drive_link",
      category: "Programming",
      accentColor: "#f59e0b",
      element: null,
    },
    {
      id: "cert-practice-java-codechef",
      title: "Practice Java",
      issuer: "CodeChef",
      date: "10th July 2026",
      credId: "83b14cd | sudharsmarty00",
      pdfUrl: "/Certificates/Practice Java Certificate.pdf",
      imageUrl: "/Certificates/Practice Java.png",
      driveUrl: "https://drive.google.com/file/d/1eN9HZFFAag4rDdUAREQlvVmIknvzQfHi/view?usp=drive_link",
      category: "Programming",
      accentColor: "#f59e0b",
      element: null,
    },
    {
      id: "cert-data-analytics-nptel",
      title: "Data Analytics with Python",
      issuer: "IIT Roorkee (NPTEL)",
      date: "Jan - Apr 2026",
      credId: "NPTEL25CS12S3",
      pdfUrl: "/Certificates/Data Analytics with Python - NPTEL.pdf",
      imageUrl: "/Certificates/Screenshot 2026-06-11 155449.png",
      category: "Data Science",
      accentColor: "#f59e0b",
      element: (
        <div className="relative w-full h-full bg-[#fdfbf7] border-8 bg-linear-to-b from-[#fdfbf6] to-[#faf3da] border-[#a17e3b] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Logo Headers */}
          <div className="flex justify-between items-center border-b border-[#a17e3b]/15 pb-1">
            <span className="text-[5px] font-black text-[#a17e3b] tracking-wider uppercase">NPTEL Online Certification</span>
            <span className="text-[4px] font-mono text-zinc-500 uppercase">Roll No: NPTEL25CS12S3</span>
          </div>
          {/* Main info */}
          <div className="text-center space-y-1 my-auto">
            <div className="text-[4px] uppercase tracking-widest text-zinc-500 font-bold">This certificate is awarded to</div>
            <div className="text-[11px] font-serif font-black text-amber-950 uppercase tracking-wide">SUDHARSHAN N</div>
            <div className="text-[4px] uppercase tracking-widest text-zinc-500 font-bold">for successfully completing the course</div>
            <div className="text-[9px] font-extrabold text-[#782c16] leading-tight">Data Analytics with Python</div>
            <div className="text-[3.5px] text-zinc-400 mt-1">Conducted by Elite Faculty members from IIT Roorkee</div>
          </div>
          {/* Gold badge seal */}
          <div className="absolute right-3.5 bottom-8 h-8 w-8 rounded-full bg-linear-to-tr from-amber-600 to-yellow-400 p-0.5 border border-amber-700/50 shadow flex items-center justify-center animate-pulse-slow">
            <div className="h-full w-full rounded-full border border-dashed border-white/80 flex items-center justify-center text-[4px] font-black text-amber-950 font-serif uppercase text-center scale-[0.95]">ELITE</div>
          </div>
          {/* Bottom */}
          <div className="flex justify-between items-end border-t border-[#a17e3b]/15 pt-1 text-[4px] font-bold text-[#4a3410] uppercase">
            <span>Duration: 12 Weeks</span>
            <span>swayam.gov.in</span>
          </div>
        </div>
      )
    },
    {
      id: "cert-cyber-security-nptel",
      title: "Practical Cyber Security for Cyber Security Practitioners",
      issuer: "IIT Kanpur (NPTEL)",
      date: "Jul - Oct 2025",
      credId: "NPTEL25CS120S154304549",
      pdfUrl: "/Certificates/Practical Cyber Security for Cyber Security Practitioners - NPTEL.pdf",
      imageUrl: "/Certificates/Screenshot 2026-06-11 155629.png",
      category: "Cyber Security",
      accentColor: "#06b6d4",
      element: (
        <div className="relative w-full h-full bg-[#f4fbfc] border-8 bg-linear-to-b from-[#f4fbfc] to-[#e6f4f7] border-[#1b4e5a] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#1b4e5a]/15 pb-1">
            <span className="text-[5px] font-black text-[#1b4e5a] tracking-wider uppercase">NPTEL Elite Certification</span>
            <span className="text-[4px] font-mono text-zinc-500 uppercase">Roll No: NPTEL25CS120S154304549</span>
          </div>
          {/* Info */}
          <div className="text-center space-y-1 my-auto">
            <div className="text-[4px] uppercase tracking-widest text-[#1b4e5a]/60 font-bold">This is to certify that</div>
            <div className="text-[11px] font-serif font-black text-[#112d35] uppercase tracking-wide">SUDHARSHAN N</div>
            <div className="text-[4px] uppercase tracking-widest text-[#1b4e5a]/60 font-bold">completed the qualification track in</div>
            <div className="text-[8.5px] font-extrabold text-[#114b5f] leading-tight">Practical Cyber Security <br/>for Cyber Security Practitioners</div>
          </div>
          {/* Seal */}
          <div className="absolute right-4 bottom-8 h-8 w-8 rounded-full bg-linear-to-tr from-cyan-600 to-[#1b4e5a] p-0.5 border border-cyan-800 shadow flex items-center justify-center">
            <div className="h-full w-full rounded-full border border-dashed border-white/80 flex items-center justify-center text-[4px] font-black text-white font-serif uppercase text-center scale-[0.95]">IIT SEC</div>
          </div>
          {/* Bottom */}
          <div className="flex justify-between items-end border-t border-[#1b4e5a]/15 pt-1 text-[4px] font-bold text-[#1b4e5a] uppercase">
            <span>IIT Kanpur</span>
            <span>NPTEL Online</span>
          </div>
        </div>
      )
    },
    {
      id: "cert-onedot-intern",
      title: "Full Stack Intern",
      issuer: "OneDot Communications",
      date: "Jan 2026",
      credId: "ODC-INT-25A",
      pdfUrl: "/Certificates/OneDot Communications - Full Stack Intern.pdf",
      imageUrl: "/Certificates/Screenshot 2026-06-11 155558.png",
      category: "Internship",
      accentColor: "#10b981",
      element: (
        <div className="relative w-full h-full bg-[#fafbfd] border-8 bg-linear-to-b from-[#fafbfd] to-[#edf3fa] border-[#0c2a4a] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Diagonal ribbon */}
          <div className="absolute top-1 left-1.5 bg-[#00f5b4] border border-[#0c2a4a] text-slate-950 font-black text-[4.5px] px-1.5 py-0.5 uppercase tracking-wider rounded-xs shadow -rotate-6 z-10">
            Verified Intern
          </div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#0c2a4a]/10 pb-1 pl-10">
            <span className="text-[5.5px] font-black text-[#0c2a4a] tracking-tight">OneDot Communications</span>
            <span className="text-[4px] font-mono text-zinc-400">REF: ODC-2025-C8</span>
          </div>
          {/* Body */}
          <div className="text-center space-y-1.5 my-auto">
            <div className="text-[4px] uppercase tracking-widest text-[#0c2a4a]/70 font-semibold">Certificate of Internship Completion</div>
            <div className="text-[11px] font-serif font-black text-[#051c33] uppercase tracking-wide">Sudharshan N</div>
            <p className="text-[4.5px] text-zinc-500 leading-normal max-w-47.5 mx-auto">
              Successfully completed work as a <span className="font-bold text-[#0c2a4a]">Full Stack Intern</span> designing React apps, managing scalable APIs, and building fluid user flows.
            </p>
          </div>
          {/* Bottom */}
          <div className="flex justify-between items-end border-t border-[#0c2a4a]/10 pt-1 text-[4px] font-bold text-zinc-500 uppercase">
            <span>Term: 2 Months</span>
            <span className="text-[#0c2a4a]">onedot.com/verify</span>
          </div>
        </div>
      )
    },
    {
      id: "cert-codec-intern",
      title: "Full Stack Intern",
      issuer: "Codec Technologies",
      date: "Dec 2025",
      credId: "CTC-INT-25B",
      pdfUrl: "/Certificates/Codec Technologies - Full Stack Intern.pdf",
      imageUrl: "/Certificates/Screenshot 2026-06-11 155522.png",
      category: "Internship",
      accentColor: "#10b981",
      element: (
        <div className="relative w-full h-full bg-[#fdfdfd] border-8 bg-linear-to-b from-white to-[#f4f7f6] border-[#083327] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#083327]/10 pb-1">
            <span className="text-[5.5px] font-black text-[#083327] tracking-tight">Codec Technologies</span>
            <span className="text-[4px] font-mono text-zinc-400">REF: CTC-INT-99</span>
          </div>
          {/* Body */}
          <div className="text-center space-y-1 my-auto">
            <div className="text-[4px] uppercase tracking-widest text-[#083327]/70 font-semibold">INTERNSHIP COMPLETION AWARD</div>
            <div className="text-[11px] font-serif font-black text-emerald-950 uppercase tracking-wide">SUDHARSHAN N</div>
            <p className="text-[4.5px] text-zinc-500 leading-normal max-w-47.5 mx-auto">
              Recognized for outstanding work and dedication in engineering robust cloud backend systems and interactive Vite architectures as our <span className="font-bold text-[#083327]">Full Stack Developer Intern</span>.
            </p>
          </div>
          {/* Bottom */}
          <div className="flex justify-between items-end border-t border-[#083327]/10 pt-1 text-[4px] font-bold text-zinc-500 uppercase">
            <span>Grade: Exemplary (A+)</span>
            <span className="text-[#083327]">codectech.io/verify</span>
          </div>
        </div>
      )
    },
  ];



  // 3. TECH STACK CATEGORIES
  const techStackCategories = [
    {
      title: "Programming Languages",
      icon: "</>",
      accent: "#f59e0b",
      glow: "rgba(245,158,11,0.25)",
      skills: [
        { name: "Java", iconPath: "/icon/Java.png" },
        { name: "Python", iconPath: "/icon/Python.png" },
        { name: "JavaScript", iconPath: "/icon/JavaScript.png" }
      ]
    },
    {
      title: "Frontend",
      icon: "◈",
      accent: "#3b82f6",
      glow: "rgba(59,130,246,0.25)",
      skills: [
        { name: "HTML", iconPath: "/icon/HTML5.png" },
        { name: "CSS3", iconPath: "/icon/CSS3.png" },
        { name: "React", iconPath: "/icon/React.png" },
        { name: "Bootstrap", iconPath: "/icon/Bootstrap.png" }
      ]
    },
    {
      title: "Backend",
      icon: "⬡",
      accent: "#10b981",
      glow: "rgba(16,185,129,0.25)",
      skills: [
        { name: "Node.js", iconPath: "/icon/Node.js.png" },
        { name: "Express", iconPath: "/icon/Express.png" }
      ]
    },
    {
      title: "AI / ML",
      icon: "✦",
      accent: "#a855f7",
      glow: "rgba(168,85,247,0.25)",
      skills: [
        { name: "NumPy", iconPath: "/icon/NumPy.png" },
        { name: "Pandas", iconPath: "/icon/Pandas.png" },
        { name: "Matplotlib", iconPath: "/icon/Matplotlib.jpg" },
        { name: "Scikit Learn", iconPath: "/icon/scikit-learn.png" }
      ]
    },
    {
      title: "Database",
      icon: "⬢",
      accent: "#06b6d4",
      glow: "rgba(6,182,212,0.25)",
      skills: [
        { name: "MySQL", iconPath: "/icon/MySQL.png" },
        { name: "MongoDB", iconPath: "/icon/MongoDB.png" },
        { name: "PostgreSQL", iconPath: "/icon/PostgresSQL.png" },
        { name: "Supabase", iconPath: "/icon/Supabase.jpg" }
      ]
    },
    {
      title: "Developer Tools",
      icon: "⚙",
      accent: "#f43f5e",
      glow: "rgba(244,63,94,0.25)",
      skills: [
        { name: "VS Code", iconPath: "/icon/Visual Studio Code (VS Code).png" },
        { name: "GitHub", iconPath: "/icon/GitHub.png" },
        { name: "Vercel", iconPath: "/icon/Vercel.png" }
      ]
    }
  ];

  const totalSkills = techStackCategories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section id="portfolio" className={`relative bg-transparent py-10 sm:py-12 md:py-14 transition-colors duration-300 ${
      theme === "dark" ? "text-white" : "text-slate-800"
    }`}>
      {/* Decorative Cyan Radial Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-100 h-100 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-6 sm:px-12 relative z-10"
      >
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={`detail-${selectedProject.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-10"
            >
              {/* Top bar with Back button and breadcrumbs exactly like image */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
                theme === "dark" ? "border-zinc-800/20" : "border-slate-200"
              }`}>
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className={`inline-flex items-center gap-2 px-4 py-2 border rounded text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                      theme === "dark"
                        ? "border-zinc-800 bg-[#020617]/30 hover:bg-[#1e293b]/40 text-zinc-300 hover:text-white"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  
                  <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold font-sans ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
                    <span 
                      className="hover:text-zinc-300 cursor-pointer transition-colors" 
                      onClick={() => setSelectedProject(null)}
                    >
                      Projects
                    </span>
                    <span className="text-zinc-400 font-bold">&gt;</span>
                    <span className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{selectedProject.title}</span>
                  </div>
                </div>
              </div>

              {/* Project Details Displayed inside a Modal-Like View */}
              <div className="relative w-full mx-auto mt-6 lg:mt-12">
                <div className={`w-full rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 pb-24 shadow-2xl border ${theme === "dark" ? "bg-[#090e17] border-zinc-800/80 text-zinc-300" : "bg-slate-50 border-slate-200"}`}>
                  
                  {/* Core Layout Grid: Two Columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left Column: Heading, Description, Stats box, Action buttons, Tags list */}
                    <div className="lg:col-span-7 space-y-8">
                      
                      {/* Big title block inside details */}
                      <div className="space-y-4 pt-2">
                        <h1 className={`font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${theme === "dark" ? "text-[#00f5b4]" : "text-teal-700"}`}>
                          {selectedProject.title}
                        </h1>
                        {/* Teal short divider line underneath title */}
                        <div className={`h-1.25 w-17.5 rounded-full ${theme === "dark" ? "bg-[#00f5b4]" : "bg-teal-600"}`} />
                      </div>

                      {/* Long Description paragraph */}
                      <p className={`text-sm sm:text-base leading-relaxed font-normal flex-1 ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                        {selectedProject.longDescription}
                      </p>

                      {/* Dual Stat Boxes inside of a subtle border enclosure */}
                      <div className={`grid grid-cols-2 gap-4 p-5 rounded-2xl border ${
                        theme === "dark" ? "bg-[#0a0f1c]/80 border-zinc-800/80" : "bg-white border-slate-200 shadow-sm"
                      }`}>
                        
                        {/* Stat Box 1 */}
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 border ${
                            theme === "dark" 
                              ? "bg-teal-500/15 border-teal-500/20 text-[#00f5b4]" 
                              : "bg-teal-50 border-teal-200 text-teal-700"
                          }`}>
                            <Code size={20} />
                          </div>
                          <div>
                            <div className={`text-2xl sm:text-3xl font-black leading-none ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                              {selectedProject.techCount}
                            </div>
                            <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1 ${theme === "dark" ? "text-zinc-500" : "text-slate-500"}`}>
                              Total Technology
                            </div>
                          </div>
                        </div>

                        {/* Stat Box 2 with split boundary */}
                        <div className={`flex items-center gap-4 border-l pl-4 sm:pl-6 ${theme === "dark" ? "border-zinc-800/60" : "border-slate-200"}`}>
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 border ${
                            theme === "dark" 
                              ? "bg-[#00f5b4]/10 border border-[#00f5b4]/20 text-[#00f5b4]" 
                              : "bg-teal-50 border-teal-200 text-teal-700"
                          }`}>
                            <Layers size={20} />
                          </div>
                          <div>
                            <div className={`text-2xl sm:text-3xl font-black leading-none ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                              {selectedProject.featureCount}
                            </div>
                            <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1 ${theme === "dark" ? "text-zinc-500" : "text-slate-500"}`}>
                              Features Used
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Button Trigger Row exactly matching image */}
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-2 border font-bold px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer text-sm font-sans shrink-0 hover:-translate-y-0.5 active:scale-98 ${
                            theme === "dark"
                              ? "border-teal-500/20 bg-[#00f5b4]/5 hover:bg-[#00f5b4]/10 hover:border-[#00f5b4]/45 text-[#00f5b4]"
                              : "border-teal-600/30 bg-teal-600 text-white hover:bg-teal-700 hover:border-teal-700 shadow-sm"
                          }`}
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>

                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-2 border font-bold px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer text-sm font-sans shrink-0 hover:-translate-y-0.5 active:scale-98 ${
                            theme === "dark"
                              ? "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:text-white text-zinc-300"
                              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm"
                          }`}
                        >
                          <Github size={16} />
                          <span>Github</span>
                        </a>
                      </div>

                      {/* Technologies List header and list tags */}
                      <div className={`space-y-4 pt-6 border-t ${theme === "dark" ? "border-zinc-800/40" : "border-slate-200"}`}>
                        <div className={`flex items-center gap-2 font-bold text-base sm:text-lg ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                          <Code size={18} className={theme === "dark" ? "text-[#00f5b4]" : "text-teal-600"} />
                          <span>Technologies Used</span>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                          {selectedProject.tags.map((tag, idx) => (
                            <div
                              key={idx}
                              className={`border px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                                theme === "dark"
                                  ? "bg-[#0b1220] border-zinc-800/85 text-zinc-300 hover:border-[#00f5b4]/25"
                                  : "bg-white border-slate-200 text-slate-700 hover:border-teal-600/35 shadow-xs"
                              }`}
                            >
                              <Cpu size={12} className={theme === "dark" ? "text-[#00f5b4]" : "text-teal-600"} />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Project Showcase Image + Key Features */}
                    <div className="lg:col-span-5 space-y-8">
                      
                      {/* Laptop mockup for the Showcase Image */}
                      <div className={`relative w-full rounded-xl flex items-center justify-center p-3 sm:p-4 shadow-2xl border overflow-hidden transition-all ${
                        theme === "dark" ? "bg-zinc-900/30 border-zinc-800/40" : "bg-slate-100/50 border-slate-200/80"
                      }`}>
                        <div className="relative w-full mx-auto scale-100">
                          {/* Screen shell */}
                          <div className="relative flex-1 aspect-16/10 w-full overflow-hidden rounded-t-xl bg-[#090b11] p-1.5 shadow-2xl border-[3px] border-[#334155]/80">
                            <div className="h-full w-full overflow-hidden rounded bg-slate-950 flex flex-col relative">
                              {selectedProject.imageUrl ? (
                                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
                              ) : (
                                selectedProject.screenContent
                              )}
                            </div>
                          </div>
                          {/* Laptop lower base frame */}
                          <div className="relative h-2 sm:h-2.5 w-[114%] left-[-7%] bg-linear-to-b from-[#64748b] to-[#334155] rounded-b-lg shadow-xl border-t border-[#94a3b8]">
                            <div className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b bg-[#1e293b]" />
                          </div>
                        </div>
                      </div>

                      {/* Key Features Bullet elements box */}
                      <div className={`rounded-2xl border p-6 sm:p-8 shadow-xl relative overflow-hidden group transition-all duration-300 ${
                        theme === "dark" ? "border-zinc-800 bg-[#0d1421]/90" : "border-slate-200 bg-white"
                      }`}>
                        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00f5b4]/10 rounded-full blur-2xl animate-pulse" />

                        <div className={`flex items-center gap-2.5 font-bold text-base sm:text-lg mb-6 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                          <Star className="text-yellow-400 fill-yellow-400/5" size={20} />
                          <span>Key Features</span>
                        </div>

                        <ul className="space-y-4">
                          {selectedProject.keyFeatures.map((feat, idx) => (
                            <li key={idx} className={`flex items-start gap-3.5 text-xs sm:text-sm font-semibold ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                              <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 block ${theme === "dark" ? "bg-[#00f5b4]" : "bg-teal-500"}`} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Header exactly matched to design */}
              <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                <h2 className={`font-display text-3xl xs:text-4xl sm:text-5xl font-black tracking-tight leading-tight ${theme === "dark" ? "text-[#00f5b4]" : "text-teal-700"}`}>
                  Portfolio Showcase
                </h2>
                <p className={`mt-4 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}`}>
                  Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
                </p>
              </div>

              {/* Tab Switcher - Rounded outline card, exactly matching visual style */}
              <div className={`grid grid-cols-3 border rounded-2xl p-1.5 max-w-3xl mx-auto mb-10 sm:mb-12 backdrop-blur-md transition-all duration-305 ${
                theme === "dark" ? "border-zinc-800/80 bg-zinc-950/40" : "border-slate-200 bg-slate-100"
              }`}>
                {/* Tab 1: Projects */}
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer focus:outline-hidden ${
                    activeTab === "projects"
                      ? theme === "dark"
                        ? "bg-[#0c2c2a] text-white border border-teal-500/30 shadow-[0_4px_20px_rgba(45,212,191,0.15)]"
                        : "bg-white text-teal-800 border border-teal-600/30 shadow-[0_4px_15px_rgba(13,148,136,0.1)]"
                      : theme === "dark"
                      ? "text-zinc-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-800 relative z-10"
                  }`}
                >
                  <Terminal size={15} className={activeTab === "projects" ? (theme === "dark" ? "text-[#00f5b4]" : "text-teal-655 text-teal-600") : "text-zinc-400"} />
                  <span>Projects</span>
                </button>

                {/* Tab 2: Certificates */}
                <button
                  onClick={() => setActiveTab("certificates")}
                  className={`flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer focus:outline-hidden ${
                    activeTab === "certificates"
                      ? theme === "dark"
                        ? "bg-[#0c2c2a] text-white border border-teal-500/30 shadow-[0_4px_20px_rgba(45,212,191,0.15)]"
                        : "bg-white text-teal-800 border border-teal-600/30 shadow-[0_4px_15px_rgba(13,148,136,0.1)]"
                      : theme === "dark"
                      ? "text-zinc-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-800 relative z-10"
                  }`}
                >
                  <Award size={15} className={activeTab === "certificates" ? (theme === "dark" ? "text-[#00f5b4]" : "text-teal-655 text-teal-600") : "text-zinc-400"} />
                  <span>Certificates</span>
                </button>

                {/* Tab 3: Tech Stack */}
                <button
                  onClick={() => setActiveTab("tech-stack")}
                  className={`flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer focus:outline-hidden ${
                    activeTab === "tech-stack"
                      ? theme === "dark"
                        ? "bg-[#0c2c2a] text-white border border-teal-500/30 shadow-[0_4px_20px_rgba(45,212,191,0.15)]"
                        : "bg-white text-teal-800 border border-teal-600/30 shadow-[0_4px_15px_rgba(13,148,136,0.1)]"
                      : theme === "dark"
                      ? "text-zinc-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-800 relative z-10"
                  }`}
                >
                  <Layers size={15} className={activeTab === "tech-stack" ? (theme === "dark" ? "text-[#00f5b4]" : "text-teal-653 text-teal-600") : "text-zinc-400"} />
                  <span>Tech Stack</span>
                </button>
              </div>

              {/* Tab Content Panels */}
              <AnimatePresence mode="wait">
                
                {/* TAB A: PROJECTS */}
                {activeTab === "projects" && (
                  <motion.div
                    key="projects-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
                  >
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        id={`project-card-${project.id}`}
                        className={`flex flex-col justify-between overflow-hidden rounded-2xl border p-5 pb-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 relative group ${
                          theme === "dark"
                            ? "border-zinc-800/80 bg-[#0d1421]/90 hover:border-teal-500/30"
                            : "border-slate-200 bg-white hover:border-teal-600/30 shadow-md"
                        }`}
                      >
                        {/* Laptop Mockup Wrapper inside of card */}
                        <div className={`relative w-full aspect-16/10 rounded-xl flex items-center justify-center p-3 xs:p-4 sm:p-6 border mb-5 overflow-hidden select-none transition-colors ${
                          theme === "dark" ? "bg-zinc-900/60 border-zinc-800/30" : "bg-slate-50 border-slate-100"
                        }`}>
                          
                          {/* CSS Laptop Frame */}
                          <div className="relative w-full max-w-[320px] xs:max-w-[340px] sm:max-w-97.5 mx-auto scale-95 hover:scale-[1.01] transition-transform duration-300">
                            {/* Screen Bezel */}
                            <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-xl bg-[#090b11] p-1.5 shadow-2xl border-[3px] border-[#334155]/80">
                              {/* Screen Content */}
                              <div className="h-full w-full overflow-hidden rounded bg-slate-950 flex flex-col relative">
                                {project.imageUrl ? (
                                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                  project.screenContent
                                )}
                              </div>
                            </div>
                            {/* Keyboard Base and Lip notch */}
                            <div className="relative h-2 w-[114%] left-[-7%] bg-linear-to-b from-[#64748b] to-[#334155] rounded-b-lg shadow-xl border-t border-[#94a3b8]">
                              <div className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b bg-[#1e293b]" />
                            </div>
                          </div>

                        </div>

                        {/* Context Meta Text */}
                        <div className="px-1 flex flex-col flex-1 justify-between">
                          <div>
                            <h3 className={`font-display text-xl sm:text-2xl font-extrabold tracking-tight transition-colors leading-snug ${
                              theme === "dark" 
                                ? "text-white hover:text-[#00f5b4]" 
                                : "text-slate-800 hover:text-teal-655 hover:text-teal-600"
                            }`}>
                              {project.title}
                            </h3>
                            <p className={`mt-3 text-xs sm:text-sm font-normal leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-slate-555 text-slate-500"}`}>
                              {project.shortDescription}
                            </p>
                          </div>

                          {/* Bottom Link Indicators */}
                          <div className={`mt-6 flex items-center justify-between border-t pt-4 ${theme === "dark" ? "border-zinc-800/60" : "border-slate-100"}`}>
                            <a
                              id={`project-live-${project.id}`}
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors ${
                                theme === "dark" ? "text-[#00f5b4] hover:text-[#2dd4bf]" : "text-teal-600 hover:text-teal-700"
                              }`}
                            >
                              <span>Live Demo</span>
                              <ExternalLink size={14} />
                            </a>

                            <button
                              id={`project-details-${project.id}`}
                              onClick={() => {
                                setSelectedProject(project);
                                document.getElementById("portfolio")?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                                theme === "dark"
                                  ? "bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 hover:text-white"
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-800"
                              }`}
                            >
                              <span>Details</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}



                {/* TAB B: CERTIFICATES */}
                {activeTab === "certificates" && (
                  <motion.div
                    key="certificates-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-6xl mx-auto px-2 sm:px-4"
                  >
                    {/* Stats bar */}
                    <div className={`flex flex-wrap items-center justify-center gap-3 mb-8 py-3.5 px-5 rounded-2xl ${
                      theme === "dark" ? "bg-white/4 border border-white/8" : "bg-slate-50 border border-slate-200"
                    }`}>
                      {[
                        { label: "Total Certificates", value: certificates.length, color: "#2dd4bf" },
                        { label: "NPTEL Elite", value: 2, color: "#f59e0b" },
                        { label: "Industry", value: 2, color: "#10b981" },
                        { label: "Programming", value: 2, color: "#f59e0b" },
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-2 px-3">
                          <span className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</span>
                          <span className={`text-xs font-semibold ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>{stat.label}</span>
                          {i < 3 && <span className={`ml-3 h-4 w-px ${theme === "dark" ? "bg-white/10" : "bg-slate-200"}`} />}
                        </div>
                      ))}
                    </div>

                    {/* Certificate grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certificates.map((cert, index) => (
                        <CertificateCard key={cert.id} cert={cert} theme={theme} index={index} />
                      ))}
                    </div>

                    {/* Bottom hint */}
                    <p className={`text-center text-xs mt-8 ${
                      theme === "dark" ? "text-zinc-600" : "text-slate-400"
                    }`}>
                      💡 Click on any certificate image to reveal credential details
                    </p>
                  </motion.div>
                )}

                {/* TAB C: TECH STACK */}
                {activeTab === "tech-stack" && (
                  <motion.div
                    key="tech-stack-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="max-w-6xl mx-auto px-2 sm:px-4"
                  >
                    {/* Header stats row */}
                    <div className={`flex flex-wrap items-center justify-center gap-6 mb-10 py-4 px-6 rounded-2xl ${
                      theme === "dark" ? "bg-white/4 border border-white/8" : "bg-slate-50 border border-slate-200"
                    }`}>
                      <div className="text-center">
                        <div className={`text-3xl font-black ${ theme === "dark" ? "text-white" : "text-slate-900" }`}>{totalSkills}</div>
                        <div className={`text-[10px] uppercase tracking-widest font-bold mt-0.5 ${ theme === "dark" ? "text-zinc-500" : "text-slate-400" }`}>Total Skills</div>
                      </div>
                      <div className={`h-8 w-px ${ theme === "dark" ? "bg-white/10" : "bg-slate-200" }`} />
                      <div className="text-center">
                        <div className={`text-3xl font-black ${ theme === "dark" ? "text-white" : "text-slate-900" }`}>{techStackCategories.length}</div>
                        <div className={`text-[10px] uppercase tracking-widest font-bold mt-0.5 ${ theme === "dark" ? "text-zinc-500" : "text-slate-400" }`}>Categories</div>
                      </div>
                      <div className={`h-8 w-px ${ theme === "dark" ? "bg-white/10" : "bg-slate-200" }`} />
                      {techStackCategories.map((cat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full" style={{ background: cat.accent }} />
                          <span className={`text-xs font-semibold ${ theme === "dark" ? "text-zinc-400" : "text-slate-500" }`}>{cat.title}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {techStackCategories.map((category, catIndex) => (
                        <motion.div
                          key={catIndex}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5, delay: catIndex * 0.07, ease: "easeOut" }}
                          className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 ${
                            theme === "dark"
                              ? "bg-linear-to-b from-[#111827] to-[#0c1220] border border-white/8"
                              : "bg-white border border-slate-200/80 shadow-sm"
                          }`}
                          style={{
                            boxShadow: theme === "dark"
                              ? `0 0 0 1px ${category.accent}18, 0 16px 48px rgba(0,0,0,0.35)`
                              : `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${category.accent}22`
                          }}
                        >
                          {/* Ambient glow on hover */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: `radial-gradient(ellipse at top left, ${category.glow}, transparent 65%)` }}
                          />

                          {/* Top color accent bar */}
                          <div className="h-0.75 w-full" style={{ background: `linear-gradient(90deg, ${category.accent}, ${category.accent}50)` }} />

                          {/* Card content */}
                          <div className="p-5">
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-5">
                              <div
                                className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: `${category.accent}20`, color: category.accent, border: `1.5px solid ${category.accent}40` }}
                              >
                                {category.icon}
                              </div>
                              <div>
                                <h4 className={`font-display text-sm font-extrabold tracking-tight leading-none ${
                                  theme === "dark" ? "text-white" : "text-slate-900"
                                }`}>
                                  {category.title}
                                </h4>
                                <p style={{ color: category.accent }} className="text-[10px] font-bold mt-0.5 uppercase tracking-widest">
                                  {category.skills.length} {category.skills.length === 1 ? "skill" : "skills"}
                                </p>
                              </div>
                            </div>

                            {/* Skills icon grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                              {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                  key={skillIndex}
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.35, delay: catIndex * 0.07 + skillIndex * 0.06 }}
                                  whileHover={{ scale: 1.1, y: -3 }}
                                  className="flex flex-col items-center gap-1.5 cursor-pointer group/skill"
                                >
                                  <div
                                    className="h-12 w-12 rounded-xl flex items-center justify-center p-2 transition-all duration-300"
                                    style={{
                                      background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#f8fafc",
                                      border: `1.5px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`
                                    }}
                                    onMouseEnter={e => {
                                      (e.currentTarget as HTMLDivElement).style.border = `1.5px solid ${category.accent}`;
                                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 14px ${category.glow}`;
                                    }}
                                    onMouseLeave={e => {
                                      (e.currentTarget as HTMLDivElement).style.border = `1.5px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`;
                                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                                    }}
                                  >
                                    <img
                                      src={skill.iconPath}
                                      alt={skill.name}
                                      className="h-full w-full object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                  <span
                                    className={`text-[9px] sm:text-[10px] font-semibold tracking-tight text-center leading-tight transition-colors duration-200 ${
                                      theme === "dark" ? "text-zinc-400" : "text-slate-500"
                                    } group-hover/skill:text-[${category.accent}]`}
                                    style={{} as React.CSSProperties}
                                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = category.accent; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = ""; }}
                                  >
                                    {skill.name}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Scrolling marquee ribbon of all skills */}
                    <div className={`mt-10 overflow-hidden rounded-2xl py-4 ${
                      theme === "dark" ? "bg-white/4 border border-white/8" : "bg-slate-50 border border-slate-200"
                    }`}>
                      <div
                        className="flex gap-6 items-center"
                        style={{
                          animation: "marquee 28s linear infinite",
                          width: "max-content"
                        }}
                      >
                        {[...techStackCategories.flatMap(c => c.skills.map(s => ({ ...s, accent: c.accent }))),
                          ...techStackCategories.flatMap(c => c.skills.map(s => ({ ...s, accent: c.accent })))]
                          .map((skill, i) => (
                            <div key={i} className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-full" style={{ background: `${skill.accent}15`, border: `1px solid ${skill.accent}30` }}>
                              <img src={skill.iconPath} alt={skill.name} className="h-4 w-4 object-contain" loading="lazy" />
                              <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: skill.accent }}>{skill.name}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>

                    <style>{`
                      @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                      }
                    `}</style>

                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
