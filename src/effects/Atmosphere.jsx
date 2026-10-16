import { useEffect, useRef } from 'react'

function RoomLights() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const spots = Array.from({ length: 14 }, () => ({
      ang: Math.random() * Math.PI * 2,
      speed: 0.08 + Math.random() * 0.16,
      dist: 0.18 + Math.random() * 0.85,
      w: 28 + Math.random() * 78,
      h: 8 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      tint: Math.random(),
    }))

    let width = 0
    let height = 0
    let raf = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const colorFor = (tint) => {
      if (tint > 0.78) return '214, 218, 228'
      return '244, 246, 250'
    }

    const draw = (now) => {
      const t = now / 1000
      ctx.clearRect(0, 0, width, height)
      const ball = document.querySelector('.orb')
      const rect = ball?.getBoundingClientRect()
      const ox = rect ? rect.left + rect.width / 2 : width / 2
      const oy = rect ? rect.top + rect.height * 0.48 : height * 0.22

      for (const spot of spots) {
        const pulse = Math.sin(t * 0.7 + spot.phase)
        if (pulse < 0.15) continue
        const alpha = (pulse - 0.15) * 0.28
        const travel = spot.dist * Math.max(width, height) * 0.52
        const ang = spot.ang + t * spot.speed
        const x = ox + Math.cos(ang) * travel
        const y = oy + Math.sin(ang) * travel * 0.72
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(ang)
        const gradient = ctx.createLinearGradient(-spot.w / 2, 0, spot.w / 2, 0)
        const color = colorFor(spot.tint)
        gradient.addColorStop(0, `rgba(${color}, 0)`)
        gradient.addColorStop(0.5, `rgba(${color}, ${alpha})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(-spot.w / 2, -spot.h / 2, spot.w, spot.h)
        ctx.restore()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) draw(0)
    else raf = requestAnimationFrame(draw)

    const onHide = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduce) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onHide)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [])

  return <canvas ref={ref} className="room" aria-hidden="true" />
}

function Grain() {
  const ref = useRef(null)

  useEffect(() => {
    const tile = document.createElement('canvas')
    tile.width = 128
    tile.height = 128
    const ctx = tile.getContext('2d')
    const image = ctx.createImageData(128, 128)
    for (let i = 0; i < image.data.length; i += 4) {
      const value = 210 + Math.random() * 45
      image.data[i] = value
      image.data[i + 1] = value
      image.data[i + 2] = value
      image.data[i + 3] = 26
    }
    ctx.putImageData(image, 0, 0)
    ref.current.style.backgroundImage = `url(${tile.toDataURL('image/png')})`
  }, [])

  return <div ref={ref} className="grain" aria-hidden="true" />
}

export default function Atmosphere() {
  return (
    <>
      <RoomLights />
      <Grain />
    </>
  )
}
