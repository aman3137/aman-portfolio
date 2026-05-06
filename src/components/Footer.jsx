import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/50 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Aman Kumar. All rights reserved.</p>
        <p className="mt-2">Built with React, Tailwind CSS, and Framer Motion.</p>
      </div>
    </footer>
  );
};

export default Footer;
