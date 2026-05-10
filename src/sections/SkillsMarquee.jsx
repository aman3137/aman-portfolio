import React from 'react';
import { Terminal } from 'lucide-react';

const SkillsMarquee = () => {
  const skills = [
    'JAVA', 'PYTHON', 'C/C++', 'JAVASCRIPT', 'REACT', 'NODE.JS', 
    'TAILWIND CSS', 'SQL', 'MYSQL', 'DOCKER', 'GIT', 'LINUX', 
    'ZAPIER', 'N8N', 'AI AUTOMATION', 'IOT SYSTEMS'
  ];

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Window Header */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
            <Terminal size={12} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-500 font-medium">skills_stream.log</span>
          </div>
        </div>
        
        {/* Content - Marquee */}
        <div className="py-16 overflow-hidden bg-white relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* First list */}
            <div className="flex items-center gap-6 text-xl md:text-2xl font-bold text-emerald-400">
              {skills.map((skill, index) => (
                <span key={index} className="flex items-center gap-6">
                  <span>{skill}</span>
                  <span className="text-slate-300">•</span>
                </span>
              ))}
            </div>
            {/* Duplicated list for seamless loop */}
            <div className="flex items-center gap-6 text-xl md:text-2xl font-bold text-emerald-400">
              {skills.map((skill, index) => (
                <span key={`dup-${index}`} className="flex items-center gap-6">
                  <span>{skill}</span>
                  <span className="text-slate-300">•</span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Fading edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;
