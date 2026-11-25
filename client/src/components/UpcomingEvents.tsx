import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PunchAnimation from './PunchAnimation'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'
import belLogo from '../assets/images/bel-logo.webp'
import chennaiLogo from '../assets/images/ChennaiCaptains.PNG'
import kovaiLogo from '../assets/images/KovaiKings.PNG'
import salemLogo from '../assets/images/SalemSoilders.PNG'
import maduraiLogo from '../assets/images/MaduraiMavericks.PNG'
import kumariLogo from '../assets/images/KumariKnights.PNG'
import trichyLogo from '../assets/images/TrichyTitans.PNG'
import './FlipCalendar.css'

gsap.registerPlugin(ScrollTrigger)

const cities = [
  { city: 'CHENNAI', franchise: 'CAPTAINS', date: 'MAR 06', logo: chennaiLogo, team: 'Chennai Captains' },
  { city: 'COIMBATORE', franchise: 'KINGS', date: 'MAR 27', logo: kovaiLogo, team: 'Kovai Kings' },
  { city: 'MADURAI', franchise: 'MAVERICKS', date: 'APR 03', logo: maduraiLogo, team: 'Madurai Mavericks' },
  { city: 'TRICHY', franchise: 'TITANS', date: 'APR 24', logo: trichyLogo, team: 'Trichy Titans' },
  { city: 'SALEM', franchise: 'SOLDIERS', date: 'MAY 01', logo: salemLogo, team: 'Salem Soldiers' },
  { city: 'KANYAKUMARI', franchise: 'KNIGHTS', date: 'MAY 15', logo: kumariLogo, team: 'Kumari Knights' },
]

const season1QuickLinks = [
  { id: 'launch', label: 'Inauguration', date: 'DEC 26' },
  { id: 'new-year', label: 'New Year Party', date: 'DEC 31' },
  { id: 'camp', label: 'Training Camp', date: 'FEB 13–27' },
  { id: 'selection', label: 'Selection Tour', date: 'MAR 06–MAY 15' },
  { id: 'finale', label: 'Grand Finale', date: 'JUN 12', gold: true },
]

const season2QuickLinks = [
  { id: 's2-launch', label: 'Grand Launch', date: 'JUL 31' },
  { id: 's2-camp', label: 'Training Camp', date: 'AUG 07–21' },
  { id: 's2-selection', label: 'Selection Tour', date: 'AUG 28–NOV 27' },
  { id: 's2-finale', label: 'S2 Grand Finale', date: 'DEC 18', gold: true },
  { id: 's2-party', label: 'BEL Success Party', date: "JAN 01 '28" },
]

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WD = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const EV_KEY = 'bel_flipcal_events_v1'

type EventsMap = Record<string, string[]>

function keyFor(y: number, m: number, d: number): string {
  return `${y}-${m}-${d}`
}

function buildDefaultEvents(): EventsMap {
  const map: EventsMap = {}

  // Season 1 Dates
  map[keyFor(2026, 11, 26)] = ['S1: BEL Inauguration — YMCA, Chennai']
  map[keyFor(2026, 11, 31)] = ['S1: New Year Party — Beach House ECR, Chennai']

  // S1 Training Camp: Feb 13–27, 2027
  for (let d = 13; d <= 27; d++) {
    map[keyFor(2027, 1, d)] = ['S1: Training Camp — BEL Academy, Chennai']
  }

  map[keyFor(2027, 2, 6)] = ['S1: Chennai Selection — YMCA, Chennai']
  map[keyFor(2027, 2, 27)] = ['S1: Coimbatore Selection']
  map[keyFor(2027, 3, 3)] = ['S1: Madurai Selection']
  map[keyFor(2027, 3, 24)] = ['S1: Trichy Selection']
  map[keyFor(2027, 4, 1)] = ['S1: Salem Selection']
  map[keyFor(2027, 4, 15)] = ['S1: Kanyakumari Selection']
  map[keyFor(2027, 5, 12)] = ['S1: Grand Finale — Jawaharlal Nehru Indoor Stadium, Chennai']

  // Season 2 Dates
  map[keyFor(2027, 6, 31)] = ['S2: Grand Launch']

  // S2 Training Camp: Aug 7–21, 2027
  for (let d = 7; d <= 21; d++) {
    map[keyFor(2027, 7, d)] = ['S2: Training Camp']
  }

  map[keyFor(2027, 7, 28)] = ['S2: Chennai Selection']
  map[keyFor(2027, 8, 18)] = ['S2: Coimbatore Selection']
  map[keyFor(2027, 9, 9)] = ['S2: Madurai Selection']
  map[keyFor(2027, 9, 30)] = ['S2: Trichy Selection']
  map[keyFor(2027, 10, 6)] = ['S2: Salem Selection']
  map[keyFor(2027, 10, 27)] = ['S2: Kanyakumari Selection']
  map[keyFor(2027, 11, 18)] = ['S2: Season 2 Grand Finale']
  map[keyFor(2028, 0, 1)] = ['S2: BEL Success Party']

  return map
}

