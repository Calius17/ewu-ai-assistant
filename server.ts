import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { EWU_PROGRAMS, EWU_WAIVERS, EWU_INFO, EWU_FAQS, GRADING_SYSTEM } from "./src/data/ewuData";

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "Aftab", the official, helpful, and knowledgeable AI Assistant for East West University (EWU) in Dhaka, Bangladesh.

LOCATION & CAMPUS:
- Permanent Campus: Plot A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh.
- Landmark: Situated near Rampura Bridge / East entrance of Hatirjheel.
- Facilities: Fully air-conditioned modern multi-story campus, advanced computer & robotics labs, electronics labs, pharmacology labs, central air-conditioned library, indoor sports complex, cafeteria, medical center, university bus routes.

PROGRAMS & TUITION FEES (UNDERGRADUATE):
- B.Sc. in Computer Science & Engineering (CSE): 140 Credits, 12 Trimesters, ৳5,500/credit, ৳25,000 admission fee. Total approx. ৳8,55,000 BDT. BAETE IEB Tier-1 Accredited.
- B.Sc. in Electrical & Electronic Engineering (EEE): 140 Credits, 12 Trimesters, ৳5,200/credit. Total approx. ৳8,13,000 BDT.
- B.Sc. in Civil Engineering (CE): 152 Credits, 12 Trimesters, ৳5,100/credit. Total approx. ৳8,60,200 BDT.
- Bachelor of Pharmacy (B.Pharm): 160 Credits, 8 Bi-Semesters (4 Years), ৳5,400/credit. Total approx. ৳9,41,000 BDT. PCB Accredited.
- Bachelor of Business Administration (BBA): 123 Credits, 12 Trimesters, ৳5,300/credit. Total approx. ৳7,24,900 BDT.
- B.S.S. in Economics: 120 Credits, ৳4,800/credit. Total approx. ৳6,43,000 BDT.
- B.A. in English: 123 Credits, ৳4,600/credit. Total approx. ৳6,32,800 BDT.
- LL.B. (Honours): 130 Credits, ৳5,000/credit. Total approx. ৳7,17,000 BDT.
- B.Sc. in Genetic Engineering & Biotechnology (GEB): 130 Credits, ৳5,100/credit. Total approx. ৳7,54,000 BDT.
- B.S.S. in Sociology: 120 Credits, ৳4,300/credit. Total approx. ৳5,77,000 BDT.

GRADUATE PROGRAMS:
- MBA / EMBA: 60 Credits, ৳5,500/credit, Total approx. ৳3,85,000 BDT.
- M.Sc. in CSE: 36 Credits, ৳5,500/credit, Total approx. ৳2,41,000 BDT.

SCHOLARSHIPS & TUITION WAIVERS:
- Medha Lalon 100% Scholarship: For students with GPA 5.0 (Golden) in SSC & HSC without 4th subject, or top scorers in EWU admission test. Retained with CGPA 3.80+.
- Semester Merit Waivers: CGPA 3.90–4.00 (100% tuition waiver), CGPA 3.80–3.89 (50% waiver), CGPA 3.70–3.79 (25% waiver).
- Freedom Fighter Quota: 100% full tuition waiver.
- Sibling / Spouse Quota: 50% waiver for the 2nd person.
- Financial Hardship / Trustee's Special Grant: 25% – 75% aid.

ADMISSIONS & ELIGIBILITY:
- Undergraduate: Combined GPA 6.00+ in SSC and HSC (minimum 2.50 in each).
- Engineering needs Physics & Math in HSC. Pharmacy needs Biology & Chemistry in HSC (combined GPA 8.00+).
- Admission Test: English, Mathematics & Analytical ability + departmental subjects.

CONTACT:
- Website: https://www.ewubd.edu
- Student Portal: https://portal.ewubd.edu
- Phone: +880-9666775577, +880-2-55046678
- Email: admissions@ewubd.edu

