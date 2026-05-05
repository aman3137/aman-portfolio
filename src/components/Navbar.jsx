import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { cn } from '../utils/cn';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Fun Zone', href: '#fun-zone' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-primary-700 tracking-tight">
          Aman<span className="text-foreground">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Social Icons Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/aman3137" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/aman-kumar-a2b568224" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 transition-colors">
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 border-t border-white/20 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-700 py-2 border-b border-slate-100 last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 pt-4">
             <a href="https://github.com/aman3137" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full text-slate-700">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/aman-kumar-a2b568224" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 rounded-full text-slate-700">
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:itsamanarya@gmail.com" className="p-2 bg-slate-100 rounded-full text-slate-700">
              <Mail size={20} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
