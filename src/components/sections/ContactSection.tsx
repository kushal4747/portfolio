import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getSocialItems, socialConfig } from '../../data/socials';
import { profileConfig } from '../../data/profile';
import { FadeIn } from '../common/FadeIn';
import { Magnet } from '../common/Magnet';
import { 
  Github, Linkedin, Mail, ArrowUpRight, Send, 
  CheckCircle2, AlertCircle, ArrowUp, Copy, Check 
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Github,
  Linkedin,
  Mail
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(socialConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const socialItems = getSocialItems();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setStatusMessage('Please fill out all fields before sending.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setFormStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('submitted');
        setStatusMessage('Thank you! Your message has been sent and saved to MongoDB.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setStatusMessage(result.error || 'Failed to submit message to the server.');
      }
    } catch {
      setFormStatus('error');
      setStatusMessage('Server is unreachable. Please make sure the backend server is running.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative pt-28 md:pt-40 pb-16 bg-[#08080A] text-[#D7E2EA] px-6 sm:px-8 lg:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Massive Headline & Supporting Subtext */}
        <div className="mb-20">
          <FadeIn>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#8F9CA7] font-semibold block mb-4">
              07 / GET IN TOUCH
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-white">
              LET'S BUILD<br />
              <span className="bg-gradient-to-b from-[#BBCCD7] to-[#646973] bg-clip-text text-transparent">
                SOMETHING
              </span><br />
              INTERESTING.
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-[#8F9CA7] max-w-2xl font-light leading-relaxed">
              I'm always interested in learning, collaborating, discussing technology and working on interesting projects.
            </p>
          </FadeIn>
        </div>

        {/* 2-Column Grid: Left Socials & Information, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
          {/* Left Column: Direct Channels (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                DIRECT CONTACT &amp; PROFILES
              </h3>

              {/* 1. Gmail Card (Visibly displays kushal040806@gmail.com and is clickable) */}
              <div className="group relative p-5 sm:p-6 rounded-2xl bg-[#121418] border border-white/10 hover:border-cyan-500/40 transition-all shadow-xl mb-4">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${socialConfig.email}`}
                    className="flex items-center gap-4 flex-1 min-w-0"
                    title="Send Email"
                  >
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] text-gray-400 uppercase tracking-wider mb-0.5">
                        GMAIL
                      </span>
                      <span className="block font-mono font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors truncate">
                        {socialConfig.email}
                      </span>
                    </div>
                  </a>

                  {/* Copy Button */}
                  <button
                    onClick={copyEmailToClipboard}
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex-shrink-0"
                  >
                    {copiedEmail ? (
                      <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied</span>
                      </div>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 2. GitHub & LinkedIn Profiles - Showing ONLY Icons with Clean Clickable Buttons (No raw URLs) */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Clickable GitHub Icon Button */}
                <a
                  href={socialConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="group p-4 rounded-2xl bg-[#121418] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/10 transition-all">
                      <Github className="w-5 h-5 text-gray-200 group-hover:text-white" />
                    </div>
                    <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors">
                      GitHub
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Clickable LinkedIn Icon Button */}
                <a
                  href={socialConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="group p-4 rounded-2xl bg-[#121418] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                      <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-white" />
                    </div>
                    <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors">
                      LinkedIn
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Academic Credential Note */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-[11px] text-gray-400 uppercase tracking-wider block mb-2">
                ACADEMIC BASE
              </span>
              <p className="font-sans text-sm text-[#D7E2EA] font-medium leading-relaxed">
                {profileConfig.education.college}
              </p>
              <p className="font-mono text-xs text-gray-500 mt-1">
                Chandigarh, India
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121418] border border-white/10 shadow-2xl">
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Send a Message
              </h3>
              <p className="font-mono text-xs text-[#8F9CA7] mb-8">
                Feel free to reach out for collaboration, project discussion, or technology talk.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-gray-300 uppercase tracking-wider mb-2">
                    YOUR NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-white/40 focus:outline-none font-sans text-white placeholder-gray-600 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-gray-300 uppercase tracking-wider mb-2">
                    YOUR EMAIL
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-white/40 focus:outline-none font-sans text-white placeholder-gray-600 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-gray-300 uppercase tracking-wider mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your thoughts, project opportunity, or query..."
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-white/40 focus:outline-none font-sans text-white placeholder-gray-600 transition-colors resize-none"
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`p-4 rounded-xl flex items-start gap-3 text-xs font-mono ${
                      formStatus === 'error'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-300'
                        : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {formStatus === 'error' ? (
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}

                <Magnet strength={0.25} className="w-full">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 rounded-xl bg-[#D7E2EA] text-[#0C0C0C] font-display font-bold text-sm tracking-wider uppercase hover:bg-white transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </Magnet>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {profileConfig.name}</span>
            <span>•</span>
            <span>Computer Science Engineering</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <a
                href={socialConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${socialConfig.email}`}
                title="Send Email"
                aria-label={`Send Email to ${socialConfig.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors font-mono text-xs border border-white/5 hover:border-cyan-500/30"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-white/90">{socialConfig.email}</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
