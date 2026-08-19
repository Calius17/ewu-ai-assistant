
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

type GeminiClient = {
  models: {
    generateContent: (options: {
      model: string;
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
      config: { systemInstruction: string; temperature: number };
    }) => Promise<{ text?: string }>;
  };
};

const SYSTEM_INSTRUCTION = "You are Aftab, the official AI Assistant for East West University in Dhaka, Bangladesh. Answer directly using EWU programs, tuition, scholarships, admissions, and campus information. Support English, Bengali, and Banglish. Permanent campus: Plot A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh.";

export default async function handler(request: Request, response: Response) {
  const { message, history = [] } = request.body || {};
  if (!message || typeof message !== "string") {
    response.status(400).json({ error: "Message is required" });
    return;
  }

  const lowerQuery = message.toLowerCase().trim();
  const matchedProgram = lowerQuery.includes("cse") || lowerQuery.includes("computer science")
    ? { id: "cse", name: "Computer Science & Engineering", degree: "B.Sc. in CSE", faculty: "Faculty of Sciences & Engineering", durationYears: 4, totalCredits: 140, perCreditFeeBDT: 5500, admissionFeeBDT: 25000, labAndOtherFeePerSemBDT: 5000, totalSemesters: 12, estimatedTotalCostBDT: 855000, eligibility: "Minimum combined GPA 6.00 in SSC and HSC.", highlights: ["BAETE IEB Tier-1 Accredited"] }
    : undefined;

  if (process.env.GEMINI_API_KEY) {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const contents = [
        ...history.map((item) => ({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        })),
        { role: "user", parts: [{ text: message }] },
      ];
      const result = await (ai as unknown as GeminiClient).models.generateContent({
        model: "gemini-flash-latest",
        contents,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
      });
      if (result.text) {
        response.status(200).json({ reply: result.text, programCard: matchedProgram, suggestedQuestions: [
          "What is the total tuition fee for CSE?",
          "How to get 100% Medha Lalon scholarship?",
          "What are the undergraduate admission requirements?",
        ] });
        return;
      }
    } catch {
      // Fall back to the grounded response if Gemini is unavailable.
    }
  }

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