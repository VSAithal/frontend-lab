import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@vsaithal/core-ui'

type Project = {
  title: string
  description: string
  href: string
  cta: string
  badge?: string
}

const projects: Project[] = [
  {
    title: 'Core UI Library',
    description:
      'Reusable React component library built for a multi-app monorepo. TypeScript-first component APIs, Storybook documentation, and automated release pipelines ensure safe consumption across projects.',
    href: 'https://github.com/VSAithal/frontend-lab/tree/master/packages/core-ui',
    cta: 'View Core UI',
  },
  {
    title: 'DevInsight',
    description:
      "GitHub Analytics Dashboard that surfaces any developer's public activity across repos, commits, contributors, and language breakdown. Built with React Router v7, TanStack Query v5, Zustand, and Zod in a Turborepo monorepo.",
    href: '#',
    cta: 'Coming Soon',
    badge: 'In Progress',
  },
]

export function ProjectsSection() {
  const handleProjectAction = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card
          key={project.title}
          className="group border-[hsl(var(--border)/0.75)] bg-[hsl(var(--card)/0.9)] transition duration-300 hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.5)]"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle>{project.title}</CardTitle>
              {project.badge && (
                <span className="mt-0.5 shrink-0 rounded-full border border-[hsl(var(--primary)/0.45)] bg-[hsl(var(--primary)/0.1)] px-2.5 py-0.5 text-xs font-semibold text-[hsl(var(--primary))]">
                  {project.badge}
                </span>
              )}
            </div>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent />
          <CardFooter>
            <Button
              variant="outline"
              className="group relative w-full overflow-hidden group-hover:border-[hsl(var(--primary)/0.5)]"
              onClick={() => handleProjectAction(project.href)}
              disabled={project.href === '#'}
            >
              <span className="relative z-10">{project.cta}</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
              />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
