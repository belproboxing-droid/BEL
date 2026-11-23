import { useState } from 'react'
import belLogo from '../assets/images/bel-logo.webp'

const links = [
  { label: 'ABOUT', href: '#about' },
  { label: 'TEAMS', href: '#teams' },
  { label: 'EVENTS', href: '#events' },
  { label: 'TICKETS', href: '#/tickets' },
  { label: 'SPONSORS', href: '#sponsorship' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="absolute md:fixed inset-x-0 top-0 z-[100] w-full bg-gradient-to-b from-[#0B0B0A]/90 to-transparent transition-all">
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Left: BEL Official Emblem & Uniform Brand Lockup */}
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src={belLogo}
            alt="Boxing Entertainment League Official Logo"
            className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(197,161,90,0.4)]"
          />
          <div className="flex items-center">
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#F2E9D7] leading-none">
              BEL
            </span>
            <span className="ml-2.5 font-heading text-[10px] sm:text-xs tracking-[0.24em] text-[#C5A15A] uppercase border-l border-white/20 pl-2.5 hidden xs:inline">
              BOXING LEAGUE
            </span>
          </div>
        </a>

        {/* Center: Navigation Links matching Template */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="py-1 font-heading text-xs tracking-[0.24em] text-[#A7A095] uppercase transition-colors duration-200 hover:text-[#F2E9D7]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Crown Icon + SEASON 1 Badge + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#/tickets"
            className="group inline-flex items-center gap-2 px-4 py-1.5 border border-[#C5A15A]/60 bg-[#0B0B0A]/70 text-[#F2E9D7] hover:border-[#C5A15A] hover:bg-[#C5A15A] hover:text-[#0B0B0A] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          >
            {/* Crown Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-[#C5A15A] group-hover:text-[#0B0B0A] transition-colors"
              fill="currentColor"
            >
              <path d="M2 19h20v2H2v-2zm1.5-12l4.5 4.5L12 4l4 7.5L20.5 7 19 17H5L3.5 7z" />
            </svg>
            <span className="font-heading text-xs font-semibold tracking-[0.22em] uppercase">
              SEASON 1
            </span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 border border-white/10 bg-[#0B0B0A]/80 text-[#F2E9D7] hover:border-[#C5A15A]/60 hover:text-[#C5A15A] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0B0B0A]/95 backdrop-blur-md px-6 py-4 shadow-2xl">
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-heading text-xs tracking-[0.24em] text-[#F2E9D7] hover:text-[#C5A15A] uppercase border-b border-white/5 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
