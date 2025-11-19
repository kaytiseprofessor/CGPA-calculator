import { Term, Course } from '../types';
import { generateId } from '../utils';
import { NU_GRADING_SCALE } from '../constants';

/**
 * Helper to convert letter grade to point
 */
const getPointFromGrade = (grade: string): number => {
  const normalized = grade.trim().toUpperCase();
  const found = NU_GRADING_SCALE.find(g => g.grade === normalized);
  return found ? found.point : 0.00; // Default to F if unknown
};

/**
 * Parses raw text copied from the National University Result Archive.
 * 
 * Example Input Format:
 * "212501 PRINCIPLES OF ACCOUNTING 4 B+"
 * "212503 ADVANCED ACCOUNTING 4 A-"
 */
export const parseResultText = (rawText: string): Term | null => {
  if (!rawText || !rawText.trim()) return null;

  const lines = rawText.split('\n');
  const courses: Course[] = [];
  
  // Regex to find lines that end with a grade (A+, A, A-, B+, B, B-, C+, C, D, F)
  // It assumes the line format: [Code] [Name] [Credits?] [Grade]
  // Capturing groups: 
  // 1: Course Name (and code if mixed)
  // 2: Credits (Optional, single digit)
  // 3: Grade
  const lineRegex = /^(.*?)(?:\s+(\d))?\s+([A-D][+-]?|F|PASS)\s*$/i;

  lines.forEach(line => {
    const cleanLine = line.trim();
    if (!cleanLine) return;

    const match = cleanLine.match(lineRegex);
    if (match) {
      let name = match[1].trim();
      const creditsStr = match[2]; // Might be undefined
      const gradeStr = match[3];

      // Clean up name: Remove leading course codes (digits)
      name = name.replace(/^\d+\s+/, '');

      // Default credits to 4 if not found (standard for NU Honours)
      const credits = creditsStr ? parseFloat(creditsStr) : 4;
      
      const point = getPointFromGrade(gradeStr);

      // Only add if it looks like a valid course
      if (name.length > 2) {
        courses.push({
          id: generateId(),
          name: name,
          credits: credits,
          gradePoint: point
        });
      }
    }
  });

  if (courses.length === 0) return null;

  return {
    id: generateId(),
    name: "Imported Result",
    courses: courses
  };
};