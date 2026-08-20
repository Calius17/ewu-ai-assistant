type Request = { body?: { programId?: string; waiverPercent?: number } };
type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => void;
};

const PROGRAMS = {
  cse: { name: "Computer Science & Engineering", degree: "B.Sc. in CSE", totalCredits: 140, perCreditFeeBDT: 6500, tuitionTotalBDT: 904000, admissionFeeBDT: 25000, labAndSemesterFees: 74400, totalSemesters: 12, grandTotalBDT: 1003400 },
  eee: { name: "Electrical & Electronic Engineering", degree: "B.Sc. in EEE", totalCredits: 140, perCreditFeeBDT: 6500, tuitionTotalBDT: 904000, admissionFeeBDT: 25000, labAndSemesterFees: 74400, totalSemesters: 12, grandTotalBDT: 1003400 },
  ce: { name: "Civil Engineering", degree: "B.Sc. in CE", totalCredits: 145, perCreditFeeBDT: 6500, tuitionTotalBDT: 936500, admissionFeeBDT: 25000, labAndSemesterFees: 74400, totalSemesters: 12, grandTotalBDT: 1035900 },
  pharmacy: { name: "Pharmacy", degree: "Bachelor of Pharmacy (B.Pharm)", totalCredits: 158, perCreditFeeBDT: 7000, tuitionTotalBDT: 1091000, admissionFeeBDT: 25000, labAndSemesterFees: 76000, totalSemesters: 8, grandTotalBDT: 1192000 },
  geb: { name: "Genetic Engineering & Biotechnology", degree: "B.Sc. in GEB", totalCredits: 140, perCreditFeeBDT: 6500, tuitionTotalBDT: 904000, admissionFeeBDT: 25000, labAndSemesterFees: 74400, totalSemesters: 12, grandTotalBDT: 1003400 },
  bba: { name: "Bachelor of Business Administration", degree: "BBA", totalCredits: 130, perCreditFeeBDT: 6500, tuitionTotalBDT: 836000, admissionFeeBDT: 25000, labAndSemesterFees: 56400, totalSemesters: 12, grandTotalBDT: 917400 },
  economics: { name: "Economics", degree: "B.S.S. in Economics", totalCredits: 130, perCreditFeeBDT: 5500, tuitionTotalBDT: 739000, admissionFeeBDT: 25000, labAndSemesterFees: 56400, totalSemesters: 12, grandTotalBDT: 820400 },
  english: { name: "English", degree: "B.A. in English", totalCredits: 130, perCreditFeeBDT: 5500, tuitionTotalBDT: 739000, admissionFeeBDT: 25000, labAndSemesterFees: 56400, totalSemesters: 12, grandTotalBDT: 820400 },
  law: { name: "Law (LL.B. Honours)", degree: "LL.B. (Honours)", totalCredits: 130, perCreditFeeBDT: 6500, tuitionTotalBDT: 842000, admissionFeeBDT: 25000, labAndSemesterFees: 60000, totalSemesters: 12, grandTotalBDT: 927000 },
  sociology: { name: "Sociology", degree: "B.S.S. in Sociology", totalCredits: 130, perCreditFeeBDT: 5500, tuitionTotalBDT: 733000, admissionFeeBDT: 25000, labAndSemesterFees: 56400, totalSemesters: 12, grandTotalBDT: 814400 },
  "information-studies": { name: "Information Studies", degree: "B.S.S. in Information Studies", totalCredits: 130, perCreditFeeBDT: 5000, tuitionTotalBDT: 677000, admissionFeeBDT: 25000, labAndSemesterFees: 56400, totalSemesters: 12, grandTotalBDT: 758400 },
  ice: { name: "Information and Communication Engineering", degree: "B.Sc. in ICE", totalCredits: 140, perCreditFeeBDT: 6500, tuitionTotalBDT: 904000, admissionFeeBDT: 25000, labAndSemesterFees: 74400, totalSemesters: 12, grandTotalBDT: 1003400 },
  pphs: { name: "Population and Public Health Sciences", degree: "B.S.S. in PPHS", totalCredits: 130, perCreditFeeBDT: 5500, tuitionTotalBDT: 724000, admissionFeeBDT: 25000, labAndSemesterFees: 56400, totalSemesters: 12, grandTotalBDT: 805400 },
  mathematics: { name: "Mathematics", degree: "B.Sc. (Hons.) in Mathematics", totalCredits: 130, perCreditFeeBDT: 4000, tuitionTotalBDT: 566500, admissionFeeBDT: 25000, labAndSemesterFees: 74400, totalSemesters: 12, grandTotalBDT: 665900 },
  "data-science": { name: "Data Science and Analytics", degree: "B.Sc. in Data Science and Analytics", totalCredits: 130, perCreditFeeBDT: 5500, tuitionTotalBDT: 748000, admissionFeeBDT: 25000, labAndSemesterFees: 74400, totalSemesters: 12, grandTotalBDT: 847400 },
} as const;

export default function handler(request: Request, response: Response) {
  try {
    const { programId = "cse", waiverPercent = 0 } = request.body || {};
    const program = PROGRAMS[programId as keyof typeof PROGRAMS] || PROGRAMS.cse;
    const baseTuition = program.tuitionTotalBDT;
    const labAndSemesterFees = program.labAndSemesterFees;
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