import { useEffect, useRef, useState, type CSSProperties } from 'react'
import grandLaunchFightBg from '../assets/images/grand-launch-fight.png'
import partyBg from '../assets/images/new-year-party.jpg'
import trainingBg from '../assets/images/training-sparring.png'
import ticketsBg from '../assets/images/tickets-arena-bg.jpg'
import finaleFightBg from '../assets/images/finale-fight.png'
import belLogo from '../assets/images/bel-logo.webp'

// Franchise Logos for 6 Selection Tour Subtickets
import chennaiLogo from '../assets/images/ChennaiCaptains.PNG'
import maduraiLogo from '../assets/images/MaduraiMavericks.PNG'
import trichyLogo from '../assets/images/TrichyTitans.PNG'
import salemLogo from '../assets/images/SalemSoilders.PNG'
import kumariLogo from '../assets/images/KumariKnights.PNG'
import kovaiLogo from '../assets/images/KovaiKings.PNG'

// City Background Images for Selection Tour Subtickets
import chennaiBg from '../assets/images/Chennai.jpg'
import maduraiBg from '../assets/images/Madurai.webp'
import trichyBg from '../assets/images/Trichy.webp'
import salemBg from '../assets/images/Salem.png'
import kanyakumariBg from '../assets/images/Kanyakumari.webp'
import coimbatoreBg from '../assets/images/Coimbatore.jpg'

export interface TicketData {
  id: string
  name: string
  originalPrice: string
  discountPrice: string
  priceSuffix?: string
  badgeLabel: string
  description: string
  brand: string
  brandSub: string
  badge: string
  eyebrow: string
  title: string
  subtitle: string
  dateLabel: string
  date: string
  timeLabel: string
  time: string
  venueLabel: string
  venue: string
  perfLabel: string
  performers: string[]
  footer: string
  stubTop: string
  stubLogo: string
  stubBottom: string
  image: string
  color: string
  inkColor?: string
  // Subticket & franchise metadata
  city?: string
  franchiseName?: string
  franchiseLogo?: string
  isSubticket?: boolean
  parentEventId?: string
}

// ─── 6 Subtickets under Selection Tour (in exact chronological order: Chennai, Coimbatore, Madurai, Trichy, Salem, Kanyakumari) ───
export const SELECTION_SUBTICKETS: TicketData[] = [
  {
    id: 'selection-chennai',
    name: 'Chennai Selection Tour',
    city: 'Chennai',
    franchiseName: 'Chennai Captains',
    franchiseLogo: chennaiLogo,
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: 'SPECIAL OFFER',
    description: 'Official Selection Trials pass for Chennai Captains franchise scouting bouts.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'CHENNAI',
    eyebrow: 'CITY FRANCHISE SELECTION TRIALS · CHENNAI',
    title: 'SELECTION TOUR',
    subtitle: 'Chennai Captains scouting & pro pugilist elimination trials',
    dateLabel: 'DATE',
    date: '23 JAN 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'YMCA, CHENNAI',
    perfLabel: 'SCOUTS & BOUT CARD',
    performers: ['CHENNAI CAPTAINS SCOUTS', 'LIVE ELIMINATION BOUTS', 'DJ & LIVE MUSIC'],
    footer: 'OFFICIAL SELECTION PASS · VALID FOR CHENNAI SELECTION TRIALS ONLY',
    stubTop: 'BEL · CHENNAI',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: chennaiBg,
    color: '#C8B78B',
    inkColor: '#1F2A30',
    parentEventId: 'selection',
    isSubticket: true,
  },
  {
    id: 'selection-coimbatore',
    name: 'Coimbatore Selection Tour',
    city: 'Coimbatore',
    franchiseName: 'Kovai Kings',
    franchiseLogo: kovaiLogo,
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: 'SPECIAL OFFER',
    description: 'Official Selection Trials pass for Kovai Kings franchise scouting bouts.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'COIMBATORE',
    eyebrow: 'CITY FRANCHISE SELECTION TRIALS · COIMBATORE',
    title: 'SELECTION TOUR',
    subtitle: 'Kovai Kings scouting & pro pugilist elimination trials',
    dateLabel: 'DATE',
    date: '30 JAN 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'YMCA, COIMBATORE',
    perfLabel: 'SCOUTS & BOUT CARD',
    performers: ['KOVAI KINGS SCOUTS', 'LIVE ELIMINATION BOUTS', 'DJ & LIVE MUSIC'],
    footer: 'OFFICIAL SELECTION PASS · VALID FOR COIMBATORE SELECTION TRIALS ONLY',
    stubTop: 'BEL · KOVAI',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: coimbatoreBg,
    color: '#C8B78B',
    inkColor: '#1F2A30',
    parentEventId: 'selection',
    isSubticket: true,
  },
  {
    id: 'selection-madurai',
    name: 'Madurai Selection Tour',
    city: 'Madurai',
    franchiseName: 'Madurai Mavericks',
    franchiseLogo: maduraiLogo,
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: 'SPECIAL OFFER',
    description: 'Official Selection Trials pass for Madurai Mavericks franchise scouting bouts.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'MADURAI',
    eyebrow: 'CITY FRANCHISE SELECTION TRIALS · MADURAI',
    title: 'SELECTION TOUR',
    subtitle: 'Madurai Mavericks scouting & pro pugilist elimination trials',
    dateLabel: 'DATE',
    date: '06 FEB 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'ANNA STADIUM, MADURAI',
    perfLabel: 'SCOUTS & BOUT CARD',
    performers: ['MADURAI MAVERICKS SCOUTS', 'LIVE ELIMINATION BOUTS', 'DJ & LIVE MUSIC'],
    footer: 'OFFICIAL SELECTION PASS · VALID FOR MADURAI SELECTION TRIALS ONLY',
    stubTop: 'BEL · MADURAI',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: maduraiBg,
    color: '#C8B78B',
    inkColor: '#1F2A30',
    parentEventId: 'selection',
    isSubticket: true,
  },
  {
    id: 'selection-trichy',
    name: 'Trichy Selection Tour',
    city: 'Trichy',
    franchiseName: 'Trichy Titans',
    franchiseLogo: trichyLogo,
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: 'SPECIAL OFFER',
    description: 'Official Selection Trials pass for Trichy Titans franchise scouting bouts.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'TRICHY',
    eyebrow: 'CITY FRANCHISE SELECTION TRIALS · TRICHY',
    title: 'SELECTION TOUR',
    subtitle: 'Trichy Titans scouting & pro pugilist elimination trials',
    dateLabel: 'DATE',
    date: '13 FEB 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'YMCA, TRICHY',
    perfLabel: 'SCOUTS & BOUT CARD',
    performers: ['TRICHY TITANS SCOUTS', 'LIVE ELIMINATION BOUTS', 'DJ & LIVE MUSIC'],
    footer: 'OFFICIAL SELECTION PASS · VALID FOR TRICHY SELECTION TRIALS ONLY',
    stubTop: 'BEL · TRICHY',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: trichyBg,
    color: '#C8B78B',
    inkColor: '#1F2A30',
    parentEventId: 'selection',
    isSubticket: true,
  },
  {
    id: 'selection-salem',
    name: 'Salem Selection Tour',
    city: 'Salem',
    franchiseName: 'Salem Soldiers',
    franchiseLogo: salemLogo,
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: 'SPECIAL OFFER',
    description: 'Official Selection Trials pass for Salem Soldiers franchise scouting bouts.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'SALEM',
    eyebrow: 'CITY FRANCHISE SELECTION TRIALS · SALEM',
    title: 'SELECTION TOUR',
    subtitle: 'Salem Soldiers scouting & pro pugilist elimination trials',
    dateLabel: 'DATE',
    date: '20 FEB 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'MAHATMA GANDHI STADIUM, SALEM',
    perfLabel: 'SCOUTS & BOUT CARD',
    performers: ['SALEM SOLDIERS SCOUTS', 'LIVE ELIMINATION BOUTS', 'DJ & LIVE MUSIC'],
    footer: 'OFFICIAL SELECTION PASS · VALID FOR SALEM SELECTION TRIALS ONLY',
    stubTop: 'BEL · SALEM',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: salemBg,
    color: '#C8B78B',
    inkColor: '#1F2A30',
    parentEventId: 'selection',
    isSubticket: true,
  },
  {
    id: 'selection-kanyakumari',
    name: 'Kanyakumari Selection Tour',
    city: 'Kanyakumari',
    franchiseName: 'Kumari Knights',
    franchiseLogo: kumariLogo,
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: 'SPECIAL OFFER',
    description: 'Official Selection Trials pass for Kumari Knights franchise scouting bouts.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'KANYAKUMARI',
    eyebrow: 'CITY FRANCHISE SELECTION TRIALS · KANYAKUMARI',
    title: 'SELECTION TOUR',
    subtitle: 'Kumari Knights scouting & pro pugilist elimination trials',
    dateLabel: 'DATE',
    date: '27 FEB 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'ANNA STADIUM, NAGERCOIL, KANYAKUMARI',
    perfLabel: 'SCOUTS & BOUT CARD',
    performers: ['KUMARI KNIGHTS SCOUTS', 'LIVE ELIMINATION BOUTS', 'DJ & LIVE MUSIC'],
    footer: 'OFFICIAL SELECTION PASS · VALID FOR KANYAKUMARI SELECTION TRIALS ONLY',
    stubTop: 'BEL · KUMARI',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: kanyakumariBg,
    color: '#C8B78B',
    inkColor: '#1F2A30',
    parentEventId: 'selection',
    isSubticket: true,
  },
]

