import { Camera, ClipboardList, FileText, HardHat, AlertTriangle, DollarSign, MessageSquare, BarChart3 } from 'lucide-react';

const docs = [
  { icon: Camera,         label: 'Handover Photos',      count: '2,847 files',  color: '#7C3AED', bg: '#F5F3FF' },
  { icon: ClipboardList,  label: 'Snagging Register',    count: '127 registers', color: '#D97706', bg: '#FFFBEB' },
  { icon: FileText,       label: 'Tender Documents',     count: '254 packages', color: '#0891B2', bg: '#ECFEFF' },
  { icon: HardHat,        label: 'Site Progress Reports', count: '1,032 reports', color: '#16A34A', bg: '#F0FDF4' },
  { icon: AlertTriangle,  label: 'Risk Register',        count: '412 registers', color: '#DC2626', bg: '#FEF2F2' },
  { icon: DollarSign,     label: 'Cost Reports',         count: '508 reports',  color: '#2563EB', bg: '#EFF6FF' },
  { icon: MessageSquare,  label: 'Meeting Minutes',      count: '3,218 files',  color: '#1A5B36', bg: '#F0FDF4' },
  { icon: BarChart3,      label: 'Programme Reports',    count: '97 reports',   color: '#94A3B8', bg: '#F8FAFC' },
];

export function DocumentHub() {
  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Document Hub</h2>
        <span className="text-xs text-slate-500 font-medium">7,963 total files</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {docs.map(doc => {
          const Icon = doc.icon;
          return (
            <button
              key={doc.label}
              className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-slate-200 card-hover text-left group"
              style={{ backgroundColor: doc.bg }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: doc.color + '20' }}
              >
                <Icon className="w-4 h-4" style={{ color: doc.color }} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-700 leading-tight group-hover:text-slate-900 truncate">
                  {doc.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{doc.count}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">
          Secure document storage · ISO 27001 compliant · Role-based access control
        </p>
      </div>
    </div>
  );
}
