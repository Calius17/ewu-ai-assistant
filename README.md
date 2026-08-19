# 🎓 East West University (EWU) AI Assistant & Tuition Fee Calculator

[![Vercel Ready](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Powered_by-Gemini_AI-orange?logo=google)](https://ai.google.dev/)

An intelligent, interactive virtual assistant and tuition fee calculator designed for prospective students, current students, and guardians of **East West University (EWU)** in Dhaka, Bangladesh.

---

## ✨ Features

- 🤖 **AI Assistant ("Aftab")**: Powered by Google Gemini AI with multi-model fallback (`gemini-3.7-flash`, `gemini-3.6-flash`, `gemini-flash-latest`), understanding English, Bengali (বাংলা), and Banglish.
- 💰 **Interactive 4-Year Tuition Fee Calculator**: Select any undergraduate program (CSE, EEE, Civil, BBA, Pharmacy, English, Law, Economics, etc.) and apply real-time scholarship waivers (0% – 100%) to calculate semester breakdowns and total degree costs.
- 🏆 **Scholarship & Financial Aid Guide**: Detailed criteria for the 100% Medha Lalon Scholarship (Golden GPA 5.0), semester-wise CGPA waivers (CGPA 3.90+ for 100%), Freedom Fighter quota, and sibling concessions.
- 📚 **Academic Programs Directory**: Complete credit requirements, per-credit rates, laboratory charges, and eligibility criteria for all EWU departments.
- 📍 **Campus Life, Grading & Transport**: Information on the Aftabnagar permanent campus, 4.00 CGPA grading scale, 18+ student clubs (EWUCoPC, Robotics Club, EWUBC), and university bus routes across Dhaka.
- 🔊 **Text-to-Speech (TTS) & One-Click Copy**: Built-in speech synthesis allowing users to listen to responses directly in their browser.
- 🍱 **Modern Bento Grid Interface**: High-contrast, clean layout tailored to EWU's university branding (`#004a99`).

---

## 🚀 Live Demo & Links

- **Production URL**: Add the Vercel URL here after deployment, for example `https://ewu-ai-assistant.vercel.app`.
- **Source Code**: [github.com/Calius17/ewu-ai-assistant](https://github.com/Calius17/ewu-ai-assistant)

The deployed app works without an API key using its local EWU information engine. Add
`GEMINI_API_KEY` in Vercel Project Settings to enable Gemini-powered answers.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, React-Markdown.
- **Backend / Serverless**: Node.js, Express, `@google/genai` TypeScript SDK.
- **Deployment**: Vercel Serverless Functions & Cloud Run compatible.

---

## 📦 Upload to GitHub

Run these commands in PowerShell from the project directory. Replace the repository URL
with the URL of your own empty GitHub repository.

### Step 1: Initialize and commit the project

```powershell
git init
git add .
git commit -m "feat: initial release of EWU AI Assistant and Tuition Calculator"
git branch -M main
```

### Step 2: Create a New GitHub Repository
1. Go to [GitHub.com](https://github.com/new) and click **New Repository**.
2. Name your repository (e.g., `ewu-ai-assistant` or `east-west-university-chatbot`).
3. Leave "Add a README file" **unchecked** because this project already has one.
4. Click **Create repository**.

### Step 3: Link and Push to GitHub
Copy the repository URL from GitHub and run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/ewu-ai-assistant.git
git push -u origin main
```

GitHub may open a browser window for authentication. Never commit `.env`; it is
ignored by this project, while `.env.example` is safe to share.

---

## ⚡ How to Deploy on Vercel

This repository includes a pre-configured `vercel.json` and serverless API route in `/api/index.ts`.

### Deploy from GitHub

1. **Sign In to Vercel**: Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. **Import Project**: Click **Add New...** > **Project**, and select your GitHub repository.
3. **Configure Environment Variables**:
    - In the **Environment Variables** section, add `GEMINI_API_KEY` with a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
4. **Deploy**:
   - The repository includes `vercel.json`; keep the detected Vite settings and deploy.
   - Click **Deploy**.
5. Copy the generated `https://your-project-name.vercel.app` URL and add it to the **Live Demo & Links** section above.

### Verify the deployment

After deployment, check these URLs in a browser:

```text
https://your-project-name.vercel.app/
https://your-project-name.vercel.app/api/health
```

The second URL should return JSON with `"status":"ok"`.

---

## 💻 Local Development Setup

To run this application locally on your machine:

```powershell
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ewu-ai-assistant.git
cd ewu-ai-assistant

# 2. Install dependencies
npm install

# 3. Set up environment variables (PowerShell)
Copy-Item .env.example .env
# Open .env and add your GEMINI_API_KEY if Gemini answers are needed

# 4. Start the development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 📁 Project Structure

```
├── api/
│   └── index.ts                 # Vercel Serverless API handler
├── src/
│   ├── components/
│   │   ├── BentoSidebar.tsx     # Quick estimator & prompt shortcuts
│   │   ├── CampusModal.tsx      # Campus, grading & transport guide
│   │   ├── ChatArea.tsx         # Active conversation window & input
│   │   ├── Navbar.tsx           # Brand header & navigation
│   │   ├── ProgramsModal.tsx    # Academic degrees directory
│   │   ├── TuitionFeeCalculatorModal.tsx # Interactive fee calculator
│   │   └── WaiversModal.tsx     # Scholarship policies modal
│   ├── data/
│   │   └── ewuData.ts           # Verified EWU tuition, programs & policies
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Root Bento Grid layout
│   ├── main.tsx                 # Client entry point
│   └── index.css                # Global Tailwind styles
├── server.ts                    # Full-stack Express development server
├── vercel.json                  # Vercel deployment configuration
├── package.json
└── README.md
```

---

## 📄 License

This project is created for educational and informational purposes for the East West University community.