// ─── 5 Main Event Cards ───
export const MAIN_EVENTS: TicketData[] = [
  // 1. BEL Inauguration (999 strike 499) - Antique Gold
  {
    id: 'launch',
    name: '1. BEL Inauguration',
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: 'EARLY BIRD OFFER',
    description: 'Get your pass to the official BEL Inauguration at an exclusive early bird price.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'SEASON 1',
    eyebrow: 'OFFICIAL EVENT PASS',
    title: 'INAUGURATION',
    subtitle: 'Grand Inauguration of BEL Season 1',
    dateLabel: 'DATE',
    date: '26 DEC 2026',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'YMCA, CHENNAI',
    perfLabel: 'EVENT HIGHLIGHTS',
    performers: ['BEL DEMO FIGHT & BOUTS', 'LIVE DANCE SHOW', 'DJ & LIVE MUSIC'],
    footer: 'BEL DEMO FIGHT & EXHIBITION BOUT · OFFICIAL INAUGURATION',
    stubTop: 'BEL · SEASON 1',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: grandLaunchFightBg,
    color: '#3A0D14',
    inkColor: '#F2E9D7',
  },

  // 2. BEL New Year Party (5999 strike 2999) - Sunset Amber Gold (#F4A64A)
  {
    id: 'new-year',
    name: '2. BEL New Year Party',
    originalPrice: '₹5,999',
    discountPrice: '₹2,999',
    priceSuffix: 'per person',
    badgeLabel: 'EARLY BIRD OFFER',
    description: 'Celebrate the New Year with us! Enjoy unlimited food and drinks with your ticket.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'SEASON 1',
    eyebrow: 'NEW YEAR GALA PASS',
    title: 'NEW YEAR PARTY',
    subtitle: 'Celebrate New Year with pro bouts, live DJ music, dance, & unlimited food and drinks',
    dateLabel: 'DATE',
    date: '31 DEC 2026',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'BEACH HOUSE ECR, CHENNAI',
    perfLabel: 'EVENT HIGHLIGHTS',
    performers: ['LIVE PRO BOUTS', 'DJ & LIVE MUSIC', 'DANCE SHOW & CELEBRATION'],
    footer: 'ALL-INCLUSIVE PASS · UNLIMITED FOOD & DRINKS INCLUDED WITH TICKET',
    stubTop: 'BEL · SEASON 1',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: partyBg,
    color: '#0B1F3A',
    inkColor: '#F2E9D7',
  },

  // 3. Training Camp (1999 strike 999) - Fight Red (#DC2626)
  {
    id: 'camp',
    name: '3. Training Camp',
    originalPrice: '₹1,999',
    discountPrice: '₹999',
    badgeLabel: 'EARLY BIRD OFFER',
    description: 'Secure your Training Camp ticket at a special early bird price.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'SEASON 1',
    eyebrow: 'OFFICIAL CLINIC PASS',
    title: 'TRAINING CAMP',
    subtitle: 'Witness pro fighter training camps, pad work drills & strength demonstrations',
    dateLabel: 'DATE',
    date: '02–16 JAN 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'BEL ACADEMY, CHENNAI',
    perfLabel: 'TRAINING SESSIONS',
    performers: ['PRO HEAD COACHES', 'FIGHTER WALK-IN DEMOS', 'PAD WORK & CLINICS'],
    footer: 'FULL-DAY ACCESS TO ALL ARENA DRILLS & TRAINING SHOWCASES',
    stubTop: 'BEL · SEASON 1',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: trainingBg,
    color: '#DC2626',
    inkColor: '#0B0B0A',
  },

  // 4. Selection Tour (999 strike 499) - 6 Cities
  {
    id: 'selection',
    name: '4. Selection Tour',
    originalPrice: '₹999',
    discountPrice: '₹499',
    badgeLabel: '6 SUBTICKETS',
    description: 'City franchise selection trials across Chennai, Madurai, Trichy, Salem, Kanyakumari & Coimbatore.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: '6 CITIES',
    eyebrow: 'CITY FRANCHISE SELECTION TRIALS',
    title: 'SELECTION TOUR',
    subtitle: 'Witness emerging pugilists fight for 6 city franchise contracts',
    dateLabel: 'DATES',
    date: '23 JAN - 27 FEB 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: '6 TAMIL NADU CITIES',
    perfLabel: 'FRANCHISES & SCOUTS',
    performers: ['6 CITY FRANCHISE SCOUTS', 'LIVE ELIMINATION BOUTS', 'DJ & LIVE MUSIC'],
    footer: 'SELECT ANY 1 CITY SUBTICKET (CHENNAI, MADURAI, TRICHY, SALEM, KANYAKUMARI, COIMBATORE)',
    stubTop: 'BEL · SEASON 1',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: ticketsBg,
    color: '#C8B78B',
    inkColor: '#1F2A30',
  },

  // 5. Grand Finale (1999 strike 999) - Championship Warm Gold
  {
    id: 'finale',
    name: '5. Grand Finale',
    originalPrice: '₹1,999',
    discountPrice: '₹999',
    badgeLabel: 'SPECIAL PRICE',
    description: 'Be part of the Grand Finale and enjoy the event at a special ticket price.',
    brand: 'BEL',
    brandSub: 'BOXING ENTERTAINMENT LEAGUE',
    badge: 'SEASON 1',
    eyebrow: 'CHAMPIONSHIP PASS',
    title: 'GRAND FINALE',
    subtitle: 'The crowning of the Season 1 Champion City Franchise',
    dateLabel: 'DATE',
    date: '06 MAR 2027',
    timeLabel: 'TIME',
    time: '',
    venueLabel: 'VENUE',
    venue: 'JAWAHARLAL NEHRU INDOOR STADIUM, CHENNAI',
    perfLabel: 'CHAMPIONSHIP SHOW',
    performers: ['CHAMPIONSHIP FINALS', 'LIVE MUSIC & DJ', 'DANCE SHOW & TROPHY CEREMONY'],
    footer: 'JAWAHARLAL NEHRU INDOOR STADIUM · 7,000+ CAPACITY CHAMPIONSHIP PASS',
    stubTop: 'BEL · SEASON 1',
    stubLogo: 'BEL',
    stubBottom: 'BOXING ENTERTAINMENT LEAGUE',
    image: finaleFightBg,
    color: '#000000',
    inkColor: '#C5A15A',
  },
]

