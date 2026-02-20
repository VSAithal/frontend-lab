import { Navbar } from './components/Navbar'
import { AnimatedSection } from './components/AnimatedSection'
import { useActiveSection } from './hooks/useActiveSection'
import { useTheme } from './hooks/useTheme'
import { Button } from '@vsaithal/core-ui'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { SkillsSection } from './sections/SkillsSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ContactSection } from './sections/ContactSection'
// import { AmbientFieldBackground } from './components/AmbientFieldBackground'
import { CursorConstellation } from './components/CursorConstellation'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const activeSection = useActiveSection(SECTION_IDS)
  const currentYear = new Date().getFullYear()

  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      {/* <AmbientFieldBackground /> */}
      <CursorConstellation />

      <div className="relative z-10">
        <Button
          asChild
          variant="link"
          className="sr-only z-[100] rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-[hsl(var(--primary-foreground))] no-underline focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
        >
          <a href="#main-content">Skip to content</a>
        </Button>

        <Navbar
          items={NAV_ITEMS}
          activeSection={activeSection}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-5 pb-24 pt-10 md:px-8 md:pt-14">
          <HeroSection />

          <AnimatedSection id="about" title="About">
            <AboutSection />
          </AnimatedSection>

          <AnimatedSection id="skills" title="Skills">
            <SkillsSection />
          </AnimatedSection>

          <AnimatedSection id="experience" title="Experience">
            <ExperienceSection />
          </AnimatedSection>

          <AnimatedSection id="projects" title="Projects">
            <ProjectsSection />
          </AnimatedSection>

          <AnimatedSection id="contact" title="Contact">
            <ContactSection />
          </AnimatedSection>
        </main>

        <footer className="mx-auto w-full max-w-6xl px-5 pb-8 text-center text-xs text-[hsl(var(--muted-foreground))] md:px-8">
          © {currentYear} Vidyasagar Aithal. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
