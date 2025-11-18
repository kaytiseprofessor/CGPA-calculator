import { GoogleGenAI, Type } from "@google/genai";
import { Term, CalculationResult } from "../types";

// Initialize Gemini Client
// API Key is guaranteed to be in process.env.API_KEY per system instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAcademicAdvice = async (
  result: CalculationResult,
  terms: Term[]
): Promise<{ analysis: string; tips: string[] }> => {
  
  const model = "gemini-2.5-flash";
  
  // Construct a summary of the student's performance
  let transcriptSummary = `Total CGPA: ${result.cgpa.toFixed(2)}\n`;
  transcriptSummary += `Total Credits: ${result.totalCredits}\n\nCourse Breakdown:\n`;

  terms.forEach(term => {
    transcriptSummary += `- ${term.name}:\n`;
    term.courses.forEach(course => {
      transcriptSummary += `  * ${course.name || 'Unnamed Course'}: Grade Point ${course.gradePoint} (${course.credits} credits)\n`;
    });
  });

  const prompt = `
    You are an academic advisor for a student at National University, Bangladesh. 
    Analyze the following academic performance data and provide a constructive, encouraging analysis 
    and exactly 3 actionable tips for improvement or maintenance.
    
    Data:
    ${transcriptSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: "A short paragraph analyzing the performance, identifying strengths and weaknesses.",
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 specific, actionable tips for the student.",
            },
          },
          required: ["analysis", "tips"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }
    
    const data = JSON.parse(text);
    return {
      analysis: data.analysis,
      tips: data.tips
    };

  } catch (error) {
    console.error("Error fetching advice:", error);
    return {
      analysis: "We couldn't generate a personalized analysis at this moment. Keep working hard!",
      tips: [
        "Review your difficult subjects.",
        "Manage your time effectively during exam season.",
        "Consult with your department teachers for specific guidance."
      ]
    };
  }
};
