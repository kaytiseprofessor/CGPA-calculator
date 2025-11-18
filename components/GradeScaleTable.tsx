import React from 'react';
import { NU_GRADING_SCALE } from '../constants';

interface GradeScaleTableProps {
  isOpen: boolean;
  onClose: () => void;
}

const GradeScaleTable: React.FC<GradeScaleTableProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transition-colors">
        <div className="bg-emerald-600 dark:bg-emerald-800 px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">NU Grading Scale</h3>
          <button onClick={onClose} className="text-emerald-100 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-4 py-3">Marks Range</th>
                        <th className="px-4 py-3">Letter Grade</th>
                        <th className="px-4 py-3">Grade Point</th>
                    </tr>
                </thead>
                <tbody>
                    {NU_GRADING_SCALE.map((item, index) => (
                        <tr key={item.grade} className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}`}>
                            <td className="px-4 py-3 font-medium">{item.range}</td>
                            <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-400">{item.grade}</td>
                            <td className="px-4 py-3">{item.point.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end">
            <button 
                onClick={onClose}
                className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default GradeScaleTable;