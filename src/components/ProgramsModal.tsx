import React, { useState } from 'react';
import { X, Search, BookOpen, Clock, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EWU_PROGRAMS } from '../data/ewuData';
import { ProgramInfo } from '../types';

interface ProgramsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgramPrompt: (prompt: string) => void;
  onOpenCalculatorWithProgram: (programId: string) => void;
}

export const ProgramsModal: React.FC<ProgramsModalProps> = ({
  isOpen,
  onClose,
  onSelectProgramPrompt,
  onOpenCalculatorWithProgram,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');

  if (!isOpen) return null;

  const faculties = [
    { id: 'all', label: 'All Departments' },
    { id: 'Sciences & Engineering', label: 'Sciences & Engineering' },
    { id: 'Business & Economics', label: 'Business & Economics' },
    { id: 'Liberal Arts & Social Sciences', label: 'Liberal Arts & Social Sciences' },
  ];

  const filteredPrograms = EWU_PROGRAMS.filter((prog) => {
    const matchesSearch =
      prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty =
      selectedFaculty === 'all' || prog.faculty.includes(selectedFaculty);
    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        id="ewu-programs-modal"
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-[#004a99] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Academic Programs & Tuition Fees
              </h2>
              <p className="text-xs text-blue-100">
                Explore undergraduate and graduate degrees at East West University
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by degree or department (e.g. CSE, Pharmacy, BBA, Law)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {faculties.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFaculty(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  selectedFaculty === f.id
                    ? 'bg-[#0b1e36] text-white font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No programs found matching your search. Try searching &quot;CSE&quot;, &quot;BBA&quot;, or &quot;Pharmacy&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrograms.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 hover:border-amber-400/80 rounded-xl p-4 transition shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                        {p.faculty}
                      </span>
                      <span className="text-xs font-bold text-slate-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                        ~৳{(p.estimatedTotalCostBDT / 100000).toFixed(2)} Lakh
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {p.degree}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3">{p.name}</p>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg text-xs mb-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Credits</span>
                        <span className="font-semibold text-slate-800">{p.totalCredits}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Per Credit</span>
                        <span className="font-semibold text-slate-800">৳{p.perCreditFeeBDT.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Duration</span>
                        <span className="font-semibold text-slate-800">{p.durationYears} Years</span>
                      </div>
                    </div>

                    <div className="space-y-1 mb-3">
                      {p.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start space-x-1.5 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onOpenCalculatorWithProgram(p.id);
                        onClose();
                      }}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline"
                    >
                      Calculate with Waiver
                    </button>
                    <button
                      onClick={() => {
                        onSelectProgramPrompt(`What is the fee breakdown and admission requirement for ${p.degree} at EWU?`);
                        onClose();
                      }}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition"
                    >
                      <span>Ask AI</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-200 border border-slate-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
