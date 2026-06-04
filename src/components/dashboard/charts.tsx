'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { COMPLETION_TREND, SPEND_TREND, STORES, STAGE_META, StoreStage, CASHFLOW_FORECAST, PROGRAMME_TREND } from '@/lib/data';

const tooltipStyle = {
  borderRadius: 10,
  border: '1px solid #e2e8f0',
  fontSize: 12,
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
};

export function CompletionTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={COMPLETION_TREND} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="gComplete" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007a33" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#007a33" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gOnSite" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#d97706" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="completed" name="Completed" stroke="#007a33" strokeWidth={2.5} fill="url(#gComplete)" />
        <Area type="monotone" dataKey="onSite" name="On Site" stroke="#d97706" strokeWidth={2} fill="url(#gOnSite)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SpendTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={SPEND_TREND} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="m" />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`£${v}m`, '']} />
        <Line type="monotone" dataKey="committed" name="Committed" stroke="#d97706" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="spend" name="Spend to date" stroke="#2563eb" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function StageDonutChart() {
  const counts = (Object.keys(STAGE_META) as StoreStage[]).map((stage) => ({
    name: STAGE_META[stage].label,
    value: STORES.filter((s) => s.stage === stage).length,
    color: STAGE_META[stage].color,
  }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={counts} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}>
          {counts.map((c) => (
            <Cell key={c.name} fill={c.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Programme-wide cashflow S-curve to 2029 — the financial "birds-eye" view.
export function CashflowForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={CASHFLOW_FORECAST} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="gForecast" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007a33" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#007a33" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="m" />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`£${v}m`, '']} />
        <Line type="monotone" dataKey="approved" name="Approved budget" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 4" dot={false} />
        <Area type="monotone" dataKey="forecast" name="Forecast outturn" stroke="#007a33" strokeWidth={2.5} fill="url(#gForecast)" />
        <Line type="monotone" dataKey="committed" name="Committed" stroke="#d97706" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="spend" name="Spend" stroke="#2563eb" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Cost (approved budget) distribution by region — where the money sits.
export function CostByRegionChart() {
  const regions = Array.from(new Set(STORES.map((s) => s.region)));
  const data = regions
    .map((region) => ({
      region,
      budget: Math.round(STORES.filter((s) => s.region === region).reduce((a, s) => a + s.budget, 0) / 1_000_000 * 10) / 10,
    }))
    .sort((a, b) => b.budget - a.budget);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 24, bottom: 0 }} barSize={14}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="m" />
        <YAxis type="category" dataKey="region" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={90} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} formatter={(v: number) => [`£${v}m`, 'Budget']} />
        <Bar dataKey="budget" name="Budget" fill="#007a33" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Budget vs forecast variance by delivery stage (£k, negative = saving).
export function StageVarianceChart() {
  const stages = (Object.keys(STAGE_META) as StoreStage[]).map((stage) => {
    const inStage = STORES.filter((s) => s.stage === stage);
    const variance = Math.round(inStage.reduce((a, s) => a + (s.forecast - s.budget), 0) / 1000);
    return { stage: STAGE_META[stage].label, variance };
  });
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={stages} margin={{ top: 8, right: 8, left: -8, bottom: 0 }} barSize={26}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="k" />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`£${v}k`, 'Variance']} />
        <Bar dataKey="variance" name="Variance" radius={[3, 3, 0, 0]}>
          {stages.map((s) => (
            <Cell key={s.stage} fill={s.variance <= 0 ? '#16a34a' : '#dc2626'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Stage progression over time for the delivery funnel page.
export function StageProgressionChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={PROGRAMME_TREND} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="design" name="In design+" stroke="#2563eb" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="construction" name="In construction+" stroke="#d97706" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="handover" name="Handed over" stroke="#16a34a" strokeWidth={2.5} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RegionBarChart() {
  const regions = Array.from(new Set(STORES.map((s) => s.region)));
  const data = regions
    .map((region) => ({
      region,
      complete: STORES.filter((s) => s.region === region && s.stage === 'Complete').length,
      active: STORES.filter((s) => s.region === region && ['OnSite', 'Design', 'Procurement', 'AtRisk'].includes(s.stage)).length,
      notStarted: STORES.filter((s) => s.region === region && s.stage === 'NotStarted').length,
    }))
    .sort((a, b) => b.complete + b.active + b.notStarted - (a.complete + a.active + a.notStarted));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 24, bottom: 0 }} barSize={14}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="region" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={90} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} />
        <Bar dataKey="complete" name="Complete" stackId="a" fill="#16a34a" radius={[3, 0, 0, 3]} />
        <Bar dataKey="active" name="In Delivery" stackId="a" fill="#d97706" />
        <Bar dataKey="notStarted" name="Not Started" stackId="a" fill="#cbd5e1" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
