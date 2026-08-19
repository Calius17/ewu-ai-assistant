import { ProgramInfo, WaiverOption, FAQItem } from '../types';

export const EWU_INFO = {
  name: "East West University (EWU)",
  motto: "Excellence in Education",
  established: 1996,
  founder: "Dr. Mohammed Farashuddin (Former Governor of Bangladesh Bank)",
  location: "Plot No- A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh",
  accreditation: "Approved by UGC Bangladesh, BAETE Accredited (CSE & EEE), PCB Accredited (Pharmacy)",
  website: "https://www.ewubd.edu",
  portal: "https://portal.ewubd.edu",
  admissionsEmail: "admissions@ewubd.edu",
  phone: "+880-9666775577, +880-2-55046678",
  hotline: "+880 1712-000000",
  semesters: [
    { name: "Spring", duration: "January – April" },
    { name: "Summer", duration: "May – August" },
    { name: "Fall", duration: "September – December" }
  ]
};

export const EWU_PROGRAMS: ProgramInfo[] = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    degree: "B.Sc. in CSE",
    faculty: "Faculty of Sciences & Engineering",
    durationYears: 4,
    totalCredits: 140,
    perCreditFeeBDT: 5500,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 5000,
    totalSemesters: 12,
    estimatedTotalCostBDT: 855000,
    eligibility: "Min GPA 2.50 each in SSC & HSC with combined GPA 6.00+. Must have Mathematics and Physics in HSC.",
    highlights: ["BAETE Accredited (IEB Tier-1 status)", "High placement in software industry & global grad schools", "Modern AI, Robotics & Network Labs", "Active ACM ICPC & competitive programming culture"]
  },
  {
    id: "eee",
    name: "Electrical & Electronic Engineering",
    degree: "B.Sc. in EEE",
    faculty: "Faculty of Sciences & Engineering",
    durationYears: 4,
    totalCredits: 140,
    perCreditFeeBDT: 5200,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 5000,
    totalSemesters: 12,
    estimatedTotalCostBDT: 813000,
    eligibility: "Min GPA 2.50 each in SSC & HSC with combined GPA 6.00+. Must have Physics and Higher Math in HSC.",
    highlights: ["BAETE Accredited", "Power Systems, Telecommunications & VLSI tracks", "State-of-the-art Circuits, Microprocessor & Telecommunication labs", "Strong IEEE Student Branch"]
  },
  {
    id: "ce",
    name: "Civil Engineering",
    degree: "B.Sc. in CE",
    faculty: "Faculty of Sciences & Engineering",
    durationYears: 4,
    totalCredits: 152,
    perCreditFeeBDT: 5100,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 5000,
    totalSemesters: 12,
    estimatedTotalCostBDT: 860200,
    eligibility: "Min GPA 2.50 each in SSC & HSC with combined GPA 6.00+. Must have Physics and Mathematics in HSC.",
    highlights: ["Structural, Geotechnical, Transportation & Environmental specializations", "Advanced Material Testing & Hydraulics labs", "Field work & survey camps included"]
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    degree: "Bachelor of Pharmacy (B.Pharm)",
    faculty: "Faculty of Sciences & Engineering",
    durationYears: 4,
    totalCredits: 160,
    perCreditFeeBDT: 5400,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 6500,
    totalSemesters: 8, // Bi-semester system for Pharmacy
    estimatedTotalCostBDT: 941000,
    eligibility: "Min GPA 3.00 in SSC & HSC with combined 8.00+. Min GPA 3.00 in Chemistry and Biology in HSC.",
    highlights: ["Accredited by Pharmacy Council of Bangladesh (PCB)", "Bi-semester curriculum approved for clinical & industrial pharma", "Advanced Pharmaceutical Formulation & HPLC instrumentation labs"]
  },
  {
    id: "geb",
    name: "Genetic Engineering & Biotechnology",
    degree: "B.Sc. in GEB",
    faculty: "Faculty of Sciences & Engineering",
    durationYears: 4,
    totalCredits: 130,
    perCreditFeeBDT: 5100,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 5500,
    totalSemesters: 12,
    estimatedTotalCostBDT: 754000,
    eligibility: "Combined GPA 6.50+ in SSC & HSC with Biology and Chemistry.",
    highlights: ["Molecular biology, genetic manipulation & bioinformatics", "Cell culture and DNA sequencing facilities", "Pathways to international research and biotech pharma"]
  },
  {
    id: "bba",
    name: "Bachelor of Business Administration",
    degree: "BBA",
    faculty: "Faculty of Business & Economics",
    durationYears: 4,
    totalCredits: 123,
    perCreditFeeBDT: 5300,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 4000,
    totalSemesters: 12,
    estimatedTotalCostBDT: 724900,
    eligibility: "Min GPA 2.50 in SSC & HSC with combined GPA 6.00+. Any group (Science, Commerce, Arts).",
    highlights: ["Majors in Finance, Marketing, HRM, Accounting, MIS, Supply Chain & International Business", "Internship programs with top MNCs and banks in Dhaka", "Pioneer business school with renowned faculty"]
  },
  {
    id: "economics",
    name: "Economics",
    degree: "B.S.S. in Economics",
    faculty: "Faculty of Business & Economics",
    durationYears: 4,
    totalCredits: 120,
    perCreditFeeBDT: 4800,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 3500,
    totalSemesters: 12,
    estimatedTotalCostBDT: 643000,
    eligibility: "Min GPA 2.50 in SSC & HSC with combined GPA 6.00+. Science/Commerce background with Math preferred.",
    highlights: ["Founded under guidance of former central bank governor Dr. Mohammed Farashuddin", "Econometrics, Policy Analysis & Development Economics focus", "High acceptance in World Bank, ADB, Bangladesh Bank & top universities abroad"]
  },
  {
    id: "english",
    name: "English",
    degree: "B.A. in English",
    faculty: "Faculty of Liberal Arts & Social Sciences",
    durationYears: 4,
    totalCredits: 123,
    perCreditFeeBDT: 4600,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 3500,
    totalSemesters: 12,
    estimatedTotalCostBDT: 632800,
    eligibility: "Min GPA 2.50 in SSC & HSC with combined GPA 6.00+. Minimum B grade in English.",
    highlights: ["Tracks in English Literature and Applied Linguistics & ELT", "Language laboratory for phonetics & spoken proficiency", "Creative writing, media communication & corporate communication"]
  },
  {
    id: "law",
    name: "Law (LL.B. Honours)",
    degree: "LL.B. (Honours)",
    faculty: "Faculty of Liberal Arts & Social Sciences",
    durationYears: 4,
    totalCredits: 130,
    perCreditFeeBDT: 5000,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 3500,
    totalSemesters: 12,
    estimatedTotalCostBDT: 717000,
    eligibility: "Min GPA 2.50 in SSC & HSC with combined GPA 6.00+.",
    highlights: ["Moot Court competitions and legal aid clinics", "Approved by Bangladesh Bar Council", "Corporate, constitutional, cyber and criminal law expertise"]
  },
  {
    id: "sociology",
    name: "Sociology",
    degree: "B.S.S. in Sociology",
    faculty: "Faculty of Liberal Arts & Social Sciences",
    durationYears: 4,
    totalCredits: 120,
    perCreditFeeBDT: 4300,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 3000,
    totalSemesters: 12,
    estimatedTotalCostBDT: 577000,
    eligibility: "Min GPA 2.50 in SSC & HSC with combined GPA 6.00+.",
    highlights: ["Social research methodologies & field work", "Development studies and NGO career tracks"]
  },
  {
    id: "mba",
    name: "Master of Business Administration",
    degree: "MBA (Regular & Executive)",
    faculty: "Faculty of Business & Economics",
    durationYears: 2,
    totalCredits: 60,
    perCreditFeeBDT: 5600,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 4000,
    totalSemesters: 6,
    estimatedTotalCostBDT: 385000,
    eligibility: "Graduation (Bachelor degree) in any discipline with minimum CGPA 2.50 or equivalent.",
    highlights: ["Evening & weekend classes for executives", "Waivers for previous relevant business courses (up to 24 credits)", "Networking with Dhaka corporate leaders"]
  },
  {
    id: "msc-cse",
    name: "Master of Science in CSE",
    degree: "M.Sc. in CSE",
    faculty: "Faculty of Sciences & Engineering",
    durationYears: 1.5,
    totalCredits: 36,
    perCreditFeeBDT: 5500,
    admissionFeeBDT: 25000,
    labAndOtherFeePerSemBDT: 4500,
    totalSemesters: 4,
    estimatedTotalCostBDT: 241000,
    eligibility: "4-year B.Sc. in CSE / IT / EEE or related fields with min CGPA 2.50.",
    highlights: ["Thesis and Non-thesis tracks", "Machine Learning, Big Data, Network Security & Cloud Computing", "Evening & weekend class schedule"]
  }
];

