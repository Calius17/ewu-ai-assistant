type Request = { body?: { programId?: string; waiverPercent?: number } };
type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => void;
};

const PROGRAMS = {
  cse: { name: "Computer Science & Engineering", degree: "B.Sc. in CSE", totalCredits: 140, perCreditFeeBDT: 5500, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 5000, totalSemesters: 12 },
  eee: { name: "Electrical & Electronic Engineering", degree: "B.Sc. in EEE", totalCredits: 140, perCreditFeeBDT: 5200, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 5000, totalSemesters: 12 },
  ce: { name: "Civil Engineering", degree: "B.Sc. in CE", totalCredits: 152, perCreditFeeBDT: 5100, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 5000, totalSemesters: 12 },
  pharmacy: { name: "Pharmacy", degree: "Bachelor of Pharmacy (B.Pharm)", totalCredits: 160, perCreditFeeBDT: 5400, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 6500, totalSemesters: 8 },
  geb: { name: "Genetic Engineering & Biotechnology", degree: "B.Sc. in GEB", totalCredits: 130, perCreditFeeBDT: 5100, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 5500, totalSemesters: 12 },
  bba: { name: "Bachelor of Business Administration", degree: "BBA", totalCredits: 123, perCreditFeeBDT: 5300, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 4000, totalSemesters: 12 },
  economics: { name: "Economics", degree: "B.S.S. in Economics", totalCredits: 120, perCreditFeeBDT: 4800, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 3500, totalSemesters: 12 },
  english: { name: "English", degree: "B.A. in English", totalCredits: 123, perCreditFeeBDT: 4600, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 3500, totalSemesters: 12 },
  law: { name: "Law (LL.B. Honours)", degree: "LL.B. (Honours)", totalCredits: 130, perCreditFeeBDT: 5000, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 3500, totalSemesters: 12 },
  sociology: { name: "Sociology", degree: "B.S.S. in Sociology", totalCredits: 120, perCreditFeeBDT: 4300, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 3000, totalSemesters: 12 },
} as const;

export default function handler(request: Request, response: Response) {
  try {
    const { programId = "cse", waiverPercent = 0 } = request.body || {};
    const program = PROGRAMS[programId as keyof typeof PROGRAMS] || PROGRAMS.cse;
    const baseTuition = program.totalCredits * program.perCreditFeeBDT;
    const labAndSemesterFees = program.labAndOtherFeePerSemBDT * program.totalSemesters;
    const waiverAmount = Math.round((baseTuition * waiverPercent) / 100);
    const discountedTuition = baseTuition - waiverAmount;
    const finalPayable = discountedTuition + program.admissionFeeBDT + labAndSemesterFees;

    response.status(200).json({
      programName: program.name,
      degree: program.degree,
      totalCredits: program.totalCredits,
      totalSemesters: program.totalSemesters,
      perCreditFee: program.perCreditFeeBDT,
      baseTuition,
      admissionFee: program.admissionFeeBDT,
      labAndSemesterFees,
      waiverPercent,
      waiverAmount,
      finalPayable,
      estimatedPerSemester: Math.round(finalPayable / program.totalSemesters),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Calculation failed";
    response.status(400).json({ error: message });
  }
}