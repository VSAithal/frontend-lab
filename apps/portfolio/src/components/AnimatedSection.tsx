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
      <h2 id={`${id}-title`} className="mb-6 font-heading text-3xl font-semibold md:text-4xl">
        {title}
      </h2>
      {children}
    </motion.section>
  )
}
