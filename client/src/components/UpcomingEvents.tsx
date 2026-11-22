import { useState, useRef } from 'react'
import PunchAnimation from './PunchAnimation'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'
import chennaiLogo from '../assets/images/ChennaiCaptains.PNG'
import kovaiLogo from '../assets/images/KovaiKings.PNG'
import salemLogo from '../assets/images/SalemSoilders.PNG'
import maduraiLogo from '../assets/images/MaduraiMavericks.PNG'
import kumariLogo from '../assets/images/KumariKnights.PNG'
import trichyLogo from '../assets/images/TrichyTitans.PNG'

const cities = [
  { city: 'CHENNAI', date: 'JAN 23', venue: 'YMCA Chennai', logo: chennaiLogo, team: 'Captains' },
  { city: 'COIMBATORE', date: 'JAN 30', venue: 'YMCA Coimbatore', logo: kovaiLogo, team: 'Kings' },
  { city: 'MADURAI', date: 'FEB 06', venue: 'Anna Stadium', logo: maduraiLogo, team: 'Mavericks' },
  { city: 'TRICHY', date: 'FEB 13', venue: 'YMCA Trichy', logo: trichyLogo, team: 'Titans' },
  { city: 'SALEM', date: 'FEB 20', venue: 'Mahatma Stadium', logo: salemLogo, team: 'Soldiers' },
  { city: 'KANYAKUMARI', date: 'FEB 27', venue: 'Anna Stadium', logo: kumariLogo, team: 'Knights' },
]

const itineraryStages = [
  { time: '10:00 AM', title: 'Opening Ceremony', desc: 'Opening address by Master of Ceremonies Jyothi Kripalani.' },
  { time: '10:15 AM', title: 'Founder & Leadership Address', desc: 'Keynotes by Dr. Balaji Srinivasan (Founder), Business & Boxing Heads.' },
  { time: '11:00 AM', title: 'BEL Brand Unveiling', desc: 'Official reveal of BEL Logo, Anthem & Cinematic Video Teaser.' },
  { time: '11:30 AM', title: '6 Franchise Teams Reveal', desc: 'Introduction of Team Ambassadors, Captains & Olympic-grade Coaches.' },
  { time: '11:45 AM', title: 'Dignitary & Celebrity Speeches', desc: 'Keynote remarks by VIP Chief Guests, sports stars and cultural icons.' },
  { time: '12:00 PM', title: 'Official Press Meet', desc: 'Comprehensive Q&A with regional and national sports broadcast media.' },
  { time: '01:00 PM', title: 'VIP Networking Lunch', desc: 'Exclusive executive lunch for franchise owners, sponsors and VIP partners.' },
  { time: '02:00 PM', title: 'Live Exhibition Match', desc: 'High-octane BEL Demo Fight showcasing pro rules, ring production and referees.' },
  { time: '03:00 PM', title: 'Live Band & Dance Show', desc: 'Concert by Jatayu & Harini Iyer with choreography crew performance.' },
  { time: '05:00 PM–08:00 PM', title: 'Sponsor Meet & DJ Night', desc: 'Corporate partnership briefing followed by pro sets from DJ Kishy & DJ Arjun Hora.' },
]

