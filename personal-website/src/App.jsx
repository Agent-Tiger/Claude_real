import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Scroll-reveal hook ──────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); io.unobserve(el) } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ── Marquee items ────────────────────────────────── */
const marqueeWords = [
  'Investment Banking', 'Venture Capital', 'Financial Modeling',
  'Entrepreneurship', 'M&A', 'Valuation', 'DCFs',
  'E-Commerce', 'Leadership', 'UT Austin',
  'Investment Banking', 'Venture Capital', 'Financial Modeling',
  'Entrepreneurship', 'M&A', 'Valuation', 'DCFs',
  'E-Commerce', 'Leadership', 'UT Austin',
]

/* ── Main App ────────────────────────────────────── */
function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const experiences = [
    {
      icon: '🏦',
      title: 'Tech Investment Banking Intern',
      org: 'Concordia Capital · Remote',
      date: 'Dec 2025 — Present',
      desc: 'Supporting buyside tech M&A deal execution through financial modeling, industry research, and sourcing. Evaluated 75+ companies across Video Game Marketing and B2B Enterprise AI, presenting acquisition targets.',
      tech: ['Financial Modeling', 'M&A', 'Industry Research', 'Deal Execution'],
    },
    {
      icon: '🍝',
      title: 'Expeditor',
      org: 'Mia Bella Trattoria · Spring, TX',
      date: 'Sep 2024 — Dec 2024',
      desc: 'Delivered high-volume service to 130+ patrons per shift while focusing on customer satisfaction and consistent order output. Coordinated with kitchen and floor staff to manage 25+ tables and guarantee delivery within 30 minutes.',
      tech: ['Hospitality', 'Operations', 'Team Coordination'],
    },
    {
      icon: '🛍️',
      title: 'Founder',
      org: 'Organic Roots · Houston, TX',
      date: 'Apr 2024 — Aug 2024',
      desc: 'Launched a Shopify store for handmade traditional Pakistani clothing, building site architecture and payment integration. Generated $10K+ in revenue via targeted Facebook/Instagram campaigns.',
      tech: ['Shopify', 'E-Commerce', 'Digital Marketing', 'Entrepreneurship'],
    },
    {
      icon: '📚',
      title: 'Private Tutor',
      org: 'AP SAT Tutorial · Spring, TX',
      date: 'Dec 2020 — Dec 2023',
      desc: 'Tutored 15+ students in SAT/ACT, Calculus, Physics, and Algebra, contributing to an average score increase of 15%. Led 7 students to score top 5% nationally and gain ~$400K in scholarships.',
      tech: ['Teaching', 'Curriculum Design', 'SAT/ACT', 'STEM'],
    },
    {
      icon: '🎮',
      title: 'Android Game Developer',
      org: 'Impossiball & King of the Hill · Spring, TX',
      date: 'Jan 2018 — Nov 2018',
      desc: 'Developed and published 2 original Android/Web games in C# and Unity, generating over 150 downloads and impressions. Managed full app design lifecycle from testing to publication.',
      tech: ['C#', 'Unity', 'Game Design', 'Android'],
    },
  ]

  const leadership = [
    {
      role: 'Junior Analyst',
      org: 'Texas Venture Group',
      date: 'Spring 2026 — Present',
      desc: 'Identified early-stage companies with scalable ARR and founder-market fit for partners (a16z, RRE, 8VC). Researched investment thesis around AI-driven fintech segments.',
    },
    {
      role: 'Junior Analyst',
      org: 'Texas Capital Collective',
      date: 'Fall 2025 — Present',
      desc: 'Selected as 1 of 7 members (<5% acceptance) for a finance organization. Completed 20-hour technical curriculum covering accounting, valuation, modeling; built 3-statement models and DCFs.',
    },
    {
      role: 'General Analyst',
      org: 'University Securities Investment Team',
      date: 'Fall 2025 — Present',
      desc: 'Pitched DLO and AGYS to meetings of 100+ members for contribution to a $50k+ long/short public equities portfolio through analyst groups and stock pitches.',
    },
    {
      role: 'Co-Founder',
      org: 'Circle of Champions',
      date: 'Fall 2024 — Summer 2025',
      desc: 'Built a network across 12+ Houston-area schools and organized 70+ attendees for multiple religious and social events. Secured over 2k of funding in grants and operating capital.',
    },
    {
      role: 'Co-Founder',
      org: 'Klein Business Academy',
      date: 'Summer 2023 — Summer 2025',
      desc: 'Taught financial literacy and business fundamentals to 30+ students via 3-month workshops. Grew engagement and impressions over 500% through outreach and social media campaigns.',
    },
  ]

  return (
    <>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* ─── NAVBAR ─── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="nav-logo">
            HU<span className="dot">.</span>
          </a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#leadership">Leadership</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="nav-toggle" aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <Reveal>
            <p className="hero-greeting">Portfolio · 2026</p>
            <h1 className="hero-name">
              <span className="hero-name-row shimmer-text">Hamza</span>
              <span className="hero-name-row italic">Usman</span>
            </h1>
            <div className="hero-bottom">
              <p className="hero-tagline">
                Business &amp; finance student at UT Austin —
                investment banking, venture capital, and building
                from the ground up.
              </p>
              <div className="hero-cta-group">
                <a href="#experience" className="btn-primary">Explore ↓</a>
                <a href="/Hamza_Usman_Resume.pdf" download className="btn-secondary">Download CV</a>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeWords.map((word, i) => (
            <span key={i} className="marquee-item">
              {word}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section className="section" id="about">
        <div className="container">
          <Reveal>
            <span className="section-label">About</span>
            <h2 className="section-title">Finance meets hustle.</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal delay={1}>
              <div className="about-text">
                <p>
                  I'm a student at <strong>The University of Texas at Austin</strong>,
                  pursuing a Bachelor of Business Administration in the Canfield
                  Business Honors program with a Certificate in Programming &amp;
                  Computation.
                </p>
                <div className="highlight-quote">
                  "I thrive at the intersection of finance, technology, and
                  entrepreneurship."
                </div>
                <p>
                  My experience spans tech investment banking at Concordia Capital,
                  founding an e-commerce brand, venture capital analysis, and
                  building communities from the ground up.
                </p>
                <p>
                  Outside of work, you'll find me making chai, practicing Arabic
                  calligraphy, playing chess or guitar, caring for my 8 stray cats,
                  or out on the soccer field.
                </p>
                <div className="skills-list">
                  {['Excel', 'FactSet', 'Pitchbook', 'CrunchBase', 'PowerPoint',
                    'Financial Modeling', 'Valuation', 'DCFs', 'VS Code'].map(
                      (skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      )
                    )}
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="about-stats">
                <div className="stat-card">
                  <div className="stat-number">4.00</div>
                  <div className="stat-label">GPA</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">75+</div>
                  <div className="stat-label">Companies Sourced</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">$10K+</div>
                  <div className="stat-label">Revenue</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">6</div>
                  <div className="stat-label">Languages</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── EXPERIENCE ─── */}
      <section className="section" id="experience">
        <div className="container">
          <Reveal>
            <span className="section-label">Work</span>
            <h2 className="section-title">Experience</h2>
          </Reveal>
          <div className="exp-list">
            {experiences.map((exp, i) => (
              <Reveal key={exp.title} delay={Math.min(i + 1, 5)}>
                <div className="exp-card">
                  <div className="exp-top-row">
                    <div className="exp-title-group">
                      <span className="exp-icon">{exp.icon}</span>
                      <span className="exp-title">{exp.title}</span>
                    </div>
                    <span className="exp-date">{exp.date}</span>
                  </div>
                  <div className="exp-org">{exp.org}</div>
                  <div className="exp-desc">{exp.desc}</div>
                  <div className="exp-tech">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── LEADERSHIP ─── */}
      <section className="section" id="leadership">
        <div className="container">
          <Reveal>
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Activities &amp; Organizations</h2>
          </Reveal>
          <div className="resume-content" style={{ gridTemplateColumns: '1fr' }}>
            <div className="resume-column">
              <div className="timeline">
                {leadership.map((item, i) => (
                  <Reveal key={item.org} delay={Math.min(i + 1, 5)}>
                    <div className="timeline-item">
                      <div className="timeline-date">{item.date}</div>
                      <div className="timeline-title">{item.role}</div>
                      <div className="timeline-org">{item.org}</div>
                      <div className="timeline-desc">{item.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── RESUME ─── */}
      <section className="section" id="resume">
        <div className="container">
          <Reveal>
            <span className="section-label">CV</span>
            <h2 className="section-title">Education &amp; Skills</h2>
          </Reveal>
          <div className="resume-content">
            <Reveal delay={1}>
              <div className="resume-column">
                <h3>Education</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-date">2025 — 2029</div>
                    <div className="timeline-title">B.B.A., Canfield Business Honors</div>
                    <div className="timeline-org">The University of Texas at Austin</div>
                    <div className="timeline-desc">
                      Certificate: Programming &amp; Computation · GPA: 4.00/4.00
                      · University Honors
                    </div>
                  </div>
                </div>
                <h3 style={{ marginTop: '28px' }}>Honors</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-date">Spring 2026</div>
                    <div className="timeline-title">Texas Stock Pitch Competition (PLOW)</div>
                    <div className="timeline-desc">Qualified</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-date">Spring 2025</div>
                    <div className="timeline-title">UGA Stock Pitch Competition (FISV)</div>
                    <div className="timeline-desc">Qualified</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-date">2022 — 2025</div>
                    <div className="timeline-title">DECA ICDC Qualifier &amp; State Finalist</div>
                    <div className="timeline-desc">Financial Operations Research</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="resume-column">
                <h3>Skills</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <div className="skill-item-title">Technical</div>
                    <div className="skill-item-list">
                      Excel, FactSet, Pitchbook, CrunchBase, PowerPoint, VS Code, Cursor
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-item-title">Finance</div>
                    <div className="skill-item-list">
                      Financial Modeling, Valuation, DCFs, 3-Statement Models, M&amp;A
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-item-title">Languages</div>
                    <div className="skill-item-list">
                      Urdu (Native), Hindi &amp; Punjabi (Advanced), Hindko, Arabic, Spanish
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-item-title">Interests</div>
                    <div className="skill-item-list">
                      Chai Making, Arabic Calligraphy, Thrifting, Chess, Guitar, Soccer, Boxing, Vlogging
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <a href="/Hamza_Usman_Resume.pdf" download className="btn-primary">
                    Download Full Resume ↓
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── CONTACT ─── */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal>
            <div className="contact-content">
              <span className="section-label" style={{ justifyContent: 'center' }}>
                Contact
              </span>
              <h2 className="contact-title">
                Let's build<br />something together.
              </h2>
              <p>
                Always open to new opportunities, interesting projects,
                and connecting with driven people.
              </p>
              <a href="mailto:hamzausman@utexas.edu" className="btn-primary">
                Say Hello →
              </a>
              <div className="contact-links">
                <a href="https://linkedin.com/in/hamzausman7/" className="contact-link" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a href="tel:+13463754079" className="contact-link">Call ↗</a>
                <a href="mailto:hamzausman@utexas.edu" className="contact-link">Email ↗</a>
                <a href="/Hamza_Usman_Resume.pdf" download className="contact-link">Resume ↓</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>Hamza Usman · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  )
}

export default App
