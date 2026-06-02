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
  Snowflake,
  Building2,
  Table as TableIcon,
  LayoutGrid,
  Layers,
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
  // Fallback: reveal shortly after mount so content is never stuck hidden
  // (e.g. full-page captures or browsers where the observer is slow to fire).
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
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const FEATURES = [
  {
    icon: Store,
    color: 'text-morrison-600',
    bg: 'bg-morrison-50',
    accent: 'border-morrison-200',
    title: 'Live Store Register',
    desc: 'Every one of the 412 stores is a structured, living record — stage, budget, forecast, programme dates, contractor and risk. Replace static spreadsheets with a real-time database the whole programme team works in together.',
    mockup: StoreRegisterMockup,
  },
  {
    icon: Map,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    accent: 'border-blue-200',
    title: 'Interactive Estate Map',
    desc: 'See the entire Morrisons estate at a glance. Colour-coded pins show delivery stage and risk across every region. Click any store to drill into its programme, spend and project team in real time.',
    mockup: MapMockup,
  },
  {
    icon: Brain,
    color: 'text-morrison-700',
    bg: 'bg-gold-100',
    accent: 'border-gold-400',
    title: 'AI Programme Intelligence',
    desc: 'Hidden AI continuously scans supply-chain signals, contractor capacity, weather forecasts and programme data — surfacing risks before they hit the critical path. Forward-thinking programme management, built in.',
    mockup: AIMockup,
  },
  {
    icon: GitBranch,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    accent: 'border-violet-200',
    title: 'Delivery Funnel & Stage Gates',
    desc: 'Watch projects flow from identification through feasibility, design, tender, construction and handover. Every stage gate is visible and auditable — so you always know exactly where the programme stands.',
    mockup: FunnelMockup,
  },
  {
    icon: PoundSterling,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    accent: 'border-emerald-200',
    title: 'Financial Control',
    desc: 'Approved budget, committed spend, forecast final cost and savings — tracked live across the £50m programme. Understand exactly how capex decisions ripple through the end-to-end delivery picture.',
    mockup: FinancialMockup,
  },
  {
    icon: Leaf,
    color: 'text-morrison-600',
    bg: 'bg-morrison-50',
    accent: 'border-morrison-200',
    title: 'Carbon & Compliance',
    desc: 'Track carbon saved, energy reduction and the F-Gas compliance countdown against the national deadline. Demonstrate progress towards Net Zero with auditable, board-ready sustainability reporting.',
    mockup: SustainabilityMockup,
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-slate-200 bg-white/90 py-3 shadow-sm backdrop-blur-xl' : 'py-5',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <LogoFull variant="light" />
        <div className="hidden items-center gap-8 md:flex">
          {['Features', 'How it works', 'Pricing'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/overview" className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 sm:block">
            Sign in
          </Link>
          <Link
            href="/overview"
            className="flex items-center gap-1.5 rounded-lg bg-morrison-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-morrison-700"
          >
            View Dashboard <ArrowRight className="h-3.5 w-3.5" />
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
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-morrison-200 bg-morrison-50 px-4 py-1.5"
            >
              <Snowflake className="h-3.5 w-3.5 text-morrison-600" />
              <span className="text-sm font-semibold text-morrison-700">
                National Refrigeration Replacement & F-Gas Compliance Programme
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-7xl"
            >
              Programme management,{' '}
              <span className="bg-gradient-to-r from-morrison-600 to-morrison-800 bg-clip-text text-transparent">
                finally live
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-slate-500">
              CPC don&apos;t just manage projects. We provide a live programme management platform that gives Morrisons
              complete visibility of progress, risk, spend, compliance and delivery performance across the entire
              refrigeration replacement programme.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/overview"
                className="flex items-center gap-2 rounded-xl bg-morrison-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-morrison-600/25 transition-all hover:bg-morrison-700"
              >
                <Sparkles className="h-4 w-4" />
                Open the live dashboard
              </Link>
              <a
                href="#features"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
              >
                Explore the platform <ChevronRight className="h-4 w-4" />
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
            { value: 412, suffix: '', label: 'stores in the national programme' },
            { value: 31, suffix: '%', label: 'of the estate already transitioned' },
            { value: 50, prefix: '£', suffix: 'm', label: 'capital programme under live control' },
            { value: 18700, suffix: '', label: 'tonnes CO₂e saved against baseline' },
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

      {/* The evolution: Excel → SmartSheets → CPC Platform */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeSection className="mb-14 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">
              The natural next step
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-black tracking-tight">
              From spreadsheets to a live platform
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-lg text-slate-500">
              Excel gave you the data. SmartSheets made it more visual — but rigid and restricted. CPC builds custom
              tools, hyper-tailored to Morrisons, that let you interrogate the data interactively.
            </motion.p>
          </FadeSection>
          <FadeSection>
            <motion.div variants={fadeUp} className="grid gap-4 md:grid-cols-3">
              {[
                { stage: 'Excel', Icon: TableIcon, desc: 'Static rows and columns. Out of date the moment it is saved. No single source of truth.', tone: 'border-slate-200 bg-white', iconBg: 'bg-slate-100', iconColor: 'text-slate-500' },
                { stage: 'SmartSheets', Icon: LayoutGrid, desc: 'More dynamic and visual — but heavily restricted in format, and still not tailored to how you actually work.', tone: 'border-slate-200 bg-white', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
                { stage: 'CPC Platform', Icon: Layers, desc: 'Custom tools, hyper-tailored to Morrisons. Interactive analysis, hidden AI insights, weather signals and live end-to-end operations.', tone: 'border-morrison-300 bg-morrison-50 ring-2 ring-morrison-200', iconBg: 'bg-morrison-100', iconColor: 'text-morrison-700' },
              ].map((s, i) => (
                <div key={s.stage} className={cn('relative rounded-2xl border p-6', s.tone)}>
                  {i === 2 && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-morrison-900">
                      You are here
                    </span>
                  )}
                  <div className={cn('mb-3 flex h-12 w-12 items-center justify-center rounded-xl', s.iconBg)}>
                    <s.Icon className={cn('h-6 w-6', s.iconColor)} />
                  </div>
                  <h3 className={cn('mb-2 text-lg font-black', i === 2 ? 'text-morrison-800' : 'text-slate-800')}>{s.stage}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              ))}
            </motion.div>
          </FadeSection>

          <FadeSection className="mt-10 space-y-3">
            {[
              { old: 'Spreadsheets emailed around — nobody sure which version is current', new: 'One live source of truth, updated in real time across the whole team' },
              { old: 'No visibility of supply-chain or weather risk until it hits the programme', new: 'Hidden AI surfaces supply-chain, capacity and weather risk in advance' },
              { old: 'Days spent rebuilding board packs before every programme review', new: 'One-click board-ready reporting — always current, always on brand' },
              { old: 'No way to see how a capex decision ripples through delivery', new: 'Interactive analysis of the end-to-end operations and cost picture' },
            ].map((point, i) => (
              <motion.div key={i} variants={fadeUp} className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                  <p className="text-sm text-slate-600">{point.old}</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm font-medium text-slate-800">{point.new}</p>
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
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">
              Everything in one platform
            </motion.div>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight">
              Complete visibility, end to end
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-slate-500">
              Built by CPC programme managers who understand refrigeration delivery from the inside.
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

      {/* Lifecycle pipeline */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeSection className="mb-12 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">
              End-to-end coverage
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-black tracking-tight">
              Every delivery stage, tracked
            </motion.h2>
          </FadeSection>
          <FadeSection>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2">
              {['Identification', 'Feasibility', 'Design', 'Tender', 'Award', 'Construction', 'Commissioning', 'Handover'].map(
                (stage, i) => (
                  <div key={stage} className="flex items-center gap-2">
                    <div className="rounded-full bg-morrison-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">{stage}</div>
                    {i < 7 && <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300" />}
                  </div>
                ),
              )}
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeSection className="mb-16 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">
              Built with delivery teams
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-black tracking-tight">
              Programme leadership, with confidence
            </motion.h2>
          </FadeSection>
          <FadeSection className="grid gap-6 md:grid-cols-3">
            {[
              { quote: '"For the first time we can see the whole estate in one place — progress, spend and risk — without chasing twelve different spreadsheets."', name: 'Programme Director', org: 'National Retail Estate' },
              { quote: '"The AI flagged a compressor supply risk weeks before it would have hit our critical path. That foresight alone changes how we plan."', name: 'Head of Refrigeration', org: 'Grocery Retailer' },
              { quote: '"Board packs that used to take days now take a click — and they are always current and on brand. It is a genuine step change."', name: 'Capital Delivery Lead', org: 'Supermarket Group' },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-slate-600">{t.quote}</p>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.org}</p>
                </div>
              </motion.div>
            ))}
          </FadeSection>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeSection className="mb-16 text-center">
            <motion.div variants={fadeUp} className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">
              Engagement models
            </motion.div>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight">
              A platform that scales with the programme
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500">
              From a single region to the full national estate — tailored to how Morrisons delivers.
            </motion.p>
          </FadeSection>
          <FadeSection className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Regional', price: 'Pilot', period: '', desc: 'Prove the platform on a single delivery region before scaling.', features: ['Up to 50 stores', 'Live store register', 'Estate map & funnel', 'Financial dashboard', 'PDF board packs'], highlight: false },
              { name: 'National Programme', price: 'Core', period: '', desc: 'The full national refrigeration programme, managed live end to end.', features: ['All 412 stores', 'AI Programme Intelligence', 'Weather & supply-chain signals', 'Contractor performance', 'Document hub & reporting', 'Dedicated CPC team'], highlight: true },
              { name: 'Enterprise Estate', price: 'Custom', period: '', desc: 'Multi-programme capital delivery across the whole estate.', features: ['Unlimited programmes', 'Capex impact modelling', 'ERP & BMS integration', 'Custom analytics', 'Net Zero reporting suite'], highlight: false },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={cn(
                  'relative space-y-5 rounded-2xl border p-6',
                  plan.highlight ? 'border-morrison-300 bg-morrison-700 text-white shadow-xl shadow-morrison-700/20' : 'border-slate-200 bg-white shadow-sm',
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-morrison-900 shadow-sm">
                    Recommended
                  </div>
                )}
                <div>
                  <p className={cn('text-sm font-semibold', plan.highlight ? 'text-morrison-200' : 'text-slate-500')}>{plan.name}</p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className={cn('text-4xl font-black', plan.highlight ? 'text-white' : 'text-slate-900')}>{plan.price}</span>
                    <span className={cn('text-sm', plan.highlight ? 'text-morrison-300' : 'text-slate-400')}>{plan.period}</span>
                  </div>
                  <p className={cn('mt-2 text-sm', plan.highlight ? 'text-morrison-200' : 'text-slate-500')}>{plan.desc}</p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className={cn('flex items-center gap-2 text-sm', plan.highlight ? 'text-white' : 'text-slate-700')}>
                      <CheckCircle2 className={cn('h-3.5 w-3.5 flex-shrink-0', plan.highlight ? 'text-gold-400' : 'text-morrison-500')} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/overview"
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all',
                    plan.highlight ? 'bg-white text-morrison-700 hover:bg-morrison-50' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                  )}
                >
                  View dashboard <ArrowRight className="h-3.5 w-3.5" />
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
              <h2 className="text-4xl font-black tracking-tight text-white">Ready to see the whole programme, live?</h2>
              <p className="text-lg text-morrison-100">
                Explore the working dashboard — built with the full national refrigeration replacement programme in mind.
                Credible, modern and tailored specifically to Morrisons.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/overview"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-morrison-700 shadow-lg transition-all hover:bg-morrison-50"
                >
                  <Sparkles className="h-4 w-4" />
                  Open the live dashboard
                </Link>
                <a
                  href="mailto:bilal.jamil@cpcprojectservices.com"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition-all hover:bg-white/20"
                >
                  Talk to CPC Project Services
                </a>
              </div>
              <p className="text-xs text-morrison-300">
                Morrisons Refrigeration Transition Programme · A CPC Project Services platform
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
              <a key={l} href="#" className="text-xs text-slate-400 transition-colors hover:text-slate-700">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
