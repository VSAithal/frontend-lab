import { Button } from '@vsaithal/core-ui'

type NavItem = {
  id: string
  label: string
}

type NavbarProps = {
  items: NavItem[]
  activeSection: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Navbar({ items, activeSection, theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border)/0.7)] bg-[hsl(var(--background)/0.88)] backdrop-blur-lg">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 md:px-8"
        aria-label="Primary"
      >
        <Button
          asChild
          variant="link"
          className="h-auto p-0 font-heading text-lg font-semibold tracking-tight text-[hsl(var(--foreground))] no-underline transition hover:opacity-80 hover:no-underline"
        >
          <a href="#hero">Vidyasagar Aithal</a>
        </Button>

        <ul className="mx-2 flex flex-1 items-center justify-center gap-1 overflow-x-auto px-2">
          {items.map((item) => {
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={`h-auto whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  <a href={`#${item.id}`}>{item.label}</a>
                </Button>
              </li>
            )
          })}
        </ul>

        <Button
          variant="outline"
          size="sm"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          className="min-w-[6.5rem]"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </nav>
    </header>
  )
}
