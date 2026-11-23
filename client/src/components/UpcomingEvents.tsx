import { useRef } from 'react'
import PunchAnimation from './PunchAnimation'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'
import belLogo from '../assets/images/bel-logo.webp'
import chennaiLogo from '../assets/images/ChennaiCaptains.PNG'
import kovaiLogo from '../assets/images/KovaiKings.PNG'
import salemLogo from '../assets/images/SalemSoilders.PNG'
import maduraiLogo from '../assets/images/MaduraiMavericks.PNG'
import kumariLogo from '../assets/images/KumariKnights.PNG'
import trichyLogo from '../assets/images/TrichyTitans.PNG'

const cities = [
  { city: 'CHENNAI', franchise: 'CAPTAINS', date: 'JAN 23', logo: chennaiLogo, team: 'Chennai Captains' },
  { city: 'COIMBATORE', franchise: 'KINGS', date: 'JAN 30', logo: kovaiLogo, team: 'Kovai Kings' },
  { city: 'MADURAI', franchise: 'MAVERICKS', date: 'FEB 06', logo: maduraiLogo, team: 'Madurai Mavericks' },
  { city: 'TRICHY', franchise: 'TITANS', date: 'FEB 13', logo: trichyLogo, team: 'Trichy Titans' },
  { city: 'SALEM', franchise: 'SOLDIERS', date: 'FEB 20', logo: salemLogo, team: 'Salem Soldiers' },
  { city: 'KANYAKUMARI', franchise: 'KNIGHTS', date: 'FEB 27', logo: kumariLogo, team: 'Kumari Knights' },
]

// Condensed 4-row calendar
const calendar = [
  {
    id: 'launch',
    date: 'DEC 26, 2026',
    event: 'Inauguration',
    place: 'YMCA, Chennai',
    tag: 'LAUNCH',
    gold: false,
  },
  {
    id: 'camp',
    date: 'JAN 02 – 16, 2027',
    event: 'Training Camp & Academy Setup',
    place: 'YMCA, Chennai',
    tag: 'TRAINING',
    gold: false,
  },
  {
    id: 'selection',
    date: 'JAN 23 – FEB 27, 2027',
    event: 'Selection Tour — 6 Cities',
    place: 'Chennai · Coimbatore · Madurai · Trichy · Salem · Kanyakumari',
    tag: 'SELECTION',
    gold: false,
  },
  {
    id: 'finale',
    date: 'MAR 06, 2027',
    event: 'Grand Finale',
    place: 'Jawaharlal Nehru Indoor Stadium, Chennai',
    tag: 'FINALE',
    gold: true,
  },
]

