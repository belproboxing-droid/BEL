import ticketsBg from '../assets/images/tickets-arena-bg.jpg'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'

const stats = [
  { value: '10M+', label: 'DIGITAL REACH' },
  { value: '50+', label: 'MEDIA PARTNERS' },
  { value: '10K+', label: 'LIVE AUDIENCE' },
  { value: '6', label: 'METRO HUBS' },
]

export default function Sponsorship() {
  return (
    <ScrollTypeSection
      id="sponsorship"
      className="panel relative w-full overflow-hidden bg-[#0B0B0A] text-[#F2E9D7] flex flex-col justify-center min-h-screen"
      style={{ '--bg': '#0B0B0A' } as React.CSSProperties}
    >
      {/* Cinematic Boxing Arena Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={ticketsBg}
          alt="Cinematic boxing arena"
          className="w-full h-full object-cover object-[center_42%] block opacity-35"
        />
        {/* Deep atmospheric arena vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 50% 50%, rgba(11,11,10,0.35) 0%, rgba(11,11,10,0.82) 60%, rgba(11,11,10,0.98) 100%),
              linear-gradient(180deg, rgba(11,11,10,0.92) 0%, rgba(11,11,10,0.35) 30%, rgba(11,11,10,0.55) 70%, rgba(11,11,10,0.95) 100%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 py-10 sm:py-14 lg:py-16 flex flex-col justify-between min-h-screen">
        {/* UPPER PART: SPONSORSHIP ECOSYSTEM */}
        <div className="pb-5 sm:pb-7 lg:pb-8 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Left Column: Headline & Intro */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div>
                <ScrollTypeText
                  as="span"
                  className="font-heading text-[10px] sm:text-xs font-semibold tracking-[0.28em] text-[#C5A15A] uppercase block"
                  start={0.04}
                  end={0.24}
                >
                  SPONSORSHIP
                </ScrollTypeText>

                <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.05] tracking-[0.01em] text-[#F2E9D7] uppercase">
                  <ScrollTypeText as="span" start={0.16} end={0.52}>
                    PARTNER A BIGGER TOMORROW.
                  </ScrollTypeText>
                </h2>

                <ScrollTypeText
                  as="p"
                  className="mt-3 sm:mt-4 font-body text-xs sm:text-[13px] md:text-sm text-[#A7A095] leading-relaxed max-w-md"
                  start={0.42}
                  end={0.88}
                >
                  Align with India’s premier professional boxing property. Title broadcast entitlements, ringside LED immersion across 6 cities, and a 10M–13M multi-platform digital reach.
                </ScrollTypeText>

                {/* 3-Year Roadmap & Early Sponsor Advantages from Deck */}
                <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-3 max-w-md">
                  <div>
                    <span className="font-heading text-[8px] sm:text-[9px] tracking-[0.2em] text-[#C5A15A] uppercase font-semibold block">
                      EARLY PARTNER PRIVILEGES
                    </span>
                    <ul className="mt-1 space-y-1 font-body text-[10px] sm:text-[11px] text-[#F2E9D7]/85">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#C5A15A]" />
                        <span>Multi-year rate protection lock</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#C5A15A]" />
                        <span>South India territory priority</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#C5A15A]" />
                        <span>Franchise participation rights</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="font-heading text-[8px] sm:text-[9px] tracking-[0.2em] text-[#C5A15A] uppercase font-semibold block">
                      3-YEAR LEAGUE EXPANSION
                    </span>
                    <ul className="mt-1 space-y-1 font-body text-[10px] sm:text-[11px] text-[#A7A095]">
                      <li className="flex items-center gap-1.5">
                        <span className="text-[#C5A15A] font-bold">Y1:</span>
                        <span>6 TN Cities · 600+ Boxers</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-[#C5A15A] font-bold">Y2:</span>
                        <span>Chennai, BLR, HYD, Kochi</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-[#C5A15A] font-bold">Y3:</span>
                        <span>Pan-India National &amp; OTT</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Metrics + 3 Tier Cards */}
            <div className="lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-4 lg:space-y-5">
              {/* 4 Stats Metrics Bar */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3 pb-3 sm:pb-4 border-b border-white/10 text-center">
                {stats.map((s) => (
                  <div key={s.label}>
                    <span className="font-display text-xl sm:text-2xl md:text-3xl text-[#F2E9D7] block leading-none">
                      {s.value}
                    </span>
                    <span className="mt-0.5 sm:mt-1 font-heading text-[7.5px] sm:text-[9px] tracking-[0.16em] text-[#A7A095] uppercase block">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* 3 Distinct Solid Metallic / Cream Luxury Tier Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5">
                {/* Card 1: TITLE SPONSOR */}
                <div className="p-3 sm:p-4 lg:p-4 bg-[#C5A15A] text-[#0B0B0A] shadow-[0_6px_18px_rgba(197,161,90,0.25)] flex flex-col justify-between hover:brightness-105 transition-all">
                  <div>
                    <h4 className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
                      TITLE SPONSOR
                    </h4>
                    <p className="mt-0.5 font-heading text-[8.5px] sm:text-[9px] tracking-[0.14em] uppercase opacity-90 font-semibold">
                      2 EXCLUSIVE SLOTS · NAMING RIGHTS
                    </p>
                    <ul className="mt-2.5 space-y-1 font-body text-[9.5px] sm:text-[10px] leading-tight text-[#0B0B0A]/90">
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Official League &amp; Broadcast Naming Title</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Front-of-Jersey &amp; Center Ring Canvas</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Turnbuckles &amp; 6-City LED Wall Takeover</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>VIP Hospitality Lounge &amp; Free Team Passes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2.5 pt-1.5 border-t border-[#0B0B0A]/20 flex items-center justify-between">
                    <span className="font-heading text-[8px] sm:text-[8.5px] tracking-[0.18em] uppercase font-bold">
                      EXCLUSIVE ENTITLEMENT
                    </span>
                    <span className="font-heading text-[8px] sm:text-[8.5px] tracking-wider font-bold">
                      2/2 SLOTS
                    </span>
                  </div>
                </div>

                {/* Card 2: POWERED BY */}
                <div className="p-3 sm:p-4 lg:p-4 bg-[#EAE2D2] text-[#0B0B0A] shadow-[0_6px_18px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:brightness-105 transition-all">
                  <div>
                    <h4 className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
                      POWERED BY
                    </h4>
                    <p className="mt-0.5 font-heading text-[8.5px] sm:text-[9px] tracking-[0.14em] uppercase opacity-90 font-semibold">
                      4 ASSOCIATE SLOTS · STREAM RIGHTS
                    </p>
                    <ul className="mt-2.5 space-y-1 font-body text-[9.5px] sm:text-[10px] leading-tight text-[#0B0B0A]/90">
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>TV Broadcast &amp; OTT Streaming Co-Brand</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Jersey Sleeves, Back &amp; Ring Corner Pads</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Flex Banners in 6 Major Tamil Nadu Cities</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>VIP Ringside Passes for Executive Teams</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2.5 pt-1.5 border-t border-[#0B0B0A]/20 flex items-center justify-between">
                    <span className="font-heading text-[8px] sm:text-[8.5px] tracking-[0.18em] uppercase font-bold">
                      ASSOCIATE CO-BRAND
                    </span>
                    <span className="font-heading text-[8px] sm:text-[8.5px] tracking-wider font-bold">
                      4/4 SLOTS
                    </span>
                  </div>
                </div>

                {/* Card 3: ASSOCIATE PARTNERS */}
                <div className="p-3 sm:p-4 lg:p-4 bg-[#D4B77D] text-[#0B0B0A] shadow-[0_6px_18px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:brightness-105 transition-all">
                  <div>
                    <h4 className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
                      ASSOCIATE PARTNERS
                    </h4>
                    <p className="mt-0.5 font-heading text-[8.5px] sm:text-[9px] tracking-[0.14em] uppercase opacity-90 font-semibold">
                      10 CATEGORY SLOTS · ARENA EXPOSURE
                    </p>
                    <ul className="mt-2.5 space-y-1 font-body text-[9.5px] sm:text-[10px] leading-tight text-[#0B0B0A]/90">
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Exclusive Category / Sector Partner Status</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Ring Skirting, Venue Standees &amp; LED Loop</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>Multi-Platform Campaigns (IG, WA, YT, FB, X)</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="font-bold">•</span>
                        <span>CSR Contribution &amp; Corporate Tax Relief</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2.5 pt-1.5 border-t border-[#0B0B0A]/20 flex items-center justify-between">
                    <span className="font-heading text-[8px] sm:text-[8.5px] tracking-[0.18em] uppercase font-bold">
                      CATEGORY PARTNERS
                    </span>
                    <span className="font-heading text-[8px] sm:text-[8.5px] tracking-wider font-bold">
                      10 SLOTS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER PART: TICKETS CALLOUT BAR */}
        <div className="pt-5 sm:pt-7 lg:pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 lg:gap-10">
            {/* Left: TAKE YOUR PLACE AT RINGSIDE */}
            <div className="flex flex-col max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-heading text-[10px] sm:text-xs font-semibold tracking-[0.28em] text-[#C5A15A] uppercase">
                  OFFICIAL ACCESS
                </span>
                <span className="h-[1px] w-6 sm:w-10 bg-[#C5A15A]" />
              </div>

              <h3 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-[1.05] tracking-[0.01em] text-[#F2E9D7] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                TAKE YOUR PLACE AT RINGSIDE
              </h3>

              <p className="mt-1 font-body text-xs sm:text-sm text-[#A7A095] tracking-wide font-light">
                10 exclusive categories &amp; passes. Live fight nights. Unforgettable atmosphere.
              </p>
            </div>

            {/* Right: GET TICKETS Navigation Button */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1.5 shrink-0 pt-1 sm:pt-0">
              <a
                href="#/tickets"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#C5A15A] px-5 sm:px-7 py-2.5 sm:py-3 font-heading text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#0B0B0A] uppercase shadow-[0_4px_18px_rgba(0,0,0,0.7)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(197,161,90,0.4)] active:scale-[0.98]"
              >
                <span>BOOK TICKETS</span>
                <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <p className="font-heading text-[9px] sm:text-[10px] tracking-[0.2em] text-[#A7A095] uppercase">
                5 OFFICIAL EVENT PASSES
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
