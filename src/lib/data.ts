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
  // ── Scotland ──
  { id: 'MRS-051', name: 'Glasgow Dumbreck', city: 'Glasgow', region: 'Scotland', lat: 55.84, lon: -4.31, stage: 'Complete', budget: 438000, forecast: 432000, start: '2 Jun 2025', completion: '18 Aug 2025', status: 'Green', contractor: 'Contractor B', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-052', name: 'Glasgow Anniesland', city: 'Glasgow', region: 'Scotland', lat: 55.88, lon: -4.32, stage: 'NotStarted', budget: 442000, forecast: 442000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-053', name: 'Paisley Linwood', city: 'Paisley', region: 'Scotland', lat: 55.83, lon: -4.44, stage: 'Design', budget: 435000, forecast: 431000, start: '10 Sep 2026', completion: '28 Nov 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-054', name: 'Livingston Deans', city: 'Livingston', region: 'Scotland', lat: 55.88, lon: -3.54, stage: 'Complete', budget: 448000, forecast: 441000, start: '14 Apr 2025', completion: '30 Jun 2025', status: 'Green', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-055', name: 'Stirling Springkerse', city: 'Stirling', region: 'Scotland', lat: 56.11, lon: -3.92, stage: 'NotStarted', budget: 450000, forecast: 450000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-056', name: 'Perth Inveralmond', city: 'Perth', region: 'Scotland', lat: 56.41, lon: -3.43, stage: 'NotStarted', budget: 455000, forecast: 455000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-057', name: 'Kirkcaldy Templehall', city: 'Kirkcaldy', region: 'Scotland', lat: 56.11, lon: -3.15, stage: 'Procurement', budget: 442000, forecast: 438000, start: '1 Sep 2026', completion: '20 Nov 2026', status: 'Green', contractor: 'TBC', pm: 'David Walsh', risks: [], milestones: M_DESIGN },
  { id: 'MRS-058', name: 'Airdrie Rawyards', city: 'Airdrie', region: 'Scotland', lat: 55.86, lon: -3.98, stage: 'Complete', budget: 436000, forecast: 430000, start: '19 May 2025', completion: '4 Aug 2025', status: 'Green', contractor: 'Contractor C', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-059', name: 'Falkirk Central', city: 'Falkirk', region: 'Scotland', lat: 56.00, lon: -3.78, stage: 'OnSite', budget: 440000, forecast: 437000, start: '20 Mar 2026', completion: '10 Jun 2026', status: 'Green', contractor: 'Contractor B', pm: 'James Thornton', risks: [], milestones: M_FULL },
  { id: 'MRS-060', name: 'Dunfermline Halbeath', city: 'Dunfermline', region: 'Scotland', lat: 56.09, lon: -3.44, stage: 'NotStarted', budget: 447000, forecast: 447000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  // ── North East ──
  { id: 'MRS-061', name: 'Gateshead Leam Lane', city: 'Gateshead', region: 'North East', lat: 54.94, lon: -1.57, stage: 'Complete', budget: 365000, forecast: 360000, start: '7 Jul 2025', completion: '22 Sep 2025', status: 'Green', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-062', name: 'Durham Dragonville', city: 'Durham', region: 'North East', lat: 54.77, lon: -1.55, stage: 'Design', budget: 372000, forecast: 370000, start: '15 Jul 2026', completion: '5 Oct 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-063', name: 'Darlington Parkgate', city: 'Darlington', region: 'North East', lat: 54.52, lon: -1.56, stage: 'Complete', budget: 368000, forecast: 362000, start: '12 Aug 2025', completion: '28 Oct 2025', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-064', name: 'Hartlepool Marina', city: 'Hartlepool', region: 'North East', lat: 54.69, lon: -1.21, stage: 'NotStarted', budget: 375000, forecast: 375000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  // ── Yorkshire additions ──
  { id: 'MRS-065', name: 'Dewsbury Owl Lane', city: 'Dewsbury', region: 'Yorkshire', lat: 53.69, lon: -1.64, stage: 'OnSite', budget: 400000, forecast: 398000, start: '25 Feb 2026', completion: '14 May 2026', status: 'Green', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: [], milestones: M_FULL },
  { id: 'MRS-066', name: 'Halifax Pellon', city: 'Halifax', region: 'Yorkshire', lat: 53.73, lon: -1.87, stage: 'Complete', budget: 382000, forecast: 378000, start: '30 Jun 2025', completion: '15 Sep 2025', status: 'Green', contractor: 'Contractor A', pm: 'James Thornton', risks: [], milestones: M_DONE },
  { id: 'MRS-067', name: 'Keighley Airedale', city: 'Keighley', region: 'Yorkshire', lat: 53.87, lon: -1.91, stage: 'Procurement', budget: 390000, forecast: 387000, start: '20 Aug 2026', completion: '10 Nov 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-068', name: 'Scarborough Seamer Rd', city: 'Scarborough', region: 'Yorkshire', lat: 54.27, lon: -0.43, stage: 'NotStarted', budget: 380000, forecast: 380000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-069', name: 'Harrogate Bower Rd', city: 'Harrogate', region: 'Yorkshire', lat: 53.99, lon: -1.53, stage: 'Complete', budget: 388000, forecast: 382000, start: '5 May 2025', completion: '21 Jul 2025', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_DONE },
  // ── North West additions ──
  { id: 'MRS-070', name: 'Bury Pilsworth', city: 'Bury', region: 'North West', lat: 53.60, lon: -2.30, stage: 'Complete', budget: 385000, forecast: 380000, start: '16 Sep 2025', completion: '1 Dec 2025', status: 'Green', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-071', name: 'Oldham Hollinwood', city: 'Oldham', region: 'North West', lat: 53.54, lon: -2.13, stage: 'Design', budget: 390000, forecast: 387000, start: '8 Aug 2026', completion: '28 Oct 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-072', name: 'Stockport Cheadle', city: 'Stockport', region: 'North West', lat: 53.38, lon: -2.22, stage: 'NotStarted', budget: 392000, forecast: 392000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-073', name: 'Warrington Westbrook', city: 'Warrington', region: 'North West', lat: 53.40, lon: -2.63, stage: 'Complete', budget: 387000, forecast: 382000, start: '24 Jul 2025', completion: '9 Oct 2025', status: 'Green', contractor: 'Contractor A', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-074', name: 'St Helens Ravenhead', city: 'St Helens', region: 'North West', lat: 53.46, lon: -2.74, stage: 'OnSite', budget: 395000, forecast: 393000, start: '12 Mar 2026', completion: '30 May 2026', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_FULL },
  { id: 'MRS-075', name: 'Burnley Cliviger', city: 'Burnley', region: 'North West', lat: 53.79, lon: -2.24, stage: 'NotStarted', budget: 385000, forecast: 385000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-076', name: 'Lancaster Bulk Rd', city: 'Lancaster', region: 'North West', lat: 54.05, lon: -2.80, stage: 'Procurement', budget: 392000, forecast: 389000, start: '1 Oct 2026', completion: '20 Dec 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-077', name: 'Carlisle Kingstown', city: 'Carlisle', region: 'North West', lat: 54.91, lon: -2.93, stage: 'Complete', budget: 378000, forecast: 374000, start: '28 Apr 2025', completion: '14 Jul 2025', status: 'Green', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  // ── Midlands additions ──
  { id: 'MRS-078', name: 'Walsall Tempus Ten', city: 'Walsall', region: 'Midlands', lat: 52.59, lon: -1.98, stage: 'Design', budget: 412000, forecast: 408000, start: '1 Jul 2026', completion: '20 Sep 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-079', name: 'Dudley Merry Hill', city: 'Dudley', region: 'Midlands', lat: 52.50, lon: -2.10, stage: 'NotStarted', budget: 418000, forecast: 418000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-080', name: 'Shrewsbury Meole Brace', city: 'Shrewsbury', region: 'Midlands', lat: 52.70, lon: -2.76, stage: 'Complete', budget: 395000, forecast: 390000, start: '23 Jun 2025', completion: '8 Sep 2025', status: 'Green', contractor: 'Contractor A', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-081', name: 'Telford Wrekin', city: 'Telford', region: 'Midlands', lat: 52.68, lon: -2.45, stage: 'OnSite', budget: 408000, forecast: 405000, start: '6 Feb 2026', completion: '28 Apr 2026', status: 'Green', contractor: 'Contractor B', pm: 'James Thornton', risks: [], milestones: M_FULL },
  { id: 'MRS-082', name: 'Lincoln Tritton Rd', city: 'Lincoln', region: 'Midlands', lat: 53.23, lon: -0.54, stage: 'NotStarted', budget: 385000, forecast: 385000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-083', name: 'Burton Centrum', city: 'Burton-on-Trent', region: 'Midlands', lat: 52.81, lon: -1.64, stage: 'Design', budget: 405000, forecast: 401000, start: '10 Aug 2026', completion: '30 Oct 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-084', name: 'Stafford Beacon', city: 'Stafford', region: 'Midlands', lat: 52.80, lon: -2.12, stage: 'Procurement', budget: 400000, forecast: 397000, start: '15 Sep 2026', completion: '5 Dec 2026', status: 'Green', contractor: 'TBC', pm: 'David Walsh', risks: [], milestones: M_DESIGN },
  // ── East additions ──
  { id: 'MRS-085', name: 'Peterborough Queensgate', city: 'Peterborough', region: 'East', lat: 52.57, lon: -0.24, stage: 'Complete', budget: 395000, forecast: 390000, start: '4 Aug 2025', completion: '20 Oct 2025', status: 'Green', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-086', name: 'Northampton Sixfields', city: 'Northampton', region: 'East', lat: 52.23, lon: -0.92, stage: 'Design', budget: 408000, forecast: 405000, start: '20 Jul 2026', completion: '10 Oct 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-087', name: 'Milton Keynes Bletchley', city: 'Milton Keynes', region: 'East', lat: 52.00, lon: -0.75, stage: 'NotStarted', budget: 415000, forecast: 415000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-088', name: 'Luton Newland St', city: 'Luton', region: 'East', lat: 51.88, lon: -0.42, stage: 'Complete', budget: 420000, forecast: 415000, start: '15 Sep 2025', completion: '1 Dec 2025', status: 'Green', contractor: 'Contractor A', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-089', name: 'Bedford Interchange', city: 'Bedford', region: 'East', lat: 52.13, lon: -0.47, stage: 'NotStarted', budget: 405000, forecast: 405000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  // ── London additions ──
  { id: 'MRS-090', name: 'London Barking', city: 'London', region: 'London & South', lat: 51.54, lon: 0.08, stage: 'Complete', budget: 530000, forecast: 524000, start: '1 Oct 2025', completion: '15 Dec 2025', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-091', name: 'London Beckton', city: 'London', region: 'London & South', lat: 51.51, lon: 0.04, stage: 'OnSite', budget: 525000, forecast: 522000, start: '14 Feb 2026', completion: '5 May 2026', status: 'Green', contractor: 'Contractor C', pm: 'Sarah Mitchell', risks: [], milestones: M_FULL },
  { id: 'MRS-092', name: 'London Holloway', city: 'London', region: 'London & South', lat: 51.56, lon: -0.12, stage: 'NotStarted', budget: 535000, forecast: 535000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-093', name: 'London Wimbledon', city: 'London', region: 'London & South', lat: 51.42, lon: -0.21, stage: 'Design', budget: 528000, forecast: 524000, start: '5 Oct 2026', completion: '24 Dec 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-094', name: 'London Sidcup', city: 'London', region: 'London & South', lat: 51.43, lon: 0.10, stage: 'Complete', budget: 520000, forecast: 514000, start: '25 Aug 2025', completion: '10 Nov 2025', status: 'Green', contractor: 'Contractor A', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  // ── South East additions ──
  { id: 'MRS-095', name: 'Dartford Crossways', city: 'Dartford', region: 'London & South', lat: 51.45, lon: 0.23, stage: 'NotStarted', budget: 482000, forecast: 482000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-096', name: 'Maidstone Wouldham', city: 'Maidstone', region: 'London & South', lat: 51.27, lon: 0.52, stage: 'Complete', budget: 475000, forecast: 470000, start: '20 Oct 2025', completion: '8 Jan 2026', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-097', name: 'Crawley Manor Royal', city: 'Crawley', region: 'London & South', lat: 51.12, lon: -0.19, stage: 'Design', budget: 480000, forecast: 477000, start: '1 Aug 2026', completion: '20 Oct 2026', status: 'Green', contractor: 'TBC', pm: 'Sarah Mitchell', risks: [], milestones: M_DESIGN },
  { id: 'MRS-098', name: 'Guildford Ladymead', city: 'Guildford', region: 'London & South', lat: 51.25, lon: -0.56, stage: 'Procurement', budget: 492000, forecast: 488000, start: '10 Sep 2026', completion: '30 Nov 2026', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-099', name: 'Basingstoke Brighton Hill', city: 'Basingstoke', region: 'London & South', lat: 51.24, lon: -1.10, stage: 'NotStarted', budget: 475000, forecast: 475000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-100', name: 'Worthing Lyons Farm', city: 'Worthing', region: 'London & South', lat: 50.82, lon: -0.37, stage: 'Complete', budget: 468000, forecast: 462000, start: '17 Nov 2025', completion: '5 Feb 2026', status: 'Green', contractor: 'Contractor C', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-101', name: 'Horsham Broadbridge', city: 'Horsham', region: 'London & South', lat: 51.07, lon: -0.33, stage: 'Design', budget: 478000, forecast: 475000, start: '15 Sep 2026', completion: '5 Dec 2026', status: 'Green', contractor: 'TBC', pm: 'David Walsh', risks: [], milestones: M_DESIGN },
  // ── South West additions ──
  { id: 'MRS-102', name: 'Swindon Greenbridge', city: 'Swindon', region: 'South West', lat: 51.57, lon: -1.79, stage: 'Complete', budget: 430000, forecast: 424000, start: '9 Jun 2025', completion: '25 Aug 2025', status: 'Green', contractor: 'Contractor A', pm: 'Sarah Mitchell', risks: [], milestones: M_DONE },
  { id: 'MRS-103', name: 'Bath Moorland Rd', city: 'Bath', region: 'South West', lat: 51.38, lon: -2.36, stage: 'NotStarted', budget: 445000, forecast: 445000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-104', name: 'Cheltenham Gallagher', city: 'Cheltenham', region: 'South West', lat: 51.90, lon: -2.08, stage: 'OnSite', budget: 435000, forecast: 432000, start: '18 Mar 2026', completion: '8 Jun 2026', status: 'Green', contractor: 'Contractor B', pm: 'James Thornton', risks: [], milestones: M_FULL },
  { id: 'MRS-105', name: 'Gloucester Quedgeley', city: 'Gloucester', region: 'South West', lat: 51.82, lon: -2.27, stage: 'Design', budget: 428000, forecast: 425000, start: '20 Aug 2026', completion: '10 Nov 2026', status: 'Green', contractor: 'TBC', pm: 'Emma Clarke', risks: [], milestones: M_DESIGN },
  { id: 'MRS-106', name: 'Taunton Orchard', city: 'Taunton', region: 'South West', lat: 51.02, lon: -3.10, stage: 'NotStarted', budget: 420000, forecast: 420000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  // ── Wales additions ──
  { id: 'MRS-107', name: 'Newport Spytty Rd', city: 'Newport', region: 'Wales', lat: 51.59, lon: -2.99, stage: 'Complete', budget: 408000, forecast: 402000, start: '3 Nov 2025', completion: '20 Jan 2026', status: 'Green', contractor: 'Contractor C', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-108', name: 'Cwmbran Ty Coch', city: 'Cwmbran', region: 'Wales', lat: 51.65, lon: -3.02, stage: 'NotStarted', budget: 400000, forecast: 400000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-109', name: 'Merthyr Tydfil Pentrebach', city: 'Merthyr Tydfil', region: 'Wales', lat: 51.74, lon: -3.38, stage: 'Design', budget: 398000, forecast: 395000, start: '5 Oct 2026', completion: '25 Dec 2026', status: 'Green', contractor: 'TBC', pm: 'Sarah Mitchell', risks: [], milestones: M_DESIGN },
  { id: 'MRS-110', name: 'Llanelli Trostre', city: 'Llanelli', region: 'Wales', lat: 51.68, lon: -4.17, stage: 'Procurement', budget: 402000, forecast: 399000, start: '1 Nov 2026', completion: '20 Jan 2027', status: 'Green', contractor: 'TBC', pm: 'James Thornton', risks: [], milestones: M_DESIGN },
  { id: 'MRS-111', name: 'Wrexham Plas Coch', city: 'Wrexham', region: 'Wales', lat: 53.05, lon: -2.99, stage: 'Complete', budget: 395000, forecast: 390000, start: '1 Dec 2025', completion: '18 Feb 2026', status: 'Green', contractor: 'Contractor A', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-112', name: 'Bangor Caernarfon Rd', city: 'Bangor', region: 'Wales', lat: 53.22, lon: -4.13, stage: 'NotStarted', budget: 405000, forecast: 405000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  // ── Additional Midlands / East ──
  { id: 'MRS-113', name: 'Kettering Newborough', city: 'Kettering', region: 'East', lat: 52.40, lon: -0.72, stage: 'Complete', budget: 392000, forecast: 386000, start: '13 Oct 2025', completion: '1 Jan 2026', status: 'Green', contractor: 'Contractor B', pm: 'David Walsh', risks: [], milestones: M_DONE },
  { id: 'MRS-114', name: 'Wellingborough Turnells Mill', city: 'Wellingborough', region: 'East', lat: 52.30, lon: -0.69, stage: 'NotStarted', budget: 388000, forecast: 388000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-115', name: 'Hereford Bewell St', city: 'Hereford', region: 'Midlands', lat: 52.06, lon: -2.72, stage: 'Design', budget: 395000, forecast: 392000, start: '10 Sep 2026', completion: '30 Nov 2026', status: 'Green', contractor: 'TBC', pm: 'Sarah Mitchell', risks: [], milestones: M_DESIGN },
  { id: 'MRS-116', name: 'Worcestershire Warndon', city: 'Worcester', region: 'Midlands', lat: 52.21, lon: -2.14, stage: 'NotStarted', budget: 400000, forecast: 400000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-117', name: 'Rugby Elliots Field', city: 'Rugby', region: 'Midlands', lat: 52.37, lon: -1.25, stage: 'Complete', budget: 395000, forecast: 390000, start: '3 Nov 2025', completion: '22 Jan 2026', status: 'Green', contractor: 'Contractor C', pm: 'James Thornton', risks: [], milestones: M_DONE },
  // ── Further South East ──
  { id: 'MRS-118', name: 'Tonbridge Angel Centre', city: 'Tonbridge', region: 'London & South', lat: 51.20, lon: 0.27, stage: 'NotStarted', budget: 470000, forecast: 470000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-119', name: 'Woking Goldsworth Park', city: 'Woking', region: 'London & South', lat: 51.32, lon: -0.56, stage: 'Complete', budget: 476000, forecast: 470000, start: '6 Oct 2025', completion: '24 Dec 2025', status: 'Green', contractor: 'Contractor A', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-120', name: 'Fareham Newgate Lane', city: 'Fareham', region: 'London & South', lat: 50.85, lon: -1.18, stage: 'Design', budget: 468000, forecast: 465000, start: '1 Oct 2026', completion: '20 Dec 2026', status: 'Green', contractor: 'TBC', pm: 'David Walsh', risks: [], milestones: M_DESIGN },
  // ── North & East London (precise coordinates) ──
  { id: 'MRS-121', name: 'London Chingford Mount', city: 'London', region: 'London & South', lat: 51.6230, lon: -0.0167, stage: 'OnSite', budget: 482000, forecast: 478000, start: '5 Feb 2026', completion: '18 Apr 2026', status: 'Amber', contractor: 'Contractor D', pm: 'Priya Sharma', risks: ['Restricted delivery access on Old Church Road'], milestones: M_FULL },
  { id: 'MRS-122', name: 'London Enfield Town', city: 'London', region: 'London & South', lat: 51.6523, lon: -0.0807, stage: 'Design', budget: 495000, forecast: 491000, start: '12 May 2026', completion: '24 Jul 2026', status: 'Green', contractor: 'Contractor D', pm: 'Priya Sharma', risks: [], milestones: M_DESIGN },
  { id: 'MRS-123', name: 'London Edmonton Green', city: 'London', region: 'London & South', lat: 51.6149, lon: -0.0610, stage: 'NotStarted', budget: 488000, forecast: 488000, start: 'TBC', completion: 'TBC', status: 'Green', contractor: 'TBC', pm: 'TBC', risks: [], milestones: M_DESIGN },
  { id: 'MRS-124', name: 'London Walthamstow', city: 'London', region: 'London & South', lat: 51.5860, lon: -0.0210, stage: 'Complete', budget: 476000, forecast: 470000, start: '8 Sep 2025', completion: '28 Nov 2025', status: 'Green', contractor: 'Contractor A', pm: 'Emma Clarke', risks: [], milestones: M_DONE },
  { id: 'MRS-125', name: 'London Palmers Green', city: 'London', region: 'London & South', lat: 51.6180, lon: -0.1110, stage: 'Procurement', budget: 491000, forecast: 489000, start: '3 Jun 2026', completion: '15 Aug 2026', status: 'Green', contractor: 'TBC', pm: 'David Walsh', risks: [], milestones: M_DESIGN },
  { id: 'MRS-126', name: 'London Tottenham Hale', city: 'London', region: 'London & South', lat: 51.5882, lon: -0.0598, stage: 'AtRisk', budget: 502000, forecast: 519000, start: '20 Jan 2026', completion: '2 Apr 2026', status: 'Red', contractor: 'Contractor D', pm: 'Priya Sharma', risks: ['HV supply upgrade delayed by DNO', 'Forecast over budget — temporary plant hire extended'], milestones: M_FULL },
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

// Individual document records for the searchable Document Hub list.
export type DocType =
  | 'Handover'
  | 'Snagging'
  | 'Tender'
  | 'Progress'
  | 'Risk'
  | 'Cost'
  | 'Minutes'
  | 'Report';

export interface DocRecord {
  id: string;
  name: string;
  type: DocType;
  store: string;       // store name or 'Programme-wide'
  contractor: string;  // or 'CPC PMO'
  date: string;        // 'DD Mon YYYY'
  size: string;
  version: string;
}

export const DOCUMENT_FILES: DocRecord[] = [
  { id: 'DOC-4821', name: 'Leeds Kirkstall — Handover Pack', type: 'Handover', store: 'Leeds Kirkstall', contractor: 'Contractor A', date: '02 Jun 2026', size: '24.1 MB', version: 'v3.0' },
  { id: 'DOC-4820', name: 'Hull Bransholme — Snagging Register', type: 'Snagging', store: 'Hull Bransholme', contractor: 'Contractor B', date: '01 Jun 2026', size: '1.2 MB', version: 'v1.4' },
  { id: 'DOC-4815', name: 'May Programme Board Pack', type: 'Report', store: 'Programme-wide', contractor: 'CPC PMO', date: '31 May 2026', size: '8.6 MB', version: 'v1.0' },
  { id: 'DOC-4810', name: 'Manchester Eccles — Cost Report', type: 'Cost', store: 'Manchester Eccles', contractor: 'Contractor A', date: '29 May 2026', size: '640 KB', version: 'v2.1' },
  { id: 'DOC-4805', name: 'NW Region — Compressor Tender Package', type: 'Tender', store: 'Programme-wide', contractor: 'CPC PMO', date: '27 May 2026', size: '12.4 MB', version: 'v2.0' },
  { id: 'DOC-4802', name: 'Birmingham Erdington — Site Progress', type: 'Progress', store: 'Birmingham Erdington', contractor: 'Contractor C', date: '26 May 2026', size: '3.1 MB', version: 'v6.0' },
  { id: 'DOC-4798', name: 'Programme Risk Register', type: 'Risk', store: 'Programme-wide', contractor: 'CPC PMO', date: '25 May 2026', size: '980 KB', version: 'v14.0' },
  { id: 'DOC-4790', name: 'Cardiff Roath — Pre-start Minutes', type: 'Minutes', store: 'Cardiff Roath', contractor: 'Contractor B', date: '22 May 2026', size: '210 KB', version: 'v1.0' },
  { id: 'DOC-4781', name: 'Glasgow Parkhead — Handover Pack', type: 'Handover', store: 'Glasgow Parkhead', contractor: 'Contractor C', date: '20 May 2026', size: '19.7 MB', version: 'v2.0' },
  { id: 'DOC-4774', name: 'Carbon & Sustainability — Q1 Report', type: 'Report', store: 'Programme-wide', contractor: 'CPC PMO', date: '18 May 2026', size: '4.2 MB', version: 'v1.0' },
  { id: 'DOC-4769', name: 'Sheffield Hillsborough — Snagging', type: 'Snagging', store: 'Sheffield Hillsborough', contractor: 'Contractor A', date: '15 May 2026', size: '1.5 MB', version: 'v1.1' },
  { id: 'DOC-4760', name: 'London Clapham — Cost Report', type: 'Cost', store: 'London Clapham', contractor: 'Contractor D', date: '13 May 2026', size: '720 KB', version: 'v1.0' },
];

// ─── Weather signals (per UK region) ───────────────────────────────────────────
// `lat`/`lon` are regional centroids used for the live Open-Meteo lookup; the
// remaining fields are the fallback values shown if the live call is unavailable.

export type WeatherRisk = 'low' | 'medium' | 'high';

export interface WeatherRegion {
  region: string;
  lat: number;
  lon: number;
  risk: WeatherRisk;
  tempC: number;       // fallback current temp
  precip: number;      // fallback precipitation mm
  wind: number;        // fallback wind km/h
  storesAtRisk: number;
  note: string;
}

// Modelled fallback reflects a UK summer heatwave: extreme heat across the South &
// East stresses refrigeration plant during commissioning; Scotland stays coolest.
export const WEATHER_REGIONS: WeatherRegion[] = [
  { region: 'Scotland', lat: 56.5, lon: -4.2, risk: 'low', tempC: 16, precip: 0.4, wind: 14, storesAtRisk: 0, note: 'Coolest region — no thermal impact on commissioning' },
  { region: 'North East', lat: 54.9, lon: -1.6, risk: 'low', tempC: 23, precip: 0.0, wind: 11, storesAtRisk: 0, note: 'Warm and settled — within tolerance' },
  { region: 'North West', lat: 53.5, lon: -2.6, risk: 'medium', tempC: 26, precip: 0.0, wind: 9, storesAtRisk: 2, note: 'Warming — condensing-unit performance monitored' },
  { region: 'Yorkshire', lat: 53.8, lon: -1.5, risk: 'medium', tempC: 29, precip: 0.0, wind: 8, storesAtRisk: 3, note: 'Amber heat — plant commissioning under thermal load' },
  { region: 'Wales', lat: 52.1, lon: -3.8, risk: 'medium', tempC: 27, precip: 0.0, wind: 12, storesAtRisk: 2, note: 'Heat building — refrigeration load tests rescheduled to AM' },
  { region: 'Midlands', lat: 52.5, lon: -1.9, risk: 'high', tempC: 33, precip: 0.0, wind: 7, storesAtRisk: 6, note: 'Extreme heat — condensing units at thermal limit' },
  { region: 'East', lat: 52.4, lon: 0.3, risk: 'high', tempC: 34, precip: 0.0, wind: 6, storesAtRisk: 5, note: 'Extreme heat — midday commissioning paused' },
  { region: 'London & South', lat: 51.4, lon: -0.2, risk: 'high', tempC: 36, precip: 0.0, wind: 8, storesAtRisk: 9, note: 'Peak heatwave — refrigeration plant at thermal limit, demand spike' },
  { region: 'South West', lat: 50.9, lon: -3.5, risk: 'high', tempC: 32, precip: 0.0, wind: 13, storesAtRisk: 4, note: 'Extreme heat — thermal monitoring on all live commissioning' },
];

// ─── Supply-chain signals ──────────────────────────────────────────────────────

export interface SupplyItem {
  material: string;
  leadWeeks: number;
  baselineWeeks: number;
  trend: 'up' | 'down' | 'flat';
  status: RAG;
  affectedStores: number;
  region: string;
}

export const SUPPLY_CHAIN: SupplyItem[] = [
  { material: 'Compressor units', leadWeeks: 6, baselineWeeks: 3, trend: 'up', status: 'Red', affectedStores: 12, region: 'Northern' },
  { material: 'CO₂ refrigerant', leadWeeks: 4, baselineWeeks: 3, trend: 'up', status: 'Amber', affectedStores: 6, region: 'National' },
  { material: 'Control systems', leadWeeks: 3, baselineWeeks: 3, trend: 'flat', status: 'Green', affectedStores: 0, region: 'National' },
  { material: 'Condensing units', leadWeeks: 5, baselineWeeks: 4, trend: 'up', status: 'Amber', affectedStores: 5, region: 'Scotland' },
  { material: 'Pipework & valves', leadWeeks: 2, baselineWeeks: 2, trend: 'flat', status: 'Green', affectedStores: 0, region: 'National' },
  { material: 'Display cabinets', leadWeeks: 4, baselineWeeks: 5, trend: 'down', status: 'Green', affectedStores: 0, region: 'National' },
];

// ─── Programme stage progression (time-series for the funnel page) ──────────────

export const PROGRAMME_TREND = [
  { month: 'Jul', design: 210, construction: 60, handover: 18 },
  { month: 'Aug', design: 240, construction: 78, handover: 31 },
  { month: 'Sep', design: 270, construction: 96, handover: 52 },
  { month: 'Oct', design: 295, construction: 112, handover: 71 },
  { month: 'Nov', design: 312, construction: 128, handover: 88 },
  { month: 'Dec', design: 324, construction: 140, handover: 99 },
  { month: 'Jan', design: 332, construction: 149, handover: 110 },
  { month: 'Feb', design: 337, construction: 154, handover: 118 },
  { month: 'Mar', design: 340, construction: 158, handover: 122 },
  { month: 'Apr', design: 341, construction: 160, handover: 125 },
  { month: 'May', design: 341, construction: 161, handover: 127 },
];

export const STAGE_VELOCITY: { stage: string; days: number; target: number }[] = [
  { stage: 'Design → Tender', days: 42, target: 40 },
  { stage: 'Tender → Award', days: 28, target: 30 },
  { stage: 'Award → Construction', days: 35, target: 28 },
  { stage: 'Construction → Handover', days: 72, target: 70 },
];

// ─── Sustainability by region ───────────────────────────────────────────────────

export const SUSTAINABILITY_BY_REGION: { region: string; carbon: number; energy: number; converted: number; total: number }[] = [
  { region: 'Yorkshire', carbon: 3100, energy: 14, converted: 22, total: 58 },
  { region: 'North West', carbon: 2850, energy: 13, converted: 19, total: 54 },
  { region: 'Midlands', carbon: 2400, energy: 12, converted: 16, total: 49 },
  { region: 'London & South', carbon: 2200, energy: 11, converted: 14, total: 62 },
  { region: 'Scotland', carbon: 2050, energy: 12, converted: 15, total: 45 },
  { region: 'North East', carbon: 1480, energy: 11, converted: 12, total: 30 },
  { region: 'South West', carbon: 1320, energy: 10, converted: 10, total: 32 },
  { region: 'Wales', carbon: 1000, energy: 10, converted: 9, total: 28 },
  { region: 'East', carbon: 300, energy: 9, converted: 10, total: 54 },
];

// ─── Contractor SLA definitions (target vs actual per contractor) ───────────────

export interface ContractorSLA {
  name: string;
  onTime: number;          // %
  quality: number;         // quality score %
  defectRate: number;      // defects per store
  safetyIncidents: number; // reportable incidents
  slaCompliance: number;   // overall SLA adherence %
  responseDays: number;    // avg response to instruction
  capacity: number;        // capacity utilisation %
  regions: string[];
  trend: number[];         // 12-pt on-time history
}

export const CONTRACTOR_SLAS: ContractorSLA[] = [
  { name: 'Contractor A', onTime: 96, quality: 94, defectRate: 1.2, safetyIncidents: 0, slaCompliance: 97, responseDays: 1.4, capacity: 82, regions: ['Yorkshire', 'North West', 'North East'], trend: [88, 90, 91, 92, 93, 94, 94, 95, 95, 96, 96, 96] },
  { name: 'Contractor C', onTime: 92, quality: 90, defectRate: 1.8, safetyIncidents: 0, slaCompliance: 93, responseDays: 1.8, capacity: 74, regions: ['Scotland', 'North East'], trend: [84, 85, 86, 88, 89, 90, 90, 91, 91, 92, 92, 92] },
  { name: 'Contractor B', onTime: 89, quality: 87, defectRate: 2.4, safetyIncidents: 1, slaCompliance: 88, responseDays: 2.3, capacity: 91, regions: ['Midlands', 'Wales'], trend: [82, 83, 84, 85, 86, 87, 88, 88, 89, 89, 89, 89] },
  { name: 'Contractor D', onTime: 83, quality: 81, defectRate: 3.1, safetyIncidents: 1, slaCompliance: 80, responseDays: 3.1, capacity: 68, regions: ['London & South', 'East'], trend: [78, 79, 80, 80, 81, 81, 82, 82, 82, 83, 83, 83] },
  { name: 'Contractor E', onTime: 75, quality: 74, defectRate: 4.0, safetyIncidents: 2, slaCompliance: 72, responseDays: 4.2, capacity: 59, regions: ['South West'], trend: [70, 71, 71, 72, 72, 73, 73, 74, 74, 74, 75, 75] },
  { name: 'Contractor F', onTime: 60, quality: 66, defectRate: 5.2, safetyIncidents: 1, slaCompliance: 64, responseDays: 5.0, capacity: 40, regions: ['South West'], trend: [55, 56, 57, 57, 58, 58, 59, 59, 59, 60, 60, 60] },
];

// Extended spend trend through the full programme horizon to 2029 (cumulative £m).
export const CASHFLOW_FORECAST = [
  { period: 'FY25', spend: 22, committed: 34, forecast: 24, approved: 50 },
  { period: 'FY26', spend: 31, committed: 42, forecast: 33, approved: 50 },
  { period: 'FY27', spend: 39, committed: 46, forecast: 40, approved: 50 },
  { period: 'FY28', spend: 44, committed: 47, forecast: 45, approved: 50 },
  { period: 'FY29', spend: 47, committed: 47, forecast: 47, approved: 50 },
];
