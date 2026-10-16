import { createContext, memo, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { tracks } from '../data'

const MusicContext = createContext(null)

export function useMusic() {
  return useContext(MusicContext)
}

function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!window.__umaYT) {
    window.__umaYT = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previous === 'function') previous()
        resolve(window.YT)
      }
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => reject(new Error('yt'))
      document.head.appendChild(script)
    })
  }
  return window.__umaYT
}

export function MusicProvider({ children }) {
  const playerRef = useRef(null)
  const indexRef = useRef(0)
  const playingRef = useRef(false)
  const creatingRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [embedError, setEmbedError] = useState(false)

  const setPlayState = (value) => {
    playingRef.current = value
    setPlaying(value)
  }

  const play = useCallback(async (nextIndex = indexRef.current) => {
    const safeIndex = ((nextIndex % tracks.length) + tracks.length) % tracks.length
    indexRef.current = safeIndex
    setIndex(safeIndex)
    setStarted(true)
    try {
      const YT = await loadYouTubeAPI()
      if (!playerRef.current) {
        if (creatingRef.current) return
        creatingRef.current = true
        playerRef.current = new YT.Player('yt-slot', {
          videoId: tracks[safeIndex].id,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(80)
              event.target.playVideo()
              setPlayState(true)
            },
            onStateChange: (event) => {
              const state = window.YT?.PlayerState
              if (!state) return
              if (event.data === state.PLAYING) setPlayState(true)
              if (event.data === state.PAUSED) setPlayState(false)
              if (event.data === state.ENDED) event.target.playVideo()
            },
            onError: () => setEmbedError(true),
          },
        })
        return
      }
      const player = playerRef.current
      if (player.getVideoData?.().video_id !== tracks[safeIndex].id) {
        player.loadVideoById(tracks[safeIndex].id)
      } else {
        player.playVideo()
      }
      setPlayState(true)
    } catch {
      setEmbedError(true)
    }
  }, [])

  const toggle = useCallback(() => {
    const player = playerRef.current
    if (!player || typeof player.playVideo !== 'function') {
      play(indexRef.current)
      return
    }
    if (playingRef.current) player.pauseVideo()
    else player.playVideo()
  }, [play])

  const next = useCallback(() => {
    play(indexRef.current + 1)
  }, [play])

  const api = useMemo(
    () => ({ play, toggle, next, playing, index, started, embedError }),
    [play, toggle, next, playing, index, started, embedError],
  )

  return (
    <MusicContext.Provider value={api}>
      {children}
      <YouTubeSlot />
      <MusicDock />
    </MusicContext.Provider>
  )
}

const YouTubeSlot = memo(function YouTubeSlot() {
  return (
    <div className="yt-hold" aria-hidden="true">
      <div id="yt-slot" />
    </div>
  )
})

function MusicDock() {
  const { toggle, next, playing, index, started, embedError } = useMusic()
  const track = tracks[index]

  return (
    <div className="dock">
      <div className={`dock-inner${playing ? ' is-on' : ''}`}>
        <span className="mini-ball" aria-hidden="true" />
        <div className="track">
          <strong>{started ? track.title : 'Música de la noche'}</strong>
          <span>{started ? track.artist : 'Memories · Play Hard · Poker Face'}</span>
          <i className={playing ? 'eq on' : 'eq'} aria-hidden="true">
            <b /><b /><b /><b />
          </i>
        </div>
        {embedError ? (
          <a
            className="icon-btn"
            href={`https://www.youtube.com/watch?v=${track.id}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Escuchar ${track.title} en YouTube`}
          >
            <PlayIcon />
          </a>
        ) : (
          <button className="icon-btn" type="button" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
        <button className="icon-btn" type="button" onClick={next} aria-label="Siguiente tema">
          <NextIcon />
        </button>
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
      <path d="M1 1.1v11.8L11 7 1 1.1Z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
      <path d="M1 1h3.2v12H1V1Zm6.8 0H11v12H7.8V1Z" fill="currentColor" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 2.2v9.6L9 7 1 2.2Zm9.2 0h2.2v9.6h-2.2V2.2Z" fill="currentColor" />
    </svg>
  )
}
