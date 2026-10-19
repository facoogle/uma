const DETAILS =
  'Dress code elegante. Sin azul, dorado ni celeste. Alias de regalos: uma15.cumple'

export function googleCalendarUrl() {
  const url = new URL('https://calendar.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', 'Cumple de 15 de Uma')
  url.searchParams.set('dates', '20261129T003000Z/20261129T083000Z')
  url.searchParams.set('location', 'Salón Ibiza, Av. Mitre 1043, Avellaneda')
  url.searchParams.set('details', DETAILS)
  return url.toString()
}

