import React from 'react';

const SkillsMarquee = () => {
  const skills = [
    'JAVA', 'PYTHON', 'C/C++', 'JAVASCRIPT', 'REACT', 'NODE.JS', 
    'TAILWIND CSS', 'DOCKER', 'GIT', 'LINUX', 'SQL', 'MYSQL', 
    'AI AUTOMATION', 'IOT SYSTEMS'
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
          <div className="text-xs font-mono text-slate-400">skills_stream.log</div>
        </div>
        
        {/* Content - Marquee */}
        <div className="py-16 overflow-hidden bg-white relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* First list */}
            <div className="flex items-center gap-16 text-6xl md:text-7xl font-black text-emerald-700">
              {skills.map((skill, index) => (
                <span key={index} className="flex items-center gap-16">
                  <span>{skill}</span>
                  <span className="text-slate-300">•</span>
                </span>
              ))}
            </div>
            {/* Duplicated list for seamless loop */}
            <div className="flex items-center gap-16 text-6xl md:text-7xl font-black text-emerald-700">
              {skills.map((skill, index) => (
                <span key={`dup-${index}`} className="flex items-center gap-16">
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
