import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, MessageSquare, Send, Share2, Check, Copy } from "lucide-react";
import { portfolioData } from "../portfolioData.ts";

interface ContactProps {
  theme?: string;
}

export default function Contact({ theme = "dark" }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShareClick = () => {
    // Elegant copy-link interaction
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);
      data.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        formEl.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setSubmitError(result.message || "Error submitting form. Please try again.");
      }
    } catch (err) {
      setSubmitError("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex items-center justify-center py-10 sm:py-12 md:py-14 px-6 sm:px-12 bg-transparent"
    >
      {/* Immersive background decoration (matching the gradient look of the screenshot) */}
      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none select-none z-0">
        {/* Left deep purple/indigo ambient glow */}
        <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/4 rounded-full bg-indigo-900/15 blur-[120px]" />
        
        {/* Right deep cyan/teal ambient glow */}
        <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] translate-x-1/2 translate-y-1/4 rounded-full bg-teal-950/15 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl mx-auto"
      >
        {/* Centered Section Title */}
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl font-black text-[#00f5b4] tracking-tight leading-none">
            Contact Me
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-850/60 bg-[#0d1421] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle upper glow effect inside card */}
          <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-80 h-40 bg-[#00f5b4]/5 rounded-full blur-[40px] pointer-events-none" />

          {/* Form Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#00f5b4] tracking-tight leading-none">
                Get in Touch
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-zinc-400 font-sans max-w-md antialiased leading-relaxed">
                Have something to discuss? Send me a message and let's talk.
              </p>
            </div>

            {/* Share Connection Node Trigger Icon */}
            <div className="relative group shrink-0">
              <button
                type="button"
                id="contact-share-btn"
                onClick={handleShareClick}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900/30 border border-zinc-800 text-[#00f5b4] hover:bg-[#00f5b4]/10 hover:text-[#00f5b4] transition-all cursor-pointer active:scale-95 shadow-sm"
                title="Copy developer email"
                aria-label="Copy development contact information"
              >
                {copied ? <Check size={18} className="text-[#00f5b4] animate-pulse" /> : <Share2 size={18} />}
              </button>
              
              {/* Tooltip confirmation */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1.5 z-20"
                  >
                    <Copy size={11} className="text-[#00f5b4]" />
                    <span>Email copied to clipboard!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Submission Toast overlay within the card boundaries */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-[#0d1421]/95 flex flex-col items-center justify-center text-center p-8 z-30"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-5">
                  <Check size={32} />
                </div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">Message Received Successfully!</h3>
                <p className="mt-2.5 text-sm text-zinc-400 font-sans max-w-sm">
                  Thank you for keeping in touch. I will read and respond to your message as soon as possible!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-xs font-extrabold text-[#00f5b4] uppercase tracking-widest hover:underline focus:outline-hidden"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Fields Row Layout */}
          <form onSubmit={handleSubmit} className="space-y-4.5 relative z-10">
            {/* Input 1: Your Name */}
            <div className="relative group">
              <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00f5b4] transition-colors pointer-events-none z-10">
                <User size={18} />
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full pl-12.5 pr-4 py-3.5 rounded-xl border border-zinc-800 bg-[#121927]/60 text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#00f5b4] focus:ring-1 focus:ring-[#00f5b4]/40 hover:bg-[#121927]/80 focus:bg-[#121927] transition-all font-sans text-sm selection:bg-emerald-500/25"
                aria-label="Your NameInput"
              />
            </div>

            {/* Input 2: Your Email */}
            <div className="relative group">
              <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00f5b4] transition-colors pointer-events-none z-10">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full pl-12.5 pr-4 py-3.5 rounded-xl border border-zinc-800 bg-[#121927]/60 text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#00f5b4] focus:ring-1 focus:ring-[#00f5b4]/40 hover:bg-[#121927]/80 focus:bg-[#121927] transition-all font-sans text-sm selection:bg-emerald-500/25"
                aria-label="Your EmailInput"
              />
            </div>

            {/* Input 3: Your Message Box */}
            <div className="relative group">
              <span className="absolute left-4.5 top-4.5 text-zinc-500 group-focus-within:text-[#00f5b4] transition-colors pointer-events-none z-10">
                <MessageSquare size={18} />
              </span>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full pl-12.5 pr-4 py-3.5 rounded-xl border border-zinc-800 bg-[#121927]/60 text-white placeholder-zinc-500 focus:outline-hidden focus:border-[#00f5b4] focus:ring-1 focus:ring-[#00f5b4]/40 hover:bg-[#121927]/80 focus:bg-[#121927] transition-all font-sans text-sm resize-none selection:bg-emerald-500/25 leading-relaxed"
                aria-label="Your MessageInput"
              />
            </div>

            {/* Submit Action Block CTA */}
            {submitError && (
              <div id="contact-submit-error" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-400 font-sans text-center">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full relative py-3.5 bg-[#10b981] hover:bg-[#0dbc95] active:bg-[#0aa683] active:scale-[0.99] text-white font-extrabold text-sm tracking-wide rounded-2xl flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#00f5b4]/50 select-none uppercase font-sans mt-2 ${
                theme === "dark"
                  ? "shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.65)]"
                  : "shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.55)]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4.5 w-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={15} className="mt-[-1px]" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
