import { useState } from 'react';

type RegionFilter =
  | 'CNMI'
  | 'WESTERN_PACIFIC'
  | 'ASIA_PACIFIC'
  | 'HAWAII'
  | 'REMOTE_WP'
  | 'REMOTE_AP';

type CollegeRegionFiltersProps = {
  activeFilter: RegionFilter;
  onFilterChange: (filter: RegionFilter) => void;
};

export function CollegeRegionFilters({ activeFilter, onFilterChange }: CollegeRegionFiltersProps) {
  const items: { id: RegionFilter; label: string }[] = [
    { id: 'CNMI', label: 'CNMI / Home Island' },
    { id: 'WESTERN_PACIFIC', label: 'Western Pacific' },
    { id: 'ASIA_PACIFIC', label: 'Asia-Pacific (excl. Hawaii)' },
    { id: 'HAWAII', label: 'Hawaii (only U.S. state)' },
    { id: 'REMOTE_WP', label: 'Remote · Western Pacific' },
    { id: 'REMOTE_AP', label: 'Remote · Asia-Pacific' },
  ];

  return (
    <section className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 p-3 shadow-lg">
      <p className="mb-2 text-xs text-slate-200 font-semibold">
        Where do you want to build your career?
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onFilterChange(item.id)}
            className={
              'rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ' +
              (activeFilter === item.id
                ? 'bg-cyan-500 text-slate-950 shadow-lg'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700')
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
        Start with opportunities close to home, then explore the wider Western Pacific,
        Asia-Pacific, and Hawaii.
      </p>
    </section>
  );
}

export type { RegionFilter };
