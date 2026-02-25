import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  ttl: number
  radius: number
}

export function CursorConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const maxParticles = 36
    const minSpawnDistance = 10
    const linkDistance = 104
    const pointer = { x: 0, y: 0, lastX: 0, lastY: 0, initialized: false }

    let rafId = 0
    let primaryColor = '197 92% 45%'

    const updatePrimaryColor = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
      if (value) primaryColor = value
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { innerWidth, innerHeight } = window
      canvas.width = Math.floor(innerWidth * dpr)
      canvas.height = Math.floor(innerHeight * dpr)
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (x: number, y: number, burst = 1) => {
      for (let i = 0; i < burst; i += 1) {
        if (particles.length >= maxParticles) particles.shift()
        const angle = Math.random() * Math.PI * 2
        const speed = 0.15 + Math.random() * 0.5
        const ttl = 50 + Math.random() * 40
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: ttl,
          ttl,
          radius: 0.8 + Math.random() * 2,
        })
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event
      pointer.x = clientX
      pointer.y = clientY

      if (!pointer.initialized) {
        pointer.lastX = clientX
        pointer.lastY = clientY
        pointer.initialized = true
      }

      const dx = clientX - pointer.lastX
      const dy = clientY - pointer.lastY
      const distance = Math.hypot(dx, dy)

      if (distance >= minSpawnDistance) {
        const burst = distance > 28 ? 3 : 2
        spawn(clientX, clientY, burst)
        pointer.lastX = clientX
        pointer.lastY = clientY
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      spawn(event.clientX, event.clientY, 6)
    }

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.985
        particle.vy *= 0.985
        particle.life -= 1

        const alpha = Math.max(particle.life / particle.ttl, 0)
        if (
          particle.life <= 0 ||
          particle.x < -20 ||
          particle.y < -20 ||
          particle.x > width + 20 ||
          particle.y > height + 20
        ) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.fillStyle = `hsl(${primaryColor} / ${0.45 * alpha})`
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance > linkDistance) continue

          const lifeMix = Math.min(a.life / a.ttl, b.life / b.ttl)
          const strength = (1 - distance / linkDistance) * lifeMix
          if (strength <= 0.02) continue

          ctx.beginPath()
          ctx.strokeStyle = `hsl(${primaryColor} / ${0.18 * strength})`
          ctx.lineWidth = 1
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      rafId = window.requestAnimationFrame(draw)
    }

    updatePrimaryColor()
    resize()
    draw()

    const themeObserver = new MutationObserver(updatePrimaryColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.cancelAnimationFrame(rafId)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
}
