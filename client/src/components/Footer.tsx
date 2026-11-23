import belLogo from '../assets/images/bel-logo.webp'

const links = [
  { label: 'ABOUT', href: '#about' },
  { label: 'TEAMS', href: '#teams' },
  { label: 'EVENTS', href: '#events' },
  { label: 'TICKETS', href: '#/tickets' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-20 w-full overflow-hidden bg-[#0B0B0A] text-[#F2E9D7] py-10 sm:py-12 border-t border-[#C5A15A]/25 rounded-t-[28px] shadow-[0_-24px_60px_rgba(0,0,0,0.65)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Main Bar matching Template */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Left: BEL Official Emblem + Wordmark */}
          <a href="#top" className="flex items-center gap-3 group">
            <img
              src={belLogo}
              alt="BEL Official Emblem"
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(197,161,90,0.35)]"
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-[0.14em] text-[#F2E9D7] leading-none">
                BEL
              </span>
              <span className="font-heading text-[8px] tracking-[0.2em] text-[#C5A15A] uppercase mt-0.5">
                BOXING ENTERTAINMENT LEAGUE
              </span>
            </div>
          </a>

          {/* Center: Clean Nav Links matching template */}
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-heading text-xs tracking-[0.22em] text-[#A7A095] uppercase hover:text-[#F2E9D7] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://www.instagram.com/belproboxing?fqnt=MTl1MzJhOHY5YzVuYw=="
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs tracking-[0.22em] text-[#C5A15A] uppercase hover:text-[#F2E9D7] transition-colors inline-flex items-center gap-1.5"
              >
                <span>INSTAGRAM</span>
                <span>↗</span>
              </a>
            </li>
          </ul>

          {/* Right: BACK TO TOP action matching template */}
          <div>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 font-heading text-xs tracking-[0.2em] text-[#A7A095] hover:text-[#C5A15A] uppercase transition-colors"
            >
              <span>BACK TO TOP</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
            </button>
          </div>
        </div>

        {/* Bottom Line matching template */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-heading tracking-[0.18em] text-[#A7A095] uppercase">
          <p>© 2026 Boxing Entertainment League. All rights reserved.</p>
          <p className="text-[#8C6B37]">MORE THAN A SPORT. A STRONGER TOMORROW.</p>
        </div>
      </div>
    </footer>
  )
}