export default function UpcomingEvents() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStage, setActiveStage] = useState(0)

  return (
    <ScrollTypeSection
      id="events"
      sectionRef={sectionRef}
      className="panel relative min-h-screen overflow-hidden bg-[#0B0B0A] text-[#F2E9D7] [isolation:isolate]"
      style={{ '--bg': '#0B0B0A' } as React.CSSProperties}
    >
      <PunchAnimation containerRef={sectionRef} />
      <div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-6 py-12 sm:px-10 md:py-16 lg:px-16"
      >
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Column: Grand Launch Headline & Lineup */}
          <div className="lg:col-span-5">
            <ScrollTypeText
              as="span"
              className="font-heading text-xs font-semibold tracking-[.3em] text-[#C5A15A]"
              start={0.04}
              end={0.24}
            >
              EVENTS &amp; CALENDAR
            </ScrollTypeText>

            <h2 className="mt-2 font-display text-4xl leading-[.9] sm:text-5xl md:text-6xl">
              <ScrollTypeText as="span" start={0.16} end={0.50}>
                GRAND LAUNCH
              </ScrollTypeText>
            </h2>

            <ScrollTypeText
              as="p"
              className="mt-2 font-heading text-xs font-medium tracking-[.2em] text-[#C5A15A]"
              start={0.32}
              end={0.65}
            >
              DEC 26, 2026 · 10 AM · YMCA CHENNAI
            </ScrollTypeText>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                ['VENUE', 'YMCA CHENNAI', '1,000 PAX ARENA'],
                ['EXHIBITION', 'BEL DEMO FIGHT', '2:00 PM LIVE BOUT'],
                ['DOORS OPEN', '10:00 AM', 'EXCLUSIVE ACCESS'],
              ].map(([label, value, sub]) => (
                <div
                  key={label}
                  className="bg-[#EAE2D2] p-2.5 text-center text-[#0B0B0A] shadow-[0_6px_18px_rgba(0,0,0,.7)] flex flex-col justify-between"
                >
                  <span className="block font-heading text-[8.5px] tracking-[.18em] text-[#5A544C] uppercase">
                    {label}
                  </span>
                  <span className="mt-0.5 block font-display text-xs sm:text-sm font-bold uppercase leading-tight">
                    {value}
                  </span>
                  <span className="mt-0.5 block font-heading text-[7.5px] sm:text-[8px] tracking-wider text-[#8C6B37]">
                    {sub}
                  </span>
                </div>
              ))}
            </div>

            <ScrollTypeText
              as="p"
              className="mt-5 border-t border-white/10 pt-3.5 font-heading text-[9.5px] sm:text-[10px] tracking-[.2em] text-[#A7A095]"
              start={0.55}
              end={0.92}
            >
              ARTISTS: JATAYU &amp; HARINI IYER · DJ KISHY · DJ ARJUN HORA · MC JYOTHI KRIPALANI
            </ScrollTypeText>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#/tickets"
                className="inline-flex items-center gap-2 border border-[#C5A15A] bg-[#C5A15A] px-4 py-2 font-heading text-[11px] font-semibold tracking-[0.2em] text-[#0B0B0A] uppercase transition-all duration-300 hover:brightness-110 shadow-[0_4px_16px_rgba(197,161,90,0.3)]"
              >
                <span>BOOK LAUNCH PASS</span>
                <span>→</span>
              </a>

              <a
                href="#/tickets?id=finale"
                className="inline-flex items-center gap-2 border border-white/20 bg-[#161513]/80 px-4 py-2 font-heading text-[11px] font-semibold tracking-[0.2em] text-[#F2E9D7] uppercase transition-all duration-300 hover:border-[#C5A15A] hover:text-[#C5A15A]"
              >
                <span>FINALE PASSES</span>
              </a>
            </div>
          </div>

          {/* Right Column: 10-Stage Launch Flow + 6-City Selection Tour */}
          <div className="space-y-6 border-white/10 lg:col-span-7 lg:border-l lg:pl-8">
            {/* 10-Stage Itinerary Flow with Active Stage Display */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <ScrollTypeText
                  as="span"
                  className="font-heading text-xs font-semibold tracking-[.26em] text-[#C5A15A] uppercase"
                  start={0.24}
                  end={0.58}
                >
                  10-STAGE LAUNCH ITINERARY
                </ScrollTypeText>
                <span className="font-heading text-[9px] tracking-wider text-[#A7A095] uppercase">
                  STAGE {String(activeStage + 1).padStart(2, '0')} / 10
                </span>
              </div>

              {/* 10 Numbered Buttons */}
              <div className="grid grid-cols-10 gap-1 border-t border-[#C5A15A]/40 pt-2.5">
                {itineraryStages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStage(i)}
                    onMouseEnter={() => setActiveStage(i)}
                    className={`h-7 sm:h-8 flex items-center justify-center font-heading text-[9px] sm:text-[10px] transition-all cursor-pointer rounded-xs ${
                      activeStage === i
                        ? 'bg-[#C5A15A] text-[#0B0B0A] font-bold shadow-[0_0_12px_rgba(197,161,90,0.5)]'
                        : 'bg-[#191816] text-[#A7A095] border border-white/10 hover:border-[#C5A15A]/60 hover:text-[#F2E9D7]'
                    }`}
                    title={`Stage ${i + 1}: ${itineraryStages[i].title}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Detailed Active Stage Info Box (Fills Empty Space with High-Value Deck Content) */}
              <div className="mt-2.5 p-3 bg-[#191816]/95 border border-[#C5A15A]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#C5A15A]/20 text-[#C5A15A] font-heading text-[9px] font-bold tracking-wider uppercase border border-[#C5A15A]/40">
                      {itineraryStages[activeStage].time}
                    </span>
                    <h4 className="font-heading text-xs sm:text-[13px] font-bold text-[#F2E9D7] tracking-wider uppercase">
                      {itineraryStages[activeStage].title}
                    </h4>
                  </div>
                  <p className="mt-1 font-body text-[11px] sm:text-xs text-[#A7A095] leading-relaxed">
                    {itineraryStages[activeStage].desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setActiveStage((prev) => (prev - 1 + itineraryStages.length) % itineraryStages.length)}
                    className="p-1 px-2 border border-white/10 text-[#C5A15A] hover:bg-[#C5A15A] hover:text-[#0B0B0A] text-xs font-bold transition-all cursor-pointer"
                    aria-label="Previous Stage"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStage((prev) => (prev + 1) % itineraryStages.length)}
                    className="p-1 px-2 border border-white/10 text-[#C5A15A] hover:bg-[#C5A15A] hover:text-[#0B0B0A] text-xs font-bold transition-all cursor-pointer"
                    aria-label="Next Stage"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Selection Tour Calendar & Stadiums */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <ScrollTypeText
                  as="span"
                  className="block font-heading text-xs font-semibold tracking-[.26em] text-[#C5A15A] uppercase"
                  start={0.45}
                  end={0.80}
                >
                  SELECTION TOUR &amp; CALENDAR
                </ScrollTypeText>
                <span className="font-heading text-[9px] tracking-wider text-[#A7A095] uppercase">
                  6 TAMIL NADU STADIUMS
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {cities.map((c) => (
                  <a
                    key={c.city}
                    href={`#/tickets?id=selection-${c.city.toLowerCase()}`}
                    className="border border-white/5 bg-[#191816]/90 p-2 text-center flex flex-col items-center justify-between hover:border-[#C5A15A]/60 hover:bg-[#201e1b] transition-all group cursor-pointer"
                  >
                    <img
                      src={c.logo}
                      alt={c.team}
                      className="w-8 h-8 object-contain mb-1 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    />
                    <span className="block font-heading text-[9.5px] font-semibold tracking-wider text-[#F2E9D7] group-hover:text-[#C5A15A] transition-colors leading-tight">
                      {c.city}
                    </span>
                    <span className="mt-0.5 block font-heading text-[8px] tracking-wider text-[#8C6B37] group-hover:text-[#C5A15A] transition-colors">
                      {c.date}
                    </span>
                    <span className="mt-0.5 block font-body text-[7.5px] text-[#A7A095] truncate w-full">
                      {c.venue}
                    </span>
                  </a>
                ))}
              </div>

              {/* Grand Finale Highlight Banner directly under Selection Tour */}
              <a
                href="#/tickets?id=finale"
                className="mt-2.5 block p-2.5 border border-[#C5A15A]/50 bg-gradient-to-r from-[#191816] via-[#241F17] to-[#191816] hover:border-[#C5A15A] transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-center sm:text-left">
                  <div>
                    <span className="font-heading text-[8.5px] font-bold tracking-[0.2em] text-[#C5A15A] uppercase block">
                      SEASON 1 CLIMAX · MARCH 06, 2027
                    </span>
                    <span className="font-display text-sm sm:text-base text-[#F2E9D7] uppercase tracking-wide group-hover:text-[#C5A15A] transition-colors">
                      GRAND FINALE · NEHRU INDOOR STADIUM, CHENNAI
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-end gap-2 text-[9px] font-heading tracking-wider text-[#A7A095]">
                    <span>7,000+ PAX ARENA</span>
                    <span className="text-[#C5A15A] font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
