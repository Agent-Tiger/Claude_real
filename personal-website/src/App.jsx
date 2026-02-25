import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const projects = [
    {
      icon: '📈',
      title: 'Algorithmic Trading Platform',
      desc: 'A fully automated trading system with walk-forward optimization, multi-strategy portfolio management, and real-time signal generation for NYSE/NASDAQ equities.',
      tech: ['Python', 'Pandas', 'NumPy', 'APIs', 'Statistics'],
      featured: true,
    },
    {
      icon: '🧠',
      title: 'ML Sentiment Analyzer',
      desc: 'NLP-powered sentiment analysis model trained on financial news to predict market movement direction with custom feature engineering.',
      tech: ['Python', 'scikit-learn', 'NLTK', 'TensorFlow'],
    },
    {
      icon: '🌐',
      title: 'Portfolio Dashboard',
      desc: 'Real-time portfolio monitoring dashboard with interactive charts, PnL tracking, and automated performance reporting.',
      tech: ['React', 'D3.js', 'Node.js', 'WebSocket'],
    },
    {
      icon: '🎮',
      title: 'Wordle Clone',
      desc: 'A clean, modular, production-quality Wordle implementation with extensible architecture and comprehensive word validation.',
      tech: ['Python', 'OOP', 'Unit Testing'],
    },
    {
      icon: '⚡',
      title: 'Backtesting Engine',
      desc: 'High-performance backtesting framework supporting multiple strategies, position sizing, and detailed trade analytics with benchmark comparison.',
      tech: ['Python', 'Pandas', 'Matplotlib'],
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
            hamza<span className="dot">.</span>dev
          </a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
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
            <h1 className="hero-name shimmer-text">Hamza.</h1>
            <p className="hero-tagline">
              A Computer Science student passionate about building elegant
              software — from algorithmic trading systems to full-stack web apps.
            </p>
            <div className="hero-cta-group">
              <a href="#projects" className="btn-primary">
                View Projects ↓
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
            Building things that matter.
          </h2>
          <div className="about-grid">
            <div className="about-text animate-in animate-delay-1">
              <p>
                I'm a Computer Science student with a deep interest in
                quantitative finance, software engineering, and data-driven
                problem solving. I spend most of my time designing systems that
                bridge the gap between theory and real-world application.
              </p>
              <p>
                From building automated trading platforms that analyze equity
                markets to crafting clean, modular web applications, I thrive on
                turning complex problems into elegant solutions.
              </p>
              <p>
                When I'm not coding, you'll find me diving into research papers,
                exploring new frameworks, or working on personal projects that
                challenge my thinking.
              </p>
              <div className="skills-list">
                {['Python', 'JavaScript', 'React', 'Node.js', 'C++', 'SQL',
                  'Git', 'Machine Learning', 'Data Analysis', 'REST APIs'].map(
                  (skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  )
                )}
              </div>
            </div>
            <div className="about-stats animate-in animate-delay-2">
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Coding</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">∞</div>
                <div className="stat-label">Curiosity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section" id="projects">
        <div className="container">
          <span className="section-label animate-in">Portfolio</span>
          <h2 className="section-title animate-in">Selected Projects</h2>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`project-card animate-in animate-delay-${i % 4 + 1} ${
                  project.featured ? 'featured' : ''
                }`}
              >
                {project.featured && (
                  <div className="project-preview">{project.icon}</div>
                )}
                <div>
                  <div className="project-header">
                    {!project.featured && (
                      <div className="project-icon">{project.icon}</div>
                    )}
                    <div className="project-links">
                      <a href="#" title="Code">Code ↗</a>
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume / CS */}
      <section className="section" id="resume">
        <div className="container">
          <span className="section-label animate-in">Curriculum Vitae</span>
          <h2 className="section-title animate-in">Experience & Education</h2>
          <div className="resume-content">
            <div className="resume-column animate-in animate-delay-1">
              <h3>Education</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">2023 — Present</div>
                  <div className="timeline-title">B.S. Computer Science</div>
                  <div className="timeline-org">University</div>
                  <div className="timeline-desc">
                    Focused on algorithms, data structures, machine learning,
                    and software engineering. Active in programming competitions
                    and research projects.
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">2019 — 2023</div>
                  <div className="timeline-title">High School Diploma</div>
                  <div className="timeline-org">High School</div>
                  <div className="timeline-desc">
                    Graduated with honors. Developed early programming skills
                    through self-study and coursework.
                  </div>
                </div>
              </div>
            </div>
            <div className="resume-column animate-in animate-delay-2">
              <h3>Skills</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-item-title">Languages</div>
                  <div className="skill-item-list">
                    Python, JavaScript, C++, SQL, HTML/CSS
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-item-title">Frameworks</div>
                  <div className="skill-item-list">
                    React, Node.js, Express, Pandas, NumPy
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-item-title">Tools</div>
                  <div className="skill-item-list">
                    Git, Docker, VS Code, Linux, Jupyter
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-item-title">Interests</div>
                  <div className="skill-item-list">
                    Quantitative Finance, ML/AI, Systems Design
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
              projects, or just connecting with fellow developers.
            </p>
            <a href="mailto:hamza@example.com" className="btn-primary">
              Say Hello →
            </a>
            <div className="contact-links">
              <a href="#" className="contact-link">GitHub ↗</a>
              <a href="#" className="contact-link">LinkedIn ↗</a>
              <a href="#" className="contact-link">Resume ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            Designed & built by Hamza · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
