import belLogo from '../assets/images/bel-logo.webp'

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative w-full overflow-hidden bg-[#0B0B0A] py-16 sm:py-20 md:py-24 border-b border-[#C5A15A]/25 text-[#F2E9D7]"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Portrait & Founder Credentials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6">
            {/* Founder Silhouette / Portrait Frame */}
            <div className="relative w-36 h-48 sm:w-44 sm:h-56 shrink-0 bg-gradient-to-b from-[#191816] to-[#0B0B0A] border border-[#C5A15A]/40 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.8)] flex items-end justify-center">
              <svg viewBox="0 0 24 24" className="w-28 h-28 text-[#C5A15A]/40 mb-2" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent" />
              {/* Official League Seal on Portrait Frame */}
              <div className="absolute top-2 right-2 p-1 bg-[#0B0B0A]/80 border border-[#C5A15A]/40 rounded-full shadow-md">
                <img src={belLogo} alt="BEL Crest" className="w-5 h-5 object-contain" />
              </div>
            </div>

            {/* Founder Bio Block */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <img src={belLogo} alt="BEL" className="w-4 h-4 object-contain filter drop-shadow-[0_1px_4px_rgba(197,161,90,0.5)]" />
                <span className="font-heading text-xs font-semibold tracking-[0.3em] text-[#C5A15A] uppercase">
                  FOUNDER NOTE
                </span>
              </div>

              <h3 className="mt-1 font-heading text-xl sm:text-2xl font-bold text-[#F2E9D7] tracking-wide">
                DR BALAJI SRINIVASAN
              </h3>

              <p className="font-heading text-xs text-[#C5A15A] tracking-[0.2em] uppercase mt-0.5">
                FOUNDER &amp; LEGAL HEAD · BEL
              </p>

              <p className="font-heading text-[10px] text-[#A7A095] tracking-[0.16em] uppercase mt-0.5">
                MA, LLB, B.Tech, BSc, Ph D (H.C.)
              </p>

              <p className="mt-4 font-body text-xs sm:text-sm text-[#A7A095] leading-relaxed">
                Dr Balaji Srinivasan is a professional boxing athlete, sports league architect, and a practicing advocate with a multidisciplinary background that spans competitive sports, legal governance, human rights, and large-scale event management.
              </p>

              <div className="mt-3 w-12 h-[1px] bg-[#C5A15A]" />
            </div>
          </div>

          {/* Right Column: Big Metrics, Honors Sub-bar & Vertical Brand Badge (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Top 2 Big Numbers with Plaque */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="grid grid-cols-2 gap-6 flex-1">
                <div>
                  <span className="font-display text-4xl sm:text-5xl text-[#F2E9D7] leading-none block">
                    10+
                  </span>
                  <span className="mt-1 font-heading text-[10px] tracking-[0.22em] text-[#A7A095] uppercase block">
                    YEARS
                  </span>
                  <span className="font-heading text-xs tracking-[0.2em] text-[#C5A15A] uppercase font-medium block">
                    COMBAT SPORTS
                  </span>
                </div>

                <div>
                  <span className="font-display text-4xl sm:text-5xl text-[#F2E9D7] leading-none block">
                    3+
                  </span>
                  <span className="mt-1 font-heading text-[10px] tracking-[0.22em] text-[#A7A095] uppercase block">
                    YEARS
                  </span>
                  <span className="font-heading text-xs tracking-[0.2em] text-[#C5A15A] uppercase font-medium block">
                    ACTIVE LEGAL PRACTICE
                  </span>
                </div>
              </div>

              {/* Vertical Plaque matching template */}
              <div className="p-3 border border-[#C5A15A]/40 bg-[#191816] text-center font-heading text-[10px] tracking-[0.26em] text-[#C5A15A] uppercase shrink-0">
                <p>DISCIPLINE</p>
                <p>BUILDS</p>
                <p className="text-[#F2E9D7] font-semibold">FREEDOM</p>
              </div>
            </div>

            {/* Bottom Honors Sub-bar */}
            <div>
              <span className="font-heading text-[10px] tracking-[0.24em] text-[#8C6B37] uppercase block mb-3 font-semibold">
                HONORS & CHAMPIONSHIPS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="p-3 bg-[#191816] border border-white/5">
                  <span className="font-heading text-xs text-[#F2E9D7] font-semibold block">2005</span>
                  <span className="font-body text-[11px] text-[#A7A095] leading-tight block mt-0.5">
                    SGFI NATIONAL BRONZE
                  </span>
                  <span className="font-body text-[10px] text-[#8C6B37] block mt-0.5">Ludhiana, Punjab</span>
                </div>

                <div className="p-3 bg-[#191816] border border-white/5">
                  <span className="font-heading text-xs text-[#F2E9D7] font-semibold block">2010</span>
                  <span className="font-body text-[11px] text-[#A7A095] leading-tight block mt-0.5">
                    UNIVERSITY NATIONALS
                  </span>
                  <span className="font-body text-[10px] text-[#8C6B37] block mt-0.5">Jodhpur, Rajasthan</span>
                </div>

                <div className="p-3 bg-[#191816] border border-[#C5A15A]/30">
                  <span className="font-heading text-xs text-[#C5A15A] font-semibold block">TAMIL NADU STATE</span>
                  <span className="font-body text-[11px] text-[#F2E9D7] leading-tight block mt-0.5 font-medium">
                    2 GOLD / 3 SILVER
                  </span>
                  <span className="font-body text-[10px] text-[#8C6B37] block mt-0.5">School & State Champ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
