
import { Term, Course, NuStudentInfo } from '../types';
import { DEFAULT_CREDITS } from '../constants';
import { generateId } from '../utils';

interface MockResponse {
  student: NuStudentInfo;
  results: {
    courseCode: string;
    courseTitle: string;
    grade: string;
    point: number;
  }[];
}

/**
 * MOCK SERVICE
 * 
 * Real-time fetching from http://results.nu.ac.bd/ is NOT possible from a client-side 
 * web application due to CORS (Cross-Origin Resource Sharing) restrictions and 
 * the lack of a public API.
 * 
 * To make this work for real, you would need a backend server (Node.js/Python) 
 * to act as a proxy/scraper.
 * 
 * This service SIMULATES a fetch to demonstrate the UI flow.
 */

const MOCK_DB: Record<string, MockResponse> = {
  "123456": {
    student: {
      name: "Estiyak Ahmed",
      fatherName: "Abdul Karim",
      motherName: "Fatema Begum",
      college: "Government Commerce College, Ctg",
      roll: "123456",
      reg: "987654321",
      session: "2020-21"
    },
    results: [
      { courseCode: "212501", courseTitle: "Principles of Accounting", grade: "A+", point: 4.00 },
      { courseCode: "212503", courseTitle: "Advanced Accounting", grade: "A-", point: 3.50 },
      { courseCode: "212505", courseTitle: "Cost Accounting", grade: "B+", point: 3.25 },
      { courseCode: "212507", courseTitle: "Management Accounting", grade: "A", point: 3.75 },
      { courseCode: "212509", courseTitle: "Business Taxation", grade: "B", point: 3.00 },
      { courseCode: "212511", courseTitle: "Auditing", grade: "A+", point: 4.00 },
    ]
  }
};

export const searchNuResult = async (
  examType: string, 
  roll: string, 
  reg: string, 
  year: string
): Promise<Term> => {
  
  // Simulate API network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real app, this would be:
  // const response = await fetch(`https://my-proxy-server.com/api/nu-result?roll=${roll}&reg=${reg}&year=${year}`);

  const data = MOCK_DB[roll];

  if (!data) {
    throw new Error("Result not found in Archive. (Try Roll: 123456 for demo)");
  }

  // Convert the "API" response to our App's Term structure
  const term: Term = {
    id: generateId(),
    name: `${examType} - ${year} (Imported)`,
    courses: data.results.map(res => ({
      id: generateId(),
      name: `${res.courseCode} - ${res.courseTitle}`,
      credits: 4, // Default credit for honours usually 4
      gradePoint: res.point
    }))
  };

  return term;
};
