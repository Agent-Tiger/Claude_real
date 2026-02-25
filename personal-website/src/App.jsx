import { useState, useEffect, useCallback, useRef } from 'react'
import longhornsLogo from './assets/longhorns.png'
import './App.css'

/* ── All interests + languages in one list ─────────── */
const allTags = [
  { label: 'chai making', href: 'https://en.wikipedia.org/wiki/Masala_chai' },
  { label: 'arabic calligraphy', href: 'https://en.wikipedia.org/wiki/Arabic_calligraphy' },
  { label: 'thrifting', href: 'https://en.wikipedia.org/wiki/Thrift_store' },
  { label: 'chess', href: 'https://en.wikipedia.org/wiki/Chess' },
  { label: 'guitar', href: 'https://en.wikipedia.org/wiki/Guitar' },
  { label: 'soccer', href: 'https://en.wikipedia.org/wiki/Association_football' },
  { label: 'boxing', href: 'https://en.wikipedia.org/wiki/Boxing' },
  { label: 'vlogging', href: 'https://en.wikipedia.org/wiki/Vlog' },
  { label: 'running', href: 'https://en.wikipedia.org/wiki/Running' },
  { label: 'urdu', href: 'https://en.wikipedia.org/wiki/Urdu' },
  { label: 'hindi', href: 'https://en.wikipedia.org/wiki/Hindi' },
  { label: 'punjabi', href: 'https://en.wikipedia.org/wiki/Punjabi_language' },
  { label: 'hindko', href: 'https://en.wikipedia.org/wiki/Hindko' },
  { label: 'arabic ↗', href: 'https://en.wikipedia.org/wiki/Arabic' },
  { label: 'spanish ↗', href: 'https://en.wikipedia.org/wiki/Spanish_language' },
]

/* ── 3×5 Sliding Grid ──────────────────────────────── */
const COLS = 5
const ROWS = 3
const CELL_W = 128   // px, including gap
const CELL_H = 44    // px, including gap
const GAP = 8

function SlidingGrid({ items }) {
  // positions[i] = {col, row} — where each item currently sits
  const [positions, setPositions] = useState(() =>
    items.map((_, i) => ({ col: i % COLS, row: Math.floor(i / COLS) }))
  )

  const intervalRef = useRef(null)

  useEffect(() => {
    function doSwap() {
      setPositions(prev => {
        const next = prev.map(p => ({ ...p }))
        // Pick a random item and a random neighbour direction
        const idx = Math.floor(Math.random() * items.length)
        const dirs = [
          { dc: 1, dr: 0 }, { dc: -1, dr: 0 },
          { dc: 0, dr: 1 }, { dc: 0, dr: -1 },
        ]
        const dir = dirs[Math.floor(Math.random() * dirs.length)]
        const newCol = next[idx].col + dir.dc
        const newRow = next[idx].row + dir.dr

        // Allow one cell outside grid temporarily
        if (newCol < -1 || newCol > COLS || newRow < -1 || newRow > ROWS) return prev

        // Find if another item occupies target cell (within grid)
        const targetIdx = next.findIndex(
          (p, j) => j !== idx && p.col === newCol && p.row === newRow
        )
        // Swap (or just move if target is outside main grid bounds)
        if (targetIdx !== -1) {
          // swap positions
          const tmp = { ...next[idx] }
          next[idx] = { ...next[targetIdx] }
          next[targetIdx] = tmp
        } else {
          // move freely (temporarily outside grid)
          next[idx] = { col: newCol, row: newRow }
        }
        return next
      })
    }

    // stagger: fire swaps on an irregular cadence
    function scheduleNext() {
      const delay = 600 + Math.random() * 1000
      intervalRef.current = setTimeout(() => {
        doSwap()
        scheduleNext()
      }, delay)
    }
    scheduleNext()
    return () => clearTimeout(intervalRef.current)
  }, [items.length])

  const gridW = COLS * (CELL_W - GAP) + GAP
  const gridH = ROWS * (CELL_H - GAP) + GAP

  return (
    <div
      className="sliding-grid"
      style={{ width: gridW, height: gridH, position: 'relative' }}
    >
      {items.map((item, i) => {
        const { col, row } = positions[i]
        const x = col * CELL_W
        const y = row * CELL_H
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid-tag"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              width: CELL_W - GAP,
            }}
          >
            {item.label}
          </a>
        )
      })}
    </div>
  )
}

