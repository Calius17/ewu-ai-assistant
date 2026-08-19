import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { EWU_PROGRAMS, EWU_WAIVERS, EWU_INFO, EWU_FAQS, GRADING_SYSTEM } from "../src/data/ewuData";

const app = express();
app.use(express.json());

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "Aftab", the official, helpful, and knowledgeable AI Assistant for East West University (EWU) in Dhaka, Bangladesh.

LOCATION & CAMPUS:
- Permanent Campus: Plot A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh.
- Landmark: Situated near Rampura Bridge / East entrance of Hatirjheel.
- Facilities: Fully air-conditioned modern campus, advanced computer & robotics labs, central library, indoor sports complex, cafeteria, medical center, university bus routes.

PROGRAMS & TUITION FEES (UNDERGRADUATE):
- B.Sc. in CSE: 140 Credits, 12 Trimesters, ৳5,500/credit, ৳25,000 admission fee. Total approx. ৳8,55,000 BDT. BAETE IEB Tier-1.
- B.Sc. in EEE: 140 Credits, 12 Trimesters, ৳5,200/credit. Total approx. ৳8,13,000 BDT.
- B.Sc. in Civil: 152 Credits, 12 Trimesters, ৳5,100/credit. Total approx. ৳8,60,200 BDT.
- Bachelor of Pharmacy (B.Pharm): 160 Credits, 8 Bi-Semesters (4 Years), ৳5,400/credit. Total approx. ৳9,41,000 BDT. PCB Accredited.
- BBA: 123 Credits, 12 Trimesters, ৳5,300/credit. Total approx. ৳7,24,900 BDT.
- B.S.S. in Economics: 120 Credits, ৳4,800/credit. Total approx. ৳6,43,000 BDT.
- B.A. in English: 123 Credits, ৳4,600/credit. Total approx. ৳6,32,800 BDT.
- LL.B. (Honours): 130 Credits, ৳5,000/credit. Total approx. ৳7,17,000 BDT.
- B.Sc. in GEB: 130 Credits, ৳5,100/credit. Total approx. ৳7,54,000 BDT.

SCHOLARSHIPS & WAIVERS:
- Medha Lalon 100% Scholarship: GPA 5.0 (Golden) in SSC & HSC or top scores in EWU admission test. Retained with CGPA 3.80+.
- Semester Merit Waivers: CGPA 3.90–4.00 (100% waiver), CGPA 3.80–3.89 (50% waiver), CGPA 3.70–3.79 (25% waiver).
- Freedom Fighter Quota: 100% full waiver.
- Sibling / Spouse Quota: 50% waiver.

CONTACT:
- Website: https://www.ewubd.edu | Email: admissions@ewubd.edu | Phone: +880-9666775577`;

// Health endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Programs endpoint
app.get("/api/programs", (_req: Request, res: Response) => {
  res.json({
    info: EWU_INFO,
    programs: EWU_PROGRAMS,
    waivers: EWU_WAIVERS,
    faqs: EWU_FAQS,
    grading: GRADING_SYSTEM,
  });
});

// Calculate Fee endpoint
app.post("/api/calculate-fee", (req: Request, res: Response) => {
  try {
    const { programId, waiverPercent = 0 } = req.body;
    const program = EWU_PROGRAMS.find((p) => p.id === programId) || EWU_PROGRAMS[0];
    const baseTuition = program.totalCredits * program.perCreditFeeBDT;
    const labAndSemesterFees = program.labAndOtherFeePerSemBDT * program.totalSemesters;
    const waiverAmount = Math.round((baseTuition * waiverPercent) / 100);
    const discountedTuition = baseTuition - waiverAmount;
    const finalPayable = discountedTuition + program.admissionFeeBDT + labAndSemesterFees;
    const estimatedPerSemester = Math.round(finalPayable / program.totalSemesters);

    res.json({
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
      estimatedPerSemester,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Calculation failed";
    res.status(400).json({ error: message });
  }
});

// Main Chat endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const lowerQuery = message.toLowerCase().trim();

  const matchedProgram = EWU_PROGRAMS.find(
    (p) =>
      lowerQuery.includes(p.id) ||
      lowerQuery.includes(p.name.toLowerCase()) ||
      (p.id === "cse" && (lowerQuery.includes("computer science") || lowerQuery.includes("software"))) ||
      (p.id === "eee" && (lowerQuery.includes("electrical") || lowerQuery.includes("electronic"))) ||
      (p.id === "pharmacy" && (lowerQuery.includes("pharma") || lowerQuery.includes("b.pharm"))) ||
      (p.id === "bba" && (lowerQuery.includes("business") || lowerQuery.includes("management"))) ||
      (p.id === "ce" && (lowerQuery.includes("civil") || lowerQuery.includes("construction")))
  );

  const ai = getAIClient();

  if (ai) {
    try {
      const formattedContents = [
        ...history.map((h: { sender: string; text: string }) => ({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        })),
        {
          role: "user",
          parts: [{ text: message }],
        },
      ];

      let response: { text?: string } | null = null;
      const candidateModels = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

      for (const modelName of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });
          if (response && response.text) break;
        } catch {
          // continue to next model
        }
      }

      if (response && response.text) {
        const suggestedQuestions = [
          "What is the total tuition fee for CSE?",
          "How to get 100% Medha Lalon scholarship?",
          "What are the undergraduate admission requirements?",
          "Where is the EWU campus located and what bus routes exist?",
        ]
          .filter((q) => !lowerQuery.includes(q.slice(0, 15).toLowerCase()))
          .slice(0, 3);

        return res.json({
          reply: response.text,
          programCard: matchedProgram,
          suggestedQuestions,
        });
      }
    } catch (geminiError) {
      console.error("Vercel Serverless Gemini Error:", geminiError);
    }
  }

  // Grounded local response
  let fallbackReply = `Welcome to **East West University (EWU) AI Assistant**! 🎓\n\nI can help you with:\n- 💰 **Tuition Fees & Credit Costs** for CSE, EEE, Civil, BBA, Pharmacy, Economics, etc.\n- 🏆 **Scholarships & Waivers** (100% Medha Lalon, semester CGPA waivers).\n- 📝 **Admissions & Eligibility** criteria.\n- 📍 **Campus Location** (Aftabnagar, Rampura, Dhaka).`;

  if (
    lowerQuery.includes("where") ||
    lowerQuery.includes("location") ||
    lowerQuery.includes("address") ||
    lowerQuery.includes("campus") ||
    lowerQuery.includes("aftabnagar")
  ) {
    fallbackReply = `### 📍 East West University (EWU) Campus Location & Address\n\n**Permanent Campus Address:**\nPlot No- A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh.\n\n**Landmarks:** Beside Rampura Bridge and eastern entrance of Hatirjheel.\n\n**Contact:** +880-9666775577 | admissions@ewubd.edu | [www.ewubd.edu](https://www.ewubd.edu)`;
  }

  return res.json({
    reply: fallbackReply,
    programCard: matchedProgram,
    suggestedQuestions: [
      "What is the total tuition fee for CSE?",
      "How to get 100% scholarship at EWU?",
      "Where is the EWU campus located?",
    ],
  });
});

export default app;
