import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'C/C++', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React', 'Node.js', 'Tailwind CSS'],
  },
  {
    title: 'Tools & Technologies',
    skills: ['Git', 'Docker', 'Maven', 'IoT', 'Linux', 'Apache Spark'],
  },
  {
    title: 'Databases & Data',
    skills: ['SQL', 'MySQL', 'Microsoft SQL Server', 'Tableau', 'Power BI'],
  },
];

const Skills = () => {
  return (
    <Section id="skills" title="Technical Skills">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white shadow-sm border border-slate-100 rounded-lg text-sm font-medium text-primary-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
