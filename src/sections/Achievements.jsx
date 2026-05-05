import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileText } from 'lucide-react';
import Section from '../components/Section';

const Achievements = () => {
  return (
    <Section id="achievements" title="Achievements" className="bg-white/30 backdrop-blur-sm border-y border-slate-100">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Award size={120} />
          </div>
          
          <div className="relative z-10 flex gap-6">
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-2">
                <FileText size={24} />
              </div>
              <div className="w-0.5 h-full bg-slate-200"></div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Patent Filing Achievements</h3>
              <p className="text-primary-600 font-medium mb-4">Research and Innovation</p>
              
              <div className="bg-white/50 border border-slate-100 rounded-xl p-6">
                <p className="text-slate-600 leading-relaxed mb-4">
                  Successfully filed over <strong className="text-slate-800">8 patents</strong> in the field of industrial design.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold text-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  4 Patents Published
                </div>
                </div>
              </div>
            </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Achievements;
