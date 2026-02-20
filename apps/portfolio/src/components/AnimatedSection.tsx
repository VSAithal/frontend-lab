import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type AnimatedSectionProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function AnimatedSection({
  id,
  title,
  children,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mb-6">
        <h2 id={`${id}-title`} className="font-heading text-3xl font-semibold md:text-4xl">
          {title}
        </h2>
        <span
          aria-hidden
          className="mt-2 block h-[5px] w-20 rounded-full bg-[hsl(var(--primary)/0.6)]"
        />
      </div>
      {children}
    </motion.section>
  )
}
