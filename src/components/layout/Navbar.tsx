import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { profileConfig } from '../../data/profile';
import { socialConfig } from '../../data/socials';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'JOURNEY', href: '#journey' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#0C0C0C]/85 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/10 flex items-center justify-center font-display font-black text-white text-base tracking-wider group-hover:border-white/30 transition-colors">
              VK
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-widest text-[#D7E2EA] group-hover:text-white transition-colors">
                {profileConfig.nickname.toUpperCase()}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[#8F9CA7]">
                CSE STUDENT
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-4 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#8F9CA7] hover:text-[#D7E2EA]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Clickable Social Icons (Icon only, no URL text for GitHub/LinkedIn, visible Gmail) */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={`mailto:${socialConfig.email}`}
                aria-label={`Send Email to ${socialConfig.email}`}
                title={`Send Email to ${socialConfig.email}`}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-cyan-500/30 text-xs font-mono text-[#D7E2EA] hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="font-semibold text-white tracking-wide truncate max-w-[200px] xl:max-w-none">
                  {socialConfig.email}
                </span>
              </a>

              <a
                href={socialConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8F9CA7] hover:text-white hover:border-white/30 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8F9CA7] hover:text-[#38bdf8] hover:border-[#38bdf8]/30 hover:bg-[#38bdf8]/10 transition-all hover:scale-105 active:scale-95"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => scrollTo('#contact')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-white/5"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#0C0C0C]/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-left py-3 px-4 rounded-xl font-display font-semibold text-lg tracking-wider text-[#D7E2EA] hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-500" />
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                {/* Visible Gmail */}
                <a
                  href={`mailto:${socialConfig.email}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-[#D7E2EA] hover:text-white hover:border-cyan-500/40 transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="font-mono text-xs font-semibold tracking-wide truncate">{socialConfig.email}</span>
                </a>

                {/* Clickable GitHub & LinkedIn Icons */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={socialConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={socialConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#38bdf8] hover:bg-white/10 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <button
                  onClick={() => scrollTo('#contact')}
                  className="w-full py-3 rounded-xl font-mono text-sm font-semibold tracking-wider text-center text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white transition-colors"
                >
                  CONNECT / GET IN TOUCH
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