export default function UpcomingEvents() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <ScrollTypeSection
      id="events"
      sectionRef={sectionRef}
      className="panel relative min-h-screen overflow-hidden bg-[#0B0B0A] text-[#F2E9D7] [isolation:isolate]"
      style={{ '--bg': '#0B0B0A' } as React.CSSProperties}
    >
      <PunchAnimation containerRef={sectionRef} />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex flex-col justify-center min-h-screen px-5 sm:px-10 lg:px-16 py-8 lg:py-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <img src={belLogo} alt="BEL" className="w-4 h-4 object-contain filter drop-shadow-[0_1px_4px_rgba(197,161,90,0.5)]" />
          <ScrollTypeText
            as="span"
            className="font-heading text-[10px] sm:text-xs font-semibold tracking-[.3em] text-[#C5A15A]"
            start={0.04}
            end={0.24}
          >
            EVENTS &amp; CALENDAR
          </ScrollTypeText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* Headline */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[.9] uppercase">
                <ScrollTypeText as="span" start={0.10} end={0.40}>
                  INAUGURATION
                </ScrollTypeText>
              </h2>
              <ScrollTypeText
                as="p"
                className="mt-1 font-heading text-[10px] sm:text-xs font-medium tracking-[.2em] text-[#C5A15A]"
                start={0.28}
                end={0.55}
              >
                DEC 26, 2026 · YMCA, CHENNAI
              </ScrollTypeText>
            </div>

            {/* 3 experience cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                ['VENUE', 'YMCA, CHENNAI', 'OFFICIAL VENUE'],
                ['EXHIBITION', 'BEL DEMO FIGHT', 'OFFICIAL BOUT'],
                ['EXPERIENCE', 'DJ, MUSIC & DANCE', 'LIVE PRODUCTION'],
              ].map(([label, value, sub]) => (
                <div
                  key={label}
                  className="bg-[#EAE2D2] p-2.5 text-center text-[#0B0B0A] shadow-[0_6px_18px_rgba(0,0,0,.7)] flex flex-col justify-between gap-1"
                >
                  <span className="block font-heading text-[7.5px] tracking-[.16em] text-[#5A544C] uppercase">{label}</span>
                  <span className="block font-display text-[11px] sm:text-xs font-bold uppercase leading-tight">{value}</span>
                  <span className="block font-heading text-[7px] sm:text-[7.5px] tracking-wider text-[#8C6B37]">{sub}</span>
                </div>
              ))}
            </div>

            {/* Tagline strip */}
            <p className="font-heading text-[9px] sm:text-[9.5px] tracking-[.18em] text-[#A7A095] uppercase border-t border-white/10 pt-3">
              LIVE DEMO FIGHT · DJ, SONG, MUSIC &amp; DANCE SHOW
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#/tickets?id=launch"
                className="inline-flex items-center gap-2 border border-[#C5A15A] bg-[#C5A15A] px-5 py-2.5 font-heading text-[11px] font-semibold tracking-[0.2em] text-[#0B0B0A] uppercase transition-all duration-300 hover:brightness-110 shadow-[0_4px_16px_rgba(197,161,90,0.3)]"
              >
                <span>BOOK PASSES</span>
                <span>→</span>
              </a>
              <a
                href="#/tickets?id=finale"
                className="inline-flex items-center gap-2 border border-white/20 bg-[#161513]/80 px-5 py-2.5 font-heading text-[11px] font-semibold tracking-[0.2em] text-[#F2E9D7] uppercase transition-all duration-300 hover:border-[#C5A15A] hover:text-[#C5A15A]"
              >
                <span>FINALE PASSES</span>
              </a>
            </div>

            {/* Hook */}
            <div className="p-3 bg-[#191816]/70 border-l-2 border-[#C5A15A]">
              <span className="font-heading text-[11px] text-[#C5A15A] font-bold tracking-widest uppercase block">
                ONE RING. SIX CITIES. A STRONGER TOMORROW.
              </span>
              <span className="font-body text-[10.5px] text-[#A7A095] block mt-0.5">
                India's next big sports entertainment revolution.
              </span>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              {[
                { val: '5', label: 'OFFICIAL EVENTS' },
                { val: '6', label: 'CITIES' },
                { val: 'MAR 06', label: 'GRAND FINALE' },
              ].map((s) => (
                <div key={s.label} className="text-center border border-white/8 bg-[#141210]/60 p-2.5">
                  <div className="font-display text-base sm:text-lg font-bold text-[#C5A15A] leading-none">{s.val}</div>
                  <div className="mt-1 font-heading text-[8px] sm:text-[8.5px] tracking-[.14em] text-[#A7A095] uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-5 lg:border-l lg:border-white/10 lg:pl-10">

            {/* 6 Franchise Teams */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <ScrollTypeText
                  as="span"
                  className="font-heading text-[10px] sm:text-xs font-semibold tracking-[.26em] text-[#C5A15A] uppercase"
                  start={0.24}
                  end={0.55}
                >
                  SELECTION TOUR — 6 FRANCHISE TEAMS
                </ScrollTypeText>
                <span className="font-heading text-[8.5px] tracking-wider text-[#A7A095] uppercase shrink-0 ml-2">
                  2027
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {cities.map((c) => (
                  <a
                    key={c.city}
                    href={`#/tickets?id=selection-${c.city.toLowerCase()}`}
                    className="group flex flex-col items-center text-center gap-1 py-2.5 px-1.5 border border-white/8 hover:border-[#C5A15A]/50 bg-[#111009]/50 hover:bg-[#1a1714]/70 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                      <img
                        src={c.logo}
                        alt={c.team}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      />
                    </div>
                    <span className="font-heading text-[8px] sm:text-[8.5px] font-bold tracking-wider text-[#F2E9D7] group-hover:text-[#C5A15A] transition-colors leading-tight uppercase">
                      {c.city}
                    </span>
                    <span className="font-heading text-[7px] font-semibold tracking-wider text-[#C5A15A]/70 uppercase leading-tight">
                      {c.franchise}
                    </span>
                    <span className="font-heading text-[7px] tracking-wider text-[#8C6B37]">
                      {c.date}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Condensed 4-row Calendar */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <ScrollTypeText
                  as="span"
                  className="font-heading text-[10px] sm:text-xs font-semibold tracking-[.26em] text-[#C5A15A] uppercase"
                  start={0.42}
                  end={0.70}
                >
                  SEASON 1 OFFICIAL CALENDAR
                </ScrollTypeText>
                <span className="font-heading text-[8.5px] tracking-wider text-[#A7A095] uppercase">
                  2026 – 2027
                </span>
              </div>

              <div className="border border-white/10 bg-[#141210]/90 divide-y divide-white/5 overflow-hidden">
                {calendar.map((row, idx) => (
                  <a
                    key={idx}
                    href={`#/tickets?id=${row.id}`}
                    className={`flex items-start gap-3 px-3 py-2.5 hover:bg-[#1a1815] transition-colors cursor-pointer group ${row.gold ? 'bg-[#1f1b12]/80' : ''}`}
                  >
                    {/* Date column */}
                    <span className={`font-heading text-[9.5px] sm:text-[10.5px] font-bold tracking-wider uppercase shrink-0 w-[100px] sm:w-[120px] leading-snug mt-0.5 ${row.gold ? 'text-[#E8C887]' : 'text-[#C5A15A]'}`}>
                      {row.date}
                    </span>
                    {/* Info column */}
                    <div className="flex-1 min-w-0">
                      <span className={`font-heading text-[11px] sm:text-xs font-semibold block leading-tight group-hover:text-[#C5A15A] transition-colors ${row.gold ? 'text-[#E8C887]' : 'text-[#F2E9D7]'}`}>
                        {row.event}
                      </span>
                      <span className="font-body text-[9px] sm:text-[9.5px] text-[#A7A095] block mt-0.5 leading-snug">
                        {row.place}
                      </span>
                    </div>
                    {/* Tag badge */}
                    <span className={`px-1.5 py-0.5 font-heading text-[7.5px] font-bold tracking-wider uppercase border shrink-0 mt-0.5 hidden sm:block ${
                      row.gold
                        ? 'border-[#E8C887]/60 text-[#E8C887]'
                        : row.tag === 'LAUNCH'
                        ? 'border-[#C5A15A]/50 text-[#C5A15A]'
                        : 'border-white/15 text-[#A7A095]'
                    }`}>
                      {row.tag}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Grand Finale CTA banner */}
            <a
              href="#/tickets?id=finale"
              className="flex items-center justify-between gap-3 p-3 sm:p-3.5 border border-[#C5A15A]/55 bg-gradient-to-r from-[#191816] via-[#241F17] to-[#191816] hover:border-[#C5A15A] transition-all group"
            >
              <div>
                <span className="font-heading text-[9px] font-bold tracking-[0.2em] text-[#C5A15A] uppercase block">
                  SEASON 1 CLIMAX · MARCH 06, 2027
                </span>
                <span className="font-display text-sm sm:text-base text-[#F2E9D7] uppercase tracking-wide group-hover:text-[#C5A15A] transition-colors">
                  GRAND FINALE · NEHRU INDOOR STADIUM, CHENNAI
                </span>
              </div>
              <span className="text-[#C5A15A] font-bold text-lg group-hover:translate-x-1 transition-transform shrink-0">→</span>
            </a>

          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
