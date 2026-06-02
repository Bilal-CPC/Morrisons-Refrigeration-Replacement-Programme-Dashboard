import { useState } from 'react';
import { Store } from '@/data/stores';
import { Header } from '@/components/Header';
import { FGasCountdownBanner } from '@/components/FGasCountdownBanner';
import { KPIGrid } from '@/components/KPIGrid';
import { ProgrammeHealth } from '@/components/ProgrammeHealth';
import { UKMap } from '@/components/UKMap';
import { DeliveryFunnel } from '@/components/DeliveryFunnel';
import { FinancialDashboard } from '@/components/FinancialDashboard';
import { AIInsights } from '@/components/AIInsights';
import { SustainabilityPanel } from '@/components/SustainabilityPanel';
import { DocumentHub } from '@/components/DocumentHub';
import { ContractorLeague } from '@/components/ContractorLeague';
import { StoreDetailPanel } from '@/components/StoreDetailPanel';
import { Footer } from '@/components/Footer';

export default function App() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FGasCountdownBanner />

      <main className="flex-1">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* KPI Tiles */}
          <KPIGrid />

          {/* Health + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1">
              <ProgrammeHealth />
            </div>
            <div className="lg:col-span-2">
              <UKMap
                onSelectStore={setSelectedStore}
                selectedStoreId={selectedStore?.id}
              />
            </div>
          </div>

          {/* Funnel + Financials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <DeliveryFunnel />
            <FinancialDashboard />
          </div>

          {/* AI Insights */}
          <AIInsights />

          {/* Bottom row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <SustainabilityPanel />
            <DocumentHub />
            <ContractorLeague />
          </div>
        </div>
      </main>

      <Footer />

      {/* Store detail slide-in panel */}
      <StoreDetailPanel
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
}
