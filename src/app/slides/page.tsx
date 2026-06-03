'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
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

const TOTAL = 5;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
};

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

// ─── Slide 1: Title ───────────────────────────────────────────────────────────
function Slide1() {
  return (
    <div
      className="flex h-full flex-col items-center justify-center px-16 text-center"
      style={{ background: 'linear-gradient(135deg, #0D1F2D 0%, #0a2417 60%, #0D1F2D 100%)' }}
    >
      {/* Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]" style={{ background: '#FFC72C' }} />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full opacity-15 blur-[80px]" style={{ background: '#1A5B36' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative space-y-8">
        {/* Logos */}
        <div className="flex items-center justify-center gap-8">
          <MorrisonsLogo dark height={52} />
          <div className="h-10 w-px bg-white/20" />
          <div className="text-left leading-none">
            <div className="text-xl font-extrabold tracking-tight text-white">CPC</div>
            <div className="text-xs font-medium tracking-wide text-white/50">Project Services</div>
          </div>
        </div>

        {/* Headline */}
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: '#FFC72C' }}>
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

        {/* Presented by badge */}
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/50">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Presented by CPC Project Services · June 2026
        </div>
      </motion.div>
    </div>
  );
}

// ─── Slide 2: The Problem ─────────────────────────────────────────────────────
function Slide2() {
  const stages = [
    {
      icon: XCircle,
      label: 'Excel',
      color: 'text-red-500',
      bg: 'bg-red-50 border-red-200',
      tagBg: 'bg-red-100 text-red-700',
      tag: 'Where you were',
      points: ['Version control chaos', 'Manual updates, high error rate', 'No live visibility', 'No audit trail'],
    },
    {
      icon: AlertTriangle,
      label: 'SmartSheets',
      color: 'text-amber-500',
      bg: 'bg-amber-50 border-amber-200',
      tagBg: 'bg-amber-100 text-amber-700',
      tag: 'Where you are now',
      points: ['Better than spreadsheets', 'Still generic, not built for CAPEX', 'Limited analytics', 'No AI or supply chain signals'],
    },
    {
      icon: CheckCircle2,
      label: 'CPC Platform',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 border-emerald-200',
      tagBg: 'bg-emerald-100 text-emerald-700',
      tag: 'Where you could be',
      points: ['Built for Morrisons CAPEX', 'Live data, AI intelligence', 'Full audit & compliance', 'One platform, every programme'],
    },
  ];

  return (
    <div className="flex h-full flex-col justify-center bg-white px-16 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">The Evolution</p>
        <h2 className="mb-12 text-5xl font-black tracking-tight text-slate-900">
          Morrisons deserves better<br />than a spreadsheet.
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-2xl border-2 p-6 ${s.bg}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <s.icon className={`h-7 w-7 ${s.color}`} />
                <span className="text-xl font-black text-slate-800">{s.label}</span>
              </div>
              <span className={`mb-4 inline-block rounded-full px-2.5 py-1 text-xs font-bold ${s.tagBg}`}>{s.tag}</span>
              <ul className="space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className={`mt-0.5 flex-shrink-0 ${s.color}`}>—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-base font-semibold text-slate-500"
        >
          The CPC platform is the natural next step — custom-built, programme-specific, and live on day one.
        </motion.p>
      </motion.div>
    </div>
  );
}

