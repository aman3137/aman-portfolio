import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Section from '../components/Section';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const form = e.target;
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      // Fallback to mailto if no access key is provided in .env
      const body = `Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`;
      window.location.href = `mailto:itsamanarya@gmail.com?subject=New message from Aman's Portfolio&body=${encodeURIComponent(body)}`;
      setStatus("Key missing. Redirecting to your email client...");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: accessKey,
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
            subject: "New message from Aman's Portfolio"
        })
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        // Fallback to mailto if API fails
        const body = `Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`;
        window.location.href = `mailto:itsamanarya@gmail.com?subject=New message from Aman's Portfolio&body=${encodeURIComponent(body)}`;
        setStatus("Service unavailable. Redirecting to your email client...");
      }
    } catch (error) {
      console.error(error);
      // Fallback on network error
      const body = `Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`;
      window.location.href = `mailto:itsamanarya@gmail.com?subject=New message from Aman's Portfolio&body=${encodeURIComponent(body)}`;
      setStatus("Network error. Redirecting to your email client...");
    }
  };

  return (
    <Section id="contact" title="Get In Touch" className="bg-white">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Let's connect!</h3>
          <p className="text-slate-600 mb-8">
            I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="space-y-6">
            <a href="mailto:itsamanarya@gmail.com" className="flex items-center gap-4 text-slate-600 hover:text-primary-600 transition-colors">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Email</p>
                <p>itsamanarya@gmail.com</p>
              </div>
            </a>
            <a href="tel:+917004926716" className="flex items-center gap-4 text-slate-600 hover:text-primary-600 transition-colors">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Phone</p>
                <p>+91-7004926716</p>
              </div>
            </a>
            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Location</p>
                <p>Madhubani, Bihar, India</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-800 mb-4">Social Profiles</p>
            <div className="flex gap-4">
              <a href="https://github.com/aman3137" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/aman-kumar-a2b568224" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 text-slate-600 hover:bg-[#0A66C2] hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-3"
        >
          <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl">
             <input type="hidden" name="subject" value="New Submission from Aman's Portfolio" />
             <input type="checkbox" name="botcheck" id="" style={{ display: 'none' }} />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
            >
              <Send size={18} />
              Send Message
            </button>
            {status && (
              <p className={`mt-4 text-center font-medium ${status.includes('success') ? 'text-primary-600' : 'text-amber-600'}`}>
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
