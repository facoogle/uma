import { useEffect, useRef } from 'react'

export default function HeroVisual() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const sparks = Array.from({ length: 42 }, () => ({
      ang: Math.random() * Math.PI * 2,
      dist: Math.pow(Math.random(), 0.65) * 0.86,
      speed: 1.4 + Math.random() * 3.2,
      phase: Math.random() * Math.PI * 2,
      size: 1.5 + Math.random() * 4.5,
      rot: Math.random() * Math.PI,
    }))

    let width = 0
    let height = 0
    let raf = 0

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, width, height)
      const t = now / 1000
      const cx = width / 2
      const cy = height * 0.5
      const radius = width * 0.33
      for (const spark of sparks) {
        const flicker = Math.pow(Math.max(0, Math.sin(t * spark.speed + spark.phase)), 12)
        if (flicker < 0.12) continue
        const x = cx + Math.cos(spark.ang) * spark.dist * radius
        const y = cy + Math.sin(spark.ang) * spark.dist * radius
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(spark.rot)
        ctx.globalAlpha = flicker
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(-spark.size / 2, -spark.size / 2, spark.size, spark.size * 0.82)
        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="orb" ref={wrapRef}>
      <img src="/ball.jpg" alt="" draggable="false" fetchPriority="high" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  )
}
