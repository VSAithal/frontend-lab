import { Button, Card, CardContent } from '@vsaithal/core-ui'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

type MagneticCtaProps = {
  children: ReactNode
  onClick: () => void
  variant?: 'primary' | 'outline'
}

function MagneticCta({ children, onClick, variant = 'primary' }: MagneticCtaProps) {
  const shouldReduceMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 230, damping: 20, mass: 0.2 })
  const y = useSpring(rawY, { stiffness: 230, damping: 20, mass: 0.2 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5
    rawX.set(relativeX * 8)
    rawY.set(relativeY * 8)
  }

  const handleLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      className="inline-block"
      style={shouldReduceMotion ? undefined : { x, y }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Button variant={variant} onClick={onClick} className="group relative overflow-hidden">
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
        />
      </Button>
    </motion.div>
  )
}

export function HeroSection() {
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" aria-labelledby="hero-title" className="grid-pattern relative overflow-hidden rounded-3xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.82)] p-8 shadow-glow md:p-12">
      <div className="absolute -right-16 -top-16 size-44 rounded-full bg-[hsl(var(--primary)/0.18)] blur-3xl" />
      <div className="absolute -bottom-16 left-1/3 size-40 rounded-full bg-[hsl(var(--accent)/0.2)] blur-3xl" />

      <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.8)] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            Munich, Germany
          </p>
          <h1 id="hero-title" className="font-heading text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-6xl">
            Vidyasagar Aithal
          </h1>
          <p className="mt-4 text-xl font-semibold text-[hsl(var(--primary))]">Senior Frontend Developer</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
            I build scalable B2B web applications with React + TypeScript, focused on design systems, accessibility, and performance. Based in Munich, I’ve spent the last years shipping energy-domain products (HEM & EV charging) with strong testing and delivery practices.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticCta onClick={() => scrollToId('projects')}>
              View Projects
            </MagneticCta>
            <MagneticCta variant="outline" onClick={() => scrollToId('contact')}>
              Contact Me
            </MagneticCta>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Card className="w-full border-[hsl(var(--border)/0.8)] bg-[hsl(var(--background)/0.75)] sm:w-[25rem]">
            <CardContent className="space-y-4 p-6">
              <p className="text-sm uppercase tracking-[0.15em] text-[hsl(var(--muted-foreground))]">
                Focus Areas
              </p>
              <motion.ul
                className="space-y-2 text-sm text-[hsl(var(--foreground))]"
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
              >
                <motion.li variants={itemVariants}>Scalable React + TypeScript architecture</motion.li>
                <motion.li variants={itemVariants}>Design systems & reusable component APIs (Storybook)</motion.li>
                <motion.li variants={itemVariants}>Server & client state management (React Query, Redux Toolkit)</motion.li>
                <motion.li variants={itemVariants}>Testing strategy (Unit, Integration, E2E - Playwright)</motion.li>
                <motion.li variants={itemVariants}>Accessibility & performance optimization</motion.li>
                <motion.li variants={itemVariants}>CI/CD & feature-driven releases (Buildkite, flags, analytics)</motion.li>
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
