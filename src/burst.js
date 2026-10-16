import confetti from 'canvas-confetti'

export function silverBurst() {
  const base = {
    disableForReducedMotion: true,
    colors: ['#ffffff', '#f4f4f8', '#d8d8e2', '#cbb8dc', '#f0d4e3'],
    shapes: ['square'],
    ticks: 200,
    gravity: 0.9,
    zIndex: 50,
  }
  confetti({ ...base, particleCount: 46, spread: 68, startVelocity: 26, scalar: 0.75, origin: { x: 0.5, y: 0.62 } })
  confetti({ ...base, particleCount: 18, spread: 110, startVelocity: 16, scalar: 0.55, origin: { x: 0.18, y: 0.45 } })
  confetti({ ...base, particleCount: 18, spread: 110, startVelocity: 16, scalar: 0.55, origin: { x: 0.82, y: 0.45 } })
}
