import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

/* ── Content lines (all lowercase) ──────────────────── */
const contentLines = [
  { text: 'hamza usman.' },
  { text: '' },
  { text: 'business & finance student at ut austin. i like investment banking, venture capital, and building from the ground up.' },
  { text: '' },
  { text: 'currently interning in tech investment banking and scouting early-stage startups for vc funds.' },
  { text: 'previously founded an e-commerce brand, tutored 15+ students, and built android games.' },
  { text: '' },
  { text: '' },
  { type: 'section-label', text: 'where i\'ve been' },
  { type: 'experience', role: 'tech ib intern', place: 'concordia capital', date: '2025–now' },
  { type: 'experience', role: 'founder', place: 'organic roots', date: '2024' },
  { type: 'experience', role: 'expeditor', place: 'mia bella trattoria', date: '2024' },
  { type: 'experience', role: 'private tutor', place: 'ap sat tutorial', date: '2020–2023' },
  { type: 'experience', role: 'game developer', place: 'impossiball', date: '2018' },
  { text: '' },
  { type: 'section-label', text: 'things i do on campus' },
  { text: 'junior analyst at texas venture group — scouting early-stage companies for top vc partners.' },
  { text: 'junior analyst at texas capital collective — selected as 1 of 7 members (<5% acceptance).' },
  { text: 'general analyst at university securities investment team — pitching to a $50k+ portfolio.' },
  { text: 'co-founder of circle of champions — built a network across 12+ houston schools.' },
  { text: 'co-founder of klein business academy — taught financial literacy to 30+ students.' },
  { text: '' },
  { type: 'section-label', text: 'education' },
  { text: 'b.b.a., canfield business honors — the university of texas at austin (2025–2029).' },
  { text: 'certificate in programming & computation · gpa: 4.00/4.00 · university honors.' },
  { text: '' },
  { type: 'section-label', text: 'etc.' },
  { text: 'into chai making, arabic calligraphy, thrifting, chess, guitar, soccer, boxing, and vlogging.' },
  { text: 'fluent in urdu, hindi, punjabi, hindko. learning arabic and spanish.' },
  { text: '' },
  { type: 'quote', text: '"slow is smooth, smooth is fast."', attr: '— my guitar teacher' },
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

  // enter key to skip
  useEffect(() => {
    if (isDone) return
    const handler = (e) => { if (e.key === 'Enter') skip() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isDone, skip])

  // typing engine
  useEffect(() => {
    if (isDone || lineIndex >= lines.length) {
      if (lineIndex >= lines.length) setIsDone(true)
      return
    }

    const line = lines[lineIndex]
    const text = line.text || ''

    // instant lines (empty, experience, section-label, contact, quote)
    if (!text || line.type === 'experience' || line.type === 'section-label' || line.type === 'contact' || line.type === 'quote') {
      const delay = line.type === 'section-label' ? SECTION_PAUSE : LINE_PAUSE
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        setLineIndex(prev => prev + 1)
        setCharIndex(0)
        setCurrentText('')
      }, delay)
      return () => clearTimeout(timer)
    }

    // character-by-character typing
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentText(text.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, TYPE_DELAY)
      return () => clearTimeout(timer)
    }

    // line complete
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
  if (!line.text && line.type !== 'experience' && line.type !== 'section-label' && line.type !== 'contact' && line.type !== 'quote') {
    return <div className="line-spacer" style={{ animationDelay: `${index * 30}ms` }} />
  }

  if (line.type === 'section-label') {
    return (
      <div className="line line-section muted" style={{ animationDelay: `${index * 30}ms` }}>
        {line.text}
      </div>
    )
  }

  if (line.type === 'experience') {
    return (
      <div className="line" style={{ animationDelay: `${index * 30}ms` }}>
        <div className="experience-item">
          <span className="experience-dot" />
          <span className="experience-role">{line.role}</span>
          <span className="experience-place">@ {line.place}</span>
          <span className="experience-date">{line.date}</span>
        </div>
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

/* ── Clock component ────────────────────────────────── */
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

/* ── SVG icons ──────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/* ── Main App ───────────────────────────────────────── */
function App() {
  const { visibleLines, currentText, isDone, showSkip, skip } = useTypewriter(contentLines)

  return (
    <div className="app">
      <header className="header">
        <Clock />
        <div className="header-name">hamza usman</div>
        <div className="header-subtitle">student at ut austin</div>
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
            <a href="https://linkedin.com/in/hamzausman7/" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
              <LinkedInIcon />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="github">
              <GitHubIcon />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="x">
              <XIcon />
            </a>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
