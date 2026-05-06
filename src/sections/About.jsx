import React from 'react';
import Section from '../components/Section';

const About = () => {
  const details = [
    { label: 'Role', value: 'Computer Science Engineer' },
    { label: 'Location', value: 'Madhubani, Bihar, India' },
    { label: 'Education', value: 'B.E. in CSE - Chandigarh University' },
    { label: 'Focus', value: 'AI, IoT, Full-stack' },
  ];

  return (
    <Section id="about" title="About Me" className="bg-white/30 backdrop-blur-sm border-y border-slate-100">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-slate-800">Professional Summary</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            I am a Computer Science Engineering graduate with strong hands-on experience in AI, IoT, data analytics, and full-stack development. My expertise includes research and patent filing, where I have successfully filed over 8 patents, with 4 published.
          </p>
          <p className="text-slate-600 leading-relaxed">
            I have demonstrated my ability to build scalable real-world systems that optimize various processes. I am passionate about leveraging technology to create impactful solutions and constantly expanding my skill set.
          </p>
        </div>
        
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Quick Facts</h3>
          <ul className="space-y-4">
            {details.map((detail, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-200/50 last:border-0">
                <span className="text-slate-500 font-medium">{detail.label}</span>
                <span className="text-slate-800 font-semibold">{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default About;
