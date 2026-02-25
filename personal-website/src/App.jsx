import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const experiences = [
    {
      icon: '🏦',
      title: 'Tech Investment Banking Intern',
      org: 'Concordia Capital · Remote',
      desc: 'Supporting buyside tech M&A deal execution through financial modeling, industry research, and sourcing. Evaluated 75+ companies across Video Game Marketing and B2B Enterprise AI, presenting acquisition targets.',
      tech: ['Financial Modeling', 'M&A', 'Industry Research', 'Deal Execution'],
      featured: true,
    },
    {
      icon: '🛍️',
      title: 'Founder',
      org: 'Organic Roots · Houston, TX',
      desc: 'Launched a Shopify store for handmade traditional Pakistani clothing, building site architecture and payment integration. Generated $10K+ in revenue via targeted Facebook/Instagram campaigns.',
      tech: ['Shopify', 'E-Commerce', 'Digital Marketing', 'Entrepreneurship'],
    },
    {
      icon: '📚',
      title: 'Private Tutor',
      org: 'AP SAT Tutorial · Spring, TX',
      desc: 'Tutored 15+ students in SAT/ACT, Calculus, Physics, and Algebra, contributing to an average score increase of 15%. Led 7 students to score top 5% nationally and gain ~$400K in scholarships.',
      tech: ['Teaching', 'Curriculum Design', 'SAT/ACT', 'STEM'],
    },
    {
      icon: '🎮',
      title: 'Android Game Developer',
      org: 'Impossiball & King of the Hill · Spring, TX',
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
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="nav-logo">
            hamza<span className="dot">.</span>
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

      {/* Hero */}
      <section className="hero section" id="hero">
        <div className="container">
          <div className="hero-content animate-in">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name shimmer-text">Hamza Usman.</h1>
            <p className="hero-tagline">
              Business &amp; finance student at UT Austin with a passion for
              investment banking, venture capital, and building things from the
              ground up.
            </p>
            <div className="hero-cta-group">
              <a href="#experience" className="btn-primary">
                View Experience ↓
              </a>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
        <div className="hero-decoration" />
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <span className="section-label animate-in">About Me</span>
          <h2 className="section-title animate-in">
            Finance meets hustle.
          </h2>
          <div className="about-grid">
            <div className="about-text animate-in animate-delay-1">
              <p>
                I'm a student at <strong>The University of Texas at Austin</strong>,
                pursuing a Bachelor of Business Administration in the Canfield
                Business Honors program with a Certificate in Programming &amp;
                Computation. I hold a 4.00/4.00 GPA and University Honors.
              </p>
              <p>
                My experience spans tech investment banking at Concordia Capital,
                founding an e-commerce brand, venture capital analysis, and
                building communities from the ground up. I thrive at the
                intersection of finance, technology, and entrepreneurship.
              </p>
              <p>
                Outside of work, you'll find me making chai, practicing Arabic
                calligraphy, playing chess or guitar, caring for my 8 stray cats,
                or out on the soccer field.
              </p>
              <div className="skills-list">
                {['Excel', 'FactSet', 'Pitchbook', 'CrunchBase', 'PowerPoint',
                  'VS Code', 'Financial Modeling', 'Valuation', 'DCFs'].map(
                    (skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    )
                  )}
              </div>
            </div>
            <div className="about-stats animate-in animate-delay-2">
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
                <div className="stat-label">Revenue Generated</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">6</div>
                <div className="stat-label">Languages Spoken</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section" id="experience">
        <div className="container">
          <span className="section-label animate-in">Work</span>
          <h2 className="section-title animate-in">Experience</h2>
          <div className="projects-grid">
            {experiences.map((exp, i) => (
              <div
                key={exp.title}
                className={`project-card animate-in animate-delay-${i % 4 + 1} ${exp.featured ? 'featured' : ''
                  }`}
              >
                {exp.featured && (
                  <div className="project-preview">{exp.icon}</div>
                )}
                <div>
                  <div className="project-header">
                    {!exp.featured && (
                      <div className="project-icon">{exp.icon}</div>
                    )}
                  </div>
                  <h3 className="project-title">{exp.title}</h3>
                  <p className="timeline-org" style={{ marginBottom: '12px' }}>{exp.org}</p>
                  <p className="project-desc">{exp.desc}</p>
                  <div className="project-tech">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section" id="leadership">
        <div className="container">
          <span className="section-label animate-in">Leadership</span>
          <h2 className="section-title animate-in">Activities &amp; Organizations</h2>
          <div className="resume-content" style={{ gridTemplateColumns: '1fr' }}>
            <div className="resume-column animate-in animate-delay-1">
              <div className="timeline">
                {leadership.map((item) => (
                  <div key={item.org} className="timeline-item">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-title">{item.role}</div>
                    <div className="timeline-org">{item.org}</div>
                    <div className="timeline-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume / CV */}
      <section className="section" id="resume">
        <div className="container">
          <span className="section-label animate-in">Curriculum Vitae</span>
          <h2 className="section-title animate-in">Education &amp; Skills</h2>
          <div className="resume-content">
            <div className="resume-column animate-in animate-delay-1">
              <h3>Education</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">2025 — 2029</div>
                  <div className="timeline-title">
                    B.B.A., Canfield Business Honors
                  </div>
                  <div className="timeline-org">
                    The University of Texas at Austin
                  </div>
                  <div className="timeline-desc">
                    Certificate: Programming &amp; Computation · GPA: 4.00/4.00
                    · University Honors (Fall 2025 — Spring 2026)
                  </div>
                </div>
              </div>

              <h3 style={{ marginTop: '36px' }}>Honors</h3>
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
                  <div className="timeline-date">Spring 2022 — Spring 2025</div>
                  <div className="timeline-title">DECA ICDC Qualifier &amp; State Finalist</div>
                  <div className="timeline-desc">Financial Operations Research</div>
                </div>
              </div>
            </div>
            <div className="resume-column animate-in animate-delay-2">
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
                    Urdu (Native), Hindi &amp; Punjabi (Advanced), Hindko, Arabic, Spanish (Conversational)
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-item-title">Interests</div>
                  <div className="skill-item-list">
                    Chai Making, Arabic Calligraphy, Thrifting, Chess, Guitar, Soccer, Boxing, Running, Vlogging
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-content animate-in">
            <span className="section-label" style={{ justifyContent: 'center' }}>
              Contact
            </span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Let's Connect
            </h2>
            <p>
              I'm always open to discussing new opportunities, interesting
              projects, or just connecting with fellow driven people.
            </p>
            <a href="mailto:hamzausman@utexas.edu" className="btn-primary">
              Say Hello →
            </a>
            <div className="contact-links">
              <a href="https://linkedin.com/in/hamzausman7/" className="contact-link" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href="tel:+13463754079" className="contact-link">Call ↗</a>
              <a href="mailto:hamzausman@utexas.edu" className="contact-link">Email ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            Designed & built by Hamza Usman · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
