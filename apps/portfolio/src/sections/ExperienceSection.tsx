import { Card, CardContent } from '@vsaithal/core-ui'

const currentRoleHighlights = [
  'Developed and maintained core features of a B2B energy management platform used by enterprise partners.',
  'Designed scalable UI architecture using React, TypeScript, and React Query.',
  'Contributed to an internal design system to ensure consistency and accessibility.',
  'Strengthened product reliability through E2E testing (Playwright) and CI/CD workflows.',
]

const previousRolesHighlights = [
  'Delivered enterprise-scale React applications.',
  'Optimized performance and UI consistency across products.',
]


export function ExperienceSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Card className="border-[hsl(var(--border)/0.75)] bg-[hsl(var(--card)/0.92)] shadow-glow">
        <CardContent className="space-y-6 p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[hsl(var(--primary)/0.45)] bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[hsl(var(--primary))]">
              Current Role
            </span>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">
              Munich, Germany
            </p>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-semibold text-[hsl(var(--foreground))]">
              gridX GmbH
            </h3>
            <p className="mt-1 text-base font-medium text-[hsl(var(--primary))]">
              Software Engineer, Frontend Developement
            </p>
          </div>

          <ul className="space-y-3">
            {currentRoleHighlights.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.8)] p-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
              >
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border)/0.75)] bg-[hsl(var(--card)/0.9)]">
        <CardContent className="space-y-6 p-6 md:p-7">

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[hsl(var(--primary)/0.45)] bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[hsl(var(--primary))]">
              Previous Experience
            </span>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">
              Bengaluru, India
            </p>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-semibold text-[hsl(var(--foreground))]">
              Accenture India Pvt. Ltd.
            </h3>
            <p className="mt-1 text-base font-medium text-[hsl(var(--primary))]">
              Frontend Developer
            </p>
          </div>

          <ul className="space-y-3">
            {previousRolesHighlights.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.8)] p-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
              >
                {point}
              </li>
            ))}
          </ul>




        </CardContent>
      </Card>
    </div>
  )
}
