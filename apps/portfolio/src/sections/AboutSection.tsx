export function AboutSection() {
  return (
    <div className="section-surface rounded-3xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.88)] p-7 shadow-glow md:p-10">
      <p className="mb-5 text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
        Over my career I have learned that the hardest frontend problems are rarely
        technical. They are organizational. Keeping a design system coherent across
        multiple teams, deciding where state should live, choosing when to migrate and
        when to hold: these decisions shape developer experience for years.
      </p>
      <p className="text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
        At gridX I have worked on all of it: owning a component library used across
        teams, leading a data layer migration from Redux to React Query, and driving a
        build tooling overhaul that cut startup time by 6×. The common thread is
        treating architecture as a product, something that needs clear contracts, good
        documentation, and careful versioning just like user-facing features.
      </p>
    </div>
  )
}
