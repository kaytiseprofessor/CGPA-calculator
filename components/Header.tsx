
import React from 'react';

interface HeaderProps {
  toggleTheme: () => void;
  isDark: boolean;
  currentView: 'calculator' | 'saved';
  setView: (view: 'calculator' | 'saved') => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDark, currentView, setView }) => {
  return (
    <header className="bg-emerald-700 dark:bg-emerald-950 text-white shadow-lg dark:shadow-black/30 transition-colors duration-300 sticky top-0 z-30 border-b dark:border-emerald-900">
      <div className="container mx-auto px-3 sm:px-4 py-3 flex flex-row justify-between items-center">
        
        {/* Logo & Title */}
        <div className="flex items-center space-x-2 cursor-pointer flex-shrink-1 min-w-0 overflow-hidden" onClick={() => setView('calculator')}>
          <div className="bg-white text-emerald-700 dark:text-emerald-800 p-1.5 rounded-full shadow-md shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="truncate">
            <h1 className="text-base md:text-2xl font-bold tracking-tight leading-none truncate">NU CGPA</h1>
            <p className="text-emerald-100 text-[10px] md:text-sm leading-none opacity-90 hidden sm:block">Genius Calc</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Navigation Switch */}
          <div className="flex items-center bg-emerald-800/50 dark:bg-black/20 p-0.5 rounded-lg backdrop-blur-sm">
            <button
              onClick={() => setView('calculator')}
              className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-all ${
                currentView === 'calculator'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              Calc
            </button>
            <button
              onClick={() => setView('saved')}
              className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-all flex items-center gap-1 ${
                currentView === 'saved'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              Saved
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 md:p-2 rounded-lg bg-emerald-600 dark:bg-emerald-900 hover:bg-emerald-500 dark:hover:bg-emerald-800 transition-colors focus:outline-none shadow-sm border border-transparent dark:border-emerald-800"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
