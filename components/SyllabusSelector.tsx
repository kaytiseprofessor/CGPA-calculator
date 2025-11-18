
import React, { useState, useMemo } from 'react';
import { DEPARTMENTS } from '../data/syllabus';
import { Term } from '../types';
import { generateId } from '../utils';

interface SyllabusSelectorProps {
  selectedDept: string;
  onDeptChange: (dept: string) => void;
  onLoadSyllabus: (newTerm: Term) => void;
}

const SyllabusSelector: React.FC<SyllabusSelectorProps> = React.memo(({ selectedDept, onDeptChange, onLoadSyllabus }) => {
  const [selectedYear, setSelectedYear] = useState<string>("");

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

  const handleLoad = () => {
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
      onLoadSyllabus(newTerm);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 transition-colors animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Department</label>
          <select 
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer"
            value={selectedDept}
            onChange={(e) => {
              onDeptChange(e.target.value);
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
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
          onClick={handleLoad}
          disabled={!selectedDept || !selectedYear}
          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
            (!selectedDept || !selectedYear)
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transform active:scale-95'
          }`}
        >
          Load Courses
        </button>
      </div>
    </div>
  );
});

export default SyllabusSelector;
