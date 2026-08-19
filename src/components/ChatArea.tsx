import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Calculator,
  RotateCcw,
  BookOpen,
  Award,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, ProgramInfo } from '../types';

interface ChatAreaProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onOpenCalculatorWithProgram: (programId: string) => void;
  onOpenCalculator: () => void;
  onOpenPrograms: () => void;
  onOpenWaivers: () => void;
  onOpenCampus: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onOpenCalculatorWithProgram,
  onOpenCalculator,
  onOpenPrograms,
  onOpenWaivers,
  onOpenCampus,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');
    onSendMessage(text);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*`_~[\]()]/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
      {/* Session Top Bar */}
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#004a99]"></span>
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Active Chat Session
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            • Aftab AI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-mono bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
            Ref: #EWU-9921
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
              msg.sender === 'user' ? 'self-end flex-row-reverse ml-auto' : ''
            }`}
          >
            {/* Avatar */}
            {msg.sender === 'bot' ? (
              <div className="w-8 h-8 rounded-full bg-[#004a99] shrink-0 flex items-center justify-center text-white text-[10px] font-black shadow-xs">
                AI
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-300 shrink-0 flex items-center justify-center text-slate-700 text-[10px] font-bold">
                USER
              </div>
            )}

            {/* Bubble Content */}
            <div className="flex-1 space-y-1.5 min-w-0">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#004a99] text-white rounded-tr-none shadow-md shadow-blue-100'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}
              >
                {msg.sender === 'bot' ? (
                  <div className="prose prose-xs sm:prose-sm max-w-none text-slate-800 prose-headings:text-slate-900 prose-headings:font-bold prose-headings:my-2 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-table:my-2 prose-table:border prose-table:border-slate-300 prose-th:bg-slate-200/80 prose-th:p-2 prose-td:p-2 prose-td:border-t prose-td:border-slate-200 overflow-x-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
                )}

                {/* Attached Program Preview Card */}
                {msg.programCard && (
                  <div className="mt-3 p-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#004a99]">
                        {msg.programCard.degree}
                      </span>
                      <span className="font-bold text-slate-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-[11px]">
                        ~৳{(msg.programCard.estimatedTotalCostBDT / 100000).toFixed(2)} Lakh
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                      <div>Credits: <strong className="text-slate-900">{msg.programCard.totalCredits}</strong></div>
                      <div>Per Credit: <strong className="text-slate-900">৳{msg.programCard.perCreditFeeBDT.toLocaleString()}</strong></div>
                      <div>Semesters: <strong className="text-slate-900">{msg.programCard.totalSemesters}</strong></div>
                      <div>Admission Fee: <strong className="text-slate-900">৳{msg.programCard.admissionFeeBDT.toLocaleString()}</strong></div>
                    </div>
                    <div className="pt-1 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onOpenCalculatorWithProgram(msg.programCard!.id)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-[#004a99] hover:underline cursor-pointer"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        Calculate Net Fee with Scholarship
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bot response actions */}
              {msg.sender === 'bot' && (
                <div className="flex items-center space-x-2 px-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center space-x-1 p-1 rounded-md hover:bg-slate-200 transition cursor-pointer"
                    title="Copy answer"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeak(msg.id, msg.text)}
                    className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center space-x-1 p-1 rounded-md hover:bg-slate-200 transition cursor-pointer"
                    title="Listen to answer"
                  >
                    {speakingId === msg.id ? (
                      <>
                        <VolumeX className="w-3 h-3 text-rose-600" />
                        <span className="text-rose-600">Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                  <span className="text-[10px] text-slate-400">• {msg.timestamp}</span>
                </div>
              )}

              {/* Suggested Questions Pills */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSendMessage(q)}
                      className="px-3 py-1.5 text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-[#004a99] border border-slate-200 hover:border-blue-300 rounded-full transition shadow-2xs text-left cursor-pointer active:scale-98"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-[#004a99] shrink-0 flex items-center justify-center text-white text-[10px] font-black animate-pulse">
              AI
            </div>
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#004a99] animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-[#004a99] animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-[#004a99] animate-bounce"></div>
              <span className="text-xs text-slate-500 font-medium ml-1">
                Searching EWU university database...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Form Input Container (Bento Grid Footer) */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-100 mt-auto shrink-0">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-2xl p-1.5 sm:p-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-[#004a99] transition shadow-2xs"
        >
          <input
            ref={inputRef}
            id="chat-input-field"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about admission, scholarships, or fees..."
            autoComplete="off"
            className="bg-transparent border-none focus:ring-0 text-xs sm:text-sm flex-1 px-3 py-2 outline-none text-slate-900 placeholder:text-slate-400"
          />
          <button
            id="chat-submit-btn"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`p-2 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
              inputText.trim() && !isLoading
                ? 'bg-[#004a99] text-white hover:bg-blue-800 shadow-sm active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </section>
  );
};
