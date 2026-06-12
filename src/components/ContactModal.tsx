import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { portfolioData } from "../portfolioData.ts";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function ContactModal({ isOpen, onClose, initialService = "" }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialService || "ui-ux");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please fill in all fields before submitting.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

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
        // Store locally to persist submission securely
        const existingSubmissions = JSON.parse(localStorage.getItem("sudharshan_inquiries") || "[]");
        const newSubmission = {
          id: "inq-" + Date.now(),
          name,
          email,
          service,
          message,
          timestamp: new Date().toISOString(),
        };
        existingSubmissions.push(newSubmission);
        localStorage.setItem("sudharshan_inquiries", JSON.stringify(existingSubmissions));

        setStatus("success");
        // Reset after showcase
        setTimeout(() => {
          setName("");
          setEmail("");
          setMessage("");
          setStatus("idle");
          onClose();
        }, 2500);
      } else {
        setErrorMessage(result.message || "Error submitting form. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("Network error. Please check your internet connection.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            {/* Upper Accent Color Strip */}
            <div className="h-2 w-full bg-[#0dbc95]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 p-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0dbc95]/10 text-[#0dbc95]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-neutral-900">
                    Let's Build Something Great
                  </h3>
                  <p className="text-xs text-neutral-550">{portfolioData.name} usually replies in under 12 hours</p>
                </div>
              </div>
              <button
                id="close-modal-btn"
                onClick={onClose}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-neutral-600"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    id="modal-status-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 size={56} className="text-emerald-500" />
                    <h4 className="mt-4 font-display text-xl font-bold text-neutral-900">
                      Message Sent!
                    </h4>
                    <p className="mt-2 text-sm text-neutral-500 max-w-xs">
                      Thank you, {name}! Your project brief has been stored. {portfolioData.name} will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    id="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {status === "error" && (
                      <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
                        {errorMessage || "Please fill in all fields before submitting."}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-semibold text-neutral-700">
                        Your Name
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sudharshan"
                        className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-[#0dbc95] focus:bg-white focus:ring-2 focus:ring-[#0dbc95]/15 focus:outline-hidden"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-semibold text-neutral-700">
                        Email Address
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-[#0dbc95] focus:bg-white focus:ring-2 focus:ring-[#0dbc95]/15 focus:outline-hidden"
                      />
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label htmlFor="form-service" className="block text-xs font-semibold text-neutral-700">
                        What Service do you need?
                      </label>
                      <select
                        id="form-service"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 transition-all focus:border-[#0dbc95] focus:bg-white focus:ring-2 focus:ring-[#0dbc95]/15 focus:outline-hidden"
                      >
                        <option value="ui-ux">UI/UX Engineering</option>
                        <option value="react-arch">React/Full-Stack Architecture</option>
                        <option value="performance">Machine Learning Integration</option>
                        <option value="full-portfolio">Custom Project Design</option>
                        <option value="other">Contract Consultation</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="form-message" className="block text-xs font-semibold text-neutral-700">
                        Project Brief or Greetings
                      </label>
                      <textarea
                        id="form-message"
                        name="message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Tell me about your product timeline, tech stack, or simply say hello..."
                        className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-[#0dbc95] focus:bg-white focus:ring-2 focus:ring-[#0dbc95]/15 focus:outline-hidden resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      id="form-submit-btn"
                      type="submit"
                      disabled={status === "sending"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0dbc95] hover:bg-[#0aa683] active:scale-98 transition-all px-4 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(13,188,149,0.3)] hover:shadow-[0_0_25px_rgba(13,188,149,0.55)] disabled:opacity-50 cursor-pointer"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