const MONTH_EVENTS: Record<string, string> = {
  '2026-11': 'INAUGURATION · NY PARTY',
  '2027-1': 'TRAINING CAMP',
  '2027-2': 'SELECTION TOUR',
  '2027-3': 'SELECTION TOUR',
  '2027-4': 'SELECTION TOUR',
  '2027-5': 'GRAND FINALE',
  '2027-6': 'S2 GRAND LAUNCH',
  '2027-7': 'S2 CAMP · SELECTION',
  '2027-8': 'S2 SELECTION TOUR',
  '2027-9': 'S2 SELECTION TOUR',
  '2027-10': 'S2 SELECTION TOUR',
  '2027-11': 'S2 GRAND FINALE',
  '2028-0': 'BEL SUCCESS PARTY',
}

const SELECTION_PLACES: Record<string, string> = {
  '2027-2-6': 'CHENNAI',
  '2027-2-27': 'COIMBATORE',
  '2027-3-3': 'MADURAI',
  '2027-3-24': 'TRICHY',
  '2027-4-1': 'SALEM',
  '2027-4-15': 'KANYAKUMARI',
  '2027-7-28': 'CHENNAI',
  '2027-8-18': 'COIMBATORE',
  '2027-9-9': 'MADURAI',
  '2027-9-30': 'TRICHY',
  '2027-10-6': 'SALEM',
  '2027-10-27': 'KANYAKUMARI',
}

function loadInitialEvents(): EventsMap {
  const defaults = buildDefaultEvents()
  try {
    const raw = localStorage.getItem(EV_KEY)
    if (!raw) return defaults
    const stored = JSON.parse(raw) as EventsMap
    return { ...defaults, ...stored }
  } catch {
    return defaults
  }
}

interface FaceData {
  y: number
  m: number
}

