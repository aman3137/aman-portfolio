import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import Section from '../components/Section';

const featuredProjects = [
  {
    name: 'AI-Augmented CPS for Supply Chain Optimization',
    description: 'Integrated AI models for demand forecasting, anomaly detection, and IoT-based route optimization.',
    tags: ['AI', 'IoT', 'Python', 'Data Analytics'],
    featured: true,
  },
  {
    name: 'Automated Farming Using IoT',
    description: 'Designed smart irrigation using soil sensors with real-time cloud monitoring and alerts.',
    tags: ['IoT', 'Sensors', 'Cloud', 'C++'],
    featured: true,
  },
  {
    name: 'Voice-Based Web Browsing App for Disabled People',
    description: 'Developed a voice-controlled browser extension enabling hands-free and accessible web navigation.',
    tags: ['JavaScript', 'Web Speech API', 'Extension'],
    featured: true,
  },
];

const Projects = () => {

  return (
    <Section id="projects" title="Projects & Experience" className="bg-slate-50/50">
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center text-slate-800">Featured Work</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl flex flex-col h-full group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                <Folder size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{project.name}</h4>
              <p className="text-slate-600 mb-6 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;