export const EWU_WAIVERS: WaiverOption[] = [
  {
    id: "medha-lalon",
    title: "Medha Lalon Merit Scholarship (100% Tuition Waiver)",
    discountPercentage: 100,
    criteria: "Golden GPA 5.00 in SSC & HSC (without 4th subject) OR top ranks in EWU Admission Test.",
    details: "Covers 100% tuition fees throughout the program provided student maintains a CGPA of 3.80+ every semester at EWU."
  },
  {
    id: "cgpa-390",
    title: "Semester Merit Waiver (100% Waiver)",
    discountPercentage: 100,
    criteria: "Current students securing CGPA 3.90 – 4.00 in a semester.",
    details: "Full tuition fee waiver for the subsequent semester with minimum 9-12 credit course load."
  },
  {
    id: "cgpa-380",
    title: "Semester Merit Waiver (50% Waiver)",
    discountPercentage: 50,
    criteria: "Current students securing CGPA 3.80 – 3.89 in a semester.",
    details: "50% tuition fee reduction for the upcoming semester."
  },
  {
    id: "cgpa-370",
    title: "Semester Merit Waiver (25% Waiver)",
    discountPercentage: 25,
    criteria: "Current students securing CGPA 3.70 – 3.79 in a semester.",
    details: "25% tuition fee reduction for the upcoming semester."
  },
  {
    id: "freedom-fighter",
    title: "Freedom Fighter Quota (100% Tuition Waiver)",
    discountPercentage: 100,
    criteria: "Children of verified Freedom Fighters (Muktijoddha certificate required as per UGC).",
    details: "100% tuition waiver for the entire 4-year undergraduate degree."
  },
  {
    id: "sibling-spouse",
    title: "Sibling & Spouse Concession (50% Waiver)",
    discountPercentage: 50,
    criteria: "When two siblings or husband/wife study simultaneously at EWU.",
    details: "50% tuition waiver is awarded to the second sibling/spouse until one graduates."
  },
  {
    id: "need-based",
    title: "Financial Hardship / Trustee's Grant (25% - 75%)",
    discountPercentage: 50,
    criteria: "Financially disadvantaged students with satisfactory academic standing (CGPA 2.80+).",
    details: "Application submitted to EWU Financial Aid Committee before each semester starts."
  }
];

