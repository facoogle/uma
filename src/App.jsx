import { useEffect, useState } from 'react'
import Atmosphere from './effects/Atmosphere'
import { MusicProvider } from './music/Player'
import { Close, Countdown, Dress, Gifts, GuestLinks, Hero, Jersey, Nameplate, Rsvp, Still, When, Where } from './sections/Sections'

function guestFromUrl() {
  return new URLSearchParams(window.location.search).get('nombre')?.trim() ?? ''
}

function isGuestsRoute() {
  return window.location.pathname.replace(/\/+$/, '').endsWith('/invitados')
}

export default function App() {
  const guestsPage = isGuestsRoute()
  const guest = guestFromUrl()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (guestsPage) {
      document.documentElement.classList.remove('is-locked', 'is-open')
      return undefined
    }
    document.documentElement.classList.toggle('is-locked', !open)
    document.documentElement.classList.toggle('is-open', open)
    if (!open) window.scrollTo(0, 0)
    return undefined
  }, [open, guestsPage])

  useEffect(() => {
    if (guestsPage || open) return undefined
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
  }, [open, guestsPage])

  useEffect(() => {
    if (guestsPage || !open) return undefined
    const frame = requestAnimationFrame(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('presentacion')?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [open, guestsPage])

  if (guestsPage) {
    return (
      <main>
        <GuestLinks />
      </main>
    )
  }

  return (
    <MusicProvider>
      <Atmosphere />
      <main>
        <Hero onEnter={() => setOpen(true)} />
        {open && (
          <>
            <Nameplate />
            <Countdown />
            <When />
            <Where />
            <Dress />
            <Jersey />
            <Still />
            <Gifts />
            <Rsvp guest={guest} />
            <Close />
          </>
        )}
      </main>
    </MusicProvider>
  )
}
