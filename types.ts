
export interface GradePoint {
  grade: string;
  point: number;
  range: string;
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  gradePoint: number; // The selected point value (e.g., 4.00, 3.75)
}

export interface Term {
  id: string;
  name: string; // e.g., "Year 1", "Semester 1"
  courses: Course[];
}

export interface CalculationResult {
  totalCredits: number;
  totalPoints: number;
  cgpa: number;
}

export interface AdviceResponse {
  analysis: string;
  tips: string[];
}

export interface SavedCalculation {
  id: string;
  title: string;
  timestamp: number;
  terms: Term[];
  cgpa: number;
  totalCredits: number;
  dept?: string;
  year?: string;
}
