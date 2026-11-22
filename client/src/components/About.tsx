import { useEffect, useRef } from 'react'
import aboutCornerRing from '../assets/images/about-corner-ring.jpg'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'
import './About.css'

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Spotlight Dust — seeded flow-field particles that ignite inside the rig-light cones
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const seed = 1987
    let w = 0
    let h = 0
    let ps: Array<{ x: number; y: number; r: number; ph: number; sp: number }> = []
    let animId = 0

    const mul = (a: number) => {
      return () => {
        a = (a | 0) + 0x6d2b79f5 | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }
    }
    const rand = mul(seed)

    const lat = (x: number, y: number) => {
      let hv =
        Math.imul(x, 374761393) +
        Math.imul(y, 668265263) +
        Math.imul(seed, 1442695041)
      hv = Math.imul(hv ^ (hv >>> 13), 1274126177)
      return ((hv ^ (hv >>> 16)) >>> 0) / 4294967296
    }

    const noise = (x: number, y: number) => {
      const ix = Math.floor(x)
      const iy = Math.floor(y)
      const fx = x - ix
      const fy = y - iy
      const u = fx * fx * (3 - 2 * fx)
      const v = fy * fy * (3 - 2 * fx)
      const a = lat(ix, iy)
      const b = lat(ix + 1, iy)
      const c = lat(ix, iy + 1)
      const d = lat(ix + 1, iy + 1)
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
    }

    const L: [number, number][] = [
      [0.4, 0],
      [0.34, 0.1],
      [0.47, 0.1],
      [0.53, 0.07],
      [0.56, 0.04],
    ]

    const light = (x: number, y: number) => {
      let s = 0
      for (const [lx, ly] of L) {
        const dy = y - ly
        if (dy <= 0) continue
        const dx = (x - lx) / (dy * 0.32 + 0.012)
        s += Math.exp(-dx * dx) * Math.exp(-dy * 1.7)
      }
      return Math.min(s, 1)
    }

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.max(50, Math.min(150, ((w * h) / 9000) | 0))
      ps = Array.from({ length: n }, () => ({
        x: rand(),
        y: rand(),
        r: 0.5 + rand() * 1.5,
        ph: rand() * 6.28,
        sp: 0.4 + rand() * 0.6,
      }))
    }

    let isVisible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    else io.observe(cv)

    const frame = (t: number) => {
      animId = requestAnimationFrame(frame)
      if (!isVisible) return
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        const a = noise(p.x * 3.2, p.y * 3.2 + t * 6e-5) * 12.566
        p.x = (p.x + Math.cos(a) * 2.2e-4 * p.sp + 1) % 1
        p.y = (p.y + Math.sin(a) * 2.2e-4 * p.sp + 5e-5 * p.sp + 1) % 1
        const al =
          (0.03 + 0.8 * light(p.x, p.y)) *
          (0.65 + 0.35 * Math.sin(t * 0.0011 * p.sp + p.ph))
        if (al < 0.02) continue
        ctx.fillStyle = `rgba(231,196,124,${al.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, 6.283)
        ctx.fill()
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <ScrollTypeSection
      id="about"
      className="panel about-frame"
      style={{ '--bg': '#0B0B0A' } as React.CSSProperties}
      sectionRef={sectionRef}
    >
      <img
        className="about-bg"
        alt="Empty boxing ring corner under spotlights, with a towel, water bottle and hand wraps on the stool"
        src={aboutCornerRing}
      />
      <div className="about-scrim" />
      <canvas
        ref={canvasRef}
        className="about-dust"
        aria-hidden="true"
      />

      {/* Main Content: BEL Info on Left, Founder on Right in Laptop & Desktop */}
      <div className="about-main">
        {/* Left block */}
        <div className="about-left">
          <div className="about-eyebrow">
            <ScrollTypeText as="span" start={0.02} end={0.16}>
              About BEL
            </ScrollTypeText>
            <i />
          </div>

          <h2
            className="about-disp about-f about-g"
            style={
              {
                '--m': 'clamp(2.4rem, 11vw, 3.8rem)',
                '--d': 'clamp(2.5rem, 4.2vw, 4.5rem)',
                '--gm': '0.75rem',
                '--gd': '.6vw',
              } as React.CSSProperties
            }
          >
          <ScrollTypeText
            as="span"
            className="about-w block"
            start={0.08}
            end={0.30}
          >
            The Art
          </ScrollTypeText>
          <ScrollTypeText
            as="span"
            className="about-goldtxt block"
            start={0.22}
            end={0.46}
          >
            of the Fight
          </ScrollTypeText>
        </h2>

        <div
          className="about-g"
          style={
            {
              '--gm': '1.1rem',
              '--gd': '1.5vw',
            } as React.CSSProperties
          }
        >
          <ScrollTypeText
            as="p"
            className="about-lead about-f"
            style={{ '--m': '0.95rem', '--d': '1.5vw', margin: 0, lineHeight: 1.4 } as React.CSSProperties}
            start={0.34}
            end={0.68}
          >
            India’s structured city-based professional boxing league — combining Olympic-grade athletic governance, high-production entertainment, and multi-platform media reach.
          </ScrollTypeText>

          <div
            className="about-rule about-g"
            style={{ '--gm': '1rem', '--gd': '1.3vw' } as React.CSSProperties}
          />

          <ScrollTypeText
            as="p"
            className="about-tag about-f about-g"
            style={
              {
                '--m': '.82rem',
                '--d': '1.3vw',
                '--gm': '.9rem',
                '--gd': '1.3vw',
                marginBottom: 0,
              } as React.CSSProperties
            }
            start={0.52}
            end={0.82}
          >
            Season 1 · Tamil Nadu — 600+ Boxers, 6 City Teams, Olympic Training Academies &amp; Structured Athlete Placements.
          </ScrollTypeText>
        </div>
      </div>

      {/* Founder panel (right) */}
      <aside id="founder" className="about-panel">
        <div
          className="about-lab about-f"
          style={{ '--m': '.68rem', '--d': '.95vw' } as React.CSSProperties}
        >
          <ScrollTypeText as="span" start={0.12} end={0.30}>
            Founder &amp; Legal Head
          </ScrollTypeText>
          <i />
        </div>

        <ScrollTypeText
          as="h3"
          className="about-name about-f about-g"
          style={
            {
              '--m': 'clamp(1.6rem, 7vw, 2.1rem)',
              '--d': '3.1vw',
              '--gm': '.75rem',
              '--gd': '1.4vw',
            } as React.CSSProperties
          }
          start={0.22}
          end={0.50}
        >
          Dr. Balaji Srinivasan
        </ScrollTypeText>

        <ScrollTypeText
          as="p"
          className="about-quals about-f about-g"
          style={
            {
              '--m': '.75rem',
              '--d': '1.1vw',
              '--gm': '.6rem',
              '--gd': '1.1vw',
              marginBottom: 0,
            } as React.CSSProperties
          }
          start={0.38}
          end={0.64}
        >
          MA · LLB · B.Tech · BSc · PhD (H.C.)
        </ScrollTypeText>

        <div
          className="about-hr about-g"
          style={{ '--gm': '1rem', '--gd': '1.7vw' } as React.CSSProperties}
        />

        <div
          className="about-stats about-g"
          style={{ '--gm': '1rem', '--gd': '1.6vw' } as React.CSSProperties}
        >
          <div>
            <ScrollTypeText
              as="div"
              className="about-big about-f"
              style={{ '--m': '2.4rem', '--d': '5vw' } as React.CSSProperties}
              start={0.42}
              end={0.56}
            >
              10+
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-cap about-f about-g"
              style={
                {
                  '--m': '.72rem',
                  '--d': '.95vw',
                  '--gm': '.5rem',
                  '--gd': '.8vw',
                } as React.CSSProperties
              }
              start={0.48}
              end={0.72}
            >
              Years in combat sports
            </ScrollTypeText>
          </div>

          <div>
            <ScrollTypeText
              as="div"
              className="about-big about-f"
              style={{ '--m': '2.4rem', '--d': '5vw' } as React.CSSProperties}
              start={0.46}
              end={0.60}
            >
              3+
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-cap about-f about-g"
              style={
                {
                  '--m': '.72rem',
                  '--d': '.95vw',
                  '--gm': '.5rem',
                  '--gd': '.8vw',
                } as React.CSSProperties
              }
              start={0.52}
              end={0.76}
            >
              Years in active legal practice
            </ScrollTypeText>
          </div>
        </div>

        <div
          className="about-hr about-g"
          style={{ '--gm': '1rem', '--gd': '1.7vw' } as React.CSSProperties}
        />

        <div
          className="about-lab about-f about-g"
          style={
            {
              '--m': '.68rem',
              '--d': '.95vw',
              '--gm': '1rem',
              '--gd': '1.6vw',
            } as React.CSSProperties
          }
        >
          <ScrollTypeText as="span" start={0.56} end={0.68}>
            Honors
          </ScrollTypeText>
          <i />
        </div>

        <div
          className="about-hon about-g"
          style={{ '--gm': '.8rem', '--gd': '1.3vw' } as React.CSSProperties}
        >
          <div>
            <ScrollTypeText
              as="div"
              className="about-yr about-f"
              style={{ '--m': '1.25rem', '--d': '1.6vw' } as React.CSSProperties}
              start={0.60}
              end={0.72}
            >
              2005
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-hl about-f about-g"
              style={
                {
                  '--m': '.66rem',
                  '--d': '.82vw',
                  '--gm': '.4rem',
                  '--gd': '.55vw',
                } as React.CSSProperties
              }
              start={0.64}
              end={0.80}
            >
              SGFI National Bronze Medal
            </ScrollTypeText>
          </div>

          <div>
            <ScrollTypeText
              as="div"
              className="about-yr about-f"
              style={{ '--m': '1.25rem', '--d': '1.6vw' } as React.CSSProperties}
              start={0.68}
              end={0.78}
            >
              2010
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-hl about-f about-g"
              style={
                {
                  '--m': '.66rem',
                  '--d': '.82vw',
                  '--gm': '.4rem',
                  '--gd': '.55vw',
                } as React.CSSProperties
              }
              start={0.72}
              end={0.86}
            >
              University Nationals
            </ScrollTypeText>
          </div>

          <div>
            <ScrollTypeText
              as="div"
              className="about-hl about-f"
              style={
                {
                  '--m': '.68rem',
                  '--d': '.82vw',
                  color: 'var(--ivory)',
                } as React.CSSProperties
              }
              start={0.76}
              end={0.90}
            >
              Tamil Nadu State Championships
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-yr about-f about-g"
              style={
                {
                  '--m': '.8rem',
                  '--d': '1.05vw',
                  '--gm': '.35rem',
                  '--gd': '.5vw',
                } as React.CSSProperties
              }
              start={0.82}
              end={0.96}
            >
              2 Gold · 3 Silver
            </ScrollTypeText>
          </div>
        </div>
      </aside>
      </div>

      {/* Bottom pillars strip */}
      <div className="about-strip">
        <div className="about-pillar">
          <svg className="about-ic" viewBox="0 0 48 48">
            <path d="M15 8h18v10a9 9 0 0 1-18 0V8Z" />
            <path d="M15 12H8c0 6 3 9 7 9M33 12h7c0 6-3 9-7 9" />
            <path d="M24 27v8M17 40h14M19 35h10" />
          </svg>
          <div>
            <ScrollTypeText
              as="div"
              className="about-pt about-f"
              style={{ '--m': '1.35rem', '--d': '2.05vw' } as React.CSSProperties}
              start={0.62}
              end={0.76}
            >
              Sport
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-ps about-f"
              style={{ '--m': '.8rem', '--d': '1.2vw' } as React.CSSProperties}
              start={0.70}
              end={0.86}
            >
              Integrity & athlete protection
            </ScrollTypeText>
          </div>
        </div>

        <div className="about-pillar">
          <svg className="about-ic" viewBox="0 0 48 48">
            <circle cx="24" cy="15" r="5" />
            <path d="M14 36c0-6 4-10 10-10s10 4 10 10" />
            <circle cx="10" cy="20" r="3.5" />
            <circle cx="38" cy="20" r="3.5" />
            <path d="M3 34c0-4 2-7 7-7M45 34c0-4-2-7-7-7" />
          </svg>
          <div>
            <ScrollTypeText
              as="div"
              className="about-pt about-f"
              style={{ '--m': '1.35rem', '--d': '2.05vw' } as React.CSSProperties}
              start={0.65}
              end={0.79}
            >
              Entertainment
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-ps about-f"
              style={{ '--m': '.8rem', '--d': '1.2vw' } as React.CSSProperties}
              start={0.73}
              end={0.89}
            >
              Live city event production
            </ScrollTypeText>
          </div>
        </div>

        <div className="about-pillar">
          <svg className="about-ic" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="17" />
            <path d="M20 16.5v15l12-7.5-12-7.5Z" fill="currentColor" />
          </svg>
          <div>
            <ScrollTypeText
              as="div"
              className="about-pt about-f"
              style={{ '--m': '1.35rem', '--d': '2.05vw' } as React.CSSProperties}
              start={0.68}
              end={0.82}
            >
              Media
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-ps about-f"
              style={{ '--m': '.8rem', '--d': '1.2vw' } as React.CSSProperties}
              start={0.76}
              end={0.92}
            >
              Broadcast & digital reach
            </ScrollTypeText>
          </div>
        </div>

        <div className="about-pillar">
          <svg className="about-ic" viewBox="0 0 48 48">
            <path d="M24 40c-9 0-15-6-15-15M24 40c9 0 15-6 15-15" />
            <path d="M11 29c-3-2-3-6-1-9 3 1 5 4 4 8M37 29c3-2 3-6 1-9-3 1-5 4-4 8" />
            <path d="M13 18c-2-3-1-7 2-9 2 3 2 6 0 9M35 18c2-3 1-7-2-9-2 3-2 6 0 9" />
            <path d="M24 33l-4-6 4-4 4 4-4 6Z" />
          </svg>
          <div>
            <ScrollTypeText
              as="div"
              className="about-pt about-f"
              style={{ '--m': '1.35rem', '--d': '2.05vw' } as React.CSSProperties}
              start={0.71}
              end={0.85}
            >
              Legacy
            </ScrollTypeText>
            <ScrollTypeText
              as="div"
              className="about-ps about-f"
              style={{ '--m': '.8rem', '--d': '1.2vw' } as React.CSSProperties}
              start={0.79}
              end={0.95}
            >
              A next-generation Indian boxing vision
            </ScrollTypeText>
          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
