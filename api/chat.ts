
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

const PROGRAMS = [
  { id: "cse", name: "Computer Science & Engineering", degree: "B.Sc. in CSE", aliases: ["cse", "computer science", "computer engineering", "software"], credits: 140, perCredit: 5500, admission: 25000, total: 855000 },
  { id: "eee", name: "Electrical & Electronic Engineering", degree: "B.Sc. in EEE", aliases: ["eee", "electrical", "electronic engineering"], credits: 140, perCredit: 5200, admission: 25000, total: 813000 },
  { id: "ce", name: "Civil Engineering", degree: "B.Sc. in CE", aliases: ["civil", "civil engineering", "ce"], credits: 152, perCredit: 5100, admission: 25000, total: 860200 },
  { id: "pharmacy", name: "Pharmacy", degree: "Bachelor of Pharmacy (B.Pharm)", aliases: ["pharmacy", "pharma", "b.pharm", "b pharm"], credits: 160, perCredit: 5400, admission: 25000, total: 941000 },
  { id: "geb", name: "Genetic Engineering & Biotechnology", degree: "B.Sc. in GEB", aliases: ["geb", "genetic engineering", "biotechnology", "biotech"], credits: 130, perCredit: 5100, admission: 25000, total: 754000 },
  { id: "bba", name: "Bachelor of Business Administration", degree: "BBA", aliases: ["bba", "business administration", "business", "management"], credits: 123, perCredit: 5300, admission: 25000, total: 724900 },
  { id: "economics", name: "Economics", degree: "B.S.S. in Economics", aliases: ["economics", "economy"], credits: 120, perCredit: 4800, admission: 25000, total: 643000 },
  { id: "english", name: "English", degree: "B.A. in English", aliases: ["english", "literature", "elt"], credits: 123, perCredit: 4600, admission: 25000, total: 632800 },
  { id: "law", name: "Law", degree: "LL.B. (Honours)", aliases: ["law", "llb", "ll.b", "legal"], credits: 130, perCredit: 5000, admission: 25000, total: 717000 },
  { id: "sociology", name: "Sociology", degree: "B.S.S. in Sociology", aliases: ["sociology", "social science"], credits: 120, perCredit: 4300, admission: 25000, total: 577000 },
] as const;

export default async function handler(request: Request, response: Response) {
  const { message, history = [] } = request.body || {};
  if (!message || typeof message !== "string") {
    response.status(400).json({ error: "Message is required" });
    return;
  }

  const lowerQuery = message.toLowerCase().trim();
  const matchedProgram = PROGRAMS.find((program) => program.aliases.some((alias) => lowerQuery.includes(alias)));

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

  const locationQuestion = ["where", "location", "address", "campus", "aftabnagar"].some((term) => lowerQuery.includes(term));
  const scholarshipQuestion = ["scholarship", "waiver", "medha", "merit", "golden"].some((term) => lowerQuery.includes(term));
  const tuitionQuestion = ["tuition", "fee", "fees", "cost", "price", "credit", "how much", "total"].some((term) => lowerQuery.includes(term));
  const admissionQuestion = ["admission", "eligibility", "requirement", "apply", "gpa"].some((term) => lowerQuery.includes(term));

  let reply = "Welcome to the East West University AI Assistant. I can help with tuition fees, programs, scholarships, admissions, and campus information.";
  if (locationQuestion) {
    reply = "### East West University Campus Location\n\n**Permanent Campus:** Plot No- A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh.\n\nBeside Rampura Bridge and the eastern entrance of Hatirjheel.\n\nAdmissions: admissions@ewubd.edu | +880-9666775577";
  } else if (scholarshipQuestion) {
    reply = "### EWU Scholarships and Waivers\n\n- **Medha Lalon Scholarship:** 100% tuition waiver may be available for students with Golden GPA 5.0 in both SSC and HSC, or for top admission-test performers.\n- **Semester merit waiver:** CGPA 3.90-4.00 may qualify for 100%, 3.80-3.89 for 50%, and 3.70-3.79 for 25% tuition waiver.\n- **Freedom Fighter quota:** Up to 100% tuition waiver.\n- **Sibling or spouse concession:** 50% waiver for the second person.\n\nConfirm current criteria with EWU Admissions because policies can change.";
  } else if (tuitionQuestion && matchedProgram) {
    reply = `### EWU ${matchedProgram.name} Tuition Estimate\n\n- **Program:** ${matchedProgram.degree}\n- **Credits:** ${matchedProgram.credits}\n- **Per-credit fee:** ৳${matchedProgram.perCredit.toLocaleString()}\n- **Admission fee:** ৳${matchedProgram.admission.toLocaleString()}\n- **Estimated total:** approximately **৳${matchedProgram.total.toLocaleString()} BDT**, before any applicable waiver or updated institutional fees.\n\nAsk about a specific waiver percentage for a personalized estimate.`;
  } else if (tuitionQuestion) {
    reply = "I can provide fees for CSE, EEE, Civil, Pharmacy, GEB, BBA, Economics, English, Law, and Sociology. Please mention the program name, for example: **What is the fee of BBA?**";
  } else if (admissionQuestion) {
    reply = "### EWU Undergraduate Admission\n\nApplicants generally need a combined GPA of 6.00 or higher in SSC and HSC, with at least 2.50 in each. Engineering applicants usually need Mathematics and Physics; Pharmacy applicants need Biology and Chemistry.\n\nCheck the official EWU admissions office for the current intake requirements.";
  }

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