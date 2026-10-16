import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useMusic } from '../music/Player'
import { banned, END, mapsDirections, mapsEmbed, party, START, wazeLink, whatsappHref } from '../data'
import { googleCalendarUrl } from '../calendar'
import { silverBurst } from '../burst'
import { Mark } from './Icons'

function Reveal({ children, className }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Hero({ onEnter }) {
  const music = useMusic()

  const enter = () => {
    music.play(0)
    silverBurst()
    onEnter()
  }

  return (
    <section className="hero">
      <img className="hero-bg" src="/bolas.jpg" alt="" />
      <div className="hero-shade" />
      <div className="hero-spark" aria-hidden="true" />
      <div className="beams-pivot" aria-hidden="true">
        <div className="beams" />
      </div>
      <div className="hero-copy">
        <p className="kicker">Mis XV</p>
        <h1 className="silver">Uma</h1>
        <p className="invite-phrase">Quiero que seas parte de esta noche tan importante para mí</p>
        <motion.button className="btn solid invite" type="button" onClick={enter} whileTap={{ scale: 0.97 }}>
          Entrar
        </motion.button>
        <p className="fine">La música empieza al entrar</p>
      </div>
    </section>
  )
}

function pad(value) {
  return String(value).padStart(2, '0')
}

export function Nameplate() {
  return (
    <section className="nameplate" id="presentacion">
      <div className="nameplate-pivot" aria-hidden="true">
        <div className="nameplate-beams" />
      </div>
      <div className="nameplate-sweep" aria-hidden="true" />
      <div className="nameplate-glints" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="nameplate-inner">
        <p className="nameplate-kicker">Mis XV</p>
        <span className="nameplate-mark" aria-hidden="true" />
        <h2 className="nameplate-name">Uma</h2>
      </div>
    </section>
  )
}

export function Countdown() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  let body
  if (now > END) {
    body = <p className="live">Gracias por haber venido.</p>
  } else if (now >= START) {
    body = <p className="live">Es esta noche.</p>
  } else {
    const total = Math.floor((START - now) / 1000)
    const parts = [
      ['Días', pad(Math.floor(total / 86400))],
      ['Horas', pad(Math.floor((total % 86400) / 3600))],
      ['Minutos', pad(Math.floor((total % 3600) / 60))],
      ['Segundos', pad(total % 60)],
    ]
    body = (
      <div className="clock" aria-label="Cuenta regresiva para el 28 de noviembre de 2026">
        {parts.map(([label, value]) => (
          <div className="cell" key={label}>
            <span className="num" key={label === 'Segundos' ? value : label}>{value}</span>
            <span className="cell-label">{label}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="block dark countdown" id="cuenta">
      <Reveal className="wrap">
        <Mark name="clock" motion="float" />
        <h2 className="title">Cuenta regresiva</h2>
        {body}
      </Reveal>
    </section>
  )
}

export function When() {
  return (
    <section className="block light glitter" id="cuando">
      <Reveal className="wrap">
        <Mark name="calendar" motion="float" />
        <h2 className="title">¿Cuándo?</h2>
        <p className="weekday">Sábado</p>
        <p className="bignum silver">28</p>
        <p className="month">noviembre 2026</p>
        <p className="span-time">21:30 hs<span>a</span> 5:30 hs</p>
        <div className="actions">
          <a className="btn ghost" href={googleCalendarUrl()} target="_blank" rel="noreferrer">Agendar</a>
        </div>
      </Reveal>
    </section>
  )
}

export function Where() {
  return (
    <section className="block dark" id="donde">
      <Reveal className="wrap">
        <Mark name="disco" motion="spin" />
        <h2 className="title">¿Dónde?</h2>
        <p className="venue silver">{party.venue}</p>
        <p className="address">
          {party.address}
          <br />
          {party.city}
        </p>
        <div className="map-frame">
          <iframe
            title="Mapa de Salón Ibiza, Av. Mitre 1043, Avellaneda"
            src={mapsEmbed()}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="actions">
          <a className="btn solid" href={mapsDirections()} target="_blank" rel="noreferrer">Cómo llegar</a>
          <a className="btn ghost" href={wazeLink()} target="_blank" rel="noreferrer">Waze</a>
        </div>
      </Reveal>
    </section>
  )
}

export function Dress() {
  return (
    <section className="block light glitter" id="dress">
      <Reveal className="wrap">
        <Mark name="sparkle" motion="twinkle" />
        <h2 className="title dress-title">Dress code</h2>
        <p className="dress-sub">Elegante</p>
        <p className="reserved">Colores reservados</p>
        <ul className="banned">
          {banned.map((color) => (
            <li key={color.name}>
              <span className="swatch" style={{ background: color.color, '--slash': color.slash }} />
              <span className="swatch-name">{color.name}</span>
            </li>
          ))}
        </ul>
        <p className="fine">Azul, dorado, plateado y celeste.</p>
      </Reveal>
    </section>
  )
}

export function Jersey() {
  return (
    <section className="block dark" id="carnaval">
      <Reveal className="wrap">
        <Mark name="shirt" motion="sway" />
        <p className="jersey-line">
          Trae la camiseta de tu equipo favorito para el <em>carnaval carioca</em>!
        </p>
      </Reveal>
    </section>
  )
}

export function Still() {
  return (
    <section className="moment" id="noche">
      <img src="/bolas.jpg" alt="" />
      <div className="moment-frame">
        <p>Hagamos que sea una noche</p>
        <p className="moment-word">¡Inolvidable!</p>
      </div>
    </section>
  )
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
}

export function Gifts() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await copyText(party.alias)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="block dark" id="regalos">
      <Reveal className="wrap">
        <Mark name="gift" motion="float" />
        <h2 className="title">Regalos</h2>
        <p className="lede">
          Nada es más importante que tu presencia. Pero si deseás regalarme algo, podés colaborar con mis sueños y anhelos enviándolo a la siguiente cuenta:
        </p>
        <button className="alias" type="button" onClick={copy}>
          <span>Alias</span>
          <strong>{party.alias}</strong>
          <em>{copied ? 'Copiado' : 'Copiar'}</em>
        </button>
        <p className="thanks">Muchas gracias</p>
      </Reveal>
    </section>
  )
}

export function Rsvp() {
  const [name, setName] = useState('')
  const [count, setCount] = useState(1)
  const [sent, setSent] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const message = `Hola! Confirmo asistencia al cumple de Uma.\nNombre: ${name.trim()}\nPersonas: ${count}\nSábado 28 de noviembre de 2026, 21:30 hs.\nSalón Ibiza, Av. Mitre 1043, Avellaneda.`

  const confirm = async (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setInvalid(true)
      return
    }
    setInvalid(false)
    await copyText(message)
    setSent(true)
    silverBurst()
    window.open(whatsappHref(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="block light glitter" id="asistencia">
      <Reveal className="wrap">
        <Mark name="heart" motion="float" />
        <h2 className="venis">¿Venís?</h2>
        <p className="kicker ask">Confirmá tu asistencia</p>
        {sent ? (
          <div className="sent">
            <p className="sent-name silver">{name.trim()}</p>
            <p className="lede">
              {count === 1 ? 'Te esperamos.' : `Los esperamos, van ${count}.`} Si WhatsApp no se abrió, el mensaje quedó copiado.
            </p>
            <div className="actions">
              <a className="btn solid" href={whatsappHref(message)} target="_blank" rel="noreferrer">Abrir WhatsApp</a>
            </div>
          </div>
        ) : (
          <form className="card" onSubmit={confirm}>
            <p className="lede left">Se abre WhatsApp con el mensaje listo para enviar.</p>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              autoComplete="name"
              enterKeyHint="done"
              value={name}
              aria-invalid={invalid}
              className={invalid ? 'shake' : undefined}
              placeholder="Tu nombre"
              onChange={(event) => {
                setName(event.target.value)
                setInvalid(false)
              }}
            />
            <label htmlFor="personas">Personas</label>
            <div className="stepper" id="personas">
              <button type="button" onClick={() => setCount((value) => Math.max(1, value - 1))} aria-label="Menos personas">–</button>
              <span>{count} {count === 1 ? 'persona' : 'personas'}</span>
              <button type="button" onClick={() => setCount((value) => Math.min(10, value + 1))} aria-label="Más personas">+</button>
            </div>
            <div className="actions">
              <button className="btn solid" type="submit">Confirmar</button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  )
}

export function Close() {
  return (
    <section className="close">
      <div className="wrap">
        <p className="kicker">Te espero</p>
        <h2 className="silver finale">Uma</h2>
        <p className="lede">
          Sábado 28 de noviembre
          <br />
          21:30 hs · Salón Ibiza
        </p>
      </div>
    </section>
  )
}