// All tickets accessible in system
export const ALL_TICKETS: TicketData[] = [...MAIN_EVENTS, ...SELECTION_SUBTICKETS]

const EVENT_ALIASES: Record<string, string> = {
  inauguration: 'launch',
  'grand-launch': 'launch',
  launch: 'launch',
  'new-year': 'new-year',
  'new-year-party': 'new-year',
  'new-year-bash': 'new-year',
  camp: 'camp',
  'training-camp': 'camp',
  academy: 'camp',
  selection: 'selection-chennai',
  'selection-trials': 'selection-chennai',
  'selection-tour': 'selection-chennai',
  finale: 'finale',
  'grand-finale': 'finale',
  // Direct city aliases
  chennai: 'selection-chennai',
  coimbatore: 'selection-coimbatore',
  kovai: 'selection-coimbatore',
  madurai: 'selection-madurai',
  trichy: 'selection-trichy',
  salem: 'selection-salem',
  kanyakumari: 'selection-kanyakumari',
  kumari: 'selection-kanyakumari',
  nagercoil: 'selection-kanyakumari',
}

function getInitialEventId(): string {
  try {
    let id: string | null = null
    const hash = window.location.hash
    if (hash.includes('?')) {
      const q = new URLSearchParams(hash.split('?')[1])
      id = q.get('id') || q.get('event')
    }
    if (!id && window.location.search) {
      const q = new URLSearchParams(window.location.search)
      id = q.get('id') || q.get('event')
    }
    if (id) {
      const normalized = id.toLowerCase().trim()
      if (EVENT_ALIASES[normalized]) return EVENT_ALIASES[normalized]
      if (ALL_TICKETS.some((t) => t.id === normalized)) return normalized
      const match = ALL_TICKETS.find((t) => t.id.toLowerCase() === normalized)
      if (match) return match.id
    }
  } catch (e) {
    // ignore
  }
  return 'launch'
}

