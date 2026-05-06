import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Section from '../components/Section';

const Leadership = () => {
  return (
    <Section id="leadership" title="Leadership & Roles">
      <div className="max-w-3xl mx-auto">
         <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 text-primary-200/40">
             <Users size={200} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-primary-600 font-medium text-sm shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              Leadership
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Research & Innovation Lead</h3>
            <p className="text-xl text-slate-600 font-medium mb-6">GeeksforGeeks Chapter</p>
            
            <p className="text-slate-600 leading-relaxed max-w-xl">
              Led research initiatives and fostered an environment of innovation. Guided team members in exploring new technologies, conceptualizing projects, and participating in hackathons and technical competitions.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Leadership;