// ─── Slide 3: The Platform Capabilities ──────────────────────────────────────
function Slide3() {
  const caps = [
    { Icon: MapPin,        title: 'Live Estate Map',          desc: '412 stores pinned on a real interactive UK map. Click any site for full programme status.', color: 'bg-emerald-500' },
    { Icon: BarChart3,     title: 'Financial Control',        desc: '£50m budget tracked in real time. Forecast vs actual, committed spend, savings pipeline.', color: 'bg-blue-500' },
    { Icon: Brain,         title: 'AI Programme Intelligence',desc: 'Supply chain alerts, risk flags, and cost-saving opportunities — surfaced automatically.', color: 'bg-violet-500' },
    { Icon: Leaf,          title: 'Sustainability Dashboard',  desc: 'Carbon savings, energy reduction and ESG compliance tracked per store and programme-wide.', color: 'bg-teal-500' },
    { Icon: FileText,      title: 'Document Hub',             desc: 'Handover packs, snagging reports, risk registers and contracts — all in one place.', color: 'bg-amber-500' },
    { Icon: Users,         title: 'Contractor Performance',   desc: 'Contractor league table with on-time delivery, cost variance and quality scores.', color: 'bg-red-500' },
  ];

  return (
    <div className="flex h-full flex-col justify-center px-16 py-12" style={{ background: '#F0F3F7' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">Platform Capabilities</p>
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              One platform.<br />Every programme.
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Configured for Morrisons —</p>
            <p className="text-sm font-semibold text-slate-700">not adapted from off-the-shelf.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {caps.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.color}`}>
                <c.Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-slate-800">{c.title}</h3>
              <p className="text-xs leading-relaxed text-slate-500">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Slide 4: Built for Scale ─────────────────────────────────────────────────
function Slide4() {
  const stats = [
    { value: '412',   label: 'Morrisons stores tracked', color: '#FFC72C' },
    { value: '£50m',  label: 'CAPEX programme value',    color: '#4ade80' },
    { value: '2029',  label: 'F-Gas compliance deadline', color: '#60a5fa' },
    { value: '5+',    label: 'programmes on one platform', color: '#c084fc' },
  ];

  const programmes = [
    { name: 'Refrigeration Replacement',  status: 'Live',  dot: 'bg-emerald-400' },
    { name: 'Store Refresh Programme',     status: 'Soon',  dot: 'bg-white/30' },
    { name: 'Energy & LED Transition',     status: 'Soon',  dot: 'bg-white/30' },
    { name: 'HVAC Compliance',             status: 'Soon',  dot: 'bg-white/30' },
    { name: 'M&E Asset Management',        status: 'Soon',  dot: 'bg-white/30' },
  ];

  return (
    <div
      className="flex h-full flex-col justify-center px-16 py-12"
      style={{ background: 'linear-gradient(135deg, #0a2417 0%, #0D1F2D 100%)' }}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #FFC72C 0%, transparent 60%)' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#FFC72C' }}>Built for Scale</p>
        <h2 className="mb-10 text-5xl font-black leading-tight tracking-tight text-white">
          A national estate.<br />Total programme control.
        </h2>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-1 text-4xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-sm text-white/50">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Programme list */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">Programmes on the platform</p>
          <div className="grid grid-cols-5 gap-3">
            {programmes.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                  <span className={`text-[10px] font-bold ${p.status === 'Live' ? 'text-emerald-400' : 'text-white/30'}`}>{p.status}</span>
                </div>
                <p className="text-xs font-semibold leading-tight text-white/70">{p.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Slide 5: Why CPC + Next Steps ───────────────────────────────────────────
function Slide5() {
  const reasons = [
    {
      Icon: Zap,
      title: 'Programme expertise, not just software',
      desc: 'Designed alongside CPC programme managers with direct experience of large-scale, multi-site CAPEX delivery. Every feature solves a problem felt on a real programme.',
    },
    {
      Icon: ShieldCheck,
      title: 'Configured to Morrisons, not adapted',
      desc: "The register, stage gates, financial structure and compliance layer all reflect how Morrisons operates its estate — not a generic tool with a logo bolted on.",
    },
    {
      Icon: TrendingDown,
      title: 'A single source of truth',
      desc: "Every data point, status change and financial update is logged, timestamped and auditable. When the programme board asks a question, the answer is in the platform.",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-center bg-white px-16 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">Why CPC Project Services</p>
        <h2 className="mb-10 text-5xl font-black tracking-tight text-slate-900">
          Built by delivery teams,<br />for delivery teams.
        </h2>

        <div className="mb-10 grid grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: '#1A5B36' }}>
                <r.Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-slate-800">{r.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between rounded-2xl px-8 py-6"
          style={{ background: '#1A5B36' }}
        >
          <div>
            <p className="text-lg font-black text-white">Ready to see it live?</p>
            <p className="text-sm text-white/60">The platform is built and running — let us walk you through it today.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right text-sm text-white/70">
              <p className="font-semibold text-white">CPC Project Services</p>
              <p>bilal.jamil@cpcprojectservices.com</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold" style={{ background: '#FFC72C', color: '#0a2417' }}>
              Open the live demo
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5];
const TITLES = ['Title', 'The Problem', 'The Platform', 'Built for Scale', 'Why CPC'];

export default function SlidesPage() {
  const [[current, dir], setSlide] = useState([0, 0]);

  const go = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL) return;
    setSlide([next, next > current ? 1 : -1]);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(current + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, go]);

  const SlideComponent = SLIDES[current];

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-slate-900">
      {/* Slide area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="flex h-14 items-center justify-between bg-slate-950 px-8">
        {/* Slide title */}
        <span className="text-sm font-semibold text-slate-400">
          {current + 1}. {TITLES[current]}
        </span>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === current ? 24 : 8,
                background: i === current ? '#FFC72C' : '#334155',
              }}
            />
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open('/slides/print', '_blank')}
            className="flex items-center gap-1.5 rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-600"
            title="Download as PDF"
          >
            <Download className="h-3.5 w-3.5" />
            PDF
          </button>
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(current + 1)}
            disabled={current === TOTAL - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
