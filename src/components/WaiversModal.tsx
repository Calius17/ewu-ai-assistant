import React from 'react';
import { X, Award, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { EWU_WAIVERS } from '../data/ewuData';

interface WaiversModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWaiverPrompt: (prompt: string) => void;
}

export const WaiversModal: React.FC<WaiversModalProps> = ({
  isOpen,
  onClose,
  onSelectWaiverPrompt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        id="ewu-waivers-modal"
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-[#004a99] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                EWU Scholarships & Financial Aid
              </h2>
              <p className="text-xs text-blue-100">
                Merit-based scholarships, semester GPA waivers, and special quota discounts
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[65vh]">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-start space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Generous Financial Aid Policy:</strong>
              East West University disburses millions in tuition waivers annually. Over 20% of full-time students receive some tier of financial aid or merit waiver.
            </div>
          </div>

          <div className="space-y-3">
            {EWU_WAIVERS.map((w) => (
              <div
                key={w.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-emerald-300 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-slate-900 text-sm">{w.title}</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                    {w.discountPercentage}% Discount
                  </span>
                </div>
                <div className="text-xs text-slate-700 space-y-1 mb-2">
                  <p>
                    <span className="font-semibold text-slate-800">Criteria: </span>
                    {w.criteria}
                  </p>
                  <p className="text-slate-600">{w.details}</p>
                </div>
                <button
                  onClick={() => {
                    onSelectWaiverPrompt(`How do I apply for and maintain the ${w.title} at East West University?`);
                    onClose();
                  }}
                  className="text-xs font-medium text-sky-700 hover:text-sky-900 flex items-center gap-1"
                >
                  <span>Ask chatbot how to apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Retention criteria note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Waiver Retention Policy:</strong>
              To retain Medha Lalon or Merit waivers in subsequent semesters, undergraduate students must maintain a minimum CGPA of 3.80 (or 3.50+ for specific financial grants) and register for at least 9–12 credits per trimester.
            </div>
          </div>
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
