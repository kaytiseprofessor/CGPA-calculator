
import React from 'react';

interface HeaderProps {
  toggleTheme: () => void;
  isDark: boolean;
  currentView: 'calculator' | 'saved';
  setView: (view: 'calculator' | 'saved') => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDark, currentView, setView }) => {
  return (
    <header className="bg-emerald-700 dark:bg-emerald-900 text-white shadow-lg transition-colors duration-300 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('calculator')}>
          <div className="bg-white text-emerald-700 p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">NU CGPA Genius</h1>
            <p className="text-emerald-100 text-xs md:text-sm">National University Bangladesh</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 bg-emerald-800/50 dark:bg-emerald-950/50 p-1 rounded-xl backdrop-blur-sm">
            <button
              onClick={() => setView('calculator')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'calculator'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-emerald-100 hover:bg-emerald-600/50'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setView('saved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                currentView === 'saved'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-emerald-100 hover:bg-emerald-600/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-emerald-600 dark:bg-emerald-800 hover:bg-emerald-500 dark:hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
