import React, { useState, useMemo } from 'react';
import { X, Calculator, Sparkles, CheckCircle2, TrendingDown, HelpCircle, MessageSquare } from 'lucide-react';
import { EWU_PROGRAMS, EWU_WAIVERS } from '../data/ewuData';
import { ProgramInfo } from '../types';

interface TuitionFeeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
  initialProgramId?: string;
}

export const TuitionFeeCalculatorModal: React.FC<TuitionFeeCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
  initialProgramId = 'cse',
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialProgramId);
  const [waiverType, setWaiverType] = useState<string>('0');
  const [customWaiverPercent, setCustomWaiverPercent] = useState<number>(0);

  const selectedProgram: ProgramInfo = useMemo(() => {
    return EWU_PROGRAMS.find((p) => p.id === selectedProgramId) || EWU_PROGRAMS[0];
  }, [selectedProgramId]);

  const activeWaiverPercent = useMemo(() => {
    if (waiverType === 'custom') return customWaiverPercent;
    return Number(waiverType);
  }, [waiverType, customWaiverPercent]);

  // Calculations
  const baseTuition = selectedProgram.publishedTuitionBDT ?? selectedProgram.totalCredits * selectedProgram.perCreditFeeBDT;
  const labAndSemesterTotal = selectedProgram.publishedOtherFeesBDT ?? selectedProgram.labAndOtherFeePerSemBDT * selectedProgram.totalSemesters;
  const waiverSavings = Math.round((baseTuition * activeWaiverPercent) / 100);
  const netTuition = baseTuition - waiverSavings;
  const netTotalCost = netTuition + selectedProgram.admissionFeeBDT + labAndSemesterTotal;
  const perSemesterCost = Math.round(netTotalCost / selectedProgram.totalSemesters);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        id="tuition-calculator-modal"
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="bg-[#004a99] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                EWU Tuition Fee & Waiver Calculator
              </h2>
              <p className="text-xs text-blue-100">
                Estimate 4-year total degree cost and semester breakdown for East West University
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          {/* Program selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              1. Select Degree Program
            </label>
            <select
              id="calculator-program-select"
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none transition cursor-pointer"
            >
              {EWU_PROGRAMS.map((prog) => (
                <option key={prog.id} value={prog.id}>
                  {prog.degree} — {prog.name} ({prog.totalCredits} Credits, {prog.totalSemesters} Semesters)
                </option>
              ))}
            </select>
          </div>

          {/* Scholarship / Waiver Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              2. Apply Scholarship or Tuition Waiver
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setWaiverType('0')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                  waiverType === '0'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-slate-900">0% Regular</div>
                <div className="text-[10px] text-slate-500">Standard fee</div>
              </button>

              <button
                type="button"
                onClick={() => setWaiverType('100')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                  waiverType === '100'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-emerald-700">100% Waiver</div>
                <div className="text-[10px] text-slate-500">GPA 5.0 / CGPA 3.90+</div>
              </button>

              <button
                type="button"
                onClick={() => setWaiverType('50')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                  waiverType === '50'
                    ? 'border-blue-600 bg-blue-50 text-blue-950 font-semibold ring-1 ring-blue-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-blue-700">50% Waiver</div>
                <div className="text-[10px] text-slate-500">CGPA 3.80 / Sibling</div>
              </button>

              <button
                type="button"
                onClick={() => setWaiverType('25')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                  waiverType === '25'
                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-semibold ring-1 ring-purple-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-purple-700">25% Waiver</div>
                <div className="text-[10px] text-slate-500">CGPA 3.70 – 3.79</div>
              </button>
            </div>

            {/* Custom slider if needed */}
            <div className="mt-3 flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-600">Custom Waiver:</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={activeWaiverPercent}
                onChange={(e) => {
                  setWaiverType('custom');
                  setCustomWaiverPercent(Number(e.target.value));
                }}
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md min-w-[45px] text-center">
                {activeWaiverPercent}%
              </span>
            </div>
          </div>

          {/* Breakdown Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0b1e36] text-white rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div>
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                  Calculation Summary
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedProgram.degree}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {selectedProgram.totalSemesters} Semesters • {selectedProgram.totalCredits} Credits
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/40">
                <span className="text-slate-400 block mb-0.5">Per Credit Rate</span>
                <span className="font-semibold text-white text-sm">
                  ৳{selectedProgram.perCreditFeeBDT.toLocaleString()} BDT
                </span>
              </div>

              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/40">
                <span className="text-slate-400 block mb-0.5">Admission Fee</span>
                <span className="font-semibold text-white text-sm">
                  ৳{selectedProgram.admissionFeeBDT.toLocaleString()} BDT
                </span>
                <span className="text-[10px] text-slate-400 block">(One-time)</span>
              </div>

              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/40 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block mb-0.5">Semester & Lab Fees</span>
                <span className="font-semibold text-white text-sm">
                  ৳{labAndSemesterTotal.toLocaleString()} BDT
                </span>
                <span className="text-[10px] text-slate-400 block">
                  (৳{selectedProgram.labAndOtherFeePerSemBDT.toLocaleString()} / sem)
                </span>
              </div>
            </div>

            {/* Waiver deduction line */}
            {activeWaiverPercent > 0 && (
              <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-300 text-xs">
                <span className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  Scholarship Discount ({activeWaiverPercent}% on Tuition):
                </span>
                <span className="font-bold text-sm text-emerald-400">
                  - ৳{waiverSavings.toLocaleString()} BDT
                </span>
              </div>
            )}

            {/* Total Net Payable */}
            <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs text-slate-300 block">Estimated Net 4-Year Cost</span>
                <span className="text-xl sm:text-2xl font-extrabold text-amber-400 tracking-tight">
                  ৳{netTotalCost.toLocaleString()} BDT
                </span>
              </div>
              <div className="bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-xl text-right">
                <span className="text-[11px] text-amber-200 block">Approx. Cost / Semester</span>
                <span className="text-sm font-bold text-white">
                  ৳{perSemesterCost.toLocaleString()} BDT
                </span>
              </div>
            </div>
          </div>

          {/* Quick Eligibility Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Eligibility for {selectedProgram.degree}: </span>
              {selectedProgram.eligibility}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <button
            onClick={() => {
              onSelectPrompt(`Give me the full course curriculum and tuition fee details for ${selectedProgram.degree} at EWU.`);
              onClose();
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#004a99] text-white hover:bg-blue-800 transition shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Ask Chatbot about this Degree</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-200 border border-slate-300 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
