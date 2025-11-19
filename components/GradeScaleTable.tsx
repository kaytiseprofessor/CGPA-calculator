
import React from 'react';
import { NU_GRADING_SCALE } from '../constants';

interface GradeScaleTableProps {
  isOpen: boolean;
  onClose: () => void;
}

const GradeScaleTable: React.FC<GradeScaleTableProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-xs overflow-hidden transition-all transform animate-fade-in-up border border-gray-200 dark:border-gray-700">
        {/* Compact Header */}
        <div className="bg-emerald-600 dark:bg-emerald-800 px-4 py-3 flex justify-between items-center">
          <h3 className="text-white font-bold text-sm">Grading Scale</h3>
          <button onClick={onClose} className="text-emerald-100 hover:text-white p-1 rounded-full hover:bg-emerald-700/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Compact Table Area */}
        <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full text-xs text-left text-gray-600 dark:text-gray-300">
                <thead className="text-[10px] text-gray-500 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-900/50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="px-3 py-2 font-bold">Range</th>
                        <th className="px-3 py-2 font-bold text-center">Grade</th>
                        <th className="px-3 py-2 font-bold text-right">Point</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                    {NU_GRADING_SCALE.map((item, index) => (
                        <tr key={item.grade} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}>
                            <td className="px-3 py-2">{item.range}</td>
                            <td className="px-3 py-2 font-bold text-emerald-600 dark:text-emerald-400 text-center">{item.grade}</td>
                            <td className="px-3 py-2 text-right">{item.point.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Compact Footer */}
        <div className="bg-gray-50 dark:bg-gray-900/30 px-4 py-2 flex justify-center">
            <button 
                onClick={onClose}
                className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 underline decoration-dashed"
            >
                Close Window
            </button>
        </div>
      </div>
    </div>
  );
};

export default GradeScaleTable;
