import React, { useState } from 'react';
import { searchNuResult } from '../services/nuResultService';
import { Term } from '../types';

interface ResultSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (term: Term) => void;
}

const ResultSearchModal: React.FC<ResultSearchModalProps> = ({ isOpen, onClose, onImport }) => {
  const [examType, setExamType] = useState("Honours 1st Year");
  const [roll, setRoll] = useState("");
  const [reg, setReg] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const termData = await searchNuResult(examType, roll, reg, year);
      onImport(termData);
      onClose();
      // Reset form
      setRoll("");
      setReg("");
      setYear("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch result");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-up">
        <div className="bg-emerald-700 dark:bg-emerald-900 px-6 py-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Result Archive Import
          </h3>
          <p className="text-emerald-100 text-xs mt-1">Auto-populate grades from NU Server</p>
        </div>
        
        <form onSubmit={handleSearch} className="p-6 space-y-4">
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">Examination</label>
            <select 
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option>Honours 1st Year</option>
              <option>Honours 2nd Year</option>
              <option>Honours 3rd Year</option>
              <option>Honours 4th Year</option>
              <option>Masters Final</option>
              <option>Degree Pass</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">Registration No</label>
              <input
                type="number"
                placeholder="e.g. 987654"
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">Exam Year</label>
              <input
                type="number"
                placeholder="e.g. 2023"
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">Roll Number</label>
            <input
              type="number"
              placeholder="Try: 123456 (Demo)"
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/30 active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching Archive...
                </>
              ) : (
                'Search Result'
              )}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-3">
                * Real-time connection to NU server requires backend proxy. <br/>
                Use Roll <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">123456</span> to test the simulation.
            </p>
          </div>
        </form>
        
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-100 hover:text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default ResultSearchModal;