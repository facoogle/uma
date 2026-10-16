const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Clock() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="15" {...stroke} />
      <path d="M24 24 L31 28" {...stroke} />
      <path className="hand" d="M24 24 V13" {...stroke} />
    </svg>
  )
}

function Calendar() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="10" y="12" width="28" height="24" rx="3" {...stroke} />
      <path d="M10 20 H38 M18 10 V16 M30 10 V16" {...stroke} />
    </svg>
  )
}

function Disco() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 8 V12" {...stroke} />
      <circle cx="24" cy="26" r="12" {...stroke} />
      <path d="M14 22 H34 M16 30 H32 M24 14 V38 M18 16.5 C21 22 21 30 18 36 M30 16.5 C27 22 27 30 30 36" {...stroke} />
    </svg>
  )
}

function Hanger() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 14 a4 4 0 1 1 4 4 C26 19 24 20 24 22" {...stroke} />
      <path d="M8 32 L24 22 L40 32" {...stroke} />
      <path d="M10 32 H38" {...stroke} />
    </svg>
  )
}

function Shirt() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M16 14 L24 18 L32 14 L38 20 L33 24 V36 H15 V24 L10 20 Z" {...stroke} />
    </svg>
  )
}

function Gift() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="11" y="20" width="26" height="16" rx="2" {...stroke} />
      <path d="M11 26 H37 M24 20 V36" {...stroke} />
      <path d="M24 20 C24 14 16 13 16 17 C16 20 24 20 24 20 C24 20 32 20 32 17 C32 13 24 14 24 20" {...stroke} />
    </svg>
  )
}

function Heart() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 36 C12 28 8 22 12 16 C15 12 20 13 24 18 C28 13 33 12 36 16 C40 22 36 28 24 36 Z" {...stroke} />
    </svg>
  )
}

const drawings = {
  clock: Clock,
  calendar: Calendar,
  disco: Disco,
  hanger: Hanger,
  shirt: Shirt,
  gift: Gift,
  heart: Heart,
}

export function Mark({ name, motion = '' }) {
  const Drawing = drawings[name]
  return (
    <span className={`mark ${motion}`.trim()} aria-hidden="true">
      <Drawing />
    </span>
  )
}
