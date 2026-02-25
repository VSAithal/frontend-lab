import { Button } from '@vsaithal/core-ui'
import { useState } from 'react'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false)
  }

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

        <ul className="mx-2 hidden flex-1 items-center justify-center gap-1 overflow-x-auto px-2 md:flex">
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

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="min-w-[2.5rem] px-2 md:min-w-[6.5rem]"
          >
            <span className="md:hidden">{theme === 'dark' ? 'L' : 'D'}</span>
            <span className="hidden md:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="px-2 md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-items"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div id="mobile-nav-items" className="mx-auto w-full max-w-6xl px-5 pb-4 md:hidden md:px-8">
          <ul className="grid gap-2 rounded-xl border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--card)/0.92)] p-2">
            {items.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <Button
                    asChild
                    variant="ghost"
                    className={`h-auto w-full justify-start rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
                        : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                    }`}
                  >
                    <a href={`#${item.id}`} onClick={handleMobileNavClick}>
                      {item.label}
                    </a>
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
