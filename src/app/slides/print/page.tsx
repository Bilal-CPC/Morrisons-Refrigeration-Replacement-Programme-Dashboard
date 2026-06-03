'use client';

import { useEffect } from 'react';
import {
  ChevronRight,
  MapPin,
  PoundSterling,
  Brain,
  Leaf,
  FileText,
  Users,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function MorrisonsLogo({ dark = false, height = 44 }: { dark?: boolean; height?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://cdn.freelogovectors.net/wp-content/uploads/2023/11/morrisons_logo-freelogovectors.net_-640x400.png"
      alt="Morrisons"
      style={{ height, width: 'auto', filter: dark ? 'brightness(0) invert(1)' : 'none' }}
    />
  );
}

// ─── Slide 1 ──────────────────────────────────────────────────────────────────
function Slide1() {
  return (
    <div
      className="slide flex flex-col items-center justify-center px-20 text-center"
      style={{ background: 'linear-gradient(135deg, #0D1F2D 0%, #0a2417 60%, #0D1F2D 100%)' }}
    >
      <div className="space-y-10">
        <div className="flex items-center justify-center gap-8">
          <MorrisonsLogo dark height={56} />
          <div className="h-12 w-px bg-white/20" />
          <div className="text-left leading-none">
            <div className="text-2xl font-extrabold tracking-tight text-white">CPC</div>
            <div className="text-sm font-medium tracking-wide text-white/50">Project Services</div>
          </div>
        </div>
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-widest" style={{ color: '#FFC72C' }}>
            Capital &amp; Asset Programme Management
          </p>
          <h1 className="text-6xl font-black leading-tight tracking-tight text-white">
            Complete programme control.<br />
            <span style={{ color: '#FFC72C' }}>Finally live.</span>
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-white/60">
          A platform that gives Morrisons complete visibility of progress, risk, spend,
          compliance and delivery performance — across every capital programme, nationwide.
        </p>
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/50">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Presented by CPC Project Services · June 2026
        </div>
      </div>
    </div>
  );
}

// ─── Slide 2 ──────────────────────────────────────────────────────────────────
function Slide2() {
  const stages = [
    {
      Icon: XCircle, label: 'Excel', color: 'text-red-500', bg: 'bg-red-50 border-red-200',
      tagBg: 'bg-red-100 text-red-700', tag: 'Where you were',
      points: ['Version control chaos', 'Manual updates, high error rate', 'No live visibility', 'No audit trail'],
    },
    {
      Icon: AlertTriangle, label: 'SmartSheets', color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200',
      tagBg: 'bg-amber-100 text-amber-700', tag: 'Where you are now',
      points: ['Better than spreadsheets', 'Still generic, not built for CAPEX', 'Limited analytics', 'No AI or supply chain signals'],
    },
    {
      Icon: CheckCircle2, label: 'CPC Platform', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200',
      tagBg: 'bg-emerald-100 text-emerald-700', tag: 'Where you could be',
      points: ['Built for Morrisons CAPEX', 'Live data, AI intelligence', 'Full audit & compliance', 'One platform, every programme'],
    },
  ];

  return (
    <div className="slide flex flex-col justify-center bg-white px-20 py-16">
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">The Evolution</p>
      <h2 className="mb-14 text-5xl font-black tracking-tight text-slate-900">Morrisons deserves better than a spreadsheet.</h2>
      <div className="grid grid-cols-3 gap-8">
        {stages.map((s) => (
          <div key={s.label} className={`rounded-2xl border-2 p-7 ${s.bg}`}>
            <div className="mb-4 flex items-center gap-3">
              <s.Icon className={`h-7 w-7 ${s.color}`} />
              <span className="text-xl font-black text-slate-800">{s.label}</span>
            </div>
            <span className={`mb-5 inline-block rounded-full px-3 py-1 text-xs font-bold ${s.tagBg}`}>{s.tag}</span>
            <ul className="space-y-2.5">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className={`mt-0.5 flex-shrink-0 font-bold ${s.color}`}>—</span>{p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-base font-semibold text-slate-500">
        The CPC platform is the natural next step — custom-built, programme-specific, and live on day one.
      </p>
    </div>
  );
}

// ─── Slide 3 ──────────────────────────────────────────────────────────────────
function Slide3() {
  const caps = [
    { Icon: MapPin,    title: 'Live Estate Map',           desc: '412 stores on a real UK map. Click any site for full programme status.', color: 'bg-emerald-500' },
    { Icon: BarChart3, title: 'Financial Control',         desc: '£50m budget in real time. Forecast vs actual, committed spend, savings.', color: 'bg-blue-500' },
    { Icon: Brain,     title: 'AI Programme Intelligence', desc: 'Supply chain alerts, risk flags and cost-saving opportunities — automatic.', color: 'bg-violet-500' },
    { Icon: Leaf,      title: 'Sustainability Dashboard',  desc: 'Carbon savings, energy reduction and ESG compliance per store.', color: 'bg-teal-500' },
    { Icon: FileText,  title: 'Document Hub',              desc: 'Handover packs, snagging, risk registers and contracts — one place.', color: 'bg-amber-500' },
    { Icon: Users,     title: 'Contractor Performance',    desc: 'League table with on-time delivery, cost variance and quality scores.', color: 'bg-red-500' },
  ];

  return (
    <div className="slide flex flex-col justify-center px-20 py-14" style={{ background: '#F0F3F7' }}>
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">Platform Capabilities</p>
          <h2 className="text-5xl font-black tracking-tight text-slate-900">One platform. Every programme.</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Configured for Morrisons —</p>
          <p className="text-sm font-semibold text-slate-700">not adapted from off-the-shelf.</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {caps.map((c) => (
          <div key={c.title} className="rounded-xl bg-white p-6 shadow-sm">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.color}`}>
              <c.Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-slate-800">{c.title}</h3>
            <p className="text-xs leading-relaxed text-slate-500">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide 4 ──────────────────────────────────────────────────────────────────
function Slide4() {
  const stats = [
    { value: '412',   label: 'Morrisons stores tracked',   color: '#FFC72C' },
    { value: '£50m',  label: 'CAPEX programme value',      color: '#4ade80' },
    { value: '2029',  label: 'F-Gas compliance deadline',  color: '#60a5fa' },
    { value: '5+',    label: 'programmes on one platform', color: '#c084fc' },
  ];
  const programmes = [
    { name: 'Refrigeration Replacement', live: true },
    { name: 'Store Refresh Programme',   live: false },
    { name: 'Energy & LED Transition',   live: false },
    { name: 'HVAC Compliance',           live: false },
    { name: 'M&E Asset Management',      live: false },
  ];

  return (
    <div
      className="slide flex flex-col justify-center px-20 py-14"
      style={{ background: 'linear-gradient(135deg, #0a2417 0%, #0D1F2D 100%)' }}
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#FFC72C' }}>Built for Scale</p>
      <h2 className="mb-12 text-5xl font-black leading-tight tracking-tight text-white">A national estate. Total programme control.</h2>
      <div className="mb-10 grid grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-1 text-4xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-white/50">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/40">Programmes on the platform</p>
        <div className="grid grid-cols-5 gap-4">
          {programmes.map((p) => (
            <div key={p.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${p.live ? 'bg-emerald-400' : 'bg-white/20'}`} />
                <span className={`text-[10px] font-bold ${p.live ? 'text-emerald-400' : 'text-white/30'}`}>{p.live ? 'Live' : 'Soon'}</span>
              </div>
              <p className="text-xs font-semibold leading-tight text-white/70">{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 5 ──────────────────────────────────────────────────────────────────
function Slide5() {
  const reasons = [
    { Icon: Zap,        title: 'Programme expertise, not just software', desc: 'Designed alongside CPC programme managers with direct experience of large-scale, multi-site CAPEX delivery. Every feature solves a problem felt on a real programme.' },
    { Icon: ShieldCheck,title: 'Configured to Morrisons, not adapted',   desc: 'The register, stage gates, financial structure and compliance layer all reflect how Morrisons operates its estate — not a generic tool with a logo bolted on.' },
    { Icon: TrendingDown,title: 'A single source of truth',              desc: 'Every data point, status change and financial update is logged, timestamped and auditable. When the programme board asks a question, the answer is in the platform.' },
  ];

  return (
    <div className="slide flex flex-col justify-center bg-white px-20 py-14">
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">Why CPC Project Services</p>
      <h2 className="mb-12 text-5xl font-black tracking-tight text-slate-900">Built by delivery teams, for delivery teams.</h2>
      <div className="mb-12 grid grid-cols-3 gap-7">
        {reasons.map((r) => (
          <div key={r.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: '#1A5B36' }}>
              <r.Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mb-2 font-bold text-slate-800">{r.title}</h3>
            <p className="text-sm leading-relaxed text-slate-500">{r.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl px-8 py-7" style={{ background: '#1A5B36' }}>
        <div>
          <p className="text-xl font-black text-white">Ready to see it live?</p>
          <p className="text-sm text-white/60">The platform is built and running — let us walk you through it today.</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right text-sm text-white/70">
            <p className="font-semibold text-white">CPC Project Services</p>
            <p>bilal.jamil@cpcprojectservices.com</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold" style={{ background: '#FFC72C', color: '#0a2417' }}>
            Open the live demo
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrintSlidesPage() {
  useEffect(() => {
    // Give images a moment to load before opening the print dialog
    const t = setTimeout(() => window.print(), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        @page {
          size: 1280px 720px;
          margin: 0;
        }
        @media print {
          html, body { margin: 0; padding: 0; }
          .slide {
            width: 1280px;
            height: 720px;
            page-break-after: always;
            page-break-inside: avoid;
            overflow: hidden;
          }
          .print-controls { display: none !important; }
        }
        .slide {
          position: relative;
          width: 1280px;
          height: 720px;
          overflow: hidden;
          flex-shrink: 0;
        }
      `}</style>

      {/* Print controls — hidden in print output */}
      <div className="print-controls sticky top-0 z-50 flex items-center justify-between bg-slate-900 px-6 py-3">
        <span className="text-sm font-semibold text-white">
          CPC × Morrisons · 5 Slides · Print or Save as PDF
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="rounded-lg px-4 py-2 text-sm font-bold"
            style={{ background: '#FFC72C', color: '#0a2417' }}
          >
            Download PDF
          </button>
          <button
            onClick={() => window.close()}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white"
          >
            Close
          </button>
        </div>
      </div>

      {/* All 5 slides rendered sequentially for print */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#0D1F2D' }}>
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
      </div>
    </>
  );
}
