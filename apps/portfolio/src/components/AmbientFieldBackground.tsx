import { useEffect, useRef } from 'react'

type Dot = {
  x: number
  y: number
  phase: number
  speed: number
}

export function AmbientFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dots: Dot[] = []
    const spacing = 90
    const amplitude = 9
    const linkDistance = 120
    let rafId = 0
    let width = 0
    let height = 0
    let primaryColor = '197 92% 45%'
    let mutedColor = '217 16% 43%'
    let tick = 0

    const syncColors = () => {
      const styles = getComputedStyle(document.documentElement)
      const primary = styles.getPropertyValue('--primary').trim()
      const muted = styles.getPropertyValue('--muted-foreground').trim()
      if (primary) primaryColor = primary
      if (muted) mutedColor = muted
    }

    const seedDots = () => {
      dots.length = 0
      for (let y = spacing * 0.5; y < height + spacing; y += spacing) {
        for (let x = spacing * 0.5; x < width + spacing; x += spacing) {
          dots.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.004 + Math.random() * 0.006,
          })
        }
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedDots()
    }

    const draw = () => {
      tick += 1
      ctx.clearRect(0, 0, width, height)

      const displaced = dots.map((dot, index) => {
        const wave = Math.sin(tick * dot.speed + dot.phase + index * 0.02)
        return {
          x: dot.x + wave * amplitude,
          y: dot.y + Math.cos(tick * dot.speed + dot.phase) * amplitude,
        }
      })

      for (let i = 0; i < displaced.length; i += 1) {
        const a = displaced[i]

        for (let j = i + 1; j < displaced.length; j += 1) {
          const b = displaced[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance > linkDistance) continue

          const alpha = (1 - distance / linkDistance) * 0.1
          if (alpha <= 0.01) continue

          ctx.beginPath()
          ctx.strokeStyle = `hsl(${mutedColor} / ${alpha})`
          ctx.lineWidth = 1
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const point of displaced) {
        ctx.beginPath()
        ctx.fillStyle = `hsl(${primaryColor} / 0.16)`
        ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = window.requestAnimationFrame(draw)
    }

    syncColors()
    resize()
    draw()

    const observer = new MutationObserver(syncColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-80" />
}
