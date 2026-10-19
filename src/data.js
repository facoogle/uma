// Datos de la fiesta. El número de WhatsApp es opcional:
// código de país, sin + ni espacios. Ejemplo: 5491122334455
export const party = {
  name: 'Uma',
  whatsapp: '5491163703601',
  alias: 'uma15.cumple',
  startISO: '2026-11-28T21:30:00-03:00',
  endISO: '2026-11-29T05:30:00-03:00',
  venue: 'Salón Ibiza',
  address: 'Av. Mitre 1043',
  city: 'Avellaneda',
  lat: -34.664195,
  lng: -58.36216,
}

export const START = new Date(party.startISO).getTime()
export const END = new Date(party.endISO).getTime()

export const tracks = [
  {
    id: 'NUVCQXMUVnI',
    title: 'Memories',
    artist: 'David Guetta ft. Kid Cudi',
  },
  {
    id: '5dbEhBKGOtY',
    title: 'Play Hard',
    artist: 'David Guetta ft. Ne-Yo & Akon',
  },
  {
    id: 'bESGLojNYSo',
    title: 'Poker Face',
    artist: 'Lady Gaga',
  },
]

export const banned = [
  { name: 'Azul', color: '#1c4f8f', slash: '#ffffff' },
  { name: 'Dorado', color: '#c6a15b', slash: '#16161a' },
  { name: 'Celeste', color: '#8fd0ea', slash: '#16161a' },
]

export function mapsEmbed() {
  return `https://maps.google.com/maps?q=${party.lat},${party.lng}&z=16&hl=es&output=embed`
}

export function mapsDirections() {
  return `https://www.google.com/maps/dir/?api=1&destination=${party.lat},${party.lng}`
}

export function wazeLink() {
  return `https://waze.com/ul?ll=${party.lat},${party.lng}&navigate=yes`
}

export function whatsappHref(text) {
  const encoded = encodeURIComponent(text)
  if (party.whatsapp) return `https://wa.me/${party.whatsapp}?text=${encoded}`
  return `https://api.whatsapp.com/send?text=${encoded}`
}