/* ── Content lines ──────────────────────────────────── */
const contentLines = [
  { type: 'quote', text: '"slow is smooth, smooth is fast."', attr: '— russell sarre' },
  { text: '' },
  { text: 'investment banking, venture capital, and building from the ground up.' },
  { text: '' },
  { type: 'section-label', text: 'currently' },
  { type: 'experience', role: 'tech ib intern', place: 'concordia capital', date: '2025–now' },
  { type: 'experience', role: 'junior analyst', place: 'texas venture group', date: '2026–now' },
  { type: 'experience', role: 'junior analyst', place: 'texas capital collective', date: '2025–now' },
  { type: 'experience', role: 'general analyst', place: 'university securities investment team', date: '2025–now' },
  { text: '' },
  { type: 'cv-button' },
  { text: '' },
  { type: 'section-label', text: 'previously' },
  { type: 'experience', role: 'founder', place: 'organic roots', date: '2024' },
  { type: 'experience', role: 'expeditor', place: 'mia bella trattoria', date: '2024' },
  { type: 'experience', role: 'private tutor', place: 'ap sat tutorial', date: '2020–2023' },
  { type: 'experience', role: 'co-founder', place: 'circle of champions', date: '2024–2025' },
  { type: 'experience', role: 'co-founder', place: 'klein business academy', date: '2023–2025' },
  { text: '' },
  { type: 'section-label', text: 'high school projects' },
  { type: 'experience', role: 'impossiball', place: 'unity/c# game', date: '2018', href: 'https://agent-tiger.github.io/ImpossiBall/' },
  { type: 'experience', role: 'king of the hill', place: 'multiplayer game', date: '2019', href: 'https://agent-tiger.github.io/KingofHillWebsite/' },
  { text: '' },
  { type: 'section-label', text: 'education' },
  { type: 'education' },
  { text: '' },
  { type: 'section-label', text: 'etc.' },
  { type: 'sliding-grid', items: allTags },
  { text: '' },
  { text: '' },
  { type: 'contact', text: 'say hello →', href: 'mailto:hamzausman@utexas.edu' },
]

/* ── Typewriter hook ────────────────────────────────── */
const TYPE_DELAY = 40
const LINE_PAUSE = 180
const SECTION_PAUSE = 350

function useTypewriter(lines) {
  const [visibleLines, setVisibleLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const skip = useCallback(() => {
    setVisibleLines(lines)
    setCurrentText('')
    setIsDone(true)
    setShowSkip(false)
  }, [lines])

  useEffect(() => {
    if (isDone) return
    const handler = (e) => { if (e.key === 'Enter') skip() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isDone, skip])

  useEffect(() => {
    if (isDone || lineIndex >= lines.length) {
      if (lineIndex >= lines.length) setIsDone(true)
      return
    }
    const line = lines[lineIndex]
    const text = line.text || ''
    const instantTypes = ['experience', 'section-label', 'contact', 'quote', 'cv-button', 'education', 'sliding-grid']
    if (!text || instantTypes.includes(line.type)) {
      const delay = line.type === 'section-label' ? SECTION_PAUSE : LINE_PAUSE
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        setLineIndex(prev => prev + 1)
        setCharIndex(0)
        setCurrentText('')
      }, delay)
      return () => clearTimeout(timer)
    }
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentText(text.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, TYPE_DELAY)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setVisibleLines(prev => [...prev, line])
      setLineIndex(prev => prev + 1)
      setCharIndex(0)
      setCurrentText('')
    }, LINE_PAUSE)
    return () => clearTimeout(timer)
  }, [lineIndex, charIndex, isDone, lines])

  return { visibleLines, currentText, isDone, showSkip, skip }
}

