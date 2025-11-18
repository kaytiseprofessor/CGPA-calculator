
import React from 'react';
import { CalculationResult, Term } from '../types';

interface ResultsSectionProps {
  result: CalculationResult;
  terms: Term[];
  onSave: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = React.memo(({ result, terms, onSave }) => {
  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-black/20 overflow-hidden relative transition-colors duration-300 group border border-gray-100 dark:border-gray-700">
         <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500`}></div>
         <div className="p-8 text-center">
            <h2 className="text-gray-400 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-4">Cumulative GPA</h2>
            
            <div className="relative inline-block">
                <div className={`text-7xl md:text-8xl font-black tracking-tighter mb-2 ${result.cgpa >= 3.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-800 dark:text-white'}`}>
                {result.cgpa.toFixed(2)}
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 w-24 border border-gray-100 dark:border-gray-700 transition-colors">
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalCredits}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 uppercase font-semibold">Credits</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 w-24 border border-gray-100 dark:border-gray-700 transition-colors">
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">{terms.reduce((acc, t) => acc + t.courses.length, 0)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 uppercase font-semibold">Courses</div>
                </div>
            </div>

            <button
              onClick={onSave}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Result
            </button>
         </div>
      </div>

      {/* Simplified Info Box */}
      <div className="bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl p-5 shadow-sm border border-emerald-100 dark:border-emerald-900/50 transition-colors">
        <div className="flex items-start gap-3">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-emerald-500 dark:text-emerald-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
             <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm mb-1">Grading Policy</h3>
             <p className="text-xs text-emerald-800 dark:text-emerald-300/70 leading-relaxed opacity-80">
               Results are calculated based on the standard National University 4.00 scale.
               Pass mark is 2.00 (D).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultsSection;