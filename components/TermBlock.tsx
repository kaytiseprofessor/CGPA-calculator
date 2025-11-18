
import React, { useCallback, useMemo } from 'react';
import { Term, Course } from '../types';
import CourseRow from './CourseRow';
import { DEFAULT_CREDITS } from '../constants';
import { generateId } from '../utils';

interface TermBlockProps {
  term: Term;
  onUpdateTerm: (updatedTerm: Term) => void;
  onDeleteTerm: () => void;
  isOnlyTerm: boolean;
}

const TermBlock: React.FC<TermBlockProps> = React.memo(({ term, onUpdateTerm, onDeleteTerm, isOnlyTerm }) => {

  const addCourse = useCallback(() => {
    const newCourse: Course = {
      id: generateId(),
      name: '',
      credits: DEFAULT_CREDITS,
      gradePoint: 3.00, // Default B
    };
    onUpdateTerm({ ...term, courses: [...term.courses, newCourse] });
  }, [term, onUpdateTerm]);

  const updateCourse = useCallback((updatedCourse: Course) => {
    const updatedCourses = term.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    onUpdateTerm({ ...term, courses: updatedCourses });
  }, [term, onUpdateTerm]);

  const deleteCourse = useCallback((courseId: string) => {
    if (term.courses.length <= 1) return;

    // Confirmation dialog to prevent accidental deletion
    if (window.confirm("Are you sure you want to remove this course?")) {
      const updatedCourses = term.courses.filter(c => c.id !== courseId);
      onUpdateTerm({ ...term, courses: updatedCourses });
    }
  }, [term, onUpdateTerm]);

  const handleDeleteTerm = useCallback(() => {
    if (isOnlyTerm) return;

    // Confirmation dialog for deleting the whole term
    if (window.confirm(`Are you sure you want to delete "${term.name}" and all its courses?`)) {
      onDeleteTerm();
    }
  }, [isOnlyTerm, onDeleteTerm, term.name]);

  const termGpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    term.courses.forEach(c => {
      totalPoints += c.gradePoint * c.credits;
      totalCredits += c.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  }, [term.courses]);

  const gpaValue = parseFloat(termGpa);
  
  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.75) return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
    if (gpa >= 3.00) return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
    if (gpa >= 2.25) return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
    return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3 flex-grow">
          <div className={`hidden sm:flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold border ${getGpaColor(gpaValue)}`}>
            {termGpa}
          </div>
          <input
            type="text"
            value={term.name}
            onChange={(e) => onUpdateTerm({ ...term, name: e.target.value })}
            className="bg-transparent font-bold text-lg text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1 outline-none border border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors w-full sm:w-auto"
            placeholder="Term Name (e.g. Year 1)"
          />
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <span className={`sm:hidden text-xs font-bold px-2 py-1 rounded-full border ${getGpaColor(gpaValue)}`}>
            GPA: {termGpa}
          </span>
          <button
            onClick={handleDeleteTerm}
            disabled={isOnlyTerm}
            className={`p-2 rounded-lg transition-colors ${
              isOnlyTerm 
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
            }`}
            title="Remove Term"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-12 gap-3 mb-3 px-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          <div className="col-span-6 md:col-span-6 pl-1">Course</div>
          <div className="col-span-2 md:col-span-2 text-center">Credits</div>
          <div className="col-span-3 md:col-span-3">Grade</div>
          <div className="col-span-1 md:col-span-1"></div>
        </div>

        <div className="space-y-2">
          {term.courses.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
              onUpdate={updateCourse}
              onDelete={() => deleteCourse(course.id)}
              isOnlyCourse={term.courses.length === 1}
            />
          ))}
        </div>

        <button
          onClick={addCourse}
          className="mt-4 w-full py-2.5 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Course
        </button>
      </div>
    </div>
  );
});

export default TermBlock;
