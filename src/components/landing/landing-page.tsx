'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, type Variants } from 'framer-motion';
import {
  Store,
  Map,
  Brain,
  GitBranch,
  PoundSterling,
  Leaf,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Star,
  Building2,
  Table as TableIcon,
  LayoutGrid,
  Layers,
  X,
  ShieldCheck,
  Zap,
  Users,
} from 'lucide-react';
import { LogoFull } from '@/components/logo';
import { cn } from '@/lib/utils';
import { HeroIllustration } from './hero-illustration';
import {
  StoreRegisterMockup,
  MapMockup,
  AIMockup,
  FunnelMockup,
  FinancialMockup,
  SustainabilityMockup,
} from './mockups';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function FadeSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView || mounted ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

function CountUp({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const FEATURES = [
  {
    icon: Store,
    color: 'text-morrison-600',
    bg: 'bg-morrison-50',
    accent: 'border-morrison-200',
    title: 'Live Programme Register',
    desc: 'Every project across every site is a structured, living record — stage, budget, forecast, programme dates, contractor and risk status. Replace the email chains and spreadsheet exports with a real-time register the whole delivery team works from, simultaneously.',
    mockup: StoreRegisterMockup,
  },
  {
    icon: Map,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    accent: 'border-blue-200',
    title: 'Interactive Estate Map',
    desc: 'See the entire estate at a glance on a live, accurate map. Colour-coded markers show delivery stage and risk across every region. Click any location to drill into its programme detail, spend position and project team in real time — no spreadsheet lookup required.',
    mockup: MapMockup,
  },
  {
    icon: Brain,
    color: 'text-morrison-700',
    bg: 'bg-gold-100',
    accent: 'border-gold-400',
    title: 'AI Programme Intelligence',
    desc: 'The platform continuously monitors supply-chain signals, contractor capacity, weather forecasts and programme dependencies — surfacing risks weeks before they would reach the critical path. This is the forward-looking intelligence that generic tools simply cannot provide.',
    mockup: AIMockup,
  },
  {
    icon: GitBranch,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    accent: 'border-violet-200',
    title: 'Delivery Funnel & Stage Gates',
    desc: 'Track every project from identification through feasibility, design, tender, award, construction, commissioning and handover. Every stage gate is visible, timestamped and auditable — so programme leadership always has an accurate picture of where delivery actually stands.',
    mockup: FunnelMockup,
  },
  {
    icon: PoundSterling,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    accent: 'border-emerald-200',
    title: 'Financial Control & Reporting',
    desc: 'Approved budget, committed spend, forecast final cost and projected savings tracked live across the full programme. Understand exactly how each capital decision ripples through the delivery picture — and generate accurate financial reporting without manual consolidation.',
    mockup: FinancialMockup,
  },
  {
    icon: Leaf,
    color: 'text-morrison-600',
    bg: 'bg-morrison-50',
    accent: 'border-morrison-200',
    title: 'Sustainability & Compliance',
    desc: 'Carbon savings, energy reduction and regulatory compliance tracked automatically across the programme. Whether it is F-Gas deadlines, MEES requirements or Net Zero commitments, the platform gives you auditable, board-ready sustainability reporting without additional data collection.',
    mockup: SustainabilityMockup,
  },
];

const PROGRAMMES = [
  { label: 'Refrigeration Replacement', subtitle: 'National · 412 sites · 2025–29', active: true },
  { label: 'Store Refresh & Refit', subtitle: 'Phased rollout · 2026–30', active: false },
  { label: 'Energy & LED Transition', subtitle: 'Estate-wide · 2027–31', active: false },
  { label: 'HVAC Compliance', subtitle: 'F-Gas & MEES · 2025–28', active: false },
  { label: 'M&E Asset Management', subtitle: 'Ongoing OPEX · All sites', active: false },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <nav className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled ? 'border-b border-slate-200 bg-white/90 py-3 shadow-sm backdrop-blur-xl' : 'py-5')}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <LogoFull variant="light" />
        <div className="hidden items-center gap-8 md:flex">
          {[['Capabilities', '#features'], ['The Evolution', '#how-it-works'], ['Engagement', '#pricing']].map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/overview" className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 sm:block">Sign in</Link>
          <Link href="/overview" className="flex items-center gap-1.5 rounded-lg bg-morrison-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-morrison-700">
            Open platform <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-morrison-50 via-white to-white px-6 pb-24 pt-32">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-morrison-100 opacity-60 blur-[80px]" />
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-gold-100 opacity-50 blur-[60px]" />
        <div className="mx-auto max-w-7xl">
          <FadeSection className="mx-auto mb-16 max-w-4xl text-center">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-morrison-200 bg-morrison-50 px-4 py-1.5">
              <Building2 className="h-3.5 w-3.5 text-morrison-600" />
              <span className="text-sm font-semibold text-morrison-700">Capital &amp; Asset Programme Management · Built for Morrisons</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-7xl">
              Complete programme control.{' '}
              <span className="bg-gradient-to-r from-morrison-600 to-morrison-800 bg-clip-text text-transparent">
                Finally live.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-slate-500">
              CPC Project Services doesn&apos;t just manage your capital programmes — we provide the live platform to run them with complete precision. Every site. Every stage. Every pound. In one place.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/overview" className="flex items-center gap-2 rounded-xl bg-morrison-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-morrison-600/25 transition-all hover:bg-morrison-700">
                <Sparkles className="h-4 w-4" />
                Open the live demo
              </Link>
              <a href="#how-it-works" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
                See how it works <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </FadeSection>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <HeroIllustration />
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-slate-50 px-6 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: 412, suffix: ' sites', label: 'tracked across the live refrigeration programme' },
            { value: 50, prefix: '£', suffix: 'm', label: 'capital programme managed end to end' },
            { value: 8, suffix: '', label: 'delivery stage gates, visible and auditable in real time' },
            { value: 5, suffix: '', label: 'programme types the platform is built to support' },
          ].map((stat) => (
            <FadeSection key={stat.label}>
              <motion.div variants={fadeUp} className="space-y-1">
                <p className="text-4xl font-black text-morrison-600">
                  <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="text-sm leading-snug text-slate-500">{stat.label}</p>
              </motion.div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* Multi-programme vision strip */}
      <section className="overflow-hidden border-b border-slate-100 bg-white px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">One platform. Every programme.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROGRAMMES.map((p) => (
              <div key={p.label} className={cn('rounded-xl border px-4 py-2.5 text-left transition-all', p.active ? 'border-morrison-300 bg-morrison-50' : 'border-slate-200 bg-slate-50 opacity-60')}>
                <div className="flex items-center gap-2">
                  {p.active
                    ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    : <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  }
                  <p className={cn('text-sm font-semibold', p.active ? 'text-morrison-800' : 'text-slate-500')}>{p.label}</p>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">{p.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The evolution: Excel → SmartSheets → CPC */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeSection className="mb-14 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">The evolution of programme management</motion.div>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight">
              The tools haven&apos;t kept up.<br />Until now.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
              National capital delivery programmes have been managed through spreadsheets, shared drives and generic project tools for years — not because the teams weren&apos;t capable, but because nothing purpose-built existed. CPC built that thing.
            </motion.p>
          </FadeSection>

          <FadeSection>
            <motion.div variants={fadeUp} className="grid gap-5 md:grid-cols-3">
              {[
                {
                  stage: 'Excel & Shared Drives',
                  Icon: TableIcon,
                  tone: 'border-slate-200 bg-white',
                  iconBg: 'bg-slate-100',
                  iconColor: 'text-slate-500',
                  label: null,
                  labelBg: '',
                  body: 'The foundation of most large programme PMOs — and still widespread today. Spreadsheets are flexible, but they fracture at scale. Every project manager maintains their own file, every region has its own format, and version control collapses under the weight of a national programme.',
                  problems: [
                    'No single source of truth. Multiple versions in circulation simultaneously.',
                    'Board packs require one to two days of manual consolidation per cycle.',
                    'Risk is invisible until it has already hit the programme.',
                    'Cross-programme financial analysis is not possible.',
                  ],
                },
                {
                  stage: 'SmartSheets',
                  Icon: LayoutGrid,
                  tone: 'border-slate-200 bg-white',
                  iconBg: 'bg-blue-50',
                  iconColor: 'text-blue-500',
                  label: 'An improvement',
                  labelBg: 'bg-blue-100 text-blue-700',
                  body: 'A genuine step forward — shared, cloud-based and more visual. For smaller programmes, it works. But at the scale of a national estate, the limitations become significant. SmartSheets is a generic tool. It was not designed for multi-contractor delivery, compliance obligations or estate-wide capital reporting.',
                  problems: [
                    'Dashboard views are constrained by the tool\'s own structure, not yours.',
                    'No integration with contractor ERPs, BMS platforms or supply-chain data.',
                    'Programme complexity consistently outgrows the tool\'s capability.',
                    'It is still, fundamentally, a spreadsheet hosted in the cloud.',
                  ],
                },
                {
                  stage: 'CPC Programme Platform',
                  Icon: Layers,
                  tone: 'border-morrison-300 bg-morrison-50 ring-2 ring-morrison-200',
                  iconBg: 'bg-morrison-700',
                  iconColor: 'text-white',
                  label: 'Where you are going',
                  labelBg: 'bg-gold-500 text-morrison-900',
                  body: 'Built by programme managers who deliver at this scale — not by a software company guessing at the problem. Every site is a live, structured data record. Every stage gate is tracked. AI monitors supply-chain signals and contractor capacity in real time, surfacing risk before it reaches the critical path.',
                  problems: [
                    'One platform, any programme — refrigeration today, store refresh tomorrow.',
                    'Live data, not yesterday\'s export or last week\'s update.',
                    'AI-generated risk intelligence, not manual RAG reviews.',
                    'Board packs in seconds, not assembled across days.',
                  ],
                  positive: true,
                },
              ].map((s, i) => (
                <div key={s.stage} className={cn('relative flex flex-col rounded-2xl border p-6', s.tone)}>
                  {s.label && (
                    <span className={cn('absolute -top-3 left-5 rounded-full px-3 py-1 text-[11px] font-bold', s.labelBg)}>{s.label}</span>
                  )}
                  <div className={cn('mb-4 flex h-11 w-11 items-center justify-center rounded-xl', s.iconBg)}>
                    <s.Icon className={cn('h-5 w-5', s.iconColor)} />
                  </div>
                  <h3 className={cn('mb-3 text-base font-black', i === 2 ? 'text-morrison-800' : 'text-slate-800')}>{s.stage}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">{s.body}</p>
                  <ul className="mt-auto space-y-2">
                    {s.problems.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs leading-snug">
                        {s.positive
                          ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-morrison-600" />
                          : <X className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-400" />
                        }
                        <span className={s.positive ? 'text-morrison-700 font-medium' : 'text-slate-500'}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </FadeSection>

          <FadeSection className="mt-12 space-y-3">
            <motion.div variants={fadeUp} className="mb-6 text-center">
              <p className="text-sm font-semibold text-slate-400">What changes in practice</p>
            </motion.div>
            {[
              {
                old: 'Programme board packs take one to two days to assemble from multiple contractor reports and regional spreadsheets.',
                next: 'One-click reporting — formatted, branded and accurate — ready for the board in seconds, not days.',
              },
              {
                old: 'Risk is identified reactively, after it has already impacted delivery and cost.',
                next: 'AI monitoring surfaces supply-chain pressure, contractor capacity constraints and programme dependencies in advance — before they hit the critical path.',
              },
              {
                old: 'Financial data is held across separate systems. Getting an accurate cost position requires manual consolidation.',
                next: 'Approved budget, committed spend and forecast final cost are tracked live across the full programme — with no manual input required.',
              },
              {
                old: 'Adding a new programme means building a new set of spreadsheets from scratch. There is no shared infrastructure.',
                next: 'New programmes are configured on the same live platform in days — using the same register, map, reporting and intelligence layer.',
              },
              {
                old: 'Compliance and sustainability reporting requires a separate data collection exercise before every review.',
                next: 'F-Gas status, carbon savings and Net Zero progress are tracked automatically, with auditable records available at any point.',
              },
            ].map((point, i) => (
              <motion.div key={i} variants={fadeUp} className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                  <p className="text-sm leading-relaxed text-slate-600">{point.old}</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm font-medium leading-relaxed text-slate-800">{point.next}</p>
                </div>
              </motion.div>
            ))}
          </FadeSection>
        </div>
      </section>

      {/* Features with mockups */}
      <section id="features" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeSection className="mb-16 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">Platform capabilities</motion.div>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight">Everything the programme needs, built in.</motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-slate-500">
              Each capability was designed around real delivery challenges — not around what a generic project management tool happens to support.
            </motion.p>
          </FadeSection>
          <div className="space-y-16">
            {FEATURES.map((feature, i) => {
              const Mockup = feature.mockup;
              const isEven = i % 2 === 0;
              return (
                <FadeSection key={feature.title}>
                  <motion.div variants={fadeUp} className={cn('grid items-center gap-10 md:grid-cols-2', !isEven && 'md:grid-flow-dense')}>
                    <div className={cn('space-y-4', !isEven && 'md:col-start-2')}>
                      <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-2xl border', feature.bg, feature.accent)}>
                        <feature.icon className={cn('h-6 w-6', feature.color)} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">{feature.title}</h3>
                      <p className="text-base leading-relaxed text-slate-500">{feature.desc}</p>
                    </div>
                    <div className={cn(!isEven && 'md:col-start-1 md:row-start-1')}>
                      <Mockup />
                    </div>
                  </motion.div>
                </FadeSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why CPC */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeSection className="mb-14 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">Why CPC Project Services</motion.div>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight">Built by delivery teams, for delivery teams.</motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
              A software company can build a project management tool. CPC builds a platform that reflects how capital programmes are actually delivered — because our people have delivered them.
            </motion.p>
          </FadeSection>
          <FadeSection className="grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: Users,
                title: 'Programme expertise, not just software',
                desc: 'The platform was designed alongside CPC programme managers with direct experience of large-scale, multi-site CAPEX delivery. Every feature solves a problem that was felt on a real programme.',
              },
              {
                Icon: Zap,
                title: 'Configured to Morrisons, not adapted from generic',
                desc: "This is not an off-the-shelf tool with Morrisons' logo on it. The register, the stage gates, the financial structure and the compliance layer all reflect how Morrisons actually operates its estate.",
              },
              {
                Icon: ShieldCheck,
                title: 'A single source of truth with full audit trail',
                desc: 'Every data point, status change and financial update is logged, timestamped and traceable. When the programme board asks a question, the answer is in the platform — not in someone\'s inbox.',
              },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-morrison-50">
                  <c.Icon className="h-5 w-5 text-morrison-600" />
                </div>
                <h3 className="text-base font-black text-slate-900">{c.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{c.desc}</p>
              </motion.div>
            ))}
          </FadeSection>
        </div>
      </section>

      {/* Lifecycle pipeline */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <FadeSection className="mb-12 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">End-to-end coverage</motion.div>
            <motion.h2 variants={fadeUp} className="mb-3 text-4xl font-black tracking-tight">Every delivery stage, tracked.</motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-xl text-base text-slate-500">
              From the moment a site is identified to the point of handover — every stage is structured, visible and moving through the platform.
            </motion.p>
          </FadeSection>
          <FadeSection>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2">
              {['Identification', 'Feasibility', 'Design', 'Tender', 'Award', 'Construction', 'Commissioning', 'Handover'].map((stage, i) => (
                <div key={stage} className="flex items-center gap-2">
                  <div className="rounded-full bg-morrison-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">{stage}</div>
                  {i < 7 && <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300" />}
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-center text-xs text-slate-400">
              Showing the refrigeration replacement programme — the same structure applies across every programme type on the platform.
            </motion.p>
          </FadeSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeSection className="mb-16 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">What it changes</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-black tracking-tight">Programme leadership, with confidence.</motion.h2>
          </FadeSection>
          <FadeSection className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: '"For the first time, we have a single view of the whole estate — progress, spend and risk — without chasing reports from twelve different project managers. The time that frees up is significant."',
                name: 'Programme Director',
                org: 'National Retail Estate',
              },
              {
                quote: '"The AI flagged a compressor supply risk six weeks before it would have hit the critical path. That lead time is the difference between a managed intervention and a programme delay."',
                name: 'Head of Capital Delivery',
                org: 'Grocery Retailer',
              },
              {
                quote: '"Board packs used to take a day and a half to pull together. Now it is a click, and the output is more accurate and better presented than anything we were producing manually."',
                name: 'Capital Programme Lead',
                org: 'Supermarket Group',
              },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="flex-1 text-sm italic leading-relaxed text-slate-600">{t.quote}</p>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.org}</p>
                </div>
              </motion.div>
            ))}
          </FadeSection>
        </div>
      </section>

      {/* Engagement models */}
      <section id="pricing" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeSection className="mb-16 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">Engagement models</motion.div>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight">A platform that scales with the programme.</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500">From a single programme to the full Morrisons estate — structured to fit how CPC and Morrisons work together.</motion.p>
          </FadeSection>
          <FadeSection className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Single Programme',
                price: 'Focused',
                desc: 'Deploy the platform on one programme — the refrigeration replacement, a store refresh phase, or a compliance initiative.',
                features: ['Full programme register', 'Interactive estate map', 'Delivery funnel & stage gates', 'Financial dashboard', 'PDF board reporting'],
                highlight: false,
              },
              {
                name: 'Multi-Programme',
                price: 'Recommended',
                desc: 'The full platform across multiple concurrent programmes — CAPEX and OPEX — with a dedicated CPC programme management team.',
                features: ['Unlimited programmes on one platform', 'AI Programme Intelligence', 'Live contractor performance tracking', 'Supply-chain & weather integration', 'Document hub & audit trail', 'Dedicated CPC PMO team'],
                highlight: true,
              },
              {
                name: 'Enterprise Estate',
                price: 'Custom',
                desc: 'Full estate management across every capital and operational programme, with deeper system integration and bespoke analytics.',
                features: ['ERP & BMS integration', 'Capex impact modelling', 'Custom analytics & KPIs', 'Net Zero reporting suite', 'Executive dashboard layer'],
                highlight: false,
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={cn('relative flex flex-col space-y-5 rounded-2xl border p-6', plan.highlight ? 'border-morrison-300 bg-morrison-700 text-white shadow-xl shadow-morrison-700/20' : 'border-slate-200 bg-white shadow-sm')}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-morrison-900 shadow-sm">Recommended</div>
                )}
                <div>
                  <p className={cn('text-sm font-semibold', plan.highlight ? 'text-morrison-200' : 'text-slate-500')}>{plan.name}</p>
                  <p className={cn('mt-1 text-2xl font-black', plan.highlight ? 'text-white' : 'text-slate-900')}>{plan.price}</p>
                  <p className={cn('mt-2 text-sm leading-relaxed', plan.highlight ? 'text-morrison-200' : 'text-slate-500')}>{plan.desc}</p>
                </div>
                <ul className="flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className={cn('flex items-start gap-2 text-sm', plan.highlight ? 'text-white' : 'text-slate-700')}>
                      <CheckCircle2 className={cn('mt-0.5 h-3.5 w-3.5 flex-shrink-0', plan.highlight ? 'text-gold-400' : 'text-morrison-500')} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/overview"
                  className={cn('flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all', plan.highlight ? 'bg-white text-morrison-700 hover:bg-morrison-50' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50')}
                >
                  View the platform <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </FadeSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-morrison-700 to-morrison-900 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <FadeSection>
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white">See the full programme, live.</h2>
              <p className="text-lg leading-relaxed text-morrison-100">
                The demo is loaded with the Morrisons refrigeration replacement programme as a working example — 412 sites, live cost tracking, AI risk intelligence and board-ready reporting. This is what CPC would build and run for Morrisons across any capital programme.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/overview" className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-morrison-700 shadow-lg transition-all hover:bg-morrison-50">
                  <Sparkles className="h-4 w-4" />
                  Open the live platform
                </Link>
                <a href="mailto:bilal.jamil@cpcprojectservices.com" className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition-all hover:bg-white/20">
                  Talk to CPC Project Services
                </a>
              </div>
              <p className="text-xs text-morrison-300">
                CPC Project Services · Programme Management Platform · Configured for Morrisons
              </p>
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <LogoFull variant="light" />
          <p className="text-xs text-slate-400">© 2026 CPC Project Services Ltd · Programme management, delivered live.</p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security'].map((l) => (
              <a key={l} href="#" className="text-xs text-slate-400 transition-colors hover:text-slate-700">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
