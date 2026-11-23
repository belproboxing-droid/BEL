import { useEffect, useRef, useState } from 'react'
import bagImgSrc from '../assets/images/bag-red-transparent.webp'
import belLogo from '../assets/images/bel-logo.webp'
import chennaiLogo from '../assets/images/ChennaiCaptains.PNG'
import kovaiLogo from '../assets/images/KovaiKings.PNG'
import salemLogo from '../assets/images/SalemSoilders.PNG'
import maduraiLogo from '../assets/images/MaduraiMavericks.PNG'
import kumariLogo from '../assets/images/KumariKnights.PNG'
import trichyLogo from '../assets/images/TrichyTitans.PNG'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'

const franchises = [
  {
    name: 'CHENNAI',
    sub: 'CAPTAINS',
    logo: chennaiLogo,
    region: 'Metro Capital',
  },
  {
    name: 'KOVAI',
    sub: 'KINGS',
    logo: kovaiLogo,
    region: 'Kongu Belt',
  },
  {
    name: 'SALEM',
    sub: 'SOLDIERS',
    logo: salemLogo,
    region: 'Steel City',
  },
  {
    name: 'MADURAI',
    sub: 'MAVERICKS',
    logo: maduraiLogo,
    region: 'Temple City',
  },
  {
    name: 'KUMARI',
    sub: 'KNIGHTS',
    logo: kumariLogo,
    region: 'Cape Fortress',
  },
  {
    name: 'TRICHY',
    sub: 'TITANS',
    logo: trichyLogo,
    region: 'Rock City',
  },
]

