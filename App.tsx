
import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TermBlock from './components/TermBlock';
import ResultsSection from './components/ResultsSection';
import ErrorBoundary from './components/ErrorBoundary';
import SyllabusSelector from './components/SyllabusSelector';
import { Term, CalculationResult, SavedCalculation } from './types';
import { DEFAULT_CREDITS, INITIAL_TERM_NAME } from './constants';
import { DEPARTMENTS } from './data/syllabus';

// Lazy load secondary components for performance
const GradeScaleTable = React.lazy(() => import('./components/GradeScaleTable'));
const SavedResults = React.lazy(() => import('./components/SavedResults'));
const SaveModal = React.lazy(() => import('./components/SaveModal'));

// Helper for generating IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  // App State
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

  const [selectedSyllabusDept, setSelectedSyllabusDept] = useState<string>("");
  const [isScaleModalOpen, setScaleModalOpen] = useState(false);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);

  // Load saved data
  useEffect(() => {
    const stored = localStorage.getItem('nu-cgpa-saved');
    if (stored) {
      try {
        setSavedCalculations(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }
    
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Persist saved data
  useEffect(() => {
    localStorage.setItem('nu-cgpa-saved', JSON.stringify(savedCalculations));
  }, [savedCalculations]);

  // Calculate results automatically
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

  // State Handlers
  const addTerm = useCallback(() => {
    let newTerm: Term;
    let nextTermName = `Year ${terms.length + 1}`;
    let syllabusCourses = null;

    // Check if a department is selected and try to find the "next" year automatically
    if (selectedSyllabusDept && DEPARTMENTS[selectedSyllabusDept]) {
      const deptData = DEPARTMENTS[selectedSyllabusDept];
      const yearKeys = Object.keys(deptData.years);
      
      // Logic: simple index-based prediction. 
      // If current length is 1, we assume we want the 2nd item in the syllabus list.
      const nextIndex = terms.length; 
      
      if (yearKeys[nextIndex]) {
        const key = yearKeys[nextIndex];
        nextTermName = key; // e.g., "2nd Year" or "2nd Year - 1st Semester"
        syllabusCourses = deptData.years[key];
      }
    }

    if (syllabusCourses) {
      newTerm = {
        id: generateId(),
        name: nextTermName,
        courses: syllabusCourses.map(c => ({
          id: generateId(),
          name: c.title,
          credits: c.credits,
          gradePoint: 3.00
        }))
      };
    } else {
      // Default empty term behavior
      newTerm = {
        id: generateId(),
        name: nextTermName,
        courses: [
           { id: generateId(), name: '', credits: DEFAULT_CREDITS, gradePoint: 3.00 },
        ]
      };
    }

    setTerms(prev => [...prev, newTerm]);
  }, [terms, selectedSyllabusDept]);

  const updateTerm = useCallback((updatedTerm: Term) => {
    setTerms(prev => prev.map(t => t.id === updatedTerm.id ? updatedTerm : t));
  }, []);

  const deleteTerm = useCallback((id: string) => {
    setTerms(prev => {
      if (prev.length <= 1) return prev;
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const handleSyllabusLoad = useCallback((newTerm: Term) => {
    setTerms([newTerm]);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // -- Save Logic --
  const handleSave = useCallback((title: string) => {
    const newItem: SavedCalculation = {
      id: generateId(),
      title,
      timestamp: Date.now(),
      terms: terms,
      cgpa: result.cgpa,
      totalCredits: result.totalCredits,
      dept: selectedSyllabusDept ? DEPARTMENTS[selectedSyllabusDept].name : undefined
    };

    setSavedCalculations(prev => [newItem, ...prev]);
    setView('saved');
  }, [terms, result, selectedSyllabusDept]);

  const handleDeleteSaved = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this saved result?")) {
      setSavedCalculations(prev => prev.filter(item => item.id !== id));
    }
  }, []);

  const handleLoadSaved = useCallback((item: SavedCalculation) => {
    setTerms(item.terms);
    // Try to restore the selected dept if we can infer it, otherwise clear it
    // We don't have dept ID stored explicitly in saved item types in this version, 
    // but we can match name or just leave it for manual re-selection if needed.
    // For now, we won't force the dropdown to change to avoid complexity with missing IDs.
    setView('calculator');
  }, []);

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex justify-center py-12">
      <svg className="animate-spin h-8 w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900 font-sans text-slate-800 dark:text-gray-100 transition-colors duration-300">
          <Header 
            toggleTheme={toggleDarkMode} 
            isDark={darkMode} 
            currentView={view} 
            setView={setView} 
          />

          <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
            {view === 'calculator' ? (
              <>
                {/* Hero */}
                <div className="mb-6 animate-fade-in">
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

                  <SyllabusSelector 
                    selectedDept={selectedSyllabusDept}
                    onDeptChange={setSelectedSyllabusDept}
                    onLoadSyllabus={handleSyllabusLoad} 
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                  {/* Input Form */}
                  <div className="lg:col-span-8 space-y-6">
                    {terms.map((term) => (
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
                      {selectedSyllabusDept ? 'Add Next Year / Semester Automatically' : 'Add Another Year / Semester'}
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

                  {/* Results (Sticky) */}
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
              <Suspense fallback={<LoadingSpinner />}>
                <SavedResults 
                  items={savedCalculations}
                  onLoad={handleLoadSaved}
                  onDelete={handleDeleteSaved}
                  onCreateNew={() => setView('calculator')}
                />
              </Suspense>
            )}
          </main>

          <Suspense fallback={null}>
            <GradeScaleTable isOpen={isScaleModalOpen} onClose={() => setScaleModalOpen(false)} />
          </Suspense>
          
          <Suspense fallback={null}>
            <SaveModal 
              isOpen={isSaveModalOpen} 
              onClose={() => setSaveModalOpen(false)} 
              onSave={handleSave}
            />
          </Suspense>
          
          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