function isDarkColor(hex?: string): boolean {
  if (!hex) return false
  const clean = hex.replace('#', '')
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16)
    const g = parseInt(clean[1] + clean[1], 16)
    const b = parseInt(clean[2] + clean[2], 16)
    return (r * 299 + g * 587 + b * 114) / 1000 < 80
  }
  if (clean.length >= 6) {
    const r = parseInt(clean.substring(0, 2), 16)
    const g = parseInt(clean.substring(2, 4), 16)
    const b = parseInt(clean.substring(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 < 80
  }
  return false
}

// ─── Exact BEL Ticket Component (Shared Format for All Tickets and Subtickets) ───
export function BelTicket({
  ticket,
  scale,
}: {
  ticket: TicketData
  scale: number
}) {
  const ticketColor = ticket.color || '#C8B78B'
  const isDark = isDarkColor(ticketColor)
  const ticketInk = ticket.inkColor || (isDark ? '#F2E9D7' : '#1F2A30')
  const ticketLine = isDark ? 'rgba(255, 255, 255, 0.22)' : `${ticketColor}b3` // ~70% opacity

  const lab: CSSProperties = {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 700,
    color: '#d8d0bb',
    marginBottom: 8,
  }
  const val: CSSProperties = {
    fontSize: 19,
    fontWeight: 700,
    letterSpacing: 0.5,
    color: '#fff',
  }

  return (
    <div
      style={{
        width: 1496,
        height: 577,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        display: 'flex',
        border: isDark ? '3px solid #2B2A28' : `3px solid ${ticketColor}`,
        borderRadius: 6,
        overflow: 'hidden',
        background: ticketColor,
        boxSizing: 'border-box',
        color: '#fff',
        flexShrink: 0,
        boxShadow: isDark
          ? '0 24px 60px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8)'
          : '0 24px 60px rgba(0,0,0,0.85)',
        transition: 'border-color 0.3s, background 0.3s',
      }}
    >
      {/* Main Ticket Body (Left 1152px) */}
      <div
        style={{
          position: 'relative',
          width: 1152,
          height: '100%',
          flexShrink: 0,
          background: `#1c2a36 url(${ticket.image}) center/cover no-repeat`,
          padding: '48px 58px',
          boxSizing: 'border-box',
        }}
      >
        {/* Atmospheric Gradient Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(14,24,34,.78), rgba(14,24,34,.55) 60%, rgba(14,24,34,.35))',
          }}
        />

        <div style={{ position: 'relative' }}>
          {/* Header: Skewed BEL Mark + Brand Words + Season Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 70,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img
                src={belLogo}
                alt="BEL Official Emblem"
                style={{
                  width: 52,
                  height: 52,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
                }}
              />
              <div>
                <div style={{ font: '700 19px Georgia, serif', letterSpacing: 3 }}>
                  {ticket.brand}
                </div>
                <div
                  style={{
                    fontSize: 9.5,
                    letterSpacing: 2.2,
                    marginTop: 5,
                    color: '#e9e4d6',
                  }}
                >
                  {ticket.brandSub}
                </div>
              </div>
            </div>

            <div
              style={{
                background: ticketColor,
                color: ticketInk,
                border: isDark ? '1px solid rgba(255,255,255,0.3)' : undefined,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 2,
                padding: '12px 18px',
                borderRadius: 2,
                transition: 'background 0.3s, color 0.3s',
                textTransform: 'uppercase',
              }}
            >
              {ticket.badge}
            </div>
          </div>

          {/* Horizontal Divider */}
          <div
            style={{
              height: 2,
              background: isDark ? 'rgba(255,255,255,0.3)' : ticketColor,
              opacity: 0.85,
              marginTop: 16,
              transition: 'background 0.3s',
            }}
          />

          {/* Eyebrow */}
          <div
            style={{
              marginTop: 30,
              fontSize: 12,
              letterSpacing: 3,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : ticketColor,
              opacity: 0.9,
              textTransform: 'uppercase',
            }}
          >
            {ticket.eyebrow}
          </div>

          {/* Main Event Title in Solid Rectangular Banner */}
          <div style={{ marginTop: 12 }}>
            <span
              style={{
                display: 'inline-block',
                background: ticketColor,
                color: ticketInk,
                font: 'bold 92px/1 Helvetica, Arial, sans-serif',
                padding: '6px 18px 8px',
                border: isDark ? '2px solid rgba(255,255,255,0.35)' : undefined,
                boxShadow: '0 4px 14px rgba(0,0,0,.6)',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                transition: 'background 0.3s, color 0.3s',
              }}
            >
              {ticket.title}
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: 14,
              font: '17px Georgia, serif',
              color: '#e9e6de',
            }}
          >
            {ticket.subtitle}
          </div>

          {/* Meta Grid (Date, Venue - Time Removed) */}
          <div
            style={{
              display: 'flex',
              marginTop: 38,
              borderTop: `1px solid ${ticketLine}`,
              borderBottom: `1px solid ${ticketLine}`,
              height: 77,
              alignItems: 'center',
            }}
          >
            {[
              [ticket.dateLabel, ticket.date],
              [ticket.venueLabel, ticket.venue],
            ].map(([l, v], i) => (
              <div
                key={i}
                style={{
                  paddingLeft: i === 0 ? 0 : 28,
                  borderLeft: i === 0 ? 'none' : `1px solid ${ticketLine}`,
                  paddingRight: i === 1 ? 0 : 40,
                  marginRight: i === 1 ? 0 : 40,
                }}
              >
                <div style={{ ...lab, color: isDark ? '#C5A15A' : ticketColor }}>{l}</div>
                <div style={val}>{v}</div>
              </div>
            ))}
          </div>

          {/* Performers / Guests */}
          <div style={{ marginTop: 25 }}>
            <div style={{ ...lab, color: isDark ? '#C5A15A' : ticketColor }}>
              {ticket.perfLabel}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                fontSize: 13.5,
                letterSpacing: 0.8,
                color: '#f1eee6',
              }}
            >
              {ticket.performers.map((p, i) => (
                <span
                  key={i}
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  {i > 0 && (
                    <span
                      style={{
                        margin: '0 12px',
                        opacity: 0.7,
                        color: ticketColor,
                      }}
                    >
                      ·
                    </span>
                  )}
                  <span>{p}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Footer Line */}
          <div
            style={{
              marginTop: 28,
              fontSize: 11,
              letterSpacing: 1.8,
              color: '#d8d3c6',
              textTransform: 'uppercase',
            }}
          >
            {ticket.footer}
          </div>
        </div>
      </div>

      {/* Stub (Right Side) */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          borderLeft: `2px dashed ${ticketInk}`,
          color: ticketInk,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '38px 20px 36px',
          background: ticketColor,
          boxSizing: 'border-box',
          transition: 'background 0.3s, color 0.3s, border-color 0.3s',
        }}
      >
        {/* Authentic Top & Bottom Punch Semi-Circles */}
        {(
          [
            { top: 30 },
            { bottom: 30 },
          ] as CSSProperties[]
        ).map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: -14,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0B0B0A',
              border: `1px solid ${ticketInk}`,
              ...pos,
            }}
          />
        ))}

        {/* Stub Top Text */}
        <div
          style={{
            fontSize: 10.5,
            letterSpacing: 2.2,
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          {ticket.stubTop}
        </div>

        {/* Stub Brand Seal or Franchise Crest — no circle border */}
        <div
          style={{
            width: ticket.franchiseLogo ? 128 : 128,
            height: ticket.franchiseLogo ? 128 : 128,
            border: 'none',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            background: 'transparent',
          }}
        >
          {ticket.franchiseLogo ? (
            <img
              src={ticket.franchiseLogo}
              alt={ticket.franchiseName || ticket.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))',
              }}
            />
          ) : (
            <img
              src={belLogo}
              alt="BEL Official Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(197,161,90,0.35))',
              }}
            />
          )}
        </div>

        {/* Stub Event Title & Venue (Time Removed) */}
        <div
          style={{
            fontSize: 17,
            letterSpacing: 2.5,
            fontWeight: 700,
            lineHeight: 1.3,
            maxWidth: 200,
            textTransform: 'uppercase',
          }}
        >
          {ticket.title}
        </div>

        <div
          style={{
            fontSize: 12,
            letterSpacing: 2,
            fontWeight: 700,
          }}
        >
          {ticket.date}
        </div>

        <div style={{ width: 54, height: 1, background: ticketInk }} />

        <div style={{ fontSize: 10.5, letterSpacing: 1.6, textTransform: 'uppercase' }}>
          {ticket.venue}
        </div>

        {/* Stub Bottom Organization Title */}
        <div
          style={{
            fontSize: 10,
            letterSpacing: 2.2,
            fontWeight: 700,
          }}
        >
          {ticket.stubBottom}
        </div>
      </div>
    </div>
  )
}

