import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Section from '../components/Section';
import profilePhoto from '../assets/profile-photo.jpeg';

const Hero = () => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <Section id="home" className="min-h-screen flex items-center pt-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
            <span className="flex w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Aman Kumar</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-slate-600 mb-4">
            Computer Science Engineer
          </p>
          <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
            Building Scalable Systems & Intelligent Automation. Passionate about leveraging technology to create impactful solutions through AI, IoT, and full-stack development.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={`${import.meta.env.BASE_URL}Aman_Resume.pdf`}
              download="Aman_Resume.pdf"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all hover:-translate-y-1"
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold shadow-soft hover:shadow-lg border border-slate-100 transition-all hover:-translate-y-1 group"
            >
              Contact Me
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          {/* Decorative elements */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-primary-200 to-blue-200 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full glass border-4 border-white/50 shadow-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <img 
              src={profilePhoto} 
              alt="Aman Kumar" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating badge */}
          <motion.div 
            animate={isMobile ? {} : { y: [0, -10, 0] }}
            transition={isMobile ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 -left-6 glass px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              8+
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Patents Filed</p>
              <p className="text-xs text-slate-500">4 Published</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
