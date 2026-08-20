import React from 'react';
import { Calculator, HelpCircle, Award, MapPin, ArrowUpRight, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import { EWU_PROGRAMS } from '../data/ewuData';

interface BentoSidebarProps {
  onOpenCalculator: () => void;
  onOpenPrograms: () => void;
  onOpenWaivers: () => void;
  onOpenCampus: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const BentoSidebar: React.FC<BentoSidebarProps> = ({
  onOpenCalculator,
  onOpenPrograms,
  onOpenWaivers,
  onOpenCampus,
  onSelectPrompt,
}) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Bento Card 1: Quick Fee Calculator Highlight (EWU Blue #004a99) */}
      <div className="bg-[#004a99] text-white rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition duration-500"></div>

        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase block mb-1">
              Tuition Estimator
            </span>
            <h3 className="font-bold text-lg leading-tight text-white">
              Quick Fee<br />Calculator
            </h3>
          </div>
          <button
            onClick={onOpenCalculator}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition cursor-pointer"
            title="Open Interactive Calculator"
          >
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1.5 my-2">
          <div className="flex justify-between items-center text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-xl">
            <span>B.Sc. in CSE</span>
            <span className="font-bold text-white">৳ 5,500/cr</span>
          </div>
          <div className="flex justify-between items-center text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-xl">
            <span>BBA Program</span>
            <span className="font-bold text-white">৳ 5,300/cr</span>
          </div>
          <div className="flex justify-between items-center text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-xl">
            <span>B.Pharm (PCB)</span>
            <span className="font-bold text-white">৳ 5,400/cr</span>
          </div>
        </div>

        <button
          onClick={onOpenCalculator}
          className="w-full mt-2 py-2 bg-amber-400 hover:bg-amber-300 text-[#004a99] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          Calculate With Scholarship
        </button>
      </div>

      {/* Bento Card 2: Common Queries & Categories */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#004a99]" />
              Common Queries
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Quick tap</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onSelectPrompt("How can I get the 100% Medha Lalon scholarship at EWU?")}
              className="text-[11px] bg-slate-100 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 font-medium transition"
            >
              Scholarships
            </button>
            <button
              onClick={() => onSelectPrompt("Where is the EWU campus located?")}
              className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 font-medium transition"
            >
              Campus Location
            </button>
            <button
              onClick={() => onSelectPrompt("What is the admission test syllabus for undergraduate degrees?")}
              className="text-[11px] bg-slate-100 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-900 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 font-medium transition"
            >
              Admission Test
            </button>
            <button
              onClick={() => onSelectPrompt("What are the criteria for semester CGPA waivers at EWU?")}
              className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 font-medium transition"
            >
              GPA Waivers
            </button>
            <button
              onClick={() => onSelectPrompt("What is the total fee and credit requirement for BBA?")}
              className="text-[11px] bg-slate-100 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-900 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 font-medium transition"
            >
              BBA Credits
            </button>
            <button
              onClick={() => onSelectPrompt("Tell me about the Tri-semester academic calendar and grading system.")}
              className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 font-medium transition"
            >
              Semesters
            </button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
          <button
            onClick={onOpenPrograms}
            className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs rounded-xl font-bold transition flex items-center justify-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            All Programs
          </button>
          <button
            onClick={onOpenWaivers}
            className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-xl font-bold transition flex items-center justify-center"
            title="Scholarships"
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </div>

      {/* Bento Mini Metric Badges (Grid of 2 or 3) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Metric 1: Scholarships */}
        <div
          onClick={onOpenWaivers}
          className="bg-orange-50 hover:bg-orange-100/70 border border-orange-100 rounded-3xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition shadow-2xs group"
        >
          <div className="w-7 h-7 rounded-full bg-orange-200/60 flex items-center justify-center text-orange-700 mb-1 group-hover:scale-110 transition">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-orange-700 font-black text-xl leading-none">100%</div>
          <div className="text-[10px] font-bold text-orange-900 uppercase tracking-tight mt-1">
            Medha Lalon
          </div>
          <div className="text-[9px] text-orange-700/80">Tuition Waiver</div>
        </div>

        {/* Metric 2: Campus */}
        <div
          onClick={onOpenCampus}
          className="bg-blue-50 hover:bg-blue-100/70 border border-blue-100 rounded-3xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition shadow-2xs group"
        >
          <div className="w-7 h-7 rounded-full bg-blue-200/60 flex items-center justify-center text-[#004a99] mb-1 group-hover:scale-110 transition">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-[#004a99] font-black text-base leading-none">Aftabnagar</div>
          <div className="text-[10px] font-bold text-blue-900 uppercase tracking-tight mt-1">
            Permanent Campus
          </div>
          <div className="text-[9px] text-blue-700/80">Campus information</div>
        </div>
      </div>
    </div>
  );
};
