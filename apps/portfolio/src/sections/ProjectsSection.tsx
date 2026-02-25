import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@vsaithal/core-ui'

const projects = [
  {
    title: 'Core UI Library',
    description:
      'Reusable React component library with accessibility-first APIs, testing, and release automation.',
    href: 'https://github.com/VSAithal/frontend-lab/tree/master/packages/core-ui',
    cta: 'View Core UI',
  },
  /* {
    title: 'Frontend Architecture Case Study (WIP)',
    description:
      'A partner portal-style app demonstrating typed boundaries, React Query data layer, feature flags, error boundaries, and E2E tests.',
    href: '#',
    cta: 'In progress',
  },
  {
    title: 'AI Lab (WIP)',
    description:
      'Practical experiments using Codex as pair programmer: refactoring workflows, UI generation prompts, and testing automation.',
    href: '#',
    cta: 'In progress',
  }, */
]

export function ProjectsSection() {
  const handleProjectAction = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {projects.map((project) => (
        <Card
          key={project.title}
          className="group border-[hsl(var(--border)/0.75)] bg-[hsl(var(--card)/0.9)] transition duration-300 hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.5)]"
        >
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
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