export default function Teams() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Marquee auto-flow: shifts team spotlight continuously at an energetic, brisk pace
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % franchises.length)
    }, 1600)
    return () => clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return
    const cv = canvas
    const ctx = context

    let reduce = false
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      // ignore
    }

    /* ---- Asset geometry ---- */
    const W = 720
    const TOPEXT = 60
    const HT = 1924
    const AX = 360
    const PIV = 165
    const JUNC = 415
    const BOT = 1801

    /* ---- Chain rig ---- */
    const N = 8
    const arc = [165, 215, 265, 315, 365, 415, 1108, 1801]
    const iw = [0, 2.5, 2.5, 2.5, 2.5, 0.2, 1 / 30, 0.2]
    const cons = [
      [0, 1, 50],
      [1, 2, 50],
      [2, 3, 50],
      [3, 4, 50],
      [4, 5, 50],
      [5, 6, 693],
      [6, 7, 693],
      [5, 7, 1386],
    ]

    const x = new Float64Array(N)
    const y = new Float64Array(N)
    const qx = new Float64Array(N)
    const qy = new Float64Array(N)

    const DT = 1 / 240
    const ITER = 22
    const G = 4800
    const TAU = 9
    const DROP0 = BOT + 80
    const T_FALL = 1.0

    let simT = 0
    let landed = reduce
    let lastKick = 0
    let pinY = reduce ? 0 : -DROP0
    let autoDir = 1
    let triggered = false
    let running = true
    let animId = 0

    function pinYAt(t: number) {
      if (t < T_FALL) {
        const u = 1 - t / T_FALL
        return -DROP0 * u * u * u
      }
      const tt = t - T_FALL
      const dur = 0.16
      if (tt < dur) {
        const v = tt / dur
        return -5 * 4 * v * (1 - v)
      }
      return 0
    }

    function resetSimulation() {
      simT = 0
      lastKick = 0
      landed = reduce
      pinY = reduce ? 0 : -DROP0
      for (let i = 0; i < N; i++) {
        x[i] = qx[i] = 0
        y[i] = qy[i] = pinY + arc[i]
      }
    }

    function kick(dir: number, w: number) {
      for (let i = 5; i < N; i++) {
        qx[i] -= dir * w * (arc[i] - PIV) * DT
      }
      lastKick = simT
    }

    function step() {
      if (!triggered && !reduce) return

      const damp = Math.exp(-DT / TAU)
      for (let i = 1; i < N; i++) {
        const vx = (x[i] - qx[i]) * damp
        const vy = (y[i] - qy[i]) * damp
        qx[i] = x[i]
        qy[i] = y[i]
        x[i] += vx
        y[i] += vy + G * DT * DT
      }

      pinY = pinYAt(simT)

      for (let k = 0; k < ITER; k++) {
        x[0] = 0
        y[0] = pinY + PIV
        for (let i = 0; i < cons.length; i++) {
          const a = cons[i][0]
          const b = cons[i][1]
          const r = cons[i][2]
          const dx = x[b] - x[a]
          const dy = y[b] - y[a]
          const d = Math.sqrt(dx * dx + dy * dy) || 1e-6
          const f = (d - r) / d
          const ws = iw[a] + iw[b]
          if (!ws) continue
          x[a] += (dx * f * iw[a]) / ws
          y[a] += (dy * f * iw[a]) / ws
          x[b] -= (dx * f * iw[b]) / ws
          y[b] -= (dy * f * iw[b]) / ws
        }
      }

      x[0] = qx[0] = 0
      y[0] = qy[0] = pinY + PIV
      simT += DT

      if (!landed && simT >= T_FALL) {
        landed = true
        kick(1, 0.48)
      } else if (landed && !reduce) {
        // Continuous natural pendulum motion so the heavy bag is in constant living movement
        const swayT = simT - T_FALL
        const ambientForce = Math.sin(swayT * 1.62) * 0.12 + Math.cos(swayT * 0.81) * 0.05
        qx[7] -= ambientForce * DT * 12
        qx[6] -= ambientForce * DT * 8

        // Alternating gentle kicks every 4.0s keep the swing dynamic
        if (simT - lastKick > 4.0) {
          autoDir = -autoDir
          kick(autoDir, 0.32)
          lastKick = simT
        }
      }
    }

    /* ---- Sizing & Scale ---- */
    let CW = 0
    let CH = 0
    let S = 1
    let dpr = 1
    let bagCenterX = 0

    function resize() {
      const isMobile = window.innerWidth < 1024
      dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1)
      CW = Math.max(1, cv.clientWidth)
      CH = Math.max(1, cv.clientHeight)
      cv.width = Math.round(CW * dpr)
      cv.height = Math.round(CH * dpr)

      if (CW >= 1024) {
        bagCenterX = CW * 0.44
        S = Math.min((0.92 * CH) / BOT, CW / 1750)
      } else {
        bagCenterX = CW * 0.5
        S = Math.min((0.85 * CH) / BOT, CW / 1300)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    /* ---- Image loading ---- */
    const img = new Image()
    let ready = false
    img.onload = () => {
      ready = true
    }
    img.src = bagImgSrc

    /* ---- Render loop ---- */
    function render() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, CW, CH)

      if (!ready || (!triggered && !reduce)) return

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.save()
      ctx.translate(bagCenterX, 0)
      ctx.scale(S, S)

      // Pinned top: ceiling mount and swivel
      ctx.drawImage(
        img,
        0,
        0,
        W,
        TOPEXT + PIV + 1,
        -AX,
        pinY - TOPEXT,
        W,
        TOPEXT + PIV + 1
      )

      const thB = Math.atan2(x[7] - x[5], y[7] - y[5])
      const ca = [PIV]
      const ct = [0]
      for (let k = 0; k < 5; k++) {
        ca.push(PIV + 50 * (k + 0.5))
        ct.push(Math.atan2(x[k + 1] - x[k], y[k + 1] - y[k]))
      }
      ca.push(JUNC)
      ct.push(thB)

      let wx = 0
      let wy = pinY + PIV
      let seg = 0
      const h = 3

      // Sliced flexible chain links from real photo
      for (let a = PIV; a < JUNC; a += h) {
        const am = a + h / 2
        while (seg < ca.length - 2 && am > ca[seg + 1]) seg++
        const f = (am - ca[seg]) / (ca[seg + 1] - ca[seg])
        const th = ct[seg] + (ct[seg + 1] - ct[seg]) * f
        ctx.save()
        ctx.translate(wx, wy)
        ctx.rotate(-th)
        ctx.drawImage(img, 0, a + TOPEXT, W, h + 1, -AX, 0, W, h + 1)
        ctx.restore()
        wx += h * Math.sin(th)
        wy += h * Math.cos(th)
      }

      // Rigid heavy leather bag from real photo
      const by = JUNC + TOPEXT
      ctx.save()
      ctx.translate(wx, wy)
      ctx.rotate(-thB)
      ctx.drawImage(img, 0, by, W, HT - by, -AX, 0, W, HT - by)
      ctx.restore()
      ctx.restore()
    }

    /* ---- Loop with IntersectionObserver pause ---- */
    resetSimulation()
    let last = 0
    let acc = 0
    let isIntersecting = true

    function frame(ts: number) {
      if (!running) return
      const dt = Math.min(0.05, (ts - last) / 1000 || 0.016)
      last = ts
      if (ready && isIntersecting) {
        acc += dt
        while (acc >= DT) {
          step()
          acc -= DT
        }
        render()
      }
      animId = requestAnimationFrame(frame)
    }
    animId = requestAnimationFrame(frame)

    /* ---- ScrollTrigger: Synchronized Bag Drop & Content Reveal ---- */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting
          if (entry.isIntersecting && !triggered) {
            triggered = true
            setIsRevealed(true)
            resetSimulation()
          }
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(section)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      observer.disconnect()
      ro.disconnect()
    }
  }, [])

  // Calculate left, center, right franchise indices
  const N = franchises.length
  const leftIdx = (activeIdx - 1 + N) % N
  const centerIdx = activeIdx
  const rightIdx = (activeIdx + 1) % N

  const nextTeam = () => setActiveIdx((prev) => (prev + 1) % N)
  const prevTeam = () => setActiveIdx((prev) => (prev - 1 + N) % N)

  return (
    <ScrollTypeSection
      id="teams"
      sectionRef={sectionRef}
      className="panel relative w-full overflow-hidden bg-[#E5E2DC] text-[#0B0B0A] py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-16 min-h-screen flex flex-col justify-between"
      style={{ '--bg': '#E5E2DC' } as React.CSSProperties}
    >
      {/* Grey-Mix-White Radial Tone */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 90% at 50% 10%, #F2EFEA 0%, #E6E3DC 55%, #DDD9D1 100%)
          `,
        }}
      />

      {/* Heavy Bag Canvas - Middle Layer */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.16)] pointer-events-none"
          aria-label="A leather punch bag hanging on chains, swinging with realistic physics"
        />
      </div>

      {/* Unified Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex flex-col justify-between flex-1 pointer-events-none">
        {/* UPPER PART: Headline (Left) & 3-Team Marquee Carousel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Headline */}
          <div
            className={`lg:col-span-5 pointer-events-auto transition-all duration-700 ease-out ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-0'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={belLogo}
                alt="BEL"
                className="w-4 h-4 object-contain filter drop-shadow-[0_1px_4px_rgba(140,107,55,0.4)]"
              />
              <ScrollTypeText
                as="span"
                className="font-heading text-xs font-semibold tracking-[0.3em] text-[#8C6B37] uppercase"
                start={0.04}
                end={0.22}
              >
                TEAMS
              </ScrollTypeText>
              <span className="h-[1px] w-8 bg-[#8C6B37]" />
            </div>

            <h2 className="mt-2.5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] leading-[0.88] tracking-[0.01em] uppercase">
              <ScrollTypeText
                as="span"
                className="block text-[#0B0B0A] drop-shadow-sm"
                start={0.14}
                end={0.46}
              >
                DIFFERENT CORNERS.
              </ScrollTypeText>
              <ScrollTypeText
                as="span"
                className="block text-[#C5A15A] drop-shadow-sm"
                start={0.36}
                end={0.64}
              >
                ONE FAMILY.
              </ScrollTypeText>
            </h2>

            <ScrollTypeText
              as="p"
              className="mt-3 font-body text-xs sm:text-sm text-[#403B34] leading-relaxed max-w-md font-medium"
              start={0.48}
              end={0.88}
            >
              Six city franchises representing the spirit, grit, and pugilistic legacy of Tamil Nadu. One champion crown for Season 1.
            </ScrollTypeText>

            <ScrollTypeText
              as="div"
              className="mt-4 flex items-center gap-4 text-[10px] sm:text-[11px] font-heading tracking-[0.2em] text-[#8C6B37] uppercase"
              start={0.70}
              end={0.96}
            >
              EXCLUSIVE CITY RIGHTS • 6 TAMIL NADU CITIES
            </ScrollTypeText>
          </div>

          {/* Right Column: 3 Teams in a Line (Left, Center Forward, Right) with Marquee Flow */}
          <div
            className="lg:col-span-7 pointer-events-auto flex flex-col items-center justify-center pt-2 sm:pt-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Stage: 3 Teams in Line (Left, Center Forward, Right) */}
            <div className="relative flex items-center justify-center gap-2.5 sm:gap-4 md:gap-6 w-full max-w-[620px] py-4">
              {/* 1. LEFT TEAM CARD */}
              <button
                onClick={prevTeam}
                className="group relative flex flex-col items-center justify-center p-3 sm:p-4 bg-[#0B0B0A]/95 text-[#F2E9D7] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-lg w-[125px] sm:w-[155px] h-[120px] sm:h-[135px] scale-[0.88] opacity-65 hover:opacity-90 cursor-pointer rounded-sm shrink-0"
                title={`Previous: ${franchises[leftIdx].name}`}
              >
                <div className="relative mb-1.5 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14">
                  <img
                    src={franchises[leftIdx].logo}
                    alt={franchises[leftIdx].name}
                    className="h-full w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center leading-tight">
                  <span className="block font-heading text-[9px] tracking-wider text-[#A7A095] uppercase">
                    {franchises[leftIdx].name}
                  </span>
                  <span className="block font-display text-xs sm:text-sm text-[#F2E9D7] uppercase tracking-wide">
                    {franchises[leftIdx].sub}
                  </span>
                </div>
              </button>

              {/* 2. CENTER TEAM CARD (FORWARD & ELEVATED!) */}
              <div className="group relative flex flex-col items-center justify-center p-4 sm:p-5 bg-[#0B0B0A] text-[#F2E9D7] border-2 border-[#C5A15A] shadow-[0_12px_36px_rgba(197,161,90,0.35)] w-[155px] sm:w-[185px] h-[145px] sm:h-[160px] scale-[1.08] sm:scale-110 -translate-y-2.5 z-20 transition-all duration-500 rounded-sm shrink-0 ring-1 ring-[#C5A15A]/40">
                {/* Active Spotlight Tag */}
                <span className="absolute -top-2.5 bg-[#C5A15A] text-[#0B0B0A] font-heading text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 shadow">
                  IN THE RING
                </span>

                <div className="relative mb-2 flex items-center justify-center h-16 w-16 sm:h-18 sm:w-18">
                  <img
                    src={franchises[centerIdx].logo}
                    alt={franchises[centerIdx].name}
                    className="h-full w-full object-contain filter drop-shadow-[0_4px_16px_rgba(197,161,90,0.4)] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="text-center leading-tight">
                  <span className="block font-heading text-[10px] sm:text-[11px] tracking-[0.2em] text-[#C5A15A] font-semibold uppercase">
                    {franchises[centerIdx].name}
                  </span>
                  <span className="block font-display text-lg sm:text-xl text-[#F2E9D7] uppercase tracking-wide mt-0.5 group-hover:text-[#C5A15A] transition-colors">
                    {franchises[centerIdx].sub}
                  </span>
                </div>
              </div>

              {/* 3. RIGHT TEAM CARD */}
              <button
                onClick={nextTeam}
                className="group relative flex flex-col items-center justify-center p-3 sm:p-4 bg-[#0B0B0A]/95 text-[#F2E9D7] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-lg w-[125px] sm:w-[155px] h-[120px] sm:h-[135px] scale-[0.88] opacity-65 hover:opacity-90 cursor-pointer rounded-sm shrink-0"
                title={`Next: ${franchises[rightIdx].name}`}
              >
                <div className="relative mb-1.5 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14">
                  <img
                    src={franchises[rightIdx].logo}
                    alt={franchises[rightIdx].name}
                    className="h-full w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center leading-tight">
                  <span className="block font-heading text-[9px] tracking-wider text-[#A7A095] uppercase">
                    {franchises[rightIdx].name}
                  </span>
                  <span className="block font-display text-xs sm:text-sm text-[#F2E9D7] uppercase tracking-wide">
                    {franchises[rightIdx].sub}
                  </span>
                </div>
              </button>
            </div>

            {/* Navigation Dots & Controls */}
            <div className="mt-1 flex items-center gap-3">
              <button
                onClick={prevTeam}
                className="p-1 text-[#8C6B37] hover:text-[#0B0B0A] transition-colors text-xs font-bold"
                aria-label="Previous Team"
              >
                ←
              </button>

              <div className="flex items-center gap-1.5">
                {franchises.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIdx
                        ? 'w-6 bg-[#C5A15A]'
                        : 'w-1.5 bg-[#8C6B37]/40 hover:bg-[#8C6B37]'
                    }`}
                    aria-label={`Go to Team ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTeam}
                className="p-1 text-[#8C6B37] hover:text-[#0B0B0A] transition-colors text-xs font-bold"
                aria-label="Next Team"
              >
                →
              </button>
            </div>

            {/* Continuous Marquee Ticker Ribbon */}
            <div className="mt-3 w-full max-w-[540px] overflow-hidden border-y border-[#8C6B37]/20 py-1.5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...franchises, ...franchises].map((item, idx) => (
                  <span
                    key={idx}
                    className="mx-4 font-heading text-[10px] tracking-[0.24em] text-[#5A544C] uppercase flex items-center gap-3"
                  >
                    <span className="text-[#8C6B37] font-semibold">{item.name}</span>
                    <span>{item.sub}</span>
                    <span className="text-[#C5A15A]/60">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LOWER PART: 4 Franchise Ownership Blocks (Always Cleanly Aligned & Visible) */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#8C6B37]/25 pointer-events-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Block 1: Commercial Franchise Ownership Program */}
            <div className="group flex flex-col justify-between p-3.5 sm:p-4 bg-[#0B0B0A] text-[#F2E9D7] border border-[#191816] hover:border-[#C5A15A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#191816] text-[#C5A15A] border border-[#C5A15A]/30 shrink-0 group-hover:border-[#C5A15A] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.14em] text-[#F2E9D7] uppercase font-bold leading-tight group-hover:text-[#C5A15A] transition-colors">
                  6 CITY FRANCHISE SLOTS
                </span>
              </div>
              <p className="mt-2 font-body text-[10.5px] sm:text-[11px] text-[#A7A095] leading-relaxed">
                Direct commercial team ownership for Chennai, Kovai, Salem, Madurai, Kumari and Trichy.
              </p>
            </div>

            {/* Block 2: Exclusive City Rights */}
            <div className="group flex flex-col justify-between p-3.5 sm:p-4 bg-[#0B0B0A] text-[#F2E9D7] border border-[#191816] hover:border-[#C5A15A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#191816] text-[#C5A15A] border border-[#C5A15A]/30 shrink-0 group-hover:border-[#C5A15A] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.14em] text-[#F2E9D7] uppercase font-bold leading-tight group-hover:text-[#C5A15A] transition-colors">
                  EXCLUSIVE TERRITORY &amp; MERCH
                </span>
              </div>
              <p className="mt-2 font-body text-[10.5px] sm:text-[11px] text-[#A7A095] leading-relaxed">
                Full regional market protection, team merchandise rights and localized sponsor monetization.
              </p>
            </div>

            {/* Block 3: Media Broadcast Coverage */}
            <div className="group flex flex-col justify-between p-3.5 sm:p-4 bg-[#0B0B0A] text-[#F2E9D7] border border-[#191816] hover:border-[#C5A15A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#191816] text-[#C5A15A] border border-[#C5A15A]/30 shrink-0 group-hover:border-[#C5A15A] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                </div>
                <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.14em] text-[#F2E9D7] uppercase font-bold leading-tight group-hover:text-[#C5A15A] transition-colors">
                  DIGITAL &amp; MEDIA REACH
                </span>
              </div>
              <p className="mt-2 font-body text-[10.5px] sm:text-[11px] text-[#A7A095] leading-relaxed">
                Massive media broadcast across 50+ partners, athlete features, and 10M+ digital viewership.
              </p>
            </div>

            {/* Block 4: Season 2 Renewal Rights */}
            <div className="group flex flex-col justify-between p-3.5 sm:p-4 bg-[#0B0B0A] text-[#F2E9D7] border border-[#191816] hover:border-[#C5A15A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#191816] text-[#C5A15A] border border-[#C5A15A]/30 shrink-0 group-hover:border-[#C5A15A] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.14em] text-[#F2E9D7] uppercase font-bold leading-tight group-hover:text-[#C5A15A] transition-colors">
                  SEASON 2 CITY EXPANSION
                </span>
              </div>
              <p className="mt-2 font-body text-[10.5px] sm:text-[11px] text-[#A7A095] leading-relaxed">
                First right of renewal and priority participation as BEL expands to major South India cities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
