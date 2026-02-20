import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [activeSection, setActiveSection] = useState(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-40% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.55],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return activeSection
}
