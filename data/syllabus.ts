
export interface SyllabusCourse {
  title: string;
  credits: number;
}

export interface YearSyllabus {
  [year: string]: SyllabusCourse[];
}

export interface DepartmentData {
  name: string;
  category: string;
  years: YearSyllabus;
}

export const DEPARTMENTS: Record<string, DepartmentData> = {
  // --- Engineering & Professional ---
  "CSE": {
    name: "CSE (Professional)",
    category: "Engineering & Professional",
    years: {
      "1st Year - 1st Semester": [
        { title: "Structured Programming Language", credits: 3 },
        { title: "Electrical & Electronic Circuits", credits: 3 },
        { title: "Calculus", credits: 3 },
        { title: "Physics", credits: 3 },
        { title: "English", credits: 3 },
      ],
      "1st Year - 2nd Semester": [
        { title: "Data Structure", credits: 3 },
        { title: "Discrete Mathematics", credits: 3 },
        { title: "Digital Logic Design", credits: 3 },
        { title: "Statistics for Engineers", credits: 3 },
      ],
      "2nd Year - 1st Semester": [
        { title: "Object Oriented Programming", credits: 3 },
        { title: "Operating Systems", credits: 3 },
        { title: "Math for CSE", credits: 3 },
        { title: "Electronic Devices", credits: 3 },
      ],
      "2nd Year - 2nd Semester": [
        { title: "Algorithm Design", credits: 3 },
        { title: "Database Management Systems", credits: 3 },
        { title: "Computer Architecture", credits: 3 },
        { title: "Data Communication", credits: 3 },
      ],
      "3rd Year - 1st Semester": [
        { title: "Theory of Computation", credits: 3 },
        { title: "Microprocessor and Assembly", credits: 3 },
        { title: "Software Engineering", credits: 3 },
        { title: "Computer Networks", credits: 3 },
      ],
      "3rd Year - 2nd Semester": [
        { title: "Artificial Intelligence", credits: 3 },
        { title: "Compiler Design", credits: 3 },
        { title: "Computer Graphics", credits: 3 },
        { title: "Web Engineering", credits: 3 },
      ],
      "4th Year - 1st Semester": [
        { title: "System Analysis & Design", credits: 3 },
        { title: "Computer Peripherals", credits: 3 },
        { title: "E-Commerce", credits: 3 },
        { title: "Project Work I", credits: 3 },
      ],
      "4th Year - 2nd Semester": [
        { title: "Network Security", credits: 3 },
        { title: "Parallel Processing", credits: 3 },
        { title: "Project Work II", credits: 3 },
        { title: "Viva-Voce", credits: 1.5 },
      ]
    }
  },
  "BBA": {
    name: "BBA (Professional)",
    category: "Engineering & Professional",
    years: {
      "1st Year - 1st Semester": [
        { title: "Introduction to Business", credits: 3 },
        { title: "Business Communication", credits: 3 },
        { title: "Computer Fundamentals", credits: 3 },
        { title: "Business Mathematics", credits: 3 },
      ],
      "1st Year - 2nd Semester": [
        { title: "Principles of Accounting", credits: 3 },
        { title: "Principles of Management", credits: 3 },
        { title: "Micro Economics", credits: 3 },
        { title: "Viva-Voce", credits: 1 },
      ],
       "2nd Year - 1st Semester": [
        { title: "Business Statistics - I", credits: 3 },
        { title: "Macro Economics", credits: 3 },
        { title: "Principles of Finance", credits: 3 },
        { title: "Principles of Marketing", credits: 3 },
      ],
       "2nd Year - 2nd Semester": [
        { title: "Business Statistics - II", credits: 3 },
        { title: "Organizational Behavior", credits: 3 },
        { title: "Business Law", credits: 3 },
        { title: "Taxation in Bangladesh", credits: 3 },
      ],
       "3rd Year - 1st Semester": [
        { title: "Cost Accounting", credits: 3 },
        { title: "Auditing", credits: 3 },
        { title: "Insurance and Risk Management", credits: 3 },
        { title: "Entrepreneurship Development", credits: 3 },
      ],
       "3rd Year - 2nd Semester": [
        { title: "Management Accounting", credits: 3 },
        { title: "Financial Management", credits: 3 },
        { title: "Marketing Management", credits: 3 },
        { title: "Human Resource Management", credits: 3 },
      ],
       "4th Year - 1st Semester": [
        { title: "Strategic Management", credits: 3 },
        { title: "Management Information System", credits: 3 },
        { title: "Operations Management", credits: 3 },
        { title: "International Business", credits: 3 },
      ],
       "4th Year - 2nd Semester": [
        { title: "Major Course I", credits: 3 },
        { title: "Major Course II", credits: 3 },
        { title: "Internship & Defense", credits: 3 },
        { title: "Viva-Voce", credits: 1.5 },
      ]
    }
  },

  // --- Business Administration ---
  "ACCOUNTING": {
    name: "Accounting",
    category: "Business Administration",
    years: {
      "1st Year": [
        { title: "Principles of Accounting", credits: 4 },
        { title: "Principles of Finance", credits: 4 },
        { title: "Principles of Marketing", credits: 4 },
        { title: "Principles of Management", credits: 4 },
        { title: "Micro Economics", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Intermediate Accounting", credits: 4 },
        { title: "Business Mathematics", credits: 4 },
        { title: "Business Statistics", credits: 4 },
        { title: "Macro Economics", credits: 4 },
        { title: "Taxation in Bangladesh", credits: 4 },
        { title: "Business Communication", credits: 4 },
      ],
      "3rd Year": [
        { title: "Audit and Assurance", credits: 4 },
        { title: "Advanced Accounting-I", credits: 4 },
        { title: "Cost Accounting", credits: 4 },
        { title: "Management Accounting", credits: 4 },
        { title: "Business and Commercial Laws", credits: 4 },
        { title: "Financial Management", credits: 4 },
        { title: "Banking and Insurance", credits: 4 },
      ],
      "4th Year": [
        { title: "Accounting Theory", credits: 4 },
        { title: "Advanced Auditing", credits: 4 },
        { title: "Accounting Information Systems", credits: 4 },
        { title: "Organizational Behavior", credits: 4 },
        { title: "Corporate Law and Practices", credits: 4 },
        { title: "Working Capital Management", credits: 4 },
        { title: "Advanced Accounting-II", credits: 4 },
        { title: "Investment Analysis & Portfolio Mgmt.", credits: 4 },
        { title: "Research Methodology", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "FINANCE": {
    name: "Finance & Banking",
    category: "Business Administration",
    years: {
      "1st Year": [
        { title: "Principles of Accounting", credits: 4 },
        { title: "Principles of Finance", credits: 4 },
        { title: "Principles of Management", credits: 4 },
        { title: "Principles of Marketing", credits: 4 },
        { title: "Micro Economics", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Law and Practice of Banking", credits: 4 },
        { title: "Computer in Business", credits: 4 },
        { title: "Business Mathematics", credits: 4 },
        { title: "Business Statistics", credits: 4 },
        { title: "Macro Economics", credits: 4 },
        { title: "Legal Aspects of Business", credits: 4 },
      ],
      "3rd Year": [
        { title: "Financial Management", credits: 4 },
        { title: "Central Banking", credits: 4 },
        { title: "Portfolio Management", credits: 4 },
        { title: "Financial Analysis", credits: 4 },
        { title: "Islamic Banking", credits: 4 },
        { title: "Public Finance", credits: 4 },
        { title: "Auditing", credits: 4 },
        { title: "Business Communication", credits: 4 },
      ],
      "4th Year": [
        { title: "International Financial Management", credits: 4 },
        { title: "Financial Markets & Institutions", credits: 4 },
        { title: "Bank Management", credits: 4 },
        { title: "SME Banking", credits: 4 },
        { title: "Investment Banking", credits: 4 },
        { title: "E-Banking & Risk Management", credits: 4 },
        { title: "Research Methodology", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "MARKETING": {
    name: "Marketing",
    category: "Business Administration",
    years: {
      "1st Year": [
        { title: "Principles of Accounting", credits: 4 },
        { title: "Principles of Finance", credits: 4 },
        { title: "Principles of Management", credits: 4 },
        { title: "Principles of Marketing", credits: 4 },
        { title: "Micro Economics", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Consumer Behavior", credits: 4 },
        { title: "Business Mathematics", credits: 4 },
        { title: "Business Statistics", credits: 4 },
        { title: "Macro Economics", credits: 4 },
        { title: "Business Communication", credits: 4 },
        { title: "Legal Aspects of Marketing", credits: 4 },
      ],
      "3rd Year": [
        { title: "Marketing Management", credits: 4 },
        { title: "Financial Management", credits: 4 },
        { title: "Advertising & Promotion", credits: 4 },
        { title: "Business Taxation", credits: 4 },
        { title: "Organizational Behavior", credits: 4 },
        { title: "Agricultural Marketing", credits: 4 },
        { title: "Supply Chain Management", credits: 4 },
        { title: "Introduction to Computer", credits: 4 },
      ],
      "4th Year": [
        { title: "Marketing Research", credits: 4 },
        { title: "Service Marketing", credits: 4 },
        { title: "International Marketing", credits: 4 },
        { title: "Brand Management", credits: 4 },
        { title: "Strategic Marketing", credits: 4 },
        { title: "Sales Management", credits: 4 },
        { title: "E-Marketing", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "MANAGEMENT": {
    name: "Management",
    category: "Business Administration",
    years: {
      "1st Year": [
        { title: "Principles of Accounting", credits: 4 },
        { title: "Principles of Finance", credits: 4 },
        { title: "Principles of Management", credits: 4 },
        { title: "Principles of Marketing", credits: 4 },
        { title: "Micro Economics", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Organizational Behavior", credits: 4 },
        { title: "Business Mathematics", credits: 4 },
        { title: "Business Statistics", credits: 4 },
        { title: "Macro Economics", credits: 4 },
        { title: "Taxation in Bangladesh", credits: 4 },
        { title: "Business Communication", credits: 4 },
      ],
      "3rd Year": [
        { title: "Operations Management", credits: 4 },
        { title: "Business Law", credits: 4 },
        { title: "Introduction to Computer", credits: 4 },
        { title: "Financial Management", credits: 4 },
        { title: "Insurance & Risk Management", credits: 4 },
        { title: "Management Accounting", credits: 4 },
        { title: "Company Law", credits: 4 },
        { title: "Entrepreneurship", credits: 4 },
      ],
      "4th Year": [
        { title: "Strategic Management", credits: 4 },
        { title: "Investment Management", credits: 4 },
        { title: "Human Resource Management", credits: 4 },
        { title: "International Business", credits: 4 },
        { title: "Bangladesh Economy", credits: 4 },
        { title: "Industrial Relations", credits: 4 },
        { title: "Project Management", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },

  // --- Arts & Humanities ---
  "BANGLA": {
    name: "Bangla",
    category: "Arts & Humanities",
    years: {
      "1st Year": [
        { title: "History of Bangla Literature (Ancient & Medieval)", credits: 4 },
        { title: "History of Bangla Language & Functional Bangla", credits: 4 },
        { title: "Bangla Poetry (Ancient & Medieval)", credits: 4 },
        { title: "Bangla Novel-1", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
        { title: "Political Theory / Sociology", credits: 4 },
      ],
      "2nd Year": [
        { title: "History of Bangla Literature (Modern Age 1801-1947)", credits: 4 },
        { title: "Bangla Poetry (Modern Age)", credits: 4 },
        { title: "Bangla Drama-1", credits: 4 },
        { title: "Rhymes and Folk Literature", credits: 4 },
        { title: "Introduction to English Literature", credits: 4 },
        { title: "Political Org / Society in Bangladesh", credits: 4 },
      ],
      "3rd Year": [
        { title: "Bangla Literary Theory & Rhetoric", credits: 4 },
        { title: "Bangla Criticism & Essay", credits: 4 },
        { title: "Bangla Novel-2", credits: 4 },
        { title: "Bangla Short Stories-1", credits: 4 },
        { title: "Tagore Literature", credits: 4 },
        { title: "Nazrul Literature", credits: 4 },
        { title: "Phonetics & Linguistics", credits: 4 },
        { title: "Literature of Bangladesh (Poetry)", credits: 4 },
      ],
      "4th Year": [
        { title: "Bangla Drama-2", credits: 4 },
        { title: "Bangla Novel-3", credits: 4 },
        { title: "Bangla Short Stories-2", credits: 4 },
        { title: "Comparative Literature", credits: 4 },
        { title: "Literature of Bangladesh (Fiction)", credits: 4 },
        { title: "Literature of Bangladesh (Drama & Essay)", credits: 4 },
        { title: "Classical Literature (Translated)", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "ENGLISH": {
    name: "English",
    category: "Arts & Humanities",
    years: {
      "1st Year": [
        { title: "Introduction to Poetry", credits: 4 },
        { title: "Introduction to Prose", credits: 4 },
        { title: "Introduction to Fiction and Non-Fiction", credits: 4 },
        { title: "Reading and Writing Skills", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
        { title: "Introduction to Sociology/Political Science", credits: 4 },
      ],
      "2nd Year": [
        { title: "Introduction to Drama", credits: 4 },
        { title: "Romantic Poetry", credits: 4 },
        { title: "Advanced Reading and Writing", credits: 4 },
        { title: "History of English Literature", credits: 4 },
        { title: "Introduction to Philosophy", credits: 4 },
        { title: "Political Theory", credits: 4 },
      ],
      "3rd Year": [
        { title: "Elizabethan and Jacobean Drama", credits: 4 },
        { title: "16th and 17th Century Poetry", credits: 4 },
        { title: "17th Century Prose", credits: 4 },
        { title: "Restoration and 18th Century Fiction", credits: 4 },
        { title: "Restoration and 18th Century Poetry", credits: 4 },
        { title: "Victorian Poetry", credits: 4 },
        { title: "Introduction to Literary Criticism", credits: 4 },
        { title: "Introduction to Linguistics", credits: 4 },
      ],
      "4th Year": [
        { title: "19th Century Novel", credits: 4 },
        { title: "20th Century Poetry", credits: 4 },
        { title: "Modern Drama", credits: 4 },
        { title: "20th Century Novel", credits: 4 },
        { title: "American Literature", credits: 4 },
        { title: "Classics in Translation", credits: 4 },
        { title: "Literary Criticism", credits: 4 },
        { title: "Continental Literature", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "HISTORY": {
    name: "History",
    category: "Arts & Humanities",
    years: {
      "1st Year": [
        { title: "History of Bengal (Ancient to 1204)", credits: 4 },
        { title: "History of South Asia (Ancient to 1526)", credits: 4 },
        { title: "History of Europe (1453-1789)", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
        { title: "Introduction to Pol. Science / Sociology", credits: 4 },
        { title: "Introduction to Economics / Psychology", credits: 4 },
      ],
      "2nd Year": [
        { title: "History of Bengal (1204-1765)", credits: 4 },
        { title: "History of South Asia (1526-1757)", credits: 4 },
        { title: "History of Europe (1789-1919)", credits: 4 },
        { title: "History of England (1485-1914)", credits: 4 },
        { title: "Fundamentals of Sociology / Pol. Science", credits: 4 },
        { title: "Bangladesh Economy / Psychology", credits: 4 },
      ],
      "3rd Year": [
        { title: "History of Bengal (1765-1905)", credits: 4 },
        { title: "History of South Asia (1757-1857)", credits: 4 },
        { title: "History of Europe (1919-1939)", credits: 4 },
        { title: "History of United States (1776-1945)", credits: 4 },
        { title: "History of China & Japan", credits: 4 },
        { title: "History of Middle East (1258-1924)", credits: 4 },
        { title: "History of Russia & Soviet Union", credits: 4 },
        { title: "Introduction to Archaeology", credits: 4 },
      ],
      "4th Year": [
        { title: "History of Bengal (1905-1971)", credits: 4 },
        { title: "History of South Asia (1857-1947)", credits: 4 },
        { title: "History of Bangladesh (1971-2000)", credits: 4 },
        { title: "International Relations (1919-1945)", credits: 4 },
        { title: "History of West Asia (1919-Present)", credits: 4 },
        { title: "History of Resistance Movement", credits: 4 },
        { title: "Constitutional History of India (1773-1947)", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "ISLAMIC_HISTORY": {
    name: "Islamic History & Culture",
    category: "Arts & Humanities",
    years: {
      "1st Year": [
        { title: "History of Muslims (570-750 AD)", credits: 4 },
        { title: "History of Muslims in Spain (710-1492)", credits: 4 },
        { title: "History of Ancient Bengal", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
        { title: "Political Theory", credits: 4 },
        { title: "Introduction to Philosophy", credits: 4 },
      ],
      "2nd Year": [
        { title: "History of Muslims (750-1258 AD)", credits: 4 },
        { title: "History of Muslim Administration", credits: 4 },
        { title: "History of Muslims in India (712-1526)", credits: 4 },
        { title: "History of Medieval Bengal (1204-1765)", credits: 4 },
        { title: "Political Organization / Social Work", credits: 4 },
        { title: "General Economics / Psychology", credits: 4 },
      ],
      "3rd Year": [
        { title: "History of the Mughals (1526-1858)", credits: 4 },
        { title: "History of the Ottomans (1299-1924)", credits: 4 },
        { title: "History of Civilization", credits: 4 },
        { title: "History of Modern Europe", credits: 4 },
        { title: "History of Modern Muslim States", credits: 4 },
        { title: "Muslim Painting and Calligraphy", credits: 4 },
        { title: "Muslim Philosophy and Science", credits: 4 },
        { title: "History of Bengal (1765-1905)", credits: 4 },
      ],
      "4th Year": [
        { title: "History of Muslim Architecture", credits: 4 },
        { title: "History of Bengal (1905-1971)", credits: 4 },
        { title: "History of Middle East (1919-Present)", credits: 4 },
        { title: "History of Muslims in South Asia (1858-1947)", credits: 4 },
        { title: "History of Islam in Africa", credits: 4 },
        { title: "Development of Religious Principles", credits: 4 },
        { title: "History of Islamic Art & Archaeology", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },

  // --- Social Science ---
  "ECONOMICS": {
    name: "Economics",
    category: "Social Science",
    years: {
      "1st Year": [
        { title: "Micro Economics-I", credits: 4 },
        { title: "Macro Economics-I", credits: 4 },
        { title: "Basic Mathematics", credits: 4 },
        { title: "Basic Statistics", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
        { title: "Introduction to Sociology / Social Work", credits: 4 },
      ],
      "2nd Year": [
        { title: "Micro Economics-II", credits: 4 },
        { title: "Macro Economics-II", credits: 4 },
        { title: "Mathematical Economics", credits: 4 },
        { title: "Agricultural Economics", credits: 4 },
        { title: "Computer and IT", credits: 4 },
        { title: "Political Organization / Sociology", credits: 4 },
      ],
      "3rd Year": [
        { title: "Intermediate Macro Economics", credits: 4 },
        { title: "Statistics for Economics", credits: 4 },
        { title: "Bangladesh Economy-I", credits: 4 },
        { title: "International Economics-I", credits: 4 },
        { title: "Public Finance", credits: 4 },
        { title: "Urban Economics", credits: 4 },
        { title: "Economics of Development", credits: 4 },
        { title: "Bank and Financial Institutions", credits: 4 },
      ],
      "4th Year": [
        { title: "Money Banking and Finance", credits: 4 },
        { title: "International Economics-II", credits: 4 },
        { title: "Bangladesh Economy-II", credits: 4 },
        { title: "History of Economic Thought", credits: 4 },
        { title: "Research Methodology", credits: 4 },
        { title: "Industrial Economics", credits: 4 },
        { title: "Environmental & Resource Economics", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "POLITICAL_SCIENCE": {
    name: "Political Science",
    category: "Social Science",
    years: {
      "1st Year": [
        { title: "Political Institutions and Organizations", credits: 4 },
        { title: "Western Political Thought", credits: 4 },
        { title: "Principles of Economics", credits: 4 },
        { title: "Principles of Sociology", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
        { title: "Introduction to Social Work", credits: 4 },
      ],
      "2nd Year": [
        { title: "Political and Constitutional Development in Bangladesh", credits: 4 },
        { title: "Oriental Political Thought", credits: 4 },
        { title: "Sociology of Bangladesh", credits: 4 },
        { title: "Bangladesh Economy", credits: 4 },
        { title: "Women in Politics and Development", credits: 4 },
        { title: "Fundamentals of International Politics", credits: 4 },
      ],
      "3rd Year": [
        { title: "Political Thought (Modern)", credits: 4 },
        { title: "Political Sociology", credits: 4 },
        { title: "Public Administration in Bangladesh", credits: 4 },
        { title: "International Politics", credits: 4 },
        { title: "Foreign Relations of Bangladesh", credits: 4 },
        { title: "Peace and Conflict Studies", credits: 4 },
        { title: "Public Policy", credits: 4 },
        { title: "Local Government and Rural Politics in Bangladesh", credits: 4 },
      ],
      "4th Year": [
        { title: "Political Theories", credits: 4 },
        { title: "Constitutional Process in Bangladesh", credits: 4 },
        { title: "Politics of South Asia", credits: 4 },
        { title: "Environment and Politics", credits: 4 },
        { title: "Globalization and Regionalism", credits: 4 },
        { title: "Human Rights", credits: 4 },
        { title: "Governance and Good Governance", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "SOCIOLOGY": {
    name: "Sociology",
    category: "Social Science",
    years: {
      "1st Year": [
        { title: "Introductory Sociology", credits: 4 },
        { title: "Social History of Bengal", credits: 4 },
        { title: "Intro to Pol. Science", credits: 4 },
        { title: "Principles of Economics", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
        { title: "Intro to Social Work / Psychology", credits: 4 },
      ],
      "2nd Year": [
        { title: "Classical Sociological Theory", credits: 4 },
        { title: "Social Psychology", credits: 4 },
        { title: "Intro to Anthropology", credits: 4 },
        { title: "Bangladesh Society and Culture", credits: 4 },
        { title: "Pol. Organization / Social Welfare", credits: 4 },
        { title: "Bangladesh Economy / Stats", credits: 4 },
      ],
      "3rd Year": [
        { title: "Modern Sociological Theory", credits: 4 },
        { title: "Rural Sociology", credits: 4 },
        { title: "Urban Sociology", credits: 4 },
        { title: "Social Structure of Bangladesh", credits: 4 },
        { title: "Sociology of Religion", credits: 4 },
        { title: "Sociology of Gender", credits: 4 },
        { title: "Social Inequality", credits: 4 },
        { title: "Demography", credits: 4 },
      ],
      "4th Year": [
        { title: "Social Change", credits: 4 },
        { title: "Sociology of Development", credits: 4 },
        { title: "Research Methodology", credits: 4 },
        { title: "Sociology of Environment", credits: 4 },
        { title: "Industrial Sociology", credits: 4 },
        { title: "Sociology of Health", credits: 4 },
        { title: "Deviance and Crime", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },

  // --- Science ---
  "PHYSICS": {
    name: "Physics",
    category: "Science",
    years: {
      "1st Year": [
        { title: "Mechanics", credits: 4 },
        { title: "Properties of Matter", credits: 4 },
        { title: "Waves and Optics", credits: 4 },
        { title: "Fundamentals of Mathematics", credits: 4 },
        { title: "Calculus-I", credits: 4 },
        { title: "Chemistry-I", credits: 4 },
      ],
      "2nd Year": [
        { title: "Electricity and Magnetism", credits: 4 },
        { title: "Thermal Physics", credits: 4 },
        { title: "Calculus-II", credits: 4 },
        { title: "Chemistry-II", credits: 4 },
        { title: "Environmental Science", credits: 4 },
        { title: "Practical Physics-II", credits: 4 },
      ],
      "3rd Year": [
        { title: "Mathematical Physics", credits: 4 },
        { title: "Quantum Mechanics-I", credits: 4 },
        { title: "Solid State Physics-I", credits: 4 },
        { title: "Nuclear Physics-I", credits: 4 },
        { title: "Atomic and Molecular Physics", credits: 4 },
        { title: "Electronics-I", credits: 4 },
        { title: "Classical Electrodynamics", credits: 4 },
        { title: "Practical Physics-III", credits: 4 },
      ],
      "4th Year": [
        { title: "Quantum Mechanics-II", credits: 4 },
        { title: "Solid State Physics-II", credits: 4 },
        { title: "Nuclear Physics-II", credits: 4 },
        { title: "Electronics-II", credits: 4 },
        { title: "Statistical Mechanics", credits: 4 },
        { title: "Computer Application", credits: 4 },
        { title: "Theory of Relativity", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "CHEMISTRY": {
    name: "Chemistry",
    category: "Science",
    years: {
      "1st Year": [
        { title: "Fundamentals of Physical Chemistry", credits: 4 },
        { title: "Fundamentals of Organic Chemistry", credits: 4 },
        { title: "Fundamentals of Inorganic Chemistry", credits: 4 },
        { title: "Physics-I", credits: 4 },
        { title: "Calculus-I", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Physical Chemistry-II", credits: 4 },
        { title: "Organic Chemistry-II", credits: 4 },
        { title: "Inorganic Chemistry-II", credits: 4 },
        { title: "Physics-II", credits: 4 },
        { title: "Calculus-II", credits: 4 },
        { title: "Practical Chemistry-II", credits: 4 },
      ],
      "3rd Year": [
        { title: "Physical Chemistry-III", credits: 4 },
        { title: "Organic Chemistry-III", credits: 4 },
        { title: "Inorganic Chemistry-III", credits: 4 },
        { title: "Analytical Chemistry", credits: 4 },
        { title: "Industrial Chemistry", credits: 4 },
        { title: "Environmental Chemistry", credits: 4 },
        { title: "Agricultural Chemistry", credits: 4 },
        { title: "Practical Chemistry-III", credits: 4 },
      ],
      "4th Year": [
        { title: "Advanced Physical Chemistry", credits: 4 },
        { title: "Advanced Organic Chemistry", credits: 4 },
        { title: "Advanced Inorganic Chemistry", credits: 4 },
        { title: "Nuclear Chemistry", credits: 4 },
        { title: "Stereochemistry & Reaction Mechanism", credits: 4 },
        { title: "Spectroscopy", credits: 4 },
        { title: "Polymer Chemistry", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "MATHEMATICS": {
    name: "Mathematics",
    category: "Science",
    years: {
      "1st Year": [
        { title: "Fundamentals of Mathematics", credits: 4 },
        { title: "Calculus-I", credits: 4 },
        { title: "Linear Algebra", credits: 4 },
        { title: "Analytic Geometry", credits: 4 },
        { title: "Physics-I", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Calculus-II", credits: 4 },
        { title: "Ordinary Differential Equations", credits: 4 },
        { title: "Computer Programming (Fortran)", credits: 4 },
        { title: "Physics-II", credits: 4 },
        { title: "Statistics", credits: 4 },
        { title: "Math Lab (Practical)", credits: 4 },
      ],
      "3rd Year": [
        { title: "Real Analysis", credits: 4 },
        { title: "Complex Analysis", credits: 4 },
        { title: "Numerical Analysis", credits: 4 },
        { title: "Abstract Algebra", credits: 4 },
        { title: "Mechanics", credits: 4 },
        { title: "Linear Programming", credits: 4 },
        { title: "Differential Geometry", credits: 4 },
        { title: "Math Lab-II", credits: 4 },
      ],
      "4th Year": [
        { title: "Theory of Numbers", credits: 4 },
        { title: "Topology", credits: 4 },
        { title: "Functional Analysis", credits: 4 },
        { title: "Partial Differential Equations", credits: 4 },
        { title: "Hydrodynamics", credits: 4 },
        { title: "Discrete Mathematics", credits: 4 },
        { title: "Tensor Analysis", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "BOTANY": {
    name: "Botany",
    category: "Science",
    years: {
      "1st Year": [
        { title: "Microbiology", credits: 4 },
        { title: "Mycology", credits: 4 },
        { title: "Phycology", credits: 4 },
        { title: "Chemistry-I", credits: 4 },
        { title: "Zoology-I", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Pteridophyta & Gymnosperms", credits: 4 },
        { title: "Plant Anatomy & Embryology", credits: 4 },
        { title: "Taxonomy of Angiosperms", credits: 4 },
        { title: "Chemistry-II", credits: 4 },
        { title: "Zoology-II", credits: 4 },
        { title: "Practical Botany-II", credits: 4 },
      ],
      "3rd Year": [
        { title: "Plant Pathology", credits: 4 },
        { title: "Plant Physiology", credits: 4 },
        { title: "Ecology & Environmental Science", credits: 4 },
        { title: "Cytology & Cytogenetics", credits: 4 },
        { title: "Genetics & Plant Breeding", credits: 4 },
        { title: "Molecular Biology", credits: 4 },
        { title: "Biostatistics", credits: 4 },
        { title: "Practical Botany-III", credits: 4 },
      ],
      "4th Year": [
        { title: "Agronomy & Horticulture", credits: 4 },
        { title: "Plant Biotechnology", credits: 4 },
        { title: "Limnology", credits: 4 },
        { title: "Economic Botany", credits: 4 },
        { title: "Biodiversity & Conservation", credits: 4 },
        { title: "Microbiology (Advanced)", credits: 4 },
        { title: "Research Methodology", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  },
  "ZOOLOGY": {
    name: "Zoology",
    category: "Science",
    years: {
      "1st Year": [
        { title: "Intro to Zoology & Protozoa", credits: 4 },
        { title: "Non-Chordata", credits: 4 },
        { title: "Human Physiology", credits: 4 },
        { title: "Botany-I", credits: 4 },
        { title: "Chemistry-I", credits: 4 },
        { title: "History of the Emergence of Independent Bangladesh", credits: 4 },
      ],
      "2nd Year": [
        { title: "Chordata", credits: 4 },
        { title: "Comparative Anatomy", credits: 4 },
        { title: "Environmental Biology", credits: 4 },
        { title: "Botany-II", credits: 4 },
        { title: "Chemistry-II", credits: 4 },
        { title: "Practical Zoology-II", credits: 4 },
      ],
      "3rd Year": [
        { title: "Evolution & Paleontology", credits: 4 },
        { title: "Ecology", credits: 4 },
        { title: "Genetics", credits: 4 },
        { title: "Animal Physiology", credits: 4 },
        { title: "Developmental Biology", credits: 4 },
        { title: "Parasitology", credits: 4 },
        { title: "Biostatistics", credits: 4 },
        { title: "Practical Zoology-III", credits: 4 },
      ],
      "4th Year": [
        { title: "Applied Zoology", credits: 4 },
        { title: "Entomology", credits: 4 },
        { title: "Fisheries Biology", credits: 4 },
        { title: "Wildlife Biology", credits: 4 },
        { title: "Microbiology & Immunology", credits: 4 },
        { title: "Biotechnology", credits: 4 },
        { title: "Molecular Biology", credits: 4 },
        { title: "Viva-Voce", credits: 4 },
      ]
    }
  }
};
