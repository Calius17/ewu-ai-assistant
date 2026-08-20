import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ChatArea } from './components/ChatArea';
import { BentoSidebar } from './components/BentoSidebar';
import { TuitionFeeCalculatorModal } from './components/TuitionFeeCalculatorModal';
import { ProgramsModal } from './components/ProgramsModal';
import { WaiversModal } from './components/WaiversModal';
import { CampusModal } from './components/CampusModal';
import { ChatMessage } from './types';

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'init-1',
  sender: 'bot',
  text: `Welcome to **East West University (EWU) Virtual Assistant**! 🎓

How can I help you today? I can answer questions about:
- **Tuition fees & per-credit costs** (CSE, EEE, BBA, Pharmacy, English, Law, Civil, Economics, etc.)
- **Scholarships & Waivers** (100% Medha Lalon, Semester GPA waivers, Freedom Fighter quota)
- **Admission requirements & test syllabus**
- **Campus facilities, grading (CGPA) & student life**`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedQuestions: [
    'What is the credit fee for the CSE department?',
    'How to get 100% scholarship at EWU?',
    'What are the undergraduate admission requirements?',
    'Where is the EWU campus located?',
  ],
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modals state
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorProgramId, setCalculatorProgramId] = useState<string>('cse');
  const [isProgramsOpen, setIsProgramsOpen] = useState<boolean>(false);
  const [isWaiversOpen, setIsWaiversOpen] = useState<boolean>(false);
  const [isCampusOpen, setIsCampusOpen] = useState<boolean>(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      // Build previous turn history for server context
      const chatHistory = newHistory.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          history: chatHistory.slice(0, -1),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'I received your question. How else can I assist you with EWU admissions?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: data.suggestedQuestions,
        programCard: data.programCard,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Chat request error:', err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'Please check the official EWU website for more information: https://www.ewubd.edu',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'What is the credit fee for the CSE department?',
          'How to get 100% scholarship at EWU?',
          'What are the undergraduate admission requirements?',
        ],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCalculatorWithProgram = (programId: string) => {
    setCalculatorProgramId(programId);
    setIsCalculatorOpen(true);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] text-slate-900 font-sans p-3 sm:p-6 flex flex-col overflow-hidden">
      {/* Header */}
      <Navbar
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenPrograms={() => setIsProgramsOpen(true)}
        onOpenWaivers={() => setIsWaiversOpen(true)}
        onOpenCampus={() => setIsCampusOpen(true)}
        onResetChat={handleResetChat}
      />

      {/* Main Bento Grid Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
        {/* Left Bento Cell: Active Chat Session */}
        <div className="col-span-1 lg:col-span-8 h-full min-h-0">
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onOpenCalculatorWithProgram={handleOpenCalculatorWithProgram}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenPrograms={() => setIsProgramsOpen(true)}
            onOpenWaivers={() => setIsWaiversOpen(true)}
            onOpenCampus={() => setIsCampusOpen(true)}
          />
        </div>

        {/* Right Bento Cells: Quick Calculator, Common Queries, and Metrics */}
        <div className="col-span-1 lg:col-span-4 h-full overflow-y-auto lg:overflow-y-visible pr-0.5">
          <BentoSidebar
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenPrograms={() => setIsProgramsOpen(true)}
            onOpenWaivers={() => setIsWaiversOpen(true)}
            onOpenCampus={() => setIsCampusOpen(true)}
            onSelectPrompt={handleSendMessage}
          />
        </div>
      </main>

      {/* Modals */}
      <TuitionFeeCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSelectPrompt={(p) => handleSendMessage(p)}
        initialProgramId={calculatorProgramId}
      />

      <ProgramsModal
        isOpen={isProgramsOpen}
        onClose={() => setIsProgramsOpen(false)}
        onSelectProgramPrompt={(p) => handleSendMessage(p)}
        onOpenCalculatorWithProgram={handleOpenCalculatorWithProgram}
      />

      <WaiversModal
        isOpen={isWaiversOpen}
        onClose={() => setIsWaiversOpen(false)}
        onSelectWaiverPrompt={(p) => handleSendMessage(p)}
      />

      <CampusModal
        isOpen={isCampusOpen}
        onClose={() => setIsCampusOpen(false)}
        onSelectPrompt={(p) => handleSendMessage(p)}
      />
    </div>
  );
}
