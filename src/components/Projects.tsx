import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Layers, ExternalLink, ArrowRight, X, CheckCircle2, Code, ShieldCheck, Database, Server, Smartphone, Cpu, ArrowLeft, Star, Github, Award, FileText } from "lucide-react";

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
  element: ReactNode;
}

interface CertificateCardProps {
  key?: string | number;
  cert: Certificate;
  theme: "light" | "dark";
}

function CertificateCard({ cert, theme }: CertificateCardProps) {
  return (
    <div
      className={`group relative rounded-2xl border-2 p-4 shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
        theme === "dark"
          ? "border-[#00f5b4]/80 bg-[#0c121d] hover:border-[#00f5b4]"
          : "border-teal-500 bg-white hover:border-teal-600 shadow-md"
      }`}
    >
      {/* Certificate Viewport (3:2 Aspect Ratio) */}
      <div className={`relative w-full aspect-[3/2] rounded-xl overflow-hidden shadow-inner border bg-white transition-transform duration-300 group-hover:scale-[1.01] ${
        theme === "dark" ? "border-zinc-950" : "border-slate-200"
      }`}>
        <img
          src={cert.imageUrl}
          alt={cert.title}
          className="w-full h-full object-contain bg-neutral-950/5 p-1 transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Meta Tags below */}
      <div className="mt-4 px-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className={`font-display text-base font-extrabold transition-colors duration-200 leading-tight ${
              theme === "dark" ? "text-white group-hover:text-[#00f5b4]" : "text-slate-850 group-hover:text-teal-600"
            }`}>
              {cert.title}
            </h3>
            <span className={`text-[10px] uppercase tracking-wider font-bold block mt-1 ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
              {cert.issuer}
            </span>
          </div>
        </div>
        
        <div className={`flex justify-between items-center mt-4 pt-3.5 border-t text-[11px] font-semibold ${
          theme === "dark" ? "border-zinc-800/40 text-zinc-400" : "border-slate-100 text-slate-550 text-slate-500"
        }`}>
          <span className={`${theme === "dark" ? "text-zinc-500" : "text-slate-400"} text-[10px]`}>
            Issued: {cert.date}
          </span>
          
          {/* PDF Viewer Action Button */}
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all shadow-sm cursor-pointer ${
              theme === "dark"
                ? "bg-teal-500/10 hover:bg-[#00f5b4]/25 text-[#00f5b4] border border-[#00f5b4]/20"
                : "bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-600/20"
            }`}
          >
            <FileText size={13} />
            <span>Open PDF</span>
            <ExternalLink size={10} className="opacity-80" />
          </a>
        </div>
      </div>
    </div>
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
      id: "cert-data-analytics-nptel",
      title: "Data Analytics with Python",
      issuer: "IIT Roorkee",
      date: "Jan - Apr 2026",
      credId: "NPTEL25CS12S3",
      pdfUrl: "/Certificates/Data Analytics with Python - NPTEL.pdf",
      imageUrl: "/Certificates/Screenshot 2026-06-11 155449.png",
      element: (
        <div className="relative w-full h-full bg-[#fdfbf7] border-[8px] bg-gradient-to-b from-[#fdfbf6] to-[#faf3da] border-[#a17e3b] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
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
          <div className="absolute right-3.5 bottom-8 h-8 w-8 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 border border-amber-700/50 shadow flex items-center justify-center animate-pulse-slow">
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
      issuer: "IIT Kanpur",
      date: "Jul-Oct 2025",
      credId: "NPTEL25CS120S154304549",
      pdfUrl: "/Certificates/Practical Cyber Security for Cyber Security Practitioners - NPTEL.pdf",
      imageUrl: "/Certificates/Screenshot 2026-06-11 155629.png",
      element: (
        <div className="relative w-full h-full bg-[#f4fbfc] border-[8px] bg-gradient-to-b from-[#f4fbfc] to-[#e6f4f7] border-[#1b4e5a] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
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
          <div className="absolute right-4 bottom-8 h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-600 to-[#1b4e5a] p-0.5 border border-cyan-800 shadow flex items-center justify-center">
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
      element: (
        <div className="relative w-full h-full bg-[#fafbfd] border-[8px] bg-gradient-to-b from-[#fafbfd] to-[#edf3fa] border-[#0c2a4a] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Diagonal ribbon */}
          <div className="absolute top-1 left-1.5 bg-[#00f5b4] border border-[#0c2a4a] text-slate-950 font-black text-[4.5px] px-1.5 py-0.5 uppercase tracking-wider rounded-xs shadow rotate-[-6deg] z-10">
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
            <p className="text-[4.5px] text-zinc-500 leading-normal max-w-[190px] mx-auto">
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
      element: (
        <div className="relative w-full h-full bg-[#fdfdfd] border-[8px] bg-gradient-to-b from-white to-[#f4f7f6] border-[#083327] p-3 flex flex-col justify-between font-sans text-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#083327]/10 pb-1">
            <span className="text-[5.5px] font-black text-[#083327] tracking-tight">Codec Technologies</span>
            <span className="text-[4px] font-mono text-zinc-400">REF: CTC-INT-99</span>
          </div>
          {/* Body */}
          <div className="text-center space-y-1 my-auto">
            <div className="text-[4px] uppercase tracking-widest text-[#083327]/70 font-semibold">INTERNSHIP COMPLETION AWARD</div>
            <div className="text-[11px] font-serif font-black text-emerald-950 uppercase tracking-wide">SUDHARSHAN N</div>
            <p className="text-[4.5px] text-zinc-500 leading-normal max-w-[190px] mx-auto">
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
      skills: [
        { name: "Java", iconPath: "/icon/Java.png" },
        { name: "Python", iconPath: "/icon/Python.png" },
        { name: "JavaScript", iconPath: "/icon/JavaScript.png" }
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML", iconPath: "/icon/HTML5.png" },
        { name: "CSS3", iconPath: "/icon/CSS3.png" },
        { name: "React", iconPath: "/icon/React.png" },
        { name: "Bootstrap", iconPath: "/icon/Bootstrap.png" }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", iconPath: "/icon/Node.js.png" },
        { name: "Express", iconPath: "/icon/Express.png" }
      ]
    },
    {
      title: "AI / ML",
      skills: [
        { name: "NumPy", iconPath: "/icon/NumPy.png" },
        { name: "Pandas", iconPath: "/icon/Pandas.png" },
        { name: "Matplotlib", iconPath: "/icon/Matplotlib.jpg" },
        { name: "Scikit Learn", iconPath: "/icon/scikit-learn.png" }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MySQL", iconPath: "/icon/MySQL.png" },
        { name: "MongoDB", iconPath: "/icon/MongoDB.png" },
        { name: "PostgreSQL", iconPath: "/icon/PostgresSQL.png" },
        { name: "Supabase", iconPath: "/icon/Supabase.jpg" }
      ]
    },
    {
      title: "Developer Tools",
      skills: [
        { name: "VS Code", iconPath: "/icon/Visual Studio Code (VS Code).png" },
        { name: "GitHub", iconPath: "/icon/GitHub.png" },
        { name: "Vercel", iconPath: "/icon/Vercel.png" }
      ]
    }
  ];

  return (
    <section id="portfolio" className={`relative bg-transparent py-10 sm:py-12 md:py-14 transition-colors duration-300 ${
      theme === "dark" ? "text-white" : "text-slate-800"
    }`}>
      {/* Decorative Cyan Radial Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-3xl" />
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
                        <div className={`h-[5px] w-[70px] rounded-full ${theme === "dark" ? "bg-[#00f5b4]" : "bg-teal-600"}`} />
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
                          <div className="relative flex-1 aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-[#090b11] p-1.5 shadow-2xl border-[3px] border-[#334155]/80">
                            <div className="h-full w-full overflow-hidden rounded bg-slate-950 flex flex-col relative">
                              {selectedProject.imageUrl ? (
                                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
                              ) : (
                                selectedProject.screenContent
                              )}
                            </div>
                          </div>
                          {/* Laptop lower base frame */}
                          <div className="relative h-2 sm:h-2.5 w-[114%] -left-[7%] bg-gradient-to-b from-[#64748b] to-[#334155] rounded-b-lg shadow-xl border-t border-[#94a3b8]">
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
                        <div className={`relative w-full aspect-[16/10] rounded-xl flex items-center justify-center p-3 xs:p-4 sm:p-6 border mb-5 overflow-hidden select-none transition-colors ${
                          theme === "dark" ? "bg-zinc-900/60 border-zinc-800/30" : "bg-slate-50 border-slate-100"
                        }`}>
                          
                          {/* CSS Laptop Frame */}
                          <div className="relative w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[390px] mx-auto scale-95 hover:scale-[1.01] transition-transform duration-300">
                            {/* Screen Bezel */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-[#090b11] p-1.5 shadow-2xl border-[3px] border-[#334155]/80">
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
                            <div className="relative h-2 w-[114%] -left-[7%] bg-gradient-to-b from-[#64748b] to-[#334155] rounded-b-lg shadow-xl border-t border-[#94a3b8]">
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
                                  ? "bg-zinc-800 hover:bg-zinc-705 bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 hover:text-white"
                                  : "bg-slate-100 hover:bg-slate-205 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-800"
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4"
                  >
                    {certificates.map((cert) => (
                      <CertificateCard key={cert.id} cert={cert} theme={theme} />
                    ))}
                  </motion.div>
                )}



                {/* TAB C: TECH STACK */}
                {activeTab === "tech-stack" && (
                  <motion.div
                    key="tech-stack-panel"
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto px-4"
                  >
                    {techStackCategories.map((category, catIndex) => (
                      <div
                        key={catIndex}
                        className={`relative rounded-2xl border-2 px-4 py-5 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 group ${
                          theme === "dark"
                            ? "border-[#00f5b4]/80 bg-[#0c121d] hover:border-[#00f5b4] shadow-2xl"
                            : "border-teal-500 bg-white hover:border-teal-600 shadow-md"
                        }`}
                      >
                        {/* Clean Inside Title Header */}
                        <div className="w-full text-center mb-4">
                          <h4 className={`font-display text-sm sm:text-base font-bold tracking-tight ${
                            theme === "dark" ? "text-white" : "text-teal-900"
                          }`}>
                            {category.title}
                          </h4>
                          <div className={`w-8 h-[2px] mx-auto mt-1.5 rounded-full ${
                            theme === "dark" ? "bg-[#00f5b4]" : "bg-teal-500"
                          }`} />
                        </div>

                        {/* Row of Icon Asset Images */}
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 w-full">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              whileHover={{ scale: 1.08, y: -4 }}
                              transition={{ type: "spring", stiffness: 350, damping: 20 }}
                              className="flex flex-col items-center justify-center cursor-pointer group/item"
                            >
                              <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${
                                theme === "dark" 
                                  ? "bg-zinc-950/60 border-zinc-800/80 group-hover/item:border-[#00f5b4] group-hover/item:shadow-[0_0_15px_rgba(0,245,180,0.2)]" 
                                  : "bg-slate-50 border-slate-200 group-hover/item:border-teal-500 group-hover/item:shadow-[0_0_15px_rgba(13,148,136,0.15)]"
                              }`}>
                                <img
                                  src={skill.iconPath}
                                  alt={skill.name}
                                  className="h-full w-full object-contain filter group-hover/item:brightness-110"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <span className={`mt-1.5 text-[10px] sm:text-xs font-semibold tracking-tight font-sans transition-colors text-center ${
                                theme === "dark"
                                  ? "text-zinc-300 group-hover/item:text-[#00f5b4]"
                                  : "text-slate-700 group-hover/item:text-teal-700"
                              }`}>
                                {skill.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
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