export default function UpcomingEvents() {
  const sectionRef = useRef<HTMLElement>(null)
  const [events] = useState<EventsMap>(() => loadInitialEvents())
  const [view, setView] = useState<FaceData>({ y: 2026, m: 11 })
  const [rotation, setRotation] = useState(0)
  const [faceA, setFaceA] = useState<FaceData>({ y: 2026, m: 11 })
  const [faceB, setFaceB] = useState<FaceData>({ y: 2026, m: 11 })
  const [panelOpen, setPanelOpen] = useState(false)
  const [curKey, setCurKey] = useState<string | null>(null)
  const [selectedDateLabel, setSelectedDateLabel] = useState('—')
  const [comingSoonEvent, setComingSoonEvent] = useState<{ label: string; date: string } | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const calendarColumnRef = useRef<HTMLDivElement>(null)

  const today = new Date()

  useEffect(() => {
    const sectionEl = sectionRef.current
    const calCol = calendarColumnRef.current
    if (!sectionEl || !calCol) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const monitors = calCol.querySelectorAll('.cal-monitor-el')
    const syncEls = calCol.querySelectorAll('.cal-sync-el')

    gsap.set(monitors, { y: 90, opacity: 0, scale: 0.96, willChange: 'transform, opacity' })
    gsap.set(syncEls, { y: 36, opacity: 0, willChange: 'transform, opacity' })

    const tl = gsap.timeline({ paused: true })
    tl.to(monitors, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.78,
      ease: 'power3.out',
      clearProps: 'willChange',
    }).to(
      syncEls,
      {
        y: 0,
        opacity: 1,
        duration: 0.58,
        stagger: 0.05,
        ease: 'power3.out',
        clearProps: 'transform,willChange',
      },
      '-=0.58'
    )

    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 30%',
      toggleActions: 'play none none reverse',
      animation: tl,
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [])

  useEffect(() => {
    if (!comingSoonEvent) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setComingSoonEvent(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [comingSoonEvent])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(EV_KEY, JSON.stringify(events))
    } catch {
      // ignore storage errors
    }
  }, [events])

  const isFaceAVisible = Math.abs((rotation / 180) % 2) === 0

  const go = (dir: -1 | 1) => {
    let nm = view.m + dir
    let ny = view.y
    if (nm < 0) {
      nm = 11
      ny--
    } else if (nm > 11) {
      nm = 0
      ny++
    }

    if (isFaceAVisible) {
      setFaceB({ y: ny, m: nm })
    } else {
      setFaceA({ y: ny, m: nm })
    }
    setRotation((prev) => prev + dir * 180)
    setView({ y: ny, m: nm })
  }

  const jumpToMonth = (targetY: number, targetM: number) => {
    if (targetY === view.y && targetM === view.m) return
    const currentTotal = view.y * 12 + view.m
    const targetTotal = targetY * 12 + targetM
    const dir = targetTotal > currentTotal ? 1 : -1

    if (isFaceAVisible) {
      setFaceB({ y: targetY, m: targetM })
    } else {
      setFaceA({ y: targetY, m: targetM })
    }
    setRotation((prev) => prev + dir * 180)
    setView({ y: targetY, m: targetM })
  }

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimerRef.current = window.setTimeout(() => {
      setPanelOpen(false)
    }, 100)
  }

  const openPanel = (y: number, m: number, d: number) => {
    cancelClose()
    const k = keyFor(y, m, d)
    const dt = new Date(y, m, d)
    setCurKey(k)
    setSelectedDateLabel(`${MONTHS[m]} ${d}, ${y} — ${WD[dt.getDay()]}`)
    setPanelOpen(true)
  }

  const renderFaceContent = (y: number, m: number) => {
    const first = new Date(y, m, 1).getDay()
    const days = new Date(y, m + 1, 0).getDate()
    const totalCells = Math.ceil((first + days) / 7) * 7

    return (
      <>
        <span className="crop tl" />
        <span className="crop tr" />
        <span className="crop bl" />

        <div className="year">
          {y}
        </div>
        <div className="month-row">
          <div className="month">
            {MONTHS[m]}
          </div>
          {MONTH_EVENTS[`${y}-${m}`] && (
            <div className="month-event">{MONTH_EVENTS[`${y}-${m}`]}</div>
          )}
        </div>
        <div className="rule" />

        <div className="weekdays">
          {WD.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className="grid">
          {Array.from({ length: totalCells }).map((_, i) => {
            const dayNum = i - first + 1
            if (dayNum < 1 || dayNum > days) {
              return (
                <div key={`empty-${i}`} className="cell empty">
                  –
                </div>
              )
            }

            const isToday =
              y === today.getFullYear() &&
              m === today.getMonth() &&
              dayNum === today.getDate()
            const k = keyFor(y, m, dayNum)
            const dayEvents = events[k] || []
            const hasEvents = dayEvents.length > 0
            const placeTag = SELECTION_PLACES[k]

            return (
              <div
                key={k}
                className={`cell${isToday ? ' today' : ''}${hasEvents ? ' has-event' : ''}`}
                onMouseEnter={() => openPanel(y, m, dayNum)}
                onMouseLeave={scheduleClose}
                onClick={() => openPanel(y, m, dayNum)}
              >
                <span className="num">
                  {dayNum}
                </span>
                {placeTag && <span className="place-tag">{placeTag}</span>}
                {hasEvents && <span className="dot" />}
              </div>
            )
          })}
        </div>

        <div className="redbar" />
      </>
    )
  }

  const currentList = curKey ? events[curKey] || [] : []
  const isSeason2 = (view.y === 2027 && view.m >= 6) || view.y >= 2028
  const quickLinks = isSeason2 ? season2QuickLinks : season1QuickLinks

  const renderQuickTicketPills = (visibilityClass: string) => (
    <div className={`w-full max-w-[492px] grid-cols-2 sm:grid-cols-6 gap-2 ${visibilityClass}`}>
      {quickLinks.map((item, idx) => (
        <a
          key={item.id}
          href={isSeason2 ? '#events' : `#/tickets?id=${item.id}`}
          onClick={(e) => {
            if (isSeason2) {
              e.preventDefault()
              setComingSoonEvent({ label: item.label, date: item.date })
            }
          }}
          className={`group flex flex-col items-center justify-center text-center px-2.5 py-2 border transition-all duration-200 cursor-pointer ${
            idx < 3 ? 'sm:col-span-2' : 'sm:col-span-3'
          } ${
            idx === quickLinks.length - 1 ? 'col-span-2 ' : ''
          }${
            item.gold
              ? 'border-[#C5A15A]/70 bg-[#1f1b12]/90 text-[#E8C887] hover:bg-[#C5A15A] hover:text-[#0B0B0A]'
              : 'border-white/12 bg-[#141210]/85 text-[#F2E9D7] hover:border-[#C5A15A]/60 hover:bg-[#1a1714]'
          }`}
        >
          <span
            className={`font-heading text-[8px] font-bold tracking-[0.16em] uppercase ${
              item.gold
                ? 'text-[#C5A15A] group-hover:text-[#0B0B0A]'
                : 'text-[#C5A15A]'
            }`}
          >
            {item.date}
          </span>
          <span className="font-heading text-[9.5px] font-semibold tracking-[0.12em] uppercase mt-0.5 leading-tight">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  )

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
          <img
            src={belLogo}
            alt="BEL"
            className="w-4 h-4 object-contain filter drop-shadow-[0_1px_4px_rgba(197,161,90,0.5)]"
          />
          <ScrollTypeText
            as="span"
            className="font-heading text-[10px] sm:text-xs font-semibold tracking-[.3em] text-[#C5A15A]"
            start={0.04}
            end={0.24}
          >
            EVENTS &amp; UPCOMING CALENDAR
          </ScrollTypeText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ══ LEFT COLUMN (Event Highlights + 6 Cities + Stats) ══ */}
          <div className="lg:col-span-6 flex flex-col gap-4">

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

            {/* CTAs + Tagline */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href="#/tickets?id=launch"
                  className="inline-flex items-center gap-2 border border-[#C5A15A] bg-[#C5A15A] px-4 py-2 font-heading text-[10.5px] font-semibold tracking-[0.2em] text-[#0B0B0A] uppercase transition-all duration-300 hover:brightness-110 shadow-[0_4px_16px_rgba(197,161,90,0.3)]"
                >
                  <span>BOOK PASSES</span>
                  <span>→</span>
                </a>
                <a
                  href="#/tickets?id=finale"
                  className="inline-flex items-center gap-2 border border-white/20 bg-[#161513]/80 px-4 py-2 font-heading text-[10.5px] font-semibold tracking-[0.2em] text-[#F2E9D7] uppercase transition-all duration-300 hover:border-[#C5A15A] hover:text-[#C5A15A]"
                >
                  <span>FINALE PASSES</span>
                </a>
              </div>
              <p className="font-heading text-[8.5px] sm:text-[9px] tracking-[.16em] text-[#A7A095] uppercase">
                LIVE DEMO FIGHT · DJ, MUSIC &amp; DANCE
              </p>
            </div>

            {/* 6 Franchise Cities */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <ScrollTypeText
                  as="span"
                  className="font-heading text-[10px] sm:text-xs font-semibold tracking-[.26em] text-[#C5A15A] uppercase"
                  start={0.24}
                  end={0.55}
                >
                  SELECTION TOUR — 6 CITIES
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
                    className="group flex flex-col items-center text-center gap-1 py-2 px-1 border border-white/8 hover:border-[#C5A15A]/50 bg-[#111009]/50 hover:bg-[#1a1714]/70 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                      <img
                        src={c.logo}
                        alt={c.team}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      />
                    </div>
                    <span className="font-heading text-[8px] sm:text-[9px] font-bold tracking-wider text-[#F2E9D7] group-hover:text-[#C5A15A] transition-colors leading-tight uppercase mt-0.5">
                      {c.city}
                    </span>
                    <span className="font-heading text-[7px] tracking-wider text-[#8C6B37]">
                      {c.date}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Hook + Stat Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-stretch pt-1">
              <div className="sm:col-span-6 p-3 bg-[#191816]/70 border-l-2 border-[#C5A15A] flex flex-col justify-center">
                <span className="font-heading text-[10px] text-[#C5A15A] font-bold tracking-widest uppercase block">
                  ONE RING. SIX CITIES. A STRONGER TOMORROW.
                </span>
                <span className="font-body text-[10px] text-[#A7A095] block mt-0.5">
                  India&apos;s next big sports entertainment revolution.
                </span>
              </div>
              <div className="sm:col-span-6 grid grid-cols-3 gap-2">
                {[
                  { val: '5', label: 'EVENTS' },
                  { val: '6', label: 'CITIES' },
                  { val: 'JUN 12', label: 'FINALE' },
                ].map((s) => (
                  <div key={s.label} className="text-center border border-white/8 bg-[#141210]/60 p-2 flex flex-col justify-center">
                    <div className="font-display text-sm sm:text-base font-bold text-[#C5A15A] leading-none">{s.val}</div>
                    <div className="mt-1 font-heading text-[7.5px] tracking-[.14em] text-[#A7A095] uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Season 1 Quick Ticket Pills (Desktop Left Column) */}
            {renderQuickTicketPills('hidden lg:grid pt-1 max-w-none')}
          </div>

          {/* ══ RIGHT COLUMN (Interactive Flip Calendar + Season 1 & 2 Sync) ══ */}
          <div
            ref={calendarColumnRef}
            className="lg:col-span-6 flex flex-col items-center gap-3.5 lg:border-l lg:border-white/10 lg:pl-10"
          >

            {/* Calendar Header & Season Quick Jump */}
            <div className="w-full max-w-[460px] flex flex-wrap items-center justify-between gap-2">
              <ScrollTypeText
                as="span"
                className="font-heading text-[10px] sm:text-xs font-semibold tracking-[.26em] text-[#C5A15A] uppercase"
                start={0.30}
                end={0.60}
              >
                SEASON 1 &amp; 2 CALENDAR
              </ScrollTypeText>

              <div className="cal-sync-el flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => jumpToMonth(2026, 11)}
                  className={`px-2.5 py-1 font-heading text-[9px] font-semibold tracking-[0.16em] uppercase border transition-all cursor-pointer ${
                    view.y === 2026 || (view.y === 2027 && view.m <= 5)
                      ? 'bg-[#C5A15A] text-[#0B0B0A] border-[#C5A15A]'
                      : 'bg-[#141210]/80 text-[#F2E9D7] border-white/15 hover:border-[#C5A15A]/60'
                  }`}
                >
                  SEASON 1 · DEC &apos;26
                </button>
                <button
                  type="button"
                  onClick={() => jumpToMonth(2027, 6)}
                  className={`px-2.5 py-1 font-heading text-[9px] font-semibold tracking-[0.16em] uppercase border transition-all cursor-pointer ${
                    (view.y === 2027 && view.m >= 6) || view.y === 2028
                      ? 'bg-[#C5A15A] text-[#0B0B0A] border-[#C5A15A]'
                      : 'bg-[#141210]/80 text-[#F2E9D7] border-white/15 hover:border-[#C5A15A]/60'
                  }`}
                >
                  SEASON 2 · JUL &apos;27
                </button>
              </div>
            </div>

            {/* Flip Calendar */}
            <div className="bel-flip-cal w-full">
              <div className="stage">
                <div className="unit">
                  <div className="frame-row">
                    <button
                      type="button"
                      className="nav-btn cal-sync-el"
                      id="prevBtn"
                      aria-label="Previous month"
                      onClick={() => go(-1)}
                    >
                      ‹
                    </button>
                    <div className="frame cal-monitor-el">
                      <div className="screen">
                        <div className="flip-card">
                          <div
                            className="flip-inner"
                            id="flipInner"
                            style={{ transform: `rotateX(${rotation}deg)` }}
                          >
                            <div className="face front" id="faceA">
                              {renderFaceContent(faceA.y, faceA.m)}
                            </div>
                            <div className="face back" id="faceB">
                              {renderFaceContent(faceB.y, faceB.m)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="nav-btn cal-sync-el"
                      id="nextBtn"
                      aria-label="Next month"
                      onClick={() => go(1)}
                    >
                      ›
                    </button>
                  </div>
                  <div className="stand cal-monitor-el">
                    <div className="bar" />
                    <div className="base" />
                  </div>
                </div>

                <div
                  className={`events-panel${panelOpen ? ' open' : ''}`}
                  id="panel"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="ep-head">
                    <div className="ep-date" id="epDate">
                      {selectedDateLabel}
                    </div>
                    <button
                      type="button"
                      className="ep-close"
                      id="epClose"
                      aria-label="Close"
                      onClick={() => setPanelOpen(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="ep-sub">EVENTS</div>
                  <ul className="ep-list" id="epList">
                    {currentList.length === 0 ? (
                      <div className="ep-empty">No events yet.</div>
                    ) : (
                      currentList.map((text, idx) => (
                        <li key={idx}>
                          <span className="ep-text">{text}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Season 1 Quick Ticket Pills (Mobile Below Calendar) */}
            {renderQuickTicketPills('grid lg:hidden pt-2')}

          </div>
        </div>
      </div>

      {/* Custom BEL-Themed Season 2 Coming Soon Alert */}
      {comingSoonEvent && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B0B0A]/80 backdrop-blur-sm p-4"
          onClick={() => setComingSoonEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="s2-alert-title"
        >
          <div
            className="relative w-full max-w-md bg-[#141210] border border-[#C5A15A]/60 border-t-2 border-t-[#8B1111] p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.9)] text-[#F2E9D7]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setComingSoonEvent(null)}
              aria-label="Close alert"
              className="absolute top-4 right-4 text-[#A7A095] hover:text-[#C5A15A] transition-colors text-base leading-none cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <img src={belLogo} alt="BEL" className="w-4 h-4 object-contain" />
              <span className="font-heading text-[10px] font-semibold tracking-[0.26em] text-[#C5A15A] uppercase">
                SEASON 2 · BOXING ENTERTAINMENT LEAGUE
              </span>
            </div>

            <div className="inline-block px-2.5 py-1 mb-3 border border-[#C5A15A]/40 bg-[#1f1b12]/90 font-heading text-[10px] font-bold tracking-[0.18em] text-[#E8C887] uppercase">
              {comingSoonEvent.date} · {comingSoonEvent.label}
            </div>

            <h3
              id="s2-alert-title"
              className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-[#F2E9D7] leading-none"
            >
              TICKETS COMING SOON
            </h3>

            <p className="mt-2.5 font-body text-xs sm:text-sm text-[#A7A095] leading-relaxed">
              Season 2 passes are not yet open for booking. Official release dates and early-bird pricing will be announced soon.
            </p>

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setComingSoonEvent(null)}
                className="inline-flex items-center gap-2 border border-[#C5A15A] bg-[#C5A15A] px-5 py-2 font-heading text-[11px] font-semibold tracking-[0.2em] text-[#0B0B0A] uppercase transition-all duration-200 hover:brightness-110 cursor-pointer"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}
    </ScrollTypeSection>
  )
}
