import { useEffect, useRef } from 'react'

export default function FloatingParticles({ color = '#3385AA', count = 18, opacity = 0.55 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Subtle palette - soft tints only
    const palette = [
      { r: 51,  g: 133, b: 170 }, // #3385AA base
      { r: 99,  g: 179, b: 237 }, // light blue
      { r: 147, g: 210, b: 255 }, // very light blue
      { r: 255, g: 255, b: 255 }, // white
    ]

    const particles = Array.from({ length: count }, (_, i) => {
      const col = palette[i % palette.length]
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 5 + 1.5,
        dx: (Math.random() - 0.5) * 1.4,
        dy: (Math.random() - 0.5) * 1.4,
        o: Math.random() * 0.55 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.035,
        col,
        type: i % 6 === 3 ? 'ring' : 'dot',
      }
    })

    let raf
    let frame = 0

    const drawStar = (p, pulsedR, pulsedO) => {
      const { col } = p
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(frame * 0.012)
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2
        const ox = Math.cos(angle) * pulsedR * 2.2
        const oy = Math.sin(angle) * pulsedR * 2.2
        const ia = angle + Math.PI / 4
        const ix = Math.cos(ia) * pulsedR * 0.7
        const iy = Math.sin(ia) * pulsedR * 0.7
        if (i === 0) ctx.moveTo(ox, oy)
        else ctx.lineTo(ox, oy)
        ctx.lineTo(ix, iy)
      }
      ctx.closePath()
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${pulsedO * opacity})`
      ctx.shadowColor = `rgba(${col.r},${col.g},${col.b},0.8)`
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.restore()
    }

    const drawRing = (p, pulsedR, pulsedO) => {
      const { col } = p
      ctx.beginPath()
      ctx.arc(p.x, p.y, pulsedR * 2, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${pulsedO * opacity * 0.7})`
      ctx.lineWidth = 1.2
      ctx.stroke()
      // inner dot
      ctx.beginPath()
      ctx.arc(p.x, p.y, pulsedR * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${pulsedO * opacity})`
      ctx.fill()
    }

    const drawDot = (p, pulsedR, pulsedO) => {
      const { col } = p
      // outer glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedR * 3)
      grad.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${pulsedO * opacity})`)
      grad.addColorStop(0.5, `rgba(${col.r},${col.g},${col.b},${pulsedO * opacity * 0.3})`)
      grad.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`)
      ctx.beginPath()
      ctx.arc(p.x, p.y, pulsedR * 3, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      // core
      ctx.beginPath()
      ctx.arc(p.x, p.y, pulsedR, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${pulsedO * opacity})`
      ctx.fill()
    }

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i], p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 160) {
            const lineO = (1 - dist / 160) * 0.22 * opacity
            const col = p.col
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${lineO})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // draw each particle
      particles.forEach(p => {
        p.pulse += p.pulseSpeed
        const pulsedR = p.r + Math.sin(p.pulse) * 1.4
        const pulsedO = p.o + Math.sin(p.pulse) * 0.18

        if (p.type === 'star') drawStar(p, pulsedR, pulsedO)
        else if (p.type === 'ring') drawRing(p, pulsedR, pulsedO)
        else drawDot(p, pulsedR, pulsedO)

        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [color, count, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
