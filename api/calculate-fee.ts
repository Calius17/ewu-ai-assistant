type Request = { body?: { programId?: string; waiverPercent?: number } };
type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => void;
};

export default function handler(request: Request, response: Response) {
  try {
    const { waiverPercent = 0 } = request.body || {};
    const program = { name: "Computer Science & Engineering", degree: "B.Sc. in CSE", totalCredits: 140, perCreditFeeBDT: 5500, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 5000, totalSemesters: 12 };
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