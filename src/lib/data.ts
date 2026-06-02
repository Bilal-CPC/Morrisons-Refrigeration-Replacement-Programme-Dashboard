// ─── Types ──────────────────────────────────────────────────────────────────

export type StoreStage =
  | 'Complete'
  | 'OnSite'
  | 'Design'
  | 'Procurement'
  | 'AtRisk'
  | 'NotStarted';

export type RAG = 'Green' | 'Amber' | 'Red';

export interface Milestone {
  label: string;
  done: boolean;
  active: boolean;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  region: string;
  lat: number;
  lon: number;
  stage: StoreStage;
  budget: number;
  forecast: number;
  start: string;
  completion: string;
  status: RAG;
  contractor: string;
  pm: string;
  risks: string[];
  milestones: Milestone[];
}

// ─── Stage metadata ─────────────────────────────────────────────────────────

export const STAGE_META: Record<StoreStage, { label: string; color: string; bg: string; text: string }> = {
  Complete: { label: 'Complete', color: '#16a34a', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  OnSite: { label: 'On Site', color: '#d97706', bg: 'bg-amber-100', text: 'text-amber-700' },
  Design: { label: 'In Design', color: '#2563eb', bg: 'bg-blue-100', text: 'text-blue-700' },
  Procurement: { label: 'Procurement', color: '#7c3aed', bg: 'bg-violet-100', text: 'text-violet-700' },
  AtRisk: { label: 'At Risk', color: '#dc2626', bg: 'bg-red-100', text: 'text-red-700' },
  NotStarted: { label: 'Not Started', color: '#94a3b8', bg: 'bg-slate-100', text: 'text-slate-600' },
};

export const RAG_META: Record<RAG, { color: string; bg: string; text: string; label: string }> = {
  Green: { color: '#16a34a', bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'On Track' },
  Amber: { color: '#d97706', bg: 'bg-amber-100', text: 'text-amber-700', label: 'Attention' },
  Red: { color: '#dc2626', bg: 'bg-red-100', text: 'text-red-700', label: 'At Risk' },
};

// ─── Milestone templates ──────────────────────────────────────────────────────

const M_FULL: Milestone[] = [
  { label: 'Feasibility', done: true, active: false },
  { label: 'Design', done: true, active: false },
  { label: 'Tender', done: true, active: false },
  { label: 'Pre-start Meeting', done: true, active: false },
  { label: 'Construction', done: false, active: true },
  { label: 'Commissioning', done: false, active: false },
  { label: 'Handover', done: false, active: false },
];
const M_DESIGN: Milestone[] = [
  { label: 'Feasibility', done: true, active: false },
  { label: 'Design', done: false, active: true },
  { label: 'Tender', done: false, active: false },
  { label: 'Pre-start Meeting', done: false, active: false },
  { label: 'Construction', done: false, active: false },
  { label: 'Commissioning', done: false, active: false },
  { label: 'Handover', done: false, active: false },
];
const M_DONE: Milestone[] = M_FULL.map((m) => ({ ...m, done: true, active: false }));

// ─── Stores ─────────────────────────────────────────────────────────────────

export const STORES: Store[] = [
  { id: 'MRS-001', name: 'Leeds Kirkstall', city: 'Leeds', region: 'Yorkshire', lat: 53.81, lon: -1.6, stage: 'OnSite', budget: 420000, forecast: 415000, start: '15 Jan 2026', completion: '28 Mar 2026', status: 'Amber', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: ['Temporary refrigeration lead time', 'Out of hours working restrictions'], milestones: M_FULL },
  { id: 'MRS-002', name: 'Leeds Moortown', city: 'Leeds', region: 'Yorkshire', lat: 53.84, lon: -1.54, stage: 'Complete', budget: 385000, forecast: 378000, start: '3 Sep 2025', completion: '14 Nov 2025', status: 'Green', contractor: 'Contractor B', pm: 'James Thornton', risks: [], milestones: M_DONE },
  { id: 'MRS-003', name: 'Bradford Idle', city: 'Bradford', region: 'Yorkshire', lat: 53.82, lon: -1.75, stage: 'Design', budget: 410000, forecast: 408000, start: '12 May 2026', completion: '31 Jul 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: ['Planning approval delay'], milestones: M_DESIGN },
  { id: 'MRS-004', name: 'Sheffield Hillsborough', city: 'Sheffield', region: 'Yorkshire', lat: 53.42, lon: -1.5, stage: 'OnSite', budget: 445000, forecast: 462000, start: '20 Jan 2026', completion: '15 Apr 2026', status: 'Red', contractor: 'Contractor C', pm: 'David Walsh', risks: ['Cost overrun — specialist pipework', 'Extended programme due to asbestos survey'], milestones: M_FULL },
  { id: 'MRS-005', name: 'Manchester Eccles', city: 'Manchester', region: 'North West', lat: 53.48, lon: -2.34, stage: 'Complete', budget: 395000, forecast: 391000, start: '5 Aug 2025', completion: '20 Oct 2025', status: 'Green', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-006', name: 'Liverpool Wavertree', city: 'Liverpool', region: 'North West', lat: 53.4, lon: -2.92, stage: 'Procurement', budget: 430000, forecast: 425000, start: '3 Jun 2026', completion: '28 Aug 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: ['Supply chain — refrigerant availability'], milestones: M_DESIGN },
  { id: 'MRS-007', name: 'Birmingham Erdington', city: 'Birmingham', region: 'Midlands', lat: 52.52, lon: -1.84, stage: 'Design', budget: 415000, forecast: 412000, start: '15 Jun 2026', completion: '10 Sep 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-008', name: 'London Clapham', city: 'London', region: 'London & South', lat: 51.46, lon: -0.14, stage: 'NotStarted', budget: 520000, forecast: 520000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-009', name: 'London Streatham', city: 'London', region: 'London & South', lat: 51.42, lon: -0.13, stage: 'NotStarted', budget: 510000, forecast: 510000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-010', name: 'Newcastle Byker', city: 'Newcastle', region: 'North East', lat: 54.97, lon: -1.57, stage: 'Complete', budget: 370000, forecast: 365000, start: '10 Jul 2025', completion: '25 Sep 2025', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-011', name: 'Bristol Bedminster', city: 'Bristol', region: 'South West', lat: 51.44, lon: -2.61, stage: 'OnSite', budget: 440000, forecast: 438000, start: '12 Feb 2026', completion: '30 Apr 2026', status: 'Amber', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: ['Weekend working restrictions', 'Structural survey pending'], milestones: M_FULL },
  { id: 'MRS-012', name: 'Cardiff Roath', city: 'Cardiff', region: 'Wales', lat: 51.5, lon: -3.16, stage: 'Procurement', budget: 400000, forecast: 396000, start: '1 Jul 2026', completion: '20 Sep 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-013', name: 'Edinburgh Corstorphine', city: 'Edinburgh', region: 'Scotland', lat: 55.94, lon: -3.28, stage: 'Design', budget: 435000, forecast: 430000, start: '1 Aug 2026', completion: '20 Oct 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-014', name: 'Glasgow Parkhead', city: 'Glasgow', region: 'Scotland', lat: 55.85, lon: -4.22, stage: 'NotStarted', budget: 445000, forecast: 445000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-015', name: 'Nottingham Bulwell', city: 'Nottingham', region: 'Midlands', lat: 53.0, lon: -1.19, stage: 'Complete', budget: 380000, forecast: 374000, start: '22 Jun 2025', completion: '8 Sep 2025', status: 'Green', contractor: 'Contractor A', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-016', name: 'Leicester Beaumont Leys', city: 'Leicester', region: 'Midlands', lat: 52.66, lon: -1.16, stage: 'OnSite', budget: 425000, forecast: 421000, start: '28 Jan 2026', completion: '18 Apr 2026', status: 'Green', contractor: 'Contractor B', pm: 'James Thornton', risks: ['Minor equipment delivery delay'], milestones: M_FULL },
  { id: 'MRS-017', name: 'York Monks Cross', city: 'York', region: 'Yorkshire', lat: 53.98, lon: -1.05, stage: 'Complete', budget: 390000, forecast: 385000, start: '14 Apr 2025', completion: '27 Jun 2025', status: 'Green', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-018', name: 'Wakefield Kirkgate', city: 'Wakefield', region: 'Yorkshire', lat: 53.68, lon: -1.5, stage: 'Design', budget: 405000, forecast: 402000, start: '20 May 2026', completion: '12 Aug 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-019', name: 'Huddersfield Newsome', city: 'Huddersfield', region: 'Yorkshire', lat: 53.63, lon: -1.78, stage: 'Procurement', budget: 415000, forecast: 410000, start: '10 Jun 2026', completion: '2 Sep 2026', status: 'Amber', contractor: 'TBC', pm: 'David Walsh', risks: ['Contractor capacity constraints in Yorkshire region'], milestones: M_DESIGN },
  { id: 'MRS-020', name: 'Hull Bransholme', city: 'Hull', region: 'Yorkshire', lat: 53.78, lon: -0.3, stage: 'AtRisk', budget: 430000, forecast: 455000, start: '3 Feb 2026', completion: '28 Apr 2026', status: 'Red', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: ['3-week forecast overrun', 'Temporary refrigeration hire escalating', 'Supply chain delays to compressor units'], milestones: M_FULL },
  { id: 'MRS-021', name: 'Norwich Bowthorpe', city: 'Norwich', region: 'East', lat: 52.63, lon: 1.24, stage: 'NotStarted', budget: 400000, forecast: 400000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-022', name: 'Derby Chellaston', city: 'Derby', region: 'Midlands', lat: 52.86, lon: -1.43, stage: 'Design', budget: 415000, forecast: 412000, start: '5 Jun 2026', completion: '28 Aug 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-023', name: 'Coventry Arena', city: 'Coventry', region: 'Midlands', lat: 52.43, lon: -1.49, stage: 'Complete', budget: 375000, forecast: 372000, start: '1 Oct 2025', completion: '15 Dec 2025', status: 'Green', contractor: 'Contractor A', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-024', name: 'Stockton Ingleby', city: 'Stockton', region: 'North East', lat: 54.49, lon: -1.35, stage: 'OnSite', budget: 420000, forecast: 418000, start: '18 Feb 2026', completion: '10 May 2026', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_FULL },
  { id: 'MRS-025', name: 'Sunderland Washington', city: 'Sunderland', region: 'North East', lat: 54.9, lon: -1.53, stage: 'Complete', budget: 360000, forecast: 355000, start: '18 Mar 2025', completion: '30 May 2025', status: 'Green', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-026', name: 'Middlesbrough Coulby', city: 'Middlesbrough', region: 'North East', lat: 54.52, lon: -1.26, stage: 'Procurement', budget: 408000, forecast: 405000, start: '15 Jul 2026', completion: '5 Oct 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-027', name: 'Preston Deepdale', city: 'Preston', region: 'North West', lat: 53.77, lon: -2.7, stage: 'Design', budget: 412000, forecast: 409000, start: '8 Jun 2026', completion: '28 Aug 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-028', name: 'Blackpool Layton', city: 'Blackpool', region: 'North West', lat: 53.83, lon: -3.05, stage: 'NotStarted', budget: 395000, forecast: 395000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-029', name: 'Wigan Newtown', city: 'Wigan', region: 'North West', lat: 53.55, lon: -2.63, stage: 'OnSite', budget: 418000, forecast: 415000, start: '5 Mar 2026', completion: '22 May 2026', status: 'Green', contractor: 'Contractor C', pm: 'David Walsh', risks: [], milestones: M_FULL },
  { id: 'MRS-030', name: 'Bolton Tonge Moor', city: 'Bolton', region: 'North West', lat: 53.58, lon: -2.43, stage: 'Complete', budget: 378000, forecast: 375000, start: '11 Nov 2025', completion: '20 Jan 2026', status: 'Green', contractor: 'Contractor B', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-031', name: 'Stoke Hanley', city: 'Stoke-on-Trent', region: 'Midlands', lat: 53.02, lon: -2.18, stage: 'Design', budget: 405000, forecast: 400000, start: '22 Jun 2026', completion: '12 Sep 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-032', name: 'Wolverhampton Penn', city: 'Wolverhampton', region: 'Midlands', lat: 52.57, lon: -2.13, stage: 'Procurement', budget: 425000, forecast: 422000, start: '10 Aug 2026', completion: '30 Oct 2026', status: 'Amber', contractor: 'TBC', pm: 'Emma Clarke', risks: ['Resource availability — Midlands region constrained'], milestones: M_DESIGN },
  { id: 'MRS-033', name: 'Southampton Bitterne', city: 'Southampton', region: 'London & South', lat: 50.92, lon: -1.37, stage: 'NotStarted', budget: 490000, forecast: 490000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-034', name: 'Portsmouth Fratton', city: 'Portsmouth', region: 'London & South', lat: 50.8, lon: -1.07, stage: 'NotStarted', budget: 475000, forecast: 475000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-035', name: 'Reading Tilehurst', city: 'Reading', region: 'London & South', lat: 51.45, lon: -1.03, stage: 'Design', budget: 500000, forecast: 496000, start: '1 Sep 2026', completion: '20 Nov 2026', status: 'Green', contractor: 'TBC', pm: 'David Walsh', risks: [], milestones: M_DESIGN },
  { id: 'MRS-036', name: 'Oxford Cowley', city: 'Oxford', region: 'London & South', lat: 51.74, lon: -1.2, stage: 'NotStarted', budget: 510000, forecast: 510000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-037', name: 'Cambridge Newmarket Rd', city: 'Cambridge', region: 'East', lat: 52.2, lon: 0.15, stage: 'NotStarted', budget: 505000, forecast: 505000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-038', name: 'Ipswich Whitehouse', city: 'Ipswich', region: 'East', lat: 52.07, lon: 1.15, stage: 'NotStarted', budget: 410000, forecast: 410000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-039', name: 'Exeter Pinhoe', city: 'Exeter', region: 'South West', lat: 50.74, lon: -3.48, stage: 'NotStarted', budget: 420000, forecast: 420000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-040', name: 'Plymouth Estover', city: 'Plymouth', region: 'South West', lat: 50.4, lon: -4.07, stage: 'NotStarted', budget: 415000, forecast: 415000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-041', name: 'Swansea Fforestfach', city: 'Swansea', region: 'Wales', lat: 51.64, lon: -3.97, stage: 'NotStarted', budget: 405000, forecast: 405000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-042', name: 'Chester Broughton', city: 'Chester', region: 'North West', lat: 53.19, lon: -2.98, stage: 'Complete', budget: 388000, forecast: 382000, start: '20 Sep 2025', completion: '5 Dec 2025', status: 'Green', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-043', name: 'Aberdeen Garthdee', city: 'Aberdeen', region: 'Scotland', lat: 57.12, lon: -2.12, stage: 'NotStarted', budget: 450000, forecast: 450000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-044', name: 'Dundee Kirkton', city: 'Dundee', region: 'Scotland', lat: 56.48, lon: -2.97, stage: 'NotStarted', budget: 440000, forecast: 440000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-045', name: 'Inverness Inshes', city: 'Inverness', region: 'Scotland', lat: 57.48, lon: -4.21, stage: 'NotStarted', budget: 465000, forecast: 465000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-046', name: 'Doncaster Wheatley', city: 'Doncaster', region: 'Yorkshire', lat: 53.53, lon: -1.1, stage: 'OnSite', budget: 422000, forecast: 420000, start: '10 Feb 2026', completion: '30 Apr 2026', status: 'Green', contractor: 'Contractor B', pm: 'James Thornton', risks: [], milestones: M_FULL },
  { id: 'MRS-047', name: 'Rotherham Parkgate', city: 'Rotherham', region: 'Yorkshire', lat: 53.43, lon: -1.36, stage: 'Complete', budget: 374000, forecast: 370000, start: '14 Jul 2025', completion: '25 Sep 2025', status: 'Green', contractor: 'Contractor C', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-048', name: 'Barnsley Athersley', city: 'Barnsley', region: 'Yorkshire', lat: 53.57, lon: -1.49, stage: 'Design', budget: 398000, forecast: 395000, start: '1 Jul 2026', completion: '18 Sep 2026', status: 'Green', contractor: 'TBC', pm: 'David Walsh', risks: [], milestones: M_DESIGN },
  { id: 'MRS-049', name: 'London Muswell Hill', city: 'London', region: 'London & South', lat: 51.59, lon: -0.14, stage: 'NotStarted', budget: 540000, forecast: 540000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-050', name: 'London Bounds Green', city: 'London', region: 'London & South', lat: 51.6, lon: -0.12, stage: 'AtRisk', budget: 530000, forecast: 558000, start: '8 Jan 2026', completion: '28 Mar 2026', status: 'Red', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: ['Store trading pattern restricts access windows', 'HV isolation works overrunning', 'Forecast to exceed budget by £28k'], milestones: M_FULL },
];

// ─── Programme-level KPIs (headline numbers from the brief) ────────────────────

export const PROGRAMME = {
  totalStores: 412,
  completed: 127,
  onSite: 34,
  inDesign: 52,
  inProcurement: 41,
  notStarted: 158,
  completionPct: 31,
  forecastCompletion: 'Q4 2029',
  approvedBudget: 50_000_000,
  forecastFinalCost: 47_000_000,
  spendToDate: 22_000_000,
  committedSpend: 34_000_000,
  forecastSavings: 3_000_000,
  carbonSaved: 18_700,
  energyReduction: 12,
  annualCostSaving: 7_300_000,
  fGasDeadline: '2029-11-08T00:00:00',
};

// ─── Programme health (RAG) ────────────────────────────────────────────────────

export const HEALTH: { label: string; status: RAG; note: string }[] = [
  { label: 'Safety', status: 'Green', note: 'Zero reportable incidents this period' },
  { label: 'Programme', status: 'Amber', note: 'Northern region tracking 2 weeks behind plan' },
  { label: 'Cost', status: 'Green', note: 'Forecast £3m saving against approved budget' },
  { label: 'Risk', status: 'Amber', note: '3 stores escalated for PM intervention' },
  { label: 'Sustainability', status: 'Green', note: '18,700 tCO₂e saved against baseline' },
  { label: 'Supply Chain Capacity', status: 'Red', note: 'Compressor units running a 6-week lead time' },
];

// ─── Delivery funnel ──────────────────────────────────────────────────────────

export const FUNNEL: { stage: string; count: number; color: string }[] = [
  { stage: 'Identification', count: 412, color: '#1e293b' },
  { stage: 'Feasibility', count: 385, color: '#1a5b36' },
  { stage: 'Design', count: 341, color: '#2563eb' },
  { stage: 'Tender', count: 289, color: '#7c3aed' },
  { stage: 'Award', count: 254, color: '#0891b2' },
  { stage: 'Construction', count: 161, color: '#d97706' },
  { stage: 'Commissioning', count: 127, color: '#16a34a' },
  { stage: 'Handover', count: 127, color: '#16a34a' },
];

// ─── AI insights ──────────────────────────────────────────────────────────────

export const AI_INSIGHTS: {
  severity: 'high' | 'medium' | 'low';
  tag: string;
  text: string;
  stores: number;
}[] = [
  { severity: 'high', tag: 'Supply Chain', stores: 12, text: 'Supply chain pressure identified in the Northern Region — compressor unit lead times extended to 6 weeks. 12 upcoming project starts at risk.' },
  { severity: 'high', tag: 'Resource', stores: 12, text: 'Contractor resource availability risk affecting 12 stores in Yorkshire & Humber. Recommend proactive subcontractor engagement.' },
  { severity: 'medium', tag: 'Cost Risk', stores: 8, text: 'Temporary refrigeration requirements likely to increase programme cost by £1.2m. 8 stores currently using hire units beyond planned duration.' },
  { severity: 'high', tag: 'Programme Risk', stores: 1, text: 'Store MRS-020 (Hull Bransholme) forecast to exceed planned completion by 3 weeks. HV isolation works overrunning — escalation recommended.' },
  { severity: 'medium', tag: 'Weather Signal', stores: 7, text: 'Weather modelling indicates elevated risk of a cold snap in Scotland during Q4 2026, affecting 7 stores in commissioning. Contingency planning advised.' },
];

// ─── Contractors ──────────────────────────────────────────────────────────────

export const CONTRACTORS: {
  rank: number;
  name: string;
  stores: number;
  onTime: number;
  costVariance: number;
}[] = [
  { rank: 1, name: 'Contractor A', stores: 42, onTime: 96, costVariance: -2.1 },
  { rank: 2, name: 'Contractor C', stores: 29, onTime: 92, costVariance: -0.8 },
  { rank: 3, name: 'Contractor B', stores: 35, onTime: 89, costVariance: 1.2 },
  { rank: 4, name: 'Contractor D', stores: 12, onTime: 83, costVariance: 3.5 },
  { rank: 5, name: 'Contractor E', stores: 8, onTime: 75, costVariance: 5.8 },
  { rank: 6, name: 'Contractor F', stores: 1, onTime: 0, costVariance: 12.4 },
];

// ─── Monthly risk-reduction trend (for charts) ─────────────────────────────────

export const COMPLETION_TREND = [
  { month: 'Jul', completed: 18, onSite: 12 },
  { month: 'Aug', completed: 31, onSite: 16 },
  { month: 'Sep', completed: 52, onSite: 19 },
  { month: 'Oct', completed: 71, onSite: 22 },
  { month: 'Nov', completed: 88, onSite: 24 },
  { month: 'Dec', completed: 99, onSite: 27 },
  { month: 'Jan', completed: 110, onSite: 29 },
  { month: 'Feb', completed: 118, onSite: 31 },
  { month: 'Mar', completed: 122, onSite: 33 },
  { month: 'Apr', completed: 125, onSite: 34 },
  { month: 'May', completed: 127, onSite: 34 },
];

export const SPEND_TREND = [
  { month: 'Jul', spend: 6, committed: 14 },
  { month: 'Aug', spend: 9, committed: 18 },
  { month: 'Sep', spend: 12, committed: 22 },
  { month: 'Oct', spend: 14, committed: 25 },
  { month: 'Nov', spend: 16, committed: 28 },
  { month: 'Dec', spend: 18, committed: 30 },
  { month: 'Jan', spend: 19, committed: 31 },
  { month: 'Feb', spend: 20, committed: 32 },
  { month: 'Mar', spend: 21, committed: 33 },
  { month: 'Apr', spend: 21.5, committed: 33.5 },
  { month: 'May', spend: 22, committed: 34 },
];

// ─── Documents ────────────────────────────────────────────────────────────────

export const DOCUMENTS: { label: string; count: string; icon: string }[] = [
  { label: 'Handover Photos', count: '2,847 files', icon: 'camera' },
  { label: 'Snagging Register', count: '127 registers', icon: 'clipboard' },
  { label: 'Tender Documents', count: '254 packages', icon: 'file' },
  { label: 'Site Progress Reports', count: '1,032 reports', icon: 'hardhat' },
  { label: 'Risk Register', count: '412 registers', icon: 'alert' },
  { label: 'Cost Reports', count: '508 reports', icon: 'pound' },
  { label: 'Meeting Minutes', count: '3,218 files', icon: 'message' },
  { label: 'Programme Reports', count: '97 reports', icon: 'chart' },
];
