import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@vsaithal/core-ui'

const highlights = [
  //'Led gridX-facing frontend streams with a focus on clarity, speed, and maintainability.',
  'Built reusable UI patterns for energy workflows, reducing feature delivery overhead.',
  'Collaborated across product, design, and platform teams to ship accessible experiences.',
  'Improved consistency through component standards and shared design-language decisions.',
]

export function ExperienceSection() {
  return (
    <Card className="border-[hsl(var(--border)/0.75)] bg-[hsl(var(--card)/0.9)] shadow-glow">
      <CardHeader>
        <CardTitle>gridX GmbH • Frontend Developer</CardTitle>
        <CardDescription>Energy domain products • Munich, Germany</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 md:grid-cols-2">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-xl border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.85)] p-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
