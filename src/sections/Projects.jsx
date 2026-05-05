import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
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
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/aman3137/repos?sort=updated&per_page=6');
        setGithubRepos(response.data);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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

      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-800">Latest from GitHub</h3>
          <a href="https://github.com/aman3137" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View All <ExternalLink size={16} />
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {githubRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-primary-300 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <Folder className="text-slate-400" size={20} />
                  <div className="flex gap-2">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700">
                      <FaGithub size={18} />
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 truncate">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">
                    {repo.name}
                  </a>
                </h4>
                <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-3">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                      {repo.language}
                    </span>
                  )}
                  <span>★ {repo.stargazers_count}</span>
                </div>
              </motion.div>
            ))}
            {githubRepos.length === 0 && !loading && (
              <p className="text-slate-500 text-center col-span-full py-8">No public repositories found or API rate limit exceeded.</p>
            )}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Projects;
