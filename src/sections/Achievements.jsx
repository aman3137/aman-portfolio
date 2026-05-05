import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, CheckCircle } from 'lucide-react';
import Section from '../components/Section';

// Add your published patents here!
const publishedPatents = [
  {
    title: "Method and System for AI-Augmented Supply Chain Optimization",
    applicationNumber: "IN2023XXXXXXX",
    date: "Aug 2023",
    description: "A novel system using machine learning algorithms to predict supply chain anomalies and optimize routing in real-time."
  },
  {
    title: "Smart IoT Architecture for Automated Precision Farming",
    applicationNumber: "IN2023YYYYYYY",
    date: "Nov 2023",
    description: "An integrated framework of soil sensors and cloud-based analytics to automate irrigation systems."
  }
];

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
                  Successfully filed over <strong className="text-slate-800">8 patents</strong> in the fields of Artificial Intelligence, Internet of Things (IoT), and smart systems.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold text-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  4 Patents Published
                </div>
              </div>

              {/* List of Published Patents */}
              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-bold text-slate-800 mb-4">Published Patents Details</h4>
                {publishedPatents.map((patent, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 border border-slate-100 p-5 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="mt-1 text-primary-500 flex-shrink-0">
                        <CheckCircle size={18} />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 leading-tight mb-1">{patent.title}</h5>
                        <div className="flex gap-3 text-xs font-semibold text-slate-500 mb-2">
                          <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-600">{patent.applicationNumber}</span>
                          <span>•</span>
                          <span>{patent.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {patent.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="pt-2 text-sm text-slate-500 italic">
                  * Replace these placeholder patents with your actual patent details in the code!
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