export default function TicketsPage({
  onNavigateHome,
}: {
  onNavigateHome?: () => void
} = {}) {
  const [selectedId, setSelectedId] = useState<string>(getInitialEventId)
  const [scale, setScale] = useState<number>(1)
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false)
  const [viewAllSubtickets, setViewAllSubtickets] = useState<boolean>(false)

  const wrapRef = useRef<HTMLDivElement>(null)

  // Selected ticket lookup (handles both main events and city subtickets)
  const selectedTicket =
    ALL_TICKETS.find((t) => t.id === selectedId) || ALL_TICKETS[0]

  const isSelectionTourActive =
    selectedId === 'selection' ||
    selectedTicket.parentEventId === 'selection' ||
    selectedId.startsWith('selection-')

  const ticketColor = selectedTicket.color || '#C8B78B'
  const isDarkSelected = isDarkColor(ticketColor)
  const ticketInk = selectedTicket.inkColor || (isDarkSelected ? '#F2E9D7' : '#1F2A30')

  // Listen to hash changes if an event is passed via URL query
  useEffect(() => {
    const onHash = () => {
      const id = getInitialEventId()
      setSelectedId(id)
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Dynamic ticket auto-scaling
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const fit = () => {
      const containerWidth = el.clientWidth || window.innerWidth - 32
      setScale(Math.min(1, Math.max(0.22, containerWidth / 1496)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [])

  const navigateToHome = () => {
    if (onNavigateHome) {
      onNavigateHome()
    } else {
      window.location.hash = '#top'
    }
  }

  const handleSelectTicket = (id: string) => {
    setSelectedId(id)
    setBookingSuccess(false)
    try {
      window.history.replaceState(null, '', `#/tickets?id=${id}`)
    } catch (e) {
      // ignore
    }
  }

  // Selected dropdown representations for mobile
  const selectedMainEventValue = isSelectionTourActive ? 'selection' : selectedId
  const selectedCityValue = selectedId.startsWith('selection-') ? selectedId : 'selection-chennai'

  // Helper to switch to next/previous city subticket
  const currentCityIndex = SELECTION_SUBTICKETS.findIndex(
    (c) => c.id === selectedTicket.id
  )

  const selectNextCity = () => {
    const nextIdx = (currentCityIndex + 1) % SELECTION_SUBTICKETS.length
    handleSelectTicket(SELECTION_SUBTICKETS[nextIdx].id)
  }

  const selectPrevCity = () => {
    const prevIdx =
      (currentCityIndex - 1 + SELECTION_SUBTICKETS.length) %
      SELECTION_SUBTICKETS.length
    handleSelectTicket(SELECTION_SUBTICKETS[prevIdx].id)
  }

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F2E9D7] flex flex-col justify-between">
      {/* ─── Top Page Bar with Back Button ─── */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/10 bg-[#0B0B0A]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1496px] items-center justify-between px-4 sm:px-8 lg:px-16">
          <button
            onClick={navigateToHome}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img
              src={belLogo}
              alt="BEL Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(197,161,90,0.4)]"
            />
            <span className="bel-wordmark text-xl text-[#F2E9D7]">
              BEL
            </span>
            <span className="ml-2 font-heading text-xs tracking-[0.24em] text-[#C5A15A] uppercase border-l border-white/15 pl-3 hidden sm:inline">
              OFFICIAL TICKETS
            </span>
          </button>

          <button
            onClick={navigateToHome}
            className="group inline-flex items-center gap-2 border border-[#C5A15A]/60 bg-[#191816] px-5 py-2 font-heading text-xs font-semibold tracking-[0.2em] text-[#F2E9D7] uppercase transition-all duration-300 hover:border-[#C5A15A] hover:bg-[#C5A15A] hover:text-[#0B0B0A] cursor-pointer"
          >
            <span>←</span>
            <span>BACK TO MAIN SITE</span>
          </button>
        </div>
      </header>

      {/* ─── Main Ticket Page Content ─── */}
      <main className="mx-auto w-full max-w-[1496px] px-4 sm:px-8 lg:px-16 py-10 sm:py-14 flex-1">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-heading text-xs font-semibold tracking-[0.3em] text-[#C5A15A] uppercase">
                SEASON 1 · OFFICIAL MATCH TICKETS
              </span>
              <span className="h-[1px] w-8 bg-[#C5A15A]" />
            </div>

            <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.88] tracking-[0.01em] uppercase text-[#F2E9D7]">
              SELECT YOUR <span className="text-[#C5A15A]">PASS.</span>
            </h1>

            <p className="mt-3 font-body text-xs sm:text-sm text-[#A7A095] max-w-2xl leading-relaxed">
              Official tickets for all Season 1 championship events and regional Selection Tour trials. Select an event below to preview your pass and complete reservation.
            </p>
          </div>

          <div className="self-start lg:self-end flex items-center gap-2">
            <span className="inline-flex items-center gap-2 border border-[#C5A15A]/60 bg-[#C5A15A]/10 px-4 py-2 font-heading text-xs tracking-[0.2em] text-[#C5A15A] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C5A15A] animate-ping" />
              5 MAIN EVENTS · 6 TOUR SUBTICKETS
            </span>
          </div>
        </div>

        {/* ─── Mobile View Ticket Selectors (Drop-down lists) ─── */}
        <div className="mt-6 block sm:hidden space-y-3">
          {/* Main Event Pass Dropdown */}
          <div className="bg-[#141210] border border-[#C5A15A]/60 p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="mobile-ticket-select" className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#C5A15A] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A15A]" />
                SELECT EVENT PASS
              </label>
              <span className="text-[9.5px] font-heading font-semibold text-[#A7A095] uppercase">
                5 OFFICIAL PASSES
              </span>
            </div>

            <div className="relative">
              <select
                id="mobile-ticket-select"
                value={selectedMainEventValue}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === 'selection') {
                    handleSelectTicket('selection-chennai')
                  } else {
                    handleSelectTicket(val)
                  }
                }}
                className="w-full appearance-none bg-[#0B0B0A] border border-white/20 text-[#F2E9D7] font-heading text-xs font-bold uppercase tracking-wider py-3.5 pl-3.5 pr-10 focus:border-[#C5A15A] focus:outline-none transition-colors cursor-pointer"
              >
                {MAIN_EVENTS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#161513] text-[#F2E9D7] py-2">
                    {m.name} · {m.discountPrice}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#C5A15A]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Selection Tour City Dropdown: only appears if user selects Selection Tour */}
          {isSelectionTourActive && (
            <div className="bg-[#161513] border border-[#C8B78B] p-3.5 shadow-[0_4px_20px_rgba(200,183,139,0.2)] animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="mobile-city-select" className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#C8B78B] uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8B78B] animate-pulse" />
                  CHOOSE SELECTION TOUR PLACE
                </label>
                <span className="text-[9px] font-heading font-bold text-[#C8B78B] uppercase px-1.5 py-0.5 border border-[#C8B78B]/40 bg-[#C8B78B]/10">
                  6 CITIES · ₹499
                </span>
              </div>

              <div className="relative">
                <select
                  id="mobile-city-select"
                  value={selectedCityValue}
                  onChange={(e) => handleSelectTicket(e.target.value)}
                  className="w-full appearance-none bg-[#0B0B0A] border border-[#C8B78B]/70 text-[#F2E9D7] font-heading text-xs font-bold uppercase tracking-wider py-3.5 pl-3.5 pr-10 focus:border-[#C8B78B] focus:outline-none transition-colors cursor-pointer"
                >
                  {SELECTION_SUBTICKETS.map((city) => (
                    <option key={city.id} value={city.id} className="bg-[#161513] text-[#F2E9D7] py-2">
                      {city.city} ({city.franchiseName}) · {city.date}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#C8B78B]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] font-heading text-[#A7A095]">
                <span className="truncate mr-2">Venue: <strong className="text-[#F2E9D7]">{selectedTicket.venue}</strong></span>
                <span className="text-[#C8B78B] font-bold shrink-0">{selectedTicket.date}</span>
              </div>
            </div>
          )}
        </div>

        {/* ─── 5 Main Event Ticket Selector Cards (Desktop / Tablet View) ─── */}
        <div className="hidden sm:grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {MAIN_EVENTS.map((t) => {
            const isSelected =
              t.id === selectedId ||
              (t.id === 'selection' && isSelectionTourActive)
            const isDarkT = isDarkColor(t.color)

            return (
              <button
                key={t.id}
                onClick={() => {
                  if (t.id === 'selection') {
                    // Default to Chennai when Selection Tour is clicked
                    handleSelectTicket('selection-chennai')
                  } else {
                    handleSelectTicket(t.id)
                  }
                }}
                className={`text-left p-4 border transition-all duration-300 relative flex flex-col justify-between min-h-[148px] group cursor-pointer ${
                  isSelected
                    ? 'bg-[#191816] shadow-[0_0_24px_rgba(0,0,0,0.8)]'
                    : 'bg-[#121110] border-white/5 hover:border-white/30 hover:bg-[#191816]'
                }`}
                style={{
                  borderColor: isSelected ? (isDarkT ? '#F2E9D7' : t.color) : undefined,
                  boxShadow: isSelected
                    ? isDarkT
                      ? '0 0 24px rgba(255,255,255,0.25)'
                      : `0 0 24px ${t.color}40`
                    : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-heading text-[9px] tracking-[0.16em] uppercase px-1.5 py-0.5 font-bold"
                      style={{
                        background: t.color,
                        color: t.inkColor || (isDarkT ? '#F2E9D7' : '#1F2A30'),
                        border: isDarkT ? '1px solid rgba(255,255,255,0.3)' : undefined,
                      }}
                    >
                      {t.badgeLabel}
                    </span>
                    {isSelected && (
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: isDarkT ? '#FFFFFF' : t.color }}
                      />
                    )}
                  </div>

                  <h3
                    className="font-heading text-xs sm:text-[13px] font-bold text-[#F2E9D7] tracking-wider uppercase transition-colors leading-snug"
                    style={{
                      color: isSelected ? (isDarkT ? '#FFFFFF' : t.color) : undefined,
                    }}
                  >
                    {t.name}
                  </h3>

                  <p className="mt-1 font-body text-[11px] text-[#A7A095] line-clamp-2 leading-tight">
                    {t.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-baseline gap-2">
                  <span className="text-xs text-[#A7A095] line-through font-medium">
                    {t.originalPrice}
                  </span>
                  <span
                    className="font-display text-xl sm:text-2xl font-bold"
                    style={{ color: isDarkT ? '#FFFFFF' : t.color }}
                  >
                    {t.discountPrice}
                  </span>
                  {t.priceSuffix && (
                    <span className="text-[9px] text-[#A7A095] tracking-wider uppercase">
                      {t.priceSuffix}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* ─── Selection Tour 6 City Subtickets Sub-Bar (Desktop / Tablet View) ─── */}
        {isSelectionTourActive && (
          <div className="hidden sm:block mt-6 border border-[#C8B78B]/40 bg-[#161513] p-4 sm:p-5 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C8B78B] animate-pulse" />
                <span className="font-heading text-xs font-bold tracking-[0.22em] text-[#C8B78B] uppercase">
                  SELECTION TOUR · 6 CITY SUBTICKETS
                </span>
                <span className="hidden md:inline font-heading text-[10px] tracking-wider text-[#A7A095] uppercase border-l border-white/15 pl-2.5">
                  ₹499 SPECIAL OFFER · EXACT SAME BEL FORMAT
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setViewAllSubtickets(!viewAllSubtickets)}
                  className="border border-[#C8B78B]/60 bg-[#C8B78B]/10 px-3 py-1.5 font-heading text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-[#C8B78B] uppercase hover:bg-[#C8B78B] hover:text-[#0B0B0A] transition-colors cursor-pointer"
                >
                  {viewAllSubtickets ? '← SINGLE TICKET VIEW' : 'VIEW ALL 6 CITY PASSES →'}
                </button>
              </div>
            </div>

            {/* 6 City Cards Grid (Chennai, Coimbatore, Madurai, Trichy, Salem, Kanyakumari) */}
            <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {SELECTION_SUBTICKETS.map((cityTicket) => {
                const isCityActive = selectedTicket.id === cityTicket.id
                return (
                  <button
                    key={cityTicket.id}
                    onClick={() => handleSelectTicket(cityTicket.id)}
                    className={`text-left p-3 border transition-all duration-300 relative flex flex-col justify-between group cursor-pointer ${
                      isCityActive
                        ? 'bg-[#22201D] border-[#C8B78B] shadow-[0_0_16px_rgba(200,183,139,0.35)]'
                        : 'bg-[#121110] border-white/10 hover:border-[#C8B78B]/50 hover:bg-[#1a1917]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <img
                          src={cityTicket.franchiseLogo}
                          alt={cityTicket.city}
                          className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110"
                        />
                        {isCityActive && (
                          <span className="w-2 h-2 rounded-full bg-[#C8B78B] animate-pulse" />
                        )}
                      </div>

                      <h4
                        className={`font-heading text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-colors ${
                          isCityActive ? 'text-[#C8B78B]' : 'text-[#F2E9D7] group-hover:text-[#C8B78B]'
                        }`}
                      >
                        {cityTicket.city}
                      </h4>

                      <p className="font-heading text-[10px] text-[#A7A095] tracking-wide uppercase mt-0.5">
                        {cityTicket.franchiseName}
                      </p>

                      <div className="mt-1.5 font-heading text-[10px] font-semibold text-[#C8B78B]/90 tracking-wider">
                        {cityTicket.date}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-baseline justify-between">
                      <span className="text-[10px] text-[#A7A095] line-through">
                        {cityTicket.originalPrice}
                      </span>
                      <span className="font-display text-base font-bold text-[#C8B78B]">
                        {cityTicket.discountPrice}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ─── Premium Action Bar (Themed with Selected Ticket Color) ─── */}
        <div
          className="mt-8 p-4 bg-[#191816] border flex flex-wrap items-center justify-between gap-4 transition-colors"
          style={{ borderColor: isDarkSelected ? 'rgba(255,255,255,0.25)' : `${ticketColor}60` }}
        >
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 font-heading text-[10px] font-bold tracking-widest uppercase"
              style={{
                background: ticketColor,
                color: ticketInk,
                border: isDarkSelected ? '1px solid rgba(255,255,255,0.3)' : undefined,
              }}
            >
              {selectedTicket.badgeLabel}
            </span>
            <div>
              <span className="font-heading text-sm font-bold text-[#F2E9D7] uppercase tracking-wide block">
                {selectedTicket.name} {selectedTicket.franchiseName && `— ${selectedTicket.franchiseName}`}
              </span>
              <span className="font-body text-xs text-[#A7A095]">
                {selectedTicket.date} · {selectedTicket.venue}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* City Nav Pills when inside Selection Tour */}
            {isSelectionTourActive && currentCityIndex >= 0 && (
              <div className="hidden sm:flex items-center gap-1.5 border border-white/10 px-2.5 py-1 bg-[#121110]">
                <button
                  onClick={selectPrevCity}
                  className="px-2 py-0.5 text-xs text-[#A7A095] hover:text-[#C8B78B] font-heading font-bold uppercase transition-colors cursor-pointer"
                  title="Previous City"
                >
                  ← PREV
                </button>
                <span className="text-[10px] text-[#C8B78B] font-heading font-semibold px-1">
                  {currentCityIndex + 1} / {SELECTION_SUBTICKETS.length}
                </span>
                <button
                  onClick={selectNextCity}
                  className="px-2 py-0.5 text-xs text-[#A7A095] hover:text-[#C8B78B] font-heading font-bold uppercase transition-colors cursor-pointer"
                  title="Next City"
                >
                  NEXT →
                </button>
              </div>
            )}

            <div className="text-right">
              <span className="block text-[10px] font-heading tracking-wider text-[#A7A095] uppercase">
                PRICE
              </span>
              <span
                className="font-display text-xl sm:text-2xl font-bold"
                style={{ color: isDarkSelected ? '#FFFFFF' : ticketColor }}
              >
                {selectedTicket.discountPrice}{' '}
                <span className="text-xs text-[#A7A095] line-through font-normal ml-1">
                  {selectedTicket.originalPrice}
                </span>
              </span>
            </div>

            <button
              onClick={() => setBookingSuccess(true)}
              className="px-7 sm:px-9 py-3 font-heading text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              style={{
                background: ticketColor,
                color: ticketInk,
                border: isDarkSelected ? '1px solid rgba(255,255,255,0.35)' : undefined,
              }}
            >
              BOOK THIS PASS →
            </button>
          </div>
        </div>

        {/* Booking Notification Banner */}
        {bookingSuccess && (
          <div
            className="mt-4 p-4 bg-[#191816] border flex items-center justify-between animate-fadeIn"
            style={{ borderColor: isDarkSelected ? '#FFFFFF' : ticketColor }}
          >
            <div className="flex items-center gap-3">
              <img
                src={belLogo}
                alt="BEL Official"
                className="w-8 h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(197,161,90,0.5)] shrink-0"
              />
              <div>
                <span
                  className="font-heading text-xs font-bold uppercase block"
                  style={{ color: isDarkSelected ? '#FFFFFF' : ticketColor }}
                >
                  PASS RESERVED: {selectedTicket.name} ({selectedTicket.discountPrice})
                </span>
                <span className="font-body text-xs text-[#A7A095]">
                  Your pass has been locked in for Boxing Entertainment League Season 1 · {selectedTicket.venue}.
                </span>
              </div>
            </div>
            <button
              onClick={() => setBookingSuccess(false)}
              className="text-xs font-heading tracking-widest text-[#A7A095] hover:text-[#F2E9D7] uppercase cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        )}

        {/* ─── Exact BEL Ticket Template (Single or All 6 Subtickets View) ─── */}
        {!viewAllSubtickets ? (
          /* Single Ticket Interactive Preview */
          <div
            ref={wrapRef}
            className="mt-6 w-full overflow-hidden flex justify-center"
            style={{ height: 577 * scale + 8 }}
          >
            <BelTicket ticket={selectedTicket} scale={scale} />
          </div>
        ) : (
          /* Stacked View: All 6 City Subtickets in Exact Same Format */
          <div className="mt-8 space-y-12">
            <div className="flex items-center justify-between pb-3 border-b border-[#C8B78B]/30">
              <span className="font-heading text-sm font-bold tracking-[0.2em] text-[#C8B78B] uppercase">
                ALL 6 SELECTION TOUR SUBTICKETS · EXACT SAME BEL FORMAT
              </span>
              <button
                onClick={() => setViewAllSubtickets(false)}
                className="text-xs font-heading text-[#A7A095] hover:text-[#F2E9D7] uppercase tracking-wider cursor-pointer"
              >
                ✕ Switch to Single View
              </button>
            </div>

            {SELECTION_SUBTICKETS.map((cityTicket, idx) => (
              <div key={cityTicket.id} className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg text-[#C8B78B]">
                      0{idx + 1}.
                    </span>
                    <span className="font-heading text-sm font-bold uppercase tracking-wider text-[#F2E9D7]">
                      {cityTicket.city} ({cityTicket.franchiseName})
                    </span>
                    <span className="font-body text-xs text-[#A7A095]">
                      · {cityTicket.date} · {cityTicket.venue}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg font-bold text-[#C8B78B]">
                      {cityTicket.discountPrice}{' '}
                      <span className="text-xs text-[#A7A095] line-through font-normal">
                        {cityTicket.originalPrice}
                      </span>
                    </span>
                    <button
                      onClick={() => {
                        handleSelectTicket(cityTicket.id)
                        setViewAllSubtickets(false)
                        setBookingSuccess(true)
                      }}
                      className="border border-[#C8B78B] bg-[#C8B78B]/10 hover:bg-[#C8B78B] hover:text-[#0B0B0A] px-4 py-1.5 font-heading text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      BOOK THIS PASS →
                    </button>
                  </div>
                </div>

                <div
                  className="w-full overflow-hidden flex justify-center"
                  style={{ height: 577 * scale + 8 }}
                >
                  <BelTicket ticket={cityTicket} scale={scale} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
