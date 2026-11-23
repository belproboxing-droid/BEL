import ringHeroDesktop from '../assets/images/hero-ring-fight.webp'
import ringHeroMobile from '../assets/images/hero-ring-fight-mobile.webp'

export default function Hero() {
  return (
    <section
      id="top"
      className="panel relative flex flex-col justify-start sm:justify-end w-full overflow-hidden bg-[#0B0B0A] [isolation:isolate] pt-16 sm:pt-24 pb-8 sm:pb-14 !min-h-0 sm:!min-h-[100dvh]"
      style={{ '--bg': '#0B0B0A' } as React.CSSProperties}
    >
      {/* 
        Hero Background Photos:
        - Mobile (< sm): Both boxers visible in the upper ring area, with text directly on top.
        - Desktop (>= sm): 2.5K wide panoramic ring asset.
      */}
      <div
        className="absolute inset-0 sm:hidden bg-[#0B0B0A] bg-no-repeat bg-cover bg-top [image-rendering:auto]"
        style={{ backgroundImage: `url(${ringHeroMobile})` }}
        role="img"
        aria-label="Overhead view of two boxers fighting in a ring"
      />

      <div
        className="absolute inset-0 hidden sm:block bg-[#0B0B0A] bg-no-repeat bg-cover bg-center [image-rendering:auto]"
        style={{ backgroundImage: `url(${ringHeroDesktop})` }}
        role="img"
        aria-label="Overhead view of two boxers fighting in a ring"
      />

      {/* Atmospheric Vignette & Scrim */}
      {/* Mobile Scrim: Soft ambient vignette so text on top of the boxers is ultra-crisp while both fighters remain clearly visible */}
      <div
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background: `
            radial-gradient(ellipse 95% 85% at 50% 35%, rgba(11,11,10,0.45) 0%, rgba(11,11,10,0.78) 70%, #0B0B0A 100%),
            linear-gradient(180deg, rgba(11,11,10,0.6) 0%, rgba(11,11,10,0.2) 25%, rgba(11,11,10,0.6) 75%, #0B0B0A 100%)
          `,
        }}
      />

      {/* Desktop Scrim */}
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{
          background: `
            radial-gradient(ellipse 85% 75% at 52% 44%, transparent 45%, rgba(11,11,10,0.55) 100%),
            linear-gradient(to top, rgba(11,11,10,0.95) 0%, rgba(11,11,10,0.5) 18%, rgba(11,11,10,0.05) 45%, transparent 100%),
            linear-gradient(to right, rgba(11,11,10,0.65) 0%, rgba(11,11,10,0.2) 28%, transparent 45%, transparent 68%, rgba(11,11,10,0.55) 100%)
          `,
        }}
      />

      {/* Hero Content Area: Layered directly along the fighters (zero dead space on phone) */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-10">
          {/* Left Column: Stacked Tag, Giant BOXING LEAGUE, Subhead, 2 CTAs */}
          <div className="max-w-2xl">
            {/* Official BEL League Tag */}
            <div className="mb-3 sm:mb-4">
              <div className="font-heading text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] text-[#A7A095] uppercase leading-tight">
                <span>BOXING</span>
                <br />
                <span>ENTERTAINMENT</span>
                <br />
                <span className="text-[#C5A15A]">LEAGUE</span>
              </div>
            </div>

            {/* Giant Display Headline: BOXING in Ivory, LEAGUE in Antique Gold */}
            <h1 className="font-display leading-[0.85] tracking-[0.01em]">
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] text-[#F2E9D7] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                BOXING
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] text-[#C5A15A] uppercase drop-shadow-[0_4px_28px_rgba(197,161,90,0.35)]">
                LEAGUE
              </span>
            </h1>

            {/* Subhead matching approved hook lines */}
            <div className="mt-3 sm:mt-4">
              <p className="font-body text-xs sm:text-sm text-[#A7A095] font-light">
                If cricket has IPL, boxing deserves BEL.
              </p>
            </div>

            {/* Two Action CTAs: Solid Gold and Bordered Dark */}
            <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#/tickets"
                className="group inline-flex items-center gap-2.5 sm:gap-3 bg-[#C5A15A] px-5 sm:px-7 py-2.5 sm:py-3 font-heading text-[11px] sm:text-xs tracking-[0.24em] font-semibold text-[#0B0B0A] uppercase transition-all duration-300 hover:brightness-110 shadow-[0_6px_20px_rgba(197,161,90,0.35)] active:scale-[0.98]"
              >
                <span>GET TICKETS</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2.5 sm:gap-3 border border-[#C5A15A]/60 bg-[#0B0B0A]/80 px-5 sm:px-7 py-2.5 sm:py-3 font-heading text-[11px] sm:text-xs tracking-[0.24em] font-semibold text-[#F2E9D7] uppercase transition-all duration-300 hover:border-[#C5A15A] hover:bg-[#C5A15A]/15 active:scale-[0.98]"
              >
                <span>LEARN MORE</span>
              </a>
            </div>
          </div>

          {/* Right Column: Top Hierarchy + Lower Accent Box matching template */}
          <div className="hidden lg:flex flex-col items-end text-right space-y-12 pb-2">
            {/* Top Vertical Hierarchy */}
            <div className="space-y-3 font-heading text-xs tracking-[0.3em] text-[#A7A095] uppercase">
              <p className="hover:text-[#F2E9D7] transition-colors">FIGHTERS</p>
              <p className="hover:text-[#F2E9D7] transition-colors">TEAMS</p>
              <p className="hover:text-[#F2E9D7] transition-colors">FANS</p>
              <p className="text-[#F2E9D7] font-semibold">A HIGHER STANDARD</p>
            </div>

            {/* Lower Right Distinct Bordered Box */}
            <div className="p-4 border border-[#C5A15A]/40 bg-[#0B0B0A]/85 backdrop-blur-sm text-right font-heading text-[11px] tracking-[0.26em] text-[#A7A095] uppercase leading-relaxed shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <p>BRAVER</p>
              <p>PEOPLE</p>
              <p className="text-[#F2E9D7]">BRIGHTER</p>
              <p className="text-[#C5A15A] font-semibold">TOMORROWS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
