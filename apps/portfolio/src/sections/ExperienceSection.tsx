import { Card, CardContent } from '@vsaithal/core-ui'

const currentRoleHighlights = [
  'Led data layer migration from Redux to React Query across a production B2B EMS platform, reducing async boilerplate by ~40% and improving new developer ramp-up time.',
  'Drove Webpack to Vite migration as a phased, risk-managed rollout, cutting dev startup from 45s to 8s (6×) and reducing production build time by 70%.',
  'Designed and owned a custom design system (Radix UI, shadcn/ui) with TypeScript prop contracts and Storybook documentation, eliminating cross-team component regressions.',
  'Introduced Playwright E2E coverage for critical user flows, significantly reducing regression bugs and increasing release confidence across long-lived production features.',
  'Implemented feature flagging and analytics (PostHog), enabling safe incremental rollouts and data-driven product decisions.',
  'Contributed to CI/CD pipelines (Buildkite) and frontend architecture decisions across a multi-team, enterprise platform.',
]

const previousRolesHighlights = [
  'Built and maintained large-scale enterprise web applications using React, Redux-Saga, and Ant Design, serving high-traffic internal and external users.',
  'Delivered responsive, cross-browser UI implementations aligned with enterprise design standards across fast-paced delivery cycles.',
  'Improved frontend performance and long-term maintainability through modular architecture and reusable component patterns.',
  'Collaborated closely with QA, backend engineers, and business stakeholders in a cross-functional agile environment.',
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
              Senior Frontend Engineer
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
