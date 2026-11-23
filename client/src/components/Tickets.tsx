import ticketsBg from '../assets/images/tickets-arena-bg.jpg'
import HangingBell from './HangingBell'
import belLogo from '../assets/images/bel-logo.webp'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'

const EVENT_PILLS = [
  { id: 'launch', name: 'INAUGURATION', date: '26 DEC', venue: 'YMCA, CHENNAI', price: '₹999' },
  { id: 'new-year', name: 'NEW YEAR PARTY', date: '31 DEC', venue: 'BEACH HOUSE ECR, CHENNAI', price: '₹3,999' },
  { id: 'camp', name: 'TRAINING CAMP', date: '02–16 JAN', venue: 'BEL ACADEMY, CHENNAI', price: '₹999' },
  { id: 'selection', name: 'SELECTION TRIALS', date: '23 JAN–27 FEB', venue: '6 CITIES', price: '₹499' },
  { id: 'finale', name: 'GRAND FINALE', date: '06 MAR', venue: 'JAWAHARLAL NEHRU INDOOR STADIUM', price: '₹999' },
]

export default function Tickets() {
  return (
    <ScrollTypeSection
      id="tickets"
      className="panel relative w-full overflow-hidden bg-[#0B0B0A] text-[#F2E9D7] min-h-[100dvh] flex flex-col justify-start lg:justify-center"
      style={{ '--bg': '#0B0B0A' } as React.CSSProperties}
    >
      {/* Subtle arena background, dimmed behind entire section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={ticketsBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[center_35%] opacity-20 brightness-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, rgba(11,11,10,0.0) 0%, rgba(11,11,10,0.75) 50%, #0B0B0A 100%),
                         linear-gradient(180deg, rgba(11,11,10,0.9) 0%, rgba(11,11,10,0.0) 25%, rgba(11,11,10,0.0) 75%, rgba(11,11,10,0.9) 100%)`,
          }}
        />
      </div>

      {/* Main container:
          - Phone view (< lg): Single column layout with HangingBell in background (absolute inset-0)
          - Desktop view (>= lg): Left Column starts flush at the left screen end (wooden beam comes from the left screen end) + VIP Privileges below, with Right Column immediately adjacent
      */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full flex-1 items-start lg:items-center justify-start lg:justify-between min-h-[100dvh] lg:min-h-screen px-5 sm:px-10 lg:pl-0 lg:pr-10 xl:pr-14 py-8 lg:py-6 gap-6 lg:gap-8 xl:gap-12">

        {/* ── PHONE VIEW BELL: Behind top content on mobile with smooth bottom fade to #0B0B0A ── */}
        <div className="absolute top-0 left-0 right-0 h-[480px] sm:h-[540px] overflow-hidden z-0 pointer-events-none opacity-65 lg:hidden [filter:brightness(1.18)_contrast(1.06)]">
          <HangingBell />
          {/* Mobile radial & bottom scrim keeping text sharp while bell shines bright with warm metallic luster */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 50% 40%, rgba(11,11,10,0.15) 0%, rgba(11,11,10,0.60) 75%, #0B0B0A 100%),
                linear-gradient(180deg, transparent 65%, #0B0B0A 100%)
              `,
            }}
          />
        </div>

        {/* ── DESKTOP VIEW LEFT: Wood beam comes straight from the left screen end (flush pl-0) + VIP Privileges below ── */}
        <div className="hidden lg:flex flex-col justify-between w-[310px] xl:w-[350px] h-[520px] xl:h-[560px] relative z-10 shrink-0 pl-0">
          
          {/* Pure transparent bell canvas hanging naturally from top beam starting at the left screen end */}
          <div className="relative w-full h-[270px] xl:h-[295px]">
            <HangingBell />
          </div>

          {/* Space below the bell on desktop: Ringside VIP Privileges Card (padded nicely from screen edge) */}
          <div className="mt-3 xl:mt-4 pl-6 xl:pl-8 pr-2">
            <div className="p-4 xl:p-4.5 bg-[#141210]/95 border border-[#C5A15A]/35 shadow-[0_8px_28px_rgba(0,0,0,0.7)] backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src={belLogo} alt="BEL Official Crest" className="w-4 h-4 object-contain filter drop-shadow-[0_1px_4px_rgba(197,161,90,0.5)]" />
                  <span className="font-heading text-[10.5px] font-bold tracking-[0.2em] text-[#C5A15A] uppercase">
                    RINGSIDE VIP PRIVILEGES
                  </span>
                </div>
                <span className="font-heading text-[8px] font-bold tracking-wider text-[#A7A095] uppercase px-1.5 py-0.5 border border-white/10 bg-white/5">
                  LIMITED
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 mt-2.5 font-body text-[10.5px] text-[#F2E9D7]/85 leading-snug">
                <div className="flex items-start gap-2">
                  <span className="text-[#C5A15A] font-bold">✦</span>
                  <span>Front-Row Fighter Corner View</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C5A15A] font-bold">✦</span>
                  <span>VIP Lounge &amp; F&amp;B Hospitality Access</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C5A15A] font-bold">✦</span>
                  <span>Ambassador &amp; Celebrity Meet-and-Greet</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#C5A15A] font-bold">✦</span>
                  <span>Official Souvenir Pass &amp; Collector Lanyard</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="font-heading text-[8.5px] tracking-wider text-[#A7A095] uppercase">
                  150 RINGSIDE SEATS
                </span>
                <a
                  href="#/tickets?id=finale"
                  className="font-heading text-[9px] font-bold tracking-widest text-[#C5A15A] hover:text-[#F2E9D7] uppercase transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>VIP PASSES</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (Desktop) / MAIN CONTENT (Mobile): Fills space immediately to the right of the bell ── */}
        <div className="relative z-10 flex-1 min-w-0 w-full flex flex-col justify-center">

          {/* Eyebrow - Placed right up at the top */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#C5A15A]/40 bg-[#161513]/85 backdrop-blur-sm mb-3 sm:mb-3.5 w-fit shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <img src={belLogo} alt="BEL" className="w-3.5 h-3.5 object-contain filter drop-shadow-[0_1px_4px_rgba(197,161,90,0.5)]" />
            <ScrollTypeText
              as="span"
              className="font-heading text-[10px] sm:text-xs font-semibold tracking-[0.28em] text-[#C5A15A] uppercase"
              start={0.04}
              end={0.24}
            >
              SEASON 1 TICKETS &amp; PASSES
            </ScrollTypeText>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[4rem] leading-[0.92] tracking-[0.01em] uppercase text-[#F2E9D7] max-w-2xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            <ScrollTypeText as="span" className="block text-2xl sm:text-4xl lg:text-[2.6rem] xl:text-[3.2rem]" start={0.16} end={0.48}>
              WHERE BOXING MEETS ENTERTAINMENT.
            </ScrollTypeText>
            <ScrollTypeText as="span" className="block text-[#C5A15A] mt-1 sm:mt-1.5" start={0.38} end={0.68}>
              LIVE AT RINGSIDE.
            </ScrollTypeText>
          </h2>

          {/* Subtitle */}
          <ScrollTypeText
            as="p"
            className="mt-2.5 sm:mt-3 font-body text-xs sm:text-sm md:text-base text-[#A7A095] max-w-2xl leading-relaxed"
            start={0.50}
            end={0.90}
          >
            Official passes for all 5 Season 1 championship events are now live. Choose your event and reserve your ringside seat.
          </ScrollTypeText>

          {/* CTA & Stat Strip: Directly in the space to the right of the bell */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-4">
            <a
              href="#/tickets"
              className="group inline-flex items-center gap-3 bg-[#C5A15A] px-7 sm:px-9 py-3 sm:py-3.5 font-heading text-xs sm:text-sm font-bold tracking-[0.22em] text-[#0B0B0A] uppercase transition-all duration-300 hover:brightness-110 shadow-[0_8px_30px_rgba(197,161,90,0.4)] active:scale-[0.98] cursor-pointer"
            >
              <span>BOOK PASSES NOW</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-base sm:text-lg">→</span>
            </a>

            <span className="font-heading text-[9.5px] sm:text-[11px] tracking-[0.16em] text-[#A7A095] uppercase">
              Early Bird · Limited Ringside Seats · Instant Confirmation
            </span>
          </div>

          {/* 4 Stat Chips - Clean horizontal strip */}
          <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-2xl">
            {[
              { val: '5', label: 'OFFICIAL EVENTS' },
              { val: '₹499', label: 'STARTING OFFER' },
              { val: 'UNLIMITED', label: 'NYE FOOD & DRINKS' },
              { val: 'RINGSIDE', label: 'VIP HOSPITALITY' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-white/10 bg-[#161513]/75 backdrop-blur-sm p-2 sm:p-2.5 text-center transition-colors hover:border-[#C5A15A]/40"
              >
                <div className="font-display text-sm sm:text-base lg:text-lg font-bold text-[#C5A15A]">
                  {item.val}
                </div>
                <div className="mt-0.5 font-heading text-[8px] sm:text-[9px] tracking-[0.14em] text-[#A7A095] uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* All 5 Event Passes Preview - Full-width clean grid */}
          <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/10 w-full">
            <div className="flex items-center justify-between mb-2 sm:mb-2.5">
              <span className="font-heading text-[9px] sm:text-[10px] tracking-[0.22em] text-[#C5A15A] uppercase font-semibold">
                ALL 5 OFFICIAL PASSES
              </span>
              <span className="font-heading text-[9px] sm:text-[10px] tracking-[0.16em] text-[#A7A095]">
                SELECT PASS TO RESERVE
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {EVENT_PILLS.map((ev, i) => (
                <a
                  key={i}
                  href={`#/tickets?id=${ev.id}`}
                  className="group block p-2 sm:p-2.5 border border-white/10 bg-[#161513]/80 backdrop-blur-sm hover:border-[#C5A15A]/70 hover:bg-[#1c1a17] transition-all cursor-pointer text-left shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-[7.5px] tracking-wider text-[#A7A095] uppercase">
                      EVENT 0{i + 1}
                    </span>
                    <span className="text-[#C5A15A] text-[9px] font-bold group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                  <div className="font-heading text-[8.5px] sm:text-[9.5px] font-bold text-[#F2E9D7] tracking-wider truncate uppercase mt-1 group-hover:text-[#C5A15A] transition-colors">
                    {ev.name}
                  </div>
                  <div className="font-body text-[7.5px] sm:text-[8px] text-[#A7A095] truncate mt-0.5">
                    {ev.venue}
                  </div>
                  <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5 text-[7.5px] sm:text-[8.5px] font-heading tracking-wider text-[#A7A095]">
                    <span>{ev.date}</span>
                    <span className="text-[#C5A15A] font-bold">{ev.price}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile-only VIP privileges card at bottom of scroll */}
          <div className="mt-4 sm:mt-5 p-3.5 bg-[#141210]/90 border border-white/10 lg:hidden">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <img src={belLogo} alt="BEL" className="w-3.5 h-3.5 object-contain" />
                <span className="font-heading text-[10px] font-bold tracking-[0.2em] text-[#C5A15A] uppercase">
                  RINGSIDE VIP PRIVILEGES
                </span>
              </div>
              <span className="font-heading text-[8px] tracking-wider text-[#A7A095] uppercase">
                LIMITED
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2 font-body text-[9.5px] text-[#F2E9D7]/85">
              <div className="flex items-start gap-1">
                <span className="text-[#C5A15A] font-bold">✦</span>
                <span>Front-Row Fighter Corner</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-[#C5A15A] font-bold">✦</span>
                <span>VIP Lounge &amp; F&amp;B</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-[#C5A15A] font-bold">✦</span>
                <span>Ambassador Meet</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-[#C5A15A] font-bold">✦</span>
                <span>Souvenir Pass</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
