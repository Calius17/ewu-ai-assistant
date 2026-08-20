import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Calendar, Award, Users, BookOpen } from 'lucide-react';
import { EWU_INFO, GRADING_SYSTEM } from '../data/ewuData';

interface CampusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const CampusModal: React.FC<CampusModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'grading' | 'clubs'>('info');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        id="ewu-campus-modal"
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-[#004a99] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Campus, Grading & Student Life
              </h2>
              <p className="text-xs text-blue-100">
                East West University permanent campus in Aftabnagar, Rampura, Dhaka
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

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
              activeTab === 'info'
                ? 'border-[#004a99] text-[#004a99] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Campus & Contact
          </button>
          <button
            onClick={() => setActiveTab('grading')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
              activeTab === 'grading'
                ? 'border-[#004a99] text-[#004a99] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Grading System (CGPA)
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
              activeTab === 'clubs'
                ? 'border-[#004a99] text-[#004a99] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Student Clubs
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh] text-slate-800 text-xs sm:text-sm">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  Campus Location & Address
                </h3>
                <p className="text-slate-700">
                  <strong>Permanent Campus:</strong> {EWU_INFO.location}
                </p>
                <p className="text-slate-500 text-xs">
                  Situated right beside Rampura Bridge and Hatirjheel east gateway, easily accessible via DIT Road, Pragati Sarani, and Hatirjheel express routes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Phone className="w-4 h-4 text-sky-600" />
                    Helpdesk & Inquiries
                  </div>
                  <p className="text-slate-600 text-xs font-mono">{EWU_INFO.phone}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Mail className="w-4 h-4 text-amber-600" />
                    Admissions Office
                  </div>
                  <p className="text-slate-600 text-xs">{EWU_INFO.admissionsEmail}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Tri-Semester Academic Cycle
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-sky-700 block">Spring</span>
                    <span className="text-slate-500 text-[11px]">January – April</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-amber-700 block">Summer</span>
                    <span className="text-slate-500 text-[11px]">May – August</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-emerald-700 block">Fall</span>
                    <span className="text-slate-500 text-[11px]">September – December</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  *Note: Bachelor of Pharmacy (B.Pharm) follows a Bi-Semester curriculum (Spring & Fall).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'grading' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                East West University uses a standard 4.00 Grade Point Average (GPA / CGPA) system:
              </p>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#004a99] text-white">
                    <tr>
                      <th className="p-2.5">Marks Range</th>
                      <th className="p-2.5">Letter Grade</th>
                      <th className="p-2.5">Grade Point</th>
                      <th className="p-2.5">Assessment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {GRADING_SYSTEM.map((g, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-medium text-slate-800">{g.marks}</td>
                        <td className="p-2.5 font-bold text-slate-900">{g.grade}</td>
                        <td className="p-2.5 font-mono text-sky-700 font-semibold">{g.points}</td>
                        <td className="p-2.5 text-slate-600">{g.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'clubs' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                EWU has over 15+ student activity clubs for leadership and skill building:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">EWU Computer Programming Club (EWUCoPC)</h4>
                  <p className="text-[11px] text-slate-600">Competitive programming, hackathons, ICPC training, workshops on AI/Web.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">EWU Robotics Club</h4>
                  <p className="text-[11px] text-slate-600">Hardware robotics, IoT, line followers, autonomous drone competitions.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">EWU Business Club (EWUBC)</h4>
                  <p className="text-[11px] text-slate-600">National business competitions, corporate case-solving, career fairs.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">EWU Debating Club (EWUDC)</h4>
                  <p className="text-[11px] text-slate-600">Bangla & English parliamentary debate, national champions.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">EWU Photography Club (EWUPC)</h4>
                  <p className="text-[11px] text-slate-600">Photo walks, national photo exhibitions and visual storytelling.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">EWU Rotaract Club & Sports Club</h4>
                  <p className="text-[11px] text-slate-600">Community service, blood donation, cricket/football tournaments.</p>
                </div>
              </div>
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
