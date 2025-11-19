
import React, { useState, useMemo } from 'react';
import { searchNuResult } from '../services/nuResultService';
import { parseResultText } from '../services/resultParser';
import { Term } from '../types';
import { DEPARTMENTS } from '../data/syllabus';

interface ResultSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (term: Term) => void;
}

const ResultSearchModal: React.FC<ResultSearchModalProps> = ({ isOpen, onClose, onImport }) => {
  const [activeTab, setActiveTab] = useState<'paste' | 'simulate'>('paste');
  
  // Paste State
  const [rawText, setRawText] = useState("");
  const [parseError, setParseError] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  // Simulate State
  const [examType, setExamType] = useState("Honours 1st Year");
  const [dept, setDept] = useState("ACCOUNTING");
  const [roll, setRoll] = useState("");
  const [reg, setReg] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [simError, setSimError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Group departments for simulate dropdown
  const groupedDepartments = useMemo(() => {
    const groups: Record<string, string[]> = {};
    Object.keys(DEPARTMENTS).forEach(key => {
        const cat = DEPARTMENTS[key].category || "Other";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(key);
    });
    return groups;
  }, []);

  const handleSimulateSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimError(null);
    setIsLoading(true);

    try {
      const termData = await searchNuResult(examType, roll, reg, year, dept);
      
      // Artificial delay for visual effect
      await new Promise(r => setTimeout(r, 800));
      
      onImport(termData);
      onClose();
    } catch (err: any) {
      setSimError(err.message || "Failed to fetch result");
    } finally {
      setIsLoading(false);
    }
  };

  const handleParse = () => {
    setParseError("");
    setIsParsing(true);
    
    // Small delay to show "Processing" state
    setTimeout(() => {
      const result = parseResultText(rawText);
      
      if (result && result.courses.length > 0) {
        onImport(result);
        onClose();
        setRawText(""); // Clear after success
      } else {
        setParseError("We couldn't find any grades in the text. Please make sure you copied the full result table.");
      }
      setIsParsing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-fade-in-up flex flex-col max-h-[90vh] border border-gray-200 dark:border-gray-700">
        
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import Result
            </h3>
            <p className="text-emerald-100 text-xs mt-1 opacity-90">Add your grades instantly without typing</p>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-colors backdrop-blur-sm">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stylish Tabs */}
        <div className="flex p-1 bg-gray-50 dark:bg-gray-900/50 mx-4 mt-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'paste' 
                ? 'bg-white dark:bg-gray-800 text-emerald-600 shadow-sm ring-1 ring-black/5 dark:ring-white/5' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('paste')}
          >
            Smart Paste
          </button>
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'simulate' 
                ? 'bg-white dark:bg-gray-800 text-emerald-600 shadow-sm ring-1 ring-black/5 dark:ring-white/5' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('simulate')}
          >
            Quick Fill
          </button>
        </div>
        
        {/* Content Area */}
        <div className="p-6 overflow-y-auto">
          
          {/* TAB 1: PASTE TEXT */}
          {activeTab === 'paste' && (
            <div className="space-y-5">
               <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 flex gap-3">
                 <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1.5 h-fit text-blue-600 dark:text-blue-200 shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                   </svg>
                 </div>
                 <div className="text-sm text-blue-800 dark:text-blue-200">
                   <strong className="block mb-1">How it works</strong>
                   <p className="text-xs leading-relaxed opacity-90">
                     Copy your result table directly from the <a href="http://103.113.200.7/" target="_blank" className="underline font-semibold hover:text-blue-600">NU Result Archive</a> website and paste it below. Our AI parser will extract the grades automatically.
                   </p>
                 </div>
               </div>

               <div className="relative group">
                  <textarea
                    className="w-full h-40 p-4 text-xs md:text-sm font-mono bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none resize-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder={`Paste here like this:\n\n212501 PRINCIPLES OF ACCOUNTING 4 B+\n212503 ADVANCED ACCOUNTING 4 A-`}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                  ></textarea>
                  <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 pointer-events-none">
                    PASTE AREA
                  </div>
               </div>

               {parseError && (
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {parseError}
                 </div>
               )}

               <button
                 onClick={handleParse}
                 disabled={!rawText.trim() || isParsing}
                 className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 shadow-lg shadow-emerald-500/30 transform transition-all hover:-translate-y-0.5 active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
               >
                 {isParsing ? (
                   <>
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                     Analyzing Text...
                   </>
                 ) : (
                   <>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                     Analyze & Import Result
                   </>
                 )}
               </button>
            </div>
          )}

          {/* TAB 2: SIMULATE */}
          {activeTab === 'simulate' && (
            <form onSubmit={handleSimulateSearch} className="space-y-5">
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800/50 text-sm text-amber-800 dark:text-amber-200 flex gap-2 items-start">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                 <p className="text-xs opacity-90">
                    This tool <strong>simulates</strong> a result based on your Department and Roll. It is useful for quickly testing the calculator without typing 10 subjects manually.
                 </p>
              </div>

              {simError && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {simError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Department</label>
                   <div className="relative">
                     <select 
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 appearance-none transition-shadow"
                      required
                    >
                      <option value="">Select Department</option>
                      {Object.keys(groupedDepartments).map((category) => (
                          <optgroup key={category} label={category}>
                              {groupedDepartments[category].map(deptKey => (
                                  <option key={deptKey} value={deptKey}>
                                      {DEPARTMENTS[deptKey].name}
                                  </option>
                              ))}
                          </optgroup>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Exam Year</label>
                    <div className="relative">
                      <select 
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 appearance-none transition-shadow"
                      >
                        <option>Honours 1st Year</option>
                        <option>Honours 2nd Year</option>
                        <option>Honours 3rd Year</option>
                        <option>Honours 4th Year</option>
                      </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Roll No</label>
                     <input
                      type="number"
                      placeholder="e.g. 123456"
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                      value={roll}
                      onChange={(e) => setRoll(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:transform-none disabled:shadow-none flex justify-center items-center gap-2"
              >
                {isLoading ? (
                   <>
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                     Processing...
                   </>
                ) : 'Auto-Fill Results'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSearchModal;
