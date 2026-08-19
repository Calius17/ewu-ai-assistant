
type Request = {
  body?: {
    message?: string;
    history?: Array<{ sender: string; text: string }>;
  };
};
type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => void;
};

export default function handler(request: Request, response: Response) {
  const { message, history = [] } = request.body || {};
  if (!message || typeof message !== "string") {
    response.status(400).json({ error: "Message is required" });
    return;
  }

  const lowerQuery = message.toLowerCase().trim();
  const matchedProgram = lowerQuery.includes("cse") || lowerQuery.includes("computer science")
    ? { id: "cse", name: "Computer Science & Engineering", degree: "B.Sc. in CSE", faculty: "Faculty of Sciences & Engineering", durationYears: 4, totalCredits: 140, perCreditFeeBDT: 5500, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 5000, totalSemesters: 12, estimatedTotalCostBDT: 855000, eligibility: "Minimum combined GPA 6.00 in SSC and HSC.", highlights: ["BAETE IEB Tier-1 Accredited"] }
    : undefined;

  const locationQuestion = ["where", "location", "address", "campus", "aftabnagar"].some((term) =>
    lowerQuery.includes(term)
  );
  const reply = locationQuestion
    ? "### East West University Campus Location\n\n**Permanent Campus:** Plot No- A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh.\n\nBeside Rampura Bridge and the eastern entrance of Hatirjheel.\n\nAdmissions: admissions@ewubd.edu | +880-9666775577"
    : "Welcome to the East West University AI Assistant. I can help with tuition fees, programs, scholarships, admissions, and campus information.";

  response.status(200).json({
    reply,
    programCard: matchedProgram,
    suggestedQuestions: [
      "What is the total tuition fee for CSE?",
      "How to get 100% scholarship at EWU?",
      "Where is the EWU campus located?",
    ],
  });
}