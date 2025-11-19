
import { Term, NuStudentInfo } from '../types';
import { generateId } from '../utils';
import { DEPARTMENTS } from '../data/syllabus';
import { NU_GRADING_SCALE } from '../constants';

/**
 * SERVICE: NU Result Archive Simulator
 * 
 * Since direct CORS requests to results.nu.ac.bd are blocked by browsers,
 * this service generates a DETERMINISTIC result based on the inputs.
 * 
 * It serves two purposes:
 * 1. Demonstrates the UI flow of "Importing".
 * 2. Acts as a "Quick Fill" feature to populate real subjects for a department
 *    so users don't have to type them manually.
 */

// Simple hash function to generate a seed from a string (e.g., Roll Number)
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Pseudo-random number generator seeded by the hash
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const searchNuResult = async (
  examType: string, 
  roll: string, 
  reg: string, 
  year: string,
  preferredDept: string = ""
): Promise<Term> => {
  
  // Simulate Network Delay for realism
  await new Promise(resolve => setTimeout(resolve, 1500));

  const seed = hashCode(roll + reg + year);
  
  // 1. Determine Department
  // If user selected one in dropdown (passed as preferredDept), use it.
  // Otherwise, pick one randomly based on Roll number hash.
  let deptKey = preferredDept;
  if (!deptKey) {
    const deptKeys = Object.keys(DEPARTMENTS);
    deptKey = deptKeys[seed % deptKeys.length];
  }

  const department = DEPARTMENTS[deptKey];
  if (!department) {
    throw new Error("Department data unavailable. Please select a department manually.");
  }

  // 2. Determine Syllabus Year based on Exam Type
  // Map "Honours 1st Year" -> "1st Year"
  // Handle professional courses (Semesters) vs General (Years)
  let targetYearKey = "";
  
  const availableYears = Object.keys(department.years);
  
  if (examType.includes("1st Year")) {
    targetYearKey = availableYears.find(y => y.includes("1st Year") || y.includes("1st Semester")) || availableYears[0];
  } else if (examType.includes("2nd Year")) {
    targetYearKey = availableYears.find(y => y.includes("2nd Year") || y.includes("3rd Semester")) || availableYears[1] || availableYears[0];
  } else if (examType.includes("3rd Year")) {
    targetYearKey = availableYears.find(y => y.includes("3rd Year")) || availableYears[2] || availableYears[0];
  } else if (examType.includes("4th Year")) {
    targetYearKey = availableYears.find(y => y.includes("4th Year")) || availableYears[3] || availableYears[0];
  } else {
    // Fallback for Masters/Degree
    targetYearKey = availableYears[availableYears.length - 1];
  }

  const syllabusCourses = department.years[targetYearKey];

  if (!syllabusCourses) {
    throw new Error(`No syllabus data found for ${department.name} - ${examType}`);
  }

  // 3. Generate Grades
  // Use the seed to assign a random grade from the grading scale to each course
  const courses = syllabusCourses.map((course, index) => {
    // Generate a random index for the grading scale (biased towards better grades)
    // 0 is A+, 9 is F
    const randomVal = seededRandom(seed + index); 
    // Skew distribution: 40% chance of top 3 grades, 10% chance of lower grades
    let gradeIndex = Math.floor(randomVal * 8); // 0 to 7 (A+ to C)
    
    const gradeData = NU_GRADING_SCALE[gradeIndex];

    return {
      id: generateId(),
      name: course.title,
      credits: course.credits,
      gradePoint: gradeData.point
    };
  });

  // 4. Construct Result
  const term: Term = {
    id: generateId(),
    name: `${department.name} - ${targetYearKey}`,
    courses: courses
  };

  return term;
};