export const EWU_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "fees",
    question: "What is the total fee for B.Sc. in CSE at East West University?",
    shortAnswer: "Approx. BDT 8,55,000 for 140 credits over 4 years (12 semesters), at ~BDT 5,500 per credit plus admission & semester fees.",
    prompt: "Give me the detailed fee breakdown for B.Sc. in CSE including admission fee, per credit cost, and semester costs."
  },
  {
    id: "faq-2",
    category: "fees",
    question: "What is the total fee for BBA at EWU?",
    shortAnswer: "Approx. BDT 7,24,900 for 123 credits across 12 trimesters (4 years).",
    prompt: "What is the complete tuition fee and credit breakdown for BBA at East West University?"
  },
  {
    id: "faq-3",
    category: "waivers",
    question: "How can I get a 100% scholarship at EWU?",
    shortAnswer: "You can receive the Medha Lalon 100% waiver with GPA 5.0 in SSC & HSC or top scores in the admission test, or by scoring CGPA 3.90+ in semester exams.",
    prompt: "Explain all 100% scholarship and tuition waiver criteria at East West University."
  },
  {
    id: "faq-4",
    category: "admissions",
    question: "What are the admission requirements for undergraduate programs?",
    shortAnswer: "Minimum combined GPA 6.00 in SSC and HSC with min 2.50 in each. For CSE/EEE/CE, Math and Physics in HSC are required.",
    prompt: "What are the detailed admission eligibility criteria and subjects required for EWU?"
  },
  {
    id: "faq-5",
    category: "admissions",
    question: "What is the EWU admission test syllabus and format?",
    shortAnswer: "Written MCQ & analytical test: English (Grammar/Comprehension), Mathematics, and General Analytical Ability. Science applicants get Math & Physics; Pharmacy gets Chemistry & Biology.",
    prompt: "Explain the EWU admission test syllabus, marks distribution, and preparation tips."
  },
  {
    id: "faq-6",
    category: "campus",
    question: "Where is East West University campus located and how to reach?",
    shortAnswer: "Plot No- A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212 (beside Rampura Bridge / Hatirjheel).",
    prompt: "Tell me about the EWU Aftabnagar campus location, facilities, and transportation routes."
  },
  {
    id: "faq-7",
    category: "grading",
    question: "How does the grading and CGPA system work at EWU?",
    shortAnswer: "EWU uses a 4.00 CGPA scale where 80%+ is A+ (4.00), 75-79% is A (3.75), 70-74% is A- (3.50), down to 40% (D, 1.00).",
    prompt: "Show me the full EWU letter grading system, marks percentage, and grade point scale."
  },
  {
    id: "faq-8",
    category: "programs",
    question: "What is the fee for Bachelor of Pharmacy (B.Pharm)?",
    shortAnswer: "Approx. BDT 9,41,000 for 160 credits over 4 years (8 bi-semesters), PCB accredited.",
    prompt: "Tell me about Bachelor of Pharmacy at EWU: tuition fee, eligibility, duration and accreditation."
  }
];

export const GRADING_SYSTEM = [
  { grade: "A+", points: "4.00", marks: "80% and above", description: "Outstanding" },
  { grade: "A",  points: "3.75", marks: "75% to 79%", description: "Excellent" },
  { grade: "A-", points: "3.50", marks: "70% to 74%", description: "Very Good" },
  { grade: "B+", points: "3.25", marks: "65% to 69%", description: "Good" },
  { grade: "B",  points: "3.00", marks: "60% to 64%", description: "Satisfactory" },
  { grade: "B-", points: "2.75", marks: "55% to 59%", description: "Above Average" },
  { grade: "C+", points: "2.50", marks: "50% to 54%", description: "Average" },
  { grade: "C",  points: "2.25", marks: "45% to 49%", description: "Below Average" },
  { grade: "D",  points: "2.00", marks: "40% to 44%", description: "Pass" },
  { grade: "F",  points: "0.00", marks: "Below 40%", description: "Fail" }
];
