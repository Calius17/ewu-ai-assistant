export interface ProgramInfo {
  id: string;
  name: string;
  degree: string;
  faculty: string;
  durationYears: number;
  totalCredits: number;
  perCreditFeeBDT: number;
  admissionFeeBDT: number;
  labAndOtherFeePerSemBDT: number;
  totalSemesters: number;
  estimatedTotalCostBDT: number;
  eligibility: string;
  highlights: string[];
}

export interface WaiverOption {
  id: string;
  title: string;
  discountPercentage: number;
  criteria: string;
  details: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  programCard?: ProgramInfo;
  feeBreakdown?: {
    programName: string;
    totalCredits: number;
    baseTuition: number;
    admissionFee: number;
    labAndSemesterFees: number;
    waiverPercent: number;
    waiverAmount: number;
    finalPayable: number;
    estimatedPerSemester: number;
  };
}

export interface FAQItem {
  id: string;
  category: 'admissions' | 'fees' | 'waivers' | 'programs' | 'campus' | 'grading';
  question: string;
  shortAnswer: string;
  prompt: string;
}