GUIDELINES:
- Answer directly and accurately.
- When asked about location/where EWU is, state the exact permanent campus address in Aftabnagar, Rampura, Dhaka, and how to reach it.
- Use clean formatting with bold headers, bullet points, and markdown tables.
- Support both English and Bengali / Banglish inquiries.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API: Get EWU Information and Programs
  app.get("/api/programs", (_req: Request, res: Response) => {
    res.json({
      info: EWU_INFO,
      programs: EWU_PROGRAMS,
      waivers: EWU_WAIVERS,
      faqs: EWU_FAQS,
      grading: GRADING_SYSTEM,
    });
  });

  // API: Calculate Custom Tuition Fee
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

  // API: Main Chat endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const lowerQuery = message.toLowerCase().trim();

    // Check if query specifically targets a program for automatic rich card embedding
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
            if (response && response.text) {
              break;
            }
          } catch (modelErr) {
            console.warn(`Model ${modelName} unavailable, trying next candidate:`, modelErr);
          }
        }

        const replyText =
          response.text ||
          "I received your question. East West University offers degree programs in Engineering, Business, Pharmacy, and Liberal Arts. Please let me know what details you need.";

        // Dynamic question suggestions
        const suggestedQuestions = [
          "What is the total tuition fee for CSE?",
          "How to get 100% Medha Lalon scholarship?",
          "What are the undergraduate admission requirements?",
          "Where is the EWU campus located and what bus routes exist?",
        ]
          .filter((q) => !lowerQuery.includes(q.slice(0, 15).toLowerCase()))
          .slice(0, 3);

        return res.json({
          reply: replyText,
          programCard: matchedProgram,
          suggestedQuestions,
        });
      } catch (geminiError: unknown) {
        console.error("Gemini API call encountered error, using local university engine:", geminiError);
      }
    }

    // High-quality local university fallback response engine
    let fallbackReply = "";
    const suggestions: string[] = [];

    // 1. LOCATION & CAMPUS & WHERE
    if (
      lowerQuery.includes("where") ||
      lowerQuery.includes("location") ||
      lowerQuery.includes("address") ||
      lowerQuery.includes("place") ||
      lowerQuery.includes("campus") ||
      lowerQuery.includes("situated") ||
      lowerQuery.includes("located") ||
      lowerQuery.includes("aftabnagar") ||
      lowerQuery.includes("rampura") ||
      lowerQuery.includes("dhaka") ||
      lowerQuery.includes("map") ||
      lowerQuery.includes("directions") ||
      lowerQuery.includes("kothay") ||
      lowerQuery.includes("thikana")
    ) {
      fallbackReply = `### 📍 East West University (EWU) Campus Location & Address

**Permanent Campus Address:**
Plot No- A/2, Jahurul Islam City, Aftabnagar, Rampura, Dhaka-1212, Bangladesh.

**Key Landmarks & How to Reach:**
- Located in **Aftabnagar**, right beside the **Rampura Bridge** and the eastern entrance of **Hatirjheel**.
- Very easily accessible from Badda, Mohakhali, Banasree, Malibagh, and Kuril.
- University bus services operate along major routes across Dhaka for students.

**Official Contact & Helpdesk:**
- **PABX / Landline:** +880-9666775577, +880-2-55046678
- **Admissions Email:** admissions@ewubd.edu
- **Official Website:** [www.ewubd.edu](https://www.ewubd.edu)
- **Student Portal:** [portal.ewubd.edu](https://portal.ewubd.edu)`;
      suggestions.push(
        "What bus routes are available for EWU students?",
        "What are the admission requirements for EWU?",
        "What is the total tuition fee for CSE?"
      );
    }
    // 2. CSE / COMPUTER SCIENCE
    else if (lowerQuery.includes("cse") || lowerQuery.includes("computer science") || lowerQuery.includes("software")) {
      const p = EWU_PROGRAMS.find((x) => x.id === "cse")!;
      fallbackReply = `### 🎓 B.Sc. in Computer Science & Engineering (CSE) at EWU

**Key Highlights:**
- **Degree:** ${p.degree} (BAETE IEB Tier-1 Accredited)
- **Duration:** 4 Years (12 Trimesters)
- **Total Credits:** ${p.totalCredits} Credits
- **Tuition Fee per Credit:** ৳${p.perCreditFeeBDT.toLocaleString()} BDT
- **One-time Admission Fee:** ৳${p.admissionFeeBDT.toLocaleString()} BDT
- **Lab & Activity Fee:** ~৳${p.labAndOtherFeePerSemBDT.toLocaleString()} per semester
- **Estimated Total Cost:** **৳${p.estimatedTotalCostBDT.toLocaleString()} BDT** (approx. ৳${Math.round(p.estimatedTotalCostBDT / p.totalSemesters).toLocaleString()} per semester)

**Eligibility:**
${p.eligibility}

**Why EWU CSE?**
- BAETE accreditation qualifying graduates for international IEB recognition.
- Active competitive programming culture (EWUCoPC) and state-of-the-art AI, robotics, and networking labs.`;
      suggestions.push("How to get a waiver for CSE?", "Admission test syllabus for CSE", "Fee structure for EEE");
    }
    // 3. BBA / BUSINESS
    else if (lowerQuery.includes("bba") || lowerQuery.includes("business") || lowerQuery.includes("management")) {
      const p = EWU_PROGRAMS.find((x) => x.id === "bba")!;
      fallbackReply = `### 💼 Bachelor of Business Administration (BBA) at EWU

**Program Overview:**
- **Degree:** ${p.degree}
- **Faculty:** ${p.faculty}
- **Total Credits:** ${p.totalCredits} Credits (12 Semesters / 4 Years)
- **Tuition Fee per Credit:** ৳${p.perCreditFeeBDT.toLocaleString()} BDT
- **One-time Admission Fee:** ৳${p.admissionFeeBDT.toLocaleString()} BDT
- **Estimated Total 4-Year Cost:** **৳${p.estimatedTotalCostBDT.toLocaleString()} BDT**

**Majors Available:**
Finance, Marketing, Human Resource Management (HRM), Accounting, Management Information Systems (MIS), Supply Chain Management, and International Business.

**Eligibility:**
${p.eligibility}`;
      suggestions.push("What are the scholarship options for BBA?", "How to apply for EWU admission?", "What is the fee for Economics?");
    }
    // 4. PHARMACY
    else if (lowerQuery.includes("pharma") || lowerQuery.includes("pharmacy")) {
      const p = EWU_PROGRAMS.find((x) => x.id === "pharmacy")!;
      fallbackReply = `### 💊 Bachelor of Pharmacy (B.Pharm) at EWU

**Program Details:**
- **Degree:** ${p.degree}
- **Accreditation:** Fully accredited by the **Pharmacy Council of Bangladesh (PCB)**
- **System:** Bi-Semester system (8 Semesters / 4 Years)
- **Total Credits:** ${p.totalCredits} Credits
- **Tuition Fee per Credit:** ৳${p.perCreditFeeBDT.toLocaleString()} BDT
- **Estimated Total Cost:** **৳${p.estimatedTotalCostBDT.toLocaleString()} BDT**

**Eligibility Criteria:**
${p.eligibility}`;
      suggestions.push("Fee comparison with other departments", "Medha Lalon scholarship for Pharmacy", "Where is the EWU campus located?");
    }
    // 5. TUITION FEES & COSTS
    else if (
      lowerQuery.includes("fee") ||
      lowerQuery.includes("cost") ||
      lowerQuery.includes("taka") ||
      lowerQuery.includes("bdt") ||
      lowerQuery.includes("tuition") ||
      lowerQuery.includes("khoroch") ||
      lowerQuery.includes("rate")
    ) {
      fallbackReply = `### 💰 East West University Tuition Fee Overview (Undergraduate)

Here is a summary of total 4-year tuition fees:

| Program | Total Credits | Per Credit (BDT) | Estimated Total Cost (BDT) |
| :--- | :--- | :--- | :--- |
| **B.Sc. in CSE** | 140 | ৳5,500 | **৳8,55,000** |
| **B.Sc. in EEE** | 140 | ৳5,200 | **৳8,13,000** |
| **B.Sc. in Civil Eng.** | 152 | ৳5,100 | **৳8,60,200** |
| **B.Pharm** | 160 | ৳5,400 | **৳9,41,000** |
| **BBA** | 123 | ৳5,300 | **৳7,24,900** |
| **B.S.S. Economics** | 120 | ৳4,800 | **৳6,43,000** |
| **B.A. in English** | 123 | ৳4,600 | **৳6,32,800** |
| **LL.B. (Honours)** | 130 | ৳5,000 | **৳7,17,000** |
| **B.Sc. in GEB** | 130 | ৳5,100 | **৳7,54,000** |

*Note: Includes ৳25,000 one-time admission fee and semester charges. Merit scholarships up to 100% are available!*`;
      suggestions.push("How to apply for 100% Medha Lalon waiver?", "Open the Tuition Fee Calculator", "What are the admission requirements?");
    }
    // 6. SCHOLARSHIPS & WAIVERS
    else if (
      lowerQuery.includes("scholarship") ||
      lowerQuery.includes("waiver") ||
      lowerQuery.includes("discount") ||
      lowerQuery.includes("medha") ||
      lowerQuery.includes("financial aid")
    ) {
      fallbackReply = `### 🏆 Scholarships & Tuition Fee Waivers at EWU

East West University awards generous merit and financial aid scholarships:

1. **Medha Lalon Scholarship (100% Tuition Waiver):**
   - Awarded to students with GPA 5.00 (Golden) in SSC & HSC or top scores in the EWU Admission Test.
   - Retained by maintaining a CGPA of 3.80+ each semester.

2. **Semester-Wise Merit Waiver:**
   - **CGPA 3.90 – 4.00:** 100% Tuition Waiver for next semester.
   - **CGPA 3.80 – 3.89:** 50% Tuition Waiver.
   - **CGPA 3.70 – 3.79:** 25% Tuition Waiver.

3. **Freedom Fighter Quota (100% Waiver):**
   - Full 100% tuition waiver throughout 4 years for children of Freedom Fighters.

4. **Sibling & Spouse Concession (50% Waiver):**
   - 50% waiver for the 2nd sibling/spouse studying simultaneously.

5. **Financial Hardship / Trustee's Special Grant:**
   - 25% to 75% assistance for deserving students facing hardship.`;
      suggestions.push("How do I maintain my 100% waiver?", "Calculate my fees with 50% waiver", "Admission eligibility criteria");
    }
    // 7. ADMISSION & ELIGIBILITY & APPLY
    else if (
      lowerQuery.includes("admission") ||
      lowerQuery.includes("apply") ||
      lowerQuery.includes("requirement") ||
      lowerQuery.includes("eligibility") ||
      lowerQuery.includes("gpa") ||
      lowerQuery.includes("test") ||
      lowerQuery.includes("syllabus")
    ) {
      fallbackReply = `### 📝 EWU Admission Requirements & Procedure

**General Eligibility for Undergraduate Programs:**
- Minimum GPA **2.50** individually in both SSC and HSC (or equivalent).
- Combined total GPA of at least **6.00** across SSC & HSC.
- **For Engineering (CSE/EEE/CE):** Must have passed Physics & Mathematics in HSC.
- **For Pharmacy:** Combined GPA 8.00+ in SSC & HSC; minimum GPA 3.00 in Chemistry and Biology.
- **For English Medium ('O' / 'A' Levels):** At least 5 subjects in 'O' Level and 2 subjects in 'A' Level with minimum grade points.

**Admission Test Structure:**
- **Section 1:** English Grammar, Vocabulary & Reading Comprehension
- **Section 2:** General Mathematics & Analytical Problem Solving
- **Section 3:** Subject-specific test (Higher Math & Physics for Engineering; Biology & Chemistry for Pharmacy).`;
      suggestions.push("Total tuition fee for CSE", "Medha Lalon 100% waiver criteria", "Campus location and contact number");
    }
    // 8. BUS & TRANSPORT
    else if (
      lowerQuery.includes("bus") ||
      lowerQuery.includes("transport") ||
      lowerQuery.includes("route") ||
      lowerQuery.includes("gari")
    ) {
      fallbackReply = `### 🚌 East West University Transport & Bus Service

EWU provides dedicated student bus routes across major parts of Dhaka:
- **Route 1:** Mirpur 10 / 11 ↔ Kazipara ↔ Shewrapara ↔ Mohakhali ↔ EWU Campus
- **Route 2:** Uttara (House Building) ↔ Airport ↔ Khilkhet ↔ Kuril ↔ Badda ↔ EWU Campus
- **Route 3:** Dhanmondi (Science Lab) ↔ Shahbagh ↔ Kakrail ↔ Moghbazar ↔ Rampura ↔ EWU Campus
- **Route 4:** Jatrabari ↔ Sayedabad ↔ Kamalapur ↔ Khilgaon ↔ Malibagh ↔ EWU Campus

*Buses operate during morning and evening shifts matching class schedules.*`;
      suggestions.push("Where is the EWU campus located?", "What is the total fee for CSE?", "How to get a scholarship?");
    }
    // 9. CLUBS & STUDENT LIFE
    else if (lowerQuery.includes("club") || lowerQuery.includes("life") || lowerQuery.includes("activities")) {
      fallbackReply = `### 🎯 Student Clubs & Extracurricular Activities at EWU

EWU has 18+ active student organizations:
- **EWU Computer Programming Club (EWUCoPC):** Competitive programming, hackathons, and software dev.
- **EWU Robotics Club (EWURC):** Hardware prototyping, IoT, and national robotics competitions.
- **EWU Business Club (EWUBC):** Case competitions, business summits, and career seminars.
- **EWU Debating Club (EWUDC):** National and international parliamentary debate tournaments.
- **EWU Photography Club, Cultural Club, Sports Club, Rotaract Club.**`;
      suggestions.push("What degree programs does EWU offer?", "What are the scholarship options?", "Where is the EWU campus?");
    }
    // 10. GENERAL DEFAULT WELCOME
    else {
      fallbackReply = `Welcome to **East West University (EWU) AI Assistant**! 🎓

I can help you with comprehensive details regarding:
- 💰 **Tuition Fees & Credit Costs:** Exact fee breakdowns for CSE, EEE, Civil, BBA, Pharmacy, English, Law, Economics, MBA, etc.
- 🏆 **Scholarships & Waivers:** Medha Lalon 100% merit waiver, semester GPA waivers (CGPA 3.90+ for 100%), Freedom Fighter quota, sibling discounts.
- 📝 **Admissions & Eligibility:** GPA requirements, subject prerequisites, and admission test syllabus.
- 🏫 **Campus & Student Life:** Aftabnagar permanent campus location, transport bus routes, library, and student clubs.
- 📊 **Grading System & Academic Calendar:** 4.00 CGPA scale, Tri-semester breakdown (Spring, Summer, Fall).

*Feel free to ask any specific question or choose from the suggested queries below!*`;
      suggestions.push(
        "Where is the EWU campus located?",
        "What is the total fee for B.Sc. in CSE?",
        "How to get a 100% scholarship at EWU?",
        "What are the admission requirements?"
      );
    }

    return res.json({
      reply: fallbackReply,
      programCard: matchedProgram,
      suggestedQuestions: suggestions,
    });
  });

  // Vite middleware for development or static dist serving in production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EWU Chatbot & Fee Assistant server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
