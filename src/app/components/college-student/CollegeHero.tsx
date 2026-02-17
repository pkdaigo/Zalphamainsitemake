export function CollegeHero() {
  return (
    <section className="w-full rounded-3xl border-2 border-cyan-400 bg-gradient-to-br from-sky-900 via-slate-950 to-cyan-900 p-4 shadow-xl">
      <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-50">
        Your Asia-Pacific career hub 🌺
      </h1>
      <p className="mt-1 text-xs sm:text-sm text-cyan-100">
        Discover roles and pathways across CNMI, the Western Pacific, Asia-Pacific, and Hawaii—designed to keep island talent connected to home.
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        <span className="rounded-full bg-sky-500/30 px-3 py-1 font-semibold text-sky-50">
          Stay in-region
        </span>
        <span className="rounded-full bg-emerald-500/30 px-3 py-1 font-semibold text-emerald-50">
          Western Pacific & Asia-Pacific
        </span>
        <span className="rounded-full bg-cyan-500/30 px-3 py-1 font-semibold text-cyan-50">
          Hawaii (our only U.S. state)
        </span>
      </div>
    </section>
  );
}
