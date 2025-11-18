
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TermBlock from './components/TermBlock';
import ResultsSection from './components/ResultsSection';
import GradeScaleTable from './components/GradeScaleTable';
import SavedResults from './components/SavedResults';
import SaveModal from './components/SaveModal';
import { Term, CalculationResult, SavedCalculation } from './types';
import { DEFAULT_CREDITS, INITIAL_TERM_NAME } from './constants';
import { DEPARTMENTS } from './data/syllabus';

// Helper for generating IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [view, setView] = useState<'calculator' | 'saved'>('calculator');
  
  const [terms, setTerms] = useState<Term[]>([
    {
      id: 'term-1',
      name: INITIAL_TERM_NAME,
      courses: [
        { id: 'c-1', name: '', credits: DEFAULT_CREDITS, gradePoint: 3.00 },
        { id: 'c-2', name: '', credits: DEFAULT_CREDITS, gradePoint: 3.25 },
        { id: 'c-3', name: '', credits: DEFAULT_CREDITS, gradePoint: 3.50 },
      ]
    }
  ]);

  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [isScaleModalOpen, setScaleModalOpen] = useState(false);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // State for saved calculations
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('nu-cgpa-saved');
    if (stored) {
      try {
        setSavedCalculations(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }
  }, []);

  // Persist saved data whenever it changes
  useEffect(() => {
    localStorage.setItem('nu-cgpa-saved', JSON.stringify(savedCalculations));
  }, [savedCalculations]);

  // Calculate results automatically whenever terms change
  const result: CalculationResult = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;

    terms.forEach(term => {
      term.courses.forEach(course => {
        totalCredits += course.credits;
        totalPoints += (course.credits * course.gradePoint);
      });
    });

    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return { totalCredits, totalPoints, cgpa };
  }, [terms]);

  const addTerm = () => {
    const newTerm: Term = {
      id: generateId(),
      name: `Year ${terms.length + 1}`,
      courses: [
         { id: generateId(), name: '', credits: DEFAULT_CREDITS, gradePoint: 3.00 },
      ]
    };
    setTerms([...terms, newTerm]);
  };

  const updateTerm = (updatedTerm: Term) => {
    const updatedTerms = terms.map(t => t.id === updatedTerm.id ? updatedTerm : t);
    setTerms(updatedTerms);
  };

  const deleteTerm = (id: string) => {
    if (terms.length <= 1) return;
    setTerms(terms.filter(t => t.id !== id));
  };

  const handleLoadSyllabus = () => {
    if (!selectedDept || !selectedYear) return;

    const deptData = DEPARTMENTS[selectedDept];
    const yearCourses = deptData.years[selectedYear];

    if (yearCourses) {
      const newTerm: Term = {
        id: generateId(),
        name: `${deptData.name} - ${selectedYear}`,
        courses: yearCourses.map(c => ({
          id: generateId(),
          name: c.title,
          credits: c.credits,
          gradePoint: 3.00
        }))
      };
      setTerms([newTerm]);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // -- Save Logic --
  const handleSave = (title: string) => {
    const newItem: SavedCalculation = {
      id: generateId(),
      title,
      timestamp: Date.now(),
      terms: terms, // Store the current state of terms
      cgpa: result.cgpa,
      totalCredits: result.totalCredits,
      dept: selectedDept ? DEPARTMENTS[selectedDept].name : undefined,
      year: selectedYear || undefined
    };

    setSavedCalculations([newItem, ...savedCalculations]);
    setView('saved'); // Switch to saved view
  };

  const handleDeleteSaved = (id: string) => {
    if (window.confirm("Are you sure you want to delete this saved result?")) {
      setSavedCalculations(savedCalculations.filter(item => item.id !== id));
    }
  };

  const handleLoadSaved = (item: SavedCalculation) => {
    setTerms(item.terms);
    setView('calculator');
    // Optionally try to restore selection states if they match existing data keys, 
    // but keeping it simple for now is safer.
    setSelectedDept("");
    setSelectedYear("");
  };

  // Group departments by category
  const groupedDepartments = useMemo(() => {
    const groups: Record<string, string[]> = {};
    Object.keys(DEPARTMENTS).forEach(key => {
        const cat = DEPARTMENTS[key].category || "Other";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(key);
    });
    return groups;
  }, []);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900 font-sans text-slate-800 dark:text-gray-100 transition-colors duration-300">
        <Header toggleTheme={toggleDarkMode} isDark={darkMode} currentView={view} setView={setView} />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          
          {view === 'calculator' ? (
            <>
              {/* Hero / Syllabus Selector */}
              <div className="mb-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400">CGPA Calculator</h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Calculate your National University grades instantly.</p>
                  </div>
                  <button 
                     onClick={() => setScaleModalOpen(true)}
                     className="hidden md:flex mt-4 md:mt-0 text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:text-emerald-800 dark:hover:text-emerald-200 items-center gap-1 transition-colors"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                     NU Grading Scale
                   </button>
                </div>

                {/* Department & Year Selector */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Department</label>
                      <select 
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                        value={selectedDept}
                        onChange={(e) => {
                          setSelectedDept(e.target.value);
                          setSelectedYear(""); // Reset year when dept changes
                        }}
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
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Year / Semester</label>
                      <select 
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        disabled={!selectedDept}
                      >
                        <option value="">Select Year/Semester</option>
                        {selectedDept && DEPARTMENTS[selectedDept] && Object.keys(DEPARTMENTS[selectedDept].years).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleLoadSyllabus}
                      disabled={!selectedDept || !selectedYear}
                      className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                        (!selectedDept || !selectedYear)
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      Load Courses
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                
                {/* Left Column: Input Form */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {terms.map((term, index) => (
                    <TermBlock
                      key={term.id}
                      term={term}
                      onUpdateTerm={updateTerm}
                      onDeleteTerm={() => deleteTerm(term.id)}
                      isOnlyTerm={terms.length === 1}
                    />
                  ))}

                  <button
                    onClick={addTerm}
                    className="group w-full py-4 rounded-xl border-2 border-dashed border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <div className="bg-emerald-100 dark:bg-emerald-800 rounded-full p-1 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    Add Another Year / Semester
                  </button>

                   <div className="md:hidden text-center mt-4">
                     <button 
                       onClick={() => setScaleModalOpen(true)}
                       className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline"
                     >
                       View NU Grading Scale
                     </button>
                   </div>
                </div>

                {/* Right Column: Results (Sticky) */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                   <ResultsSection 
                      result={result} 
                      terms={terms} 
                      onSave={() => setSaveModalOpen(true)}
                   />
                </div>
              </div>
            </>
          ) : (
            <SavedResults 
              items={savedCalculations}
              onLoad={handleLoadSaved}
              onDelete={handleDeleteSaved}
              onCreateNew={() => setView('calculator')}
            />
          )}
        </main>

        <GradeScaleTable isOpen={isScaleModalOpen} onClose={() => setScaleModalOpen(false)} />
        
        <SaveModal 
          isOpen={isSaveModalOpen} 
          onClose={() => setSaveModalOpen(false)} 
          onSave={handleSave}
        />
        
        <Footer />
      </div>
    </div>
  );
};

export default App;
