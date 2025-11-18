import React from 'react';
import { Course } from '../types';
import { NU_GRADING_SCALE } from '../constants';

interface CourseRowProps {
  course: Course;
  onUpdate: (updatedCourse: Course) => void;
  onDelete: () => void;
  isOnlyCourse: boolean;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, onUpdate, onDelete, isOnlyCourse }) => {
  
  const handleChange = (field: keyof Course, value: string | number) => {
    onUpdate({ ...course, [field]: value });
  };

  return (
    <div className="grid grid-cols-12 gap-2 sm:gap-3 items-center group">
      {/* Course Name */}
      <div className="col-span-6 md:col-span-6">
        <input
          type="text"
          placeholder="Subject Name (Optional)"
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
          value={course.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      {/* Credits */}
      <div className="col-span-2 md:col-span-2">
        <input
          type="number"
          min="1"
          max="10"
          step="0.5"
          placeholder="Cr."
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-lg px-1 py-2.5 text-sm text-center focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition-all font-medium"
          value={course.credits}
          onChange={(e) => handleChange('credits', parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* Grade */}
      <div className="col-span-3 md:col-span-3">
        <div className="relative">
            <select
            className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-lg pl-3 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-600 outline-none cursor-pointer transition-all font-medium"
            value={course.gradePoint}
            onChange={(e) => handleChange('gradePoint', parseFloat(e.target.value))}
            >
            {NU_GRADING_SCALE.map((scale) => (
                <option key={scale.grade} value={scale.point}>
                {scale.grade} ({scale.point.toFixed(2)})
                </option>
            ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="col-span-1 md:col-span-1 flex justify-center">
        <button
          onClick={onDelete}
          disabled={isOnlyCourse}
          className={`p-2 rounded-full transition-all ${
            isOnlyCourse 
              ? 'text-gray-200 dark:text-gray-600 cursor-not-allowed' 
              : 'text-gray-300 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
          }`}
          title="Remove Course"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseRow;