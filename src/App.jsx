import { useEffect, useState } from 'react'
import Atmosphere from './effects/Atmosphere'
import { MusicProvider } from './music/Player'
import { Close, Countdown, Dress, Gifts, Hero, Jersey, Rsvp, Still, When, Where } from './sections/Sections'

export default function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', !open)
    document.documentElement.classList.toggle('is-open', open)
    if (!open) window.scrollTo(0, 0)
  }, [open])

  useEffect(() => {
    if (open) return undefined
    const block = (event) => {
      if (event.target.closest?.('button, a, input, textarea')) return
      event.preventDefault()
    }
    document.addEventListener('touchmove', block, { passive: false })
    document.addEventListener('wheel', block, { passive: false })
    return () => {
      document.removeEventListener('touchmove', block)
      document.removeEventListener('wheel', block)
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const frame = requestAnimationFrame(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('cuenta')?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  return (
    <MusicProvider>
      <Atmosphere />
      <main>
        <Hero onEnter={() => setOpen(true)} />
        {open && (
          <>
            <Countdown />
            <When />
            <Where />
            <Dress />
            <Jersey />
            <Still />
            <Gifts />
            <Rsvp />
            <Close />
          </>
        )}
      </main>
    </MusicProvider>
  )
}
