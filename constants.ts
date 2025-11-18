import { GradePoint } from './types';

export const NU_GRADING_SCALE: GradePoint[] = [
  { grade: 'A+', point: 4.00, range: '80% - 100%' },
  { grade: 'A', point: 3.75, range: '75% - 79%' },
  { grade: 'A-', point: 3.50, range: '70% - 74%' },
  { grade: 'B+', point: 3.25, range: '65% - 69%' },
  { grade: 'B', point: 3.00, range: '60% - 64%' },
  { grade: 'B-', point: 2.75, range: '55% - 59%' },
  { grade: 'C+', point: 2.50, range: '50% - 54%' },
  { grade: 'C', point: 2.25, range: '45% - 49%' },
  { grade: 'D', point: 2.00, range: '40% - 44%' },
  { grade: 'F', point: 0.00, range: '0% - 39%' },
];

export const DEFAULT_CREDITS = 3; // Standard credit hour for many NU courses
export const INITIAL_TERM_NAME = "Year 1";
