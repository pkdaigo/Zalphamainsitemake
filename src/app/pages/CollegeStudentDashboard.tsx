import { useState } from 'react';
import { BackButton } from '@/app/components/BackButton';
import { PwaInstallPrompt } from '@/app/components/coop/PwaInstallPrompt';
import { CollegeHero } from '@/app/components/college-student/CollegeHero';
import { CollegeRegionFilters, RegionFilter } from '@/app/components/college-student/CollegeRegionFilters';
import { RegionalOpportunitiesFeed } from '@/app/components/college-student/RegionalOpportunitiesFeed';
import { TechnicalSkillsSection } from '@/app/components/college-student/TechnicalSkillsSection';
import { StayLocalPathways } from '@/app/components/college-student/StayLocalPathways';
import { RegionalEvents } from '@/app/components/college-student/RegionalEvents';
import { AlumniStories } from '@/app/components/college-student/AlumniStories';

interface CollegeStudentDashboardProps {
  onNavigate: (page: string) => void;
}

export function CollegeStudentDashboard({ onNavigate }: CollegeStudentDashboardProps) {
  const [activeRegionFilter, setActiveRegionFilter] = useState<RegionFilter>('CNMI');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* PWA install banner */}
      <PwaInstallPrompt />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-4 lg:px-6 pt-20">
        {/* Back Button */}
        <BackButton onNavigate={onNavigate} label="Back" variant="light" />

        {/* Hero */}
        <CollegeHero />

        {/* Region Filters */}
        <CollegeRegionFilters
          activeFilter={activeRegionFilter}
          onFilterChange={setActiveRegionFilter}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Main feed - Left/Center Column */}
          <section className="lg:col-span-7 space-y-4">
            <RegionalOpportunitiesFeed
              activeFilter={activeRegionFilter}
              onViewOpportunity={(id) => console.log('View opportunity:', id)}
            />
            <TechnicalSkillsSection />
          </section>

          {/* Right sidebar */}
          <aside className="lg:col-span-5 space-y-4">
            <StayLocalPathways />
            <RegionalEvents />
            <AlumniStories />
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-center">
          <p className="text-xs text-slate-400">
            ZALPHA College • Connecting Pacific Island talent with regional opportunities
          </p>
          <p className="mt-1 text-[10px] text-slate-500">
            Focus regions: CNMI • Western Pacific • Asia-Pacific • Hawaii
          </p>
        </footer>
      </main>
    </div>
  );
}
