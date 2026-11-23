import { useEffect, useRef } from 'react'
import aboutCornerRing from '../assets/images/about-corner-ring.jpg'
import belLogo from '../assets/images/bel-logo.webp'
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
          <div className="about-eyebrow flex items-center gap-2">
            <img src={belLogo} alt="BEL" className="w-5 h-5 object-contain filter drop-shadow-[0_1px_4px_rgba(197,161,90,0.5)]" />
            <ScrollTypeText as="span" start={0.02} end={0.16}>
              INTRODUCTION · SEASON 1 • TAMIL NADU
            </ScrollTypeText>
            <i />
          </div>

          <h2
            className="about-disp about-f about-g"
            style={
              {
                '--m': 'clamp(2rem, 9vw, 3.2rem)',
                '--d': 'clamp(2.2rem, 3.6vw, 3.8rem)',
                '--gm': '0.75rem',
                '--gd': '.6vw',
              } as React.CSSProperties
            }
          >
          <ScrollTypeText
            as="span"
            className="about-w block"
            start={0.08}
            end={0.28}
          >
            India's Professional
          </ScrollTypeText>
          <ScrollTypeText
            as="span"
            className="about-goldtxt block"
            start={0.22}
            end={0.44}
          >
            Boxing League
          </ScrollTypeText>
        </h2>

        <div
          className="about-g"
          style={
            {
              '--gm': '1rem',
              '--gd': '1.3vw',
            } as React.CSSProperties
          }
        >
          <div className="space-y-3">
            <div>
              <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#C5A15A] uppercase block">
                WHAT IS BEL?
              </span>
              <ScrollTypeText
                as="p"
                className="about-lead about-f text-[#F2E9D7] mt-1"
                style={{ '--m': '0.92rem', '--d': '1.25vw', margin: 0, lineHeight: 1.45 } as React.CSSProperties}
                start={0.30}
                end={0.58}
              >
                A structured city-based professional boxing league combining sport, entertainment and media.
              </ScrollTypeText>
            </div>

            <ScrollTypeText
              as="p"
              className="font-body text-xs sm:text-sm text-[#A7A095] leading-relaxed"
              start={0.42}
              end={0.68}
            >
              BEL is designed to build a scalable professional boxing property from Tamil Nadu, with a clear pathway toward wider Indian expansion.
            </ScrollTypeText>

            <div className="p-3 bg-[#191816]/90 border border-[#C5A15A]/35 shadow-sm">
              <ScrollTypeText
                as="p"
                className="font-heading text-xs sm:text-[13px] font-semibold text-[#F2E9D7] tracking-wider uppercase"
                start={0.50}
                end={0.74}
              >
                Build the next generation of Indian boxing with BEL.
              </ScrollTypeText>
              <ScrollTypeText
                as="p"
                className="mt-1 font-heading text-[11px] text-[#C5A15A] tracking-widest uppercase font-bold"
                start={0.58}
                end={0.82}
              >
                If cricket has IPL, boxing deserves BEL.
              </ScrollTypeText>
            </div>
          </div>

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
                '--d': '1.15vw',
                '--gm': '.75rem',
                '--gd': '1.1vw',
                marginBottom: 0,
              } as React.CSSProperties
            }
            start={0.65}
            end={0.88}
          >
            BOXING ENTERTAINMENT LEAGUE • SEASON 1 | 01
          </ScrollTypeText>
        </div>
      </div>

      {/* Founder panel (right) */}
      <aside id="founder" className="about-panel">
        <div
          className="about-lab about-f"
          style={{ '--m': '.75rem', '--d': '1vw' } as React.CSSProperties}
        >
          <ScrollTypeText as="span" start={0.12} end={0.30}>
            FOUNDER NOTE
          </ScrollTypeText>
          <i />
        </div>

        <ScrollTypeText
          as="h3"
          className="about-name about-f about-g mt-1"
          style={
            {
              '--m': 'clamp(1.75rem, 6.5vw, 2.35rem)',
              '--d': '2.8vw',
              '--gm': '.6rem',
              '--gd': '1.1vw',
            } as React.CSSProperties
          }
          start={0.20}
          end={0.46}
        >
          DR BALAJI SRINIVASAN
        </ScrollTypeText>

        <div className="font-heading text-xs sm:text-sm text-[#C5A15A] tracking-[0.18em] uppercase font-bold mt-1">
          FOUNDER &amp; LEGAL HEAD · BEL
        </div>

        <div className="font-heading text-[11px] sm:text-xs text-[#A7A095] tracking-wider uppercase mt-0.5">
          MA, LLB, B.Tech, BSc, Ph D (H.C.)
        </div>

        <p className="mt-2 font-body text-[11px] sm:text-xs text-[#DDD9D1] leading-relaxed">
          Professional boxing athlete, sports league architect, and practicing advocate combining combat sports excellence with active legal governance to build India's premier professional boxing platform.
        </p>

        <div
          className="about-hr about-g my-2"
          style={{ '--gm': '.5rem', '--gd': '0.8vw' } as React.CSSProperties}
        />

        {/* State Championships: 2007 Gold, 2008 Gold, 3 Silvers */}
        <div>
          <span className="font-heading text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#C5A15A] uppercase block mb-2">
            STATE CHAMPIONSHIPS
          </span>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 sm:p-2.5 bg-[#191816]/95 border border-[#C5A15A]/50 flex flex-col gap-0.5 shadow-sm">
              <span className="font-display text-xl sm:text-2xl text-[#C5A15A] font-bold leading-none">2007</span>
              <span className="font-heading text-[10px] sm:text-xs text-[#F2E9D7] font-bold uppercase leading-tight">GOLD MEDAL</span>
              <span className="font-body text-[9px] sm:text-[10px] text-[#A7A095] leading-snug">RDS State Championship, Nagercoil</span>
            </div>

            <div className="p-2 sm:p-2.5 bg-[#191816]/95 border border-[#C5A15A]/50 flex flex-col gap-0.5 shadow-sm">
              <span className="font-display text-xl sm:text-2xl text-[#C5A15A] font-bold leading-none">2008</span>
              <span className="font-heading text-[10px] sm:text-xs text-[#F2E9D7] font-bold uppercase leading-tight">GOLD MEDAL</span>
              <span className="font-body text-[9px] sm:text-[10px] text-[#A7A095] leading-snug">Senior State Open, Thiruvottiyur</span>
            </div>

            <div className="p-2 sm:p-2.5 bg-[#191816]/95 border border-white/20 flex flex-col gap-0.5 shadow-sm">
              <span className="font-display text-xl sm:text-2xl text-[#F2E9D7] font-bold leading-none">3×</span>
              <span className="font-heading text-[10px] sm:text-xs text-[#F2E9D7] font-bold uppercase leading-tight">SILVER MEDALS</span>
              <span className="font-body text-[9px] sm:text-[10px] text-[#A7A095] leading-snug">State Open Championships</span>
            </div>
          </div>
        </div>

        {/* Core Tag Cloud */}
        <div className="mt-2.5 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5 font-heading text-[9px] sm:text-[9.5px] tracking-wider uppercase text-[#C5A15A]">
          <span className="px-2 py-0.5 bg-[#191816] border border-[#C5A15A]/30">MORE THAN A LEAGUE.</span>
          <span className="px-2 py-0.5 bg-[#191816] border border-[#C5A15A]/30">BIGGER STRONGER TOGETHER</span>
          <span className="px-2 py-0.5 bg-[#191816] border border-[#C5A15A]/30">TAMIL NADU: ONE RING. SIX CITIES.</span>
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
              Competitive integrity, athlete protection &amp; structured governance
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
              Live-event experience built around city identity, fighters &amp; fans
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
              Content-led visibility across broadcast, digital &amp; regional media
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
              An emerging sports property with a long-term pro boxing vision
            </ScrollTypeText>
          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