/* ── Line renderer ──────────────────────────────────── */
function Line({ line, index }) {
  const instantTypes = ['experience', 'section-label', 'contact', 'quote', 'cv-button', 'education', 'sliding-grid']
  if (!line.text && !instantTypes.includes(line.type)) {
    return <div className="line-spacer" />
  }

  if (line.type === 'section-label') {
    return (
      <div className="line line-section muted" style={{ animationDelay: `${index * 30}ms` }}>
        {line.text}
      </div>
    )
  }

  if (line.type === 'experience') {
    const content = (
      <div className="experience-item">
        <span className="experience-dot" />
        <span className="experience-role">{line.role}</span>
        <span className="experience-place">@ {line.place}</span>
        <span className="experience-date">{line.date}</span>
      </div>
    )
    return (
      <div className="line" style={{ animationDelay: `${index * 30}ms` }}>
        {line.href ? (
          <a href={line.href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
            {content}
          </a>
        ) : content}
      </div>
    )
  }

  if (line.type === 'cv-button') {
    return (
      <div className="line" style={{ animationDelay: `${index * 30}ms` }}>
        <a href="/Hamza_Usman_Resume.pdf" download className="cv-button">
          ↓ download cv
        </a>
      </div>
    )
  }

  if (line.type === 'education') {
    return (
      <div className="line education-block" style={{ animationDelay: `${index * 30}ms` }}>
        <div className="edu-logo">
          <img src={longhornsLogo} alt="UT Austin" className="edu-logo-img" />
        </div>
        <div className="edu-text">
          <div className="edu-degree">b.b.a. — canfield business honors</div>
          <div className="edu-school">the university of texas at austin</div>
          <div className="edu-detail">certificate: programming & computation · 2025–2029</div>
        </div>
      </div>
    )
  }

  if (line.type === 'sliding-grid') {
    return (
      <div className="line" style={{ animationDelay: `${index * 30}ms` }}>
        <SlidingGrid items={line.items} />
      </div>
    )
  }

  if (line.type === 'contact') {
    return (
      <div className="line" style={{ animationDelay: `${index * 30}ms` }}>
        <a href={line.href} style={{ textDecoration: 'underline', textDecorationColor: '#ececec' }}>
          {line.text}
        </a>
      </div>
    )
  }

  if (line.type === 'quote') {
    return (
      <div className="line quote-section" style={{ animationDelay: `${index * 30}ms` }}>
        <div className="quote-text">{line.text}</div>
        {line.attr && <div className="quote-attr">{line.attr}</div>}
      </div>
    )
  }

  return (
    <div className="line muted" style={{ animationDelay: `${index * 30}ms` }}>
      {line.text}
    </div>
  )
}

/* ── Clock ──────────────────────────────────────────── */
function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  const opts = { timeZone: 'America/Chicago', hour12: false }
  const h = pad(now.toLocaleString('en-US', { ...opts, hour: 'numeric' }).replace(/^24$/, '00'))
  const m = pad(now.toLocaleString('en-US', { ...opts, minute: 'numeric' }))
  const s = pad(now.toLocaleString('en-US', { ...opts, second: 'numeric' }))
  return <div className="clock">{h}:{m}:{s} cst</div>
}

/* ── Icons ──────────────────────────────────────────── */
function GitHubIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
}
function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
}
function XIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.352 2.622 6.774 6.98 6.974 1.28.058 1.688.072 4.948.072 3.26 0 3.668-.014 4.948-.072 4.354-.2 6.774-2.622 6.974-6.98.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.353-2.622-6.775-6.974-6.975-1.28-.058-1.688-.072-4.948-.072zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
}

/* ── App ────────────────────────────────────────────── */
function App() {
  const { visibleLines, currentText, isDone, showSkip, skip } = useTypewriter(contentLines)

  return (
    <div className="app">
      <header className="header">
        <Clock />
        <div className="header-name">hamza usman</div>
        <div className="header-subtitle">business + finance @ ut austin</div>
      </header>

      <main className="main">
        <div className="content">
          {visibleLines.map((line, i) => (
            <Line key={i} line={line} index={i} />
          ))}

          {!isDone && currentText && (
            <div className="line muted" style={{ opacity: 1, transform: 'none' }}>
              {currentText}
            </div>
          )}

          {!isDone && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="cursor" />
              {showSkip && (
                <button className="skip-hint" onClick={skip}>
                  press enter to skip
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {isDone && (
        <footer className="footer">
          <div className="footer-links">
            <a href="https://linkedin.com/in/hamzausman7/" target="_blank" rel="noopener noreferrer" aria-label="linkedin"><LinkedInIcon /></a>
            <a href="https://github.com/Agent-Tiger" target="_blank" rel="noopener noreferrer" aria-label="github"><GitHubIcon /></a>
            <a href="https://x.com/hamza777usman" target="_blank" rel="noopener noreferrer" aria-label="x"><XIcon /></a>
            <a href="https://instagram.com/just_hamzau" target="_blank" rel="noopener noreferrer" aria-label="instagram"><InstagramIcon /></a>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
