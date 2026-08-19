import React from 'react';
import { Calculator, BookOpen, Award, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { EWU_INFO } from '../data/ewuData';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenPrograms: () => void;
  onOpenWaivers: () => void;
  onOpenCampus: () => void;
  onResetChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCalculator,
  onOpenPrograms,
  onOpenWaivers,
  onOpenCampus,
  onResetChat,
}) => {
  return (
    <header className="flex justify-between items-center mb-4 sm:mb-6">
      {/* Brand */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={onResetChat}
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#004a99] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-xs">
          E
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#004a99] flex items-center gap-1.5">
            East West University
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-semibold tracking-widest">
            Student Support AI
          </p>
        </div>
      </div>

      {/* Right side stats & quick controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 bg-green-50 px-2.5 sm:px-3 py-1.5 rounded-full border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-green-700 hidden xs:inline">
            Live System Status
          </span>
          <span className="text-xs font-medium text-green-700 xs:hidden">
            Online
          </span>
        </div>

        <div className="text-xs text-slate-500 font-medium hidden md:block bg-white px-3 py-1.5 rounded-full border border-slate-200">
          Tri-Semester • Aftabnagar
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenCalculator}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#004a99] border border-slate-200 shadow-2xs transition sm:hidden"
            title="Fee Calculator"
          >
            <Calculator className="w-4 h-4" />
          </button>

          <a
            href="https://www.ewubd.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-[#004a99] border border-slate-200 shadow-2xs transition"
            title="Official EWU Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
