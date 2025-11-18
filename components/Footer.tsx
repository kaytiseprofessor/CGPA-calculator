import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} NU CGPA Genius. Built for National University Bangladesh Students.</p>
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-600">Grading scale based on NU standard policies.</p>
        <p className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500">
          Made by <span className="text-emerald-600 dark:text-emerald-400">Estiyak</span> of Government Commerce College, Ctg
        </p>
      </div>
    </footer>
  );
};

export default Footer;