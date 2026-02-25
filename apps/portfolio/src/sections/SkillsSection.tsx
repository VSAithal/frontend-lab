const skillGroups = [
  {
    title: 'Core Frontend',
    skills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML/CSS','Vite', 'Webpack', 'State Management'],
  },
  {
    title: 'UI Architecture',
    skills: ['Design Systems', 'Component APIs', 'Storybook', 'Tailwind', 'SCSS', 'Radix UI', 'shadcn/ui', 'MUI', 'Bootstrap', 'Ant Design', 'Accessibility (a11y)' ],
  },
  {
    title: 'Quality & Delivery',
    skills: ['Jest', 'Playwright', 'CI/CD', 'Performance', 'Monorepo Tooling'],
  },
]

export function SkillsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {skillGroups.map((group) => (
        <article
          key={group.title}
          className="rounded-2xl border border-[hsl(var(--border)/0.65)] bg-[hsl(var(--card)/0.88)] p-6"
        >
          <h3 className="font-heading text-lg font-semibold">{group.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.9)] px-3 py-1 text-sm text-[hsl(var(--muted-foreground))]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
