import { useState } from 'react'
import { ScrollTypeSection, ScrollTypeText } from './ScrollTypeReveal'
import belLogo from '../assets/images/bel-logo.webp'

const categories = ['FRANCHISE', 'SPONSORSHIP', 'SCOUTING', 'MEDIA', 'VIP HOSPITALITY']

export default function Contact() {
  const [selectedCat, setSelectedCat] = useState('FRANCHISE')
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }
  return (
    <ScrollTypeSection
      id="contact"
      className="panel relative w-full overflow-hidden bg-[#0B0B0A] py-16 sm:py-20 md:py-24 text-[#F2E9D7]"
      style={{ '--bg': '#0B0B0A' } as React.CSSProperties}
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: CONTACT / LET'S BUILD THE NEXT CHAPTER. + Contact nodes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src={belLogo} alt="BEL" className="w-4 h-4 object-contain filter drop-shadow-[0_1px_4px_rgba(197,161,90,0.5)]" />
                <ScrollTypeText
                  as="span"
                  className="font-heading text-xs font-semibold tracking-[0.3em] text-[#C5A15A] uppercase"
                  start={0.04}
                  end={0.24}
                >
                  CONTACT
                </ScrollTypeText>
              </div>

              <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] tracking-[0.01em] text-[#F2E9D7] uppercase">
                <span className="block">
                  <ScrollTypeText as="span" start={0.16} end={0.42}>
                    LET'S BUILD
                  </ScrollTypeText>
                </span>
                <span className="block">
                  <ScrollTypeText as="span" start={0.4} end={0.65}>
                    THE NEXT CHAPTER.
                  </ScrollTypeText>
                </span>
              </h2>
            </div>

            {/* Contact Details List matching template */}
            <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <span className="font-heading text-[10px] tracking-[0.2em] text-[#C5A15A] uppercase w-20 shrink-0 mt-0.5">
                  HOTLINE
                </span>
                <a href="tel:+918110022211" className="font-body text-xs sm:text-sm text-[#F2E9D7] hover:text-[#C5A15A] transition-colors">
                  +91 81100 22211
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-heading text-[10px] tracking-[0.2em] text-[#C5A15A] uppercase w-20 shrink-0 mt-0.5">
                  EMAIL
                </span>
                <a
                  href="mailto:boxingentertainmentleague@gmail.com"
                  className="font-body text-xs sm:text-sm text-[#F2E9D7] hover:text-[#C5A15A] transition-colors truncate"
                >
                  boxingentertainmentleague@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-heading text-[10px] tracking-[0.2em] text-[#C5A15A] uppercase w-20 shrink-0 mt-0.5">
                  HQ
                </span>
                <span className="font-body text-xs sm:text-sm text-[#A7A095]">
                  T NAGAR, CHENNAI - 600017
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-heading text-[10px] tracking-[0.2em] text-[#C5A15A] uppercase w-20 shrink-0 mt-0.5">
                  INSTAGRAM
                </span>
                <a
                  href="https://www.instagram.com/belproboxing?fqnt=MTl1MzJhOHY5YzVuYw=="
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-xs sm:text-sm text-[#F2E9D7] hover:text-[#C5A15A] transition-colors"
                >
                  @belproboxing
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-heading text-[10px] tracking-[0.2em] text-[#C5A15A] uppercase w-20 shrink-0 mt-0.5">
                  YOUTUBE
                </span>
                <a
                  href="https://youtube.com/@belproboxing?si=F_IWOqN8R1cSi0C9"
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-xs sm:text-sm text-[#F2E9D7] hover:text-[#C5A15A] transition-colors"
                >
                  @belproboxing
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-heading text-[10px] tracking-[0.2em] text-[#C5A15A] uppercase w-20 shrink-0 mt-0.5">
                  WEB
                </span>
                <span className="font-body text-xs sm:text-sm text-[#C5A15A]">
                  belofficial.in
                </span>
              </div>
            </div>

            {/* League Mission & Governance Callout from Deck */}
            <div className="mt-8 p-4 bg-[#161513]/90 border-l-2 border-[#C5A15A] border-t border-r border-b border-white/5 flex items-start gap-3">
              <img src={belLogo} alt="BEL Crest" className="w-8 h-8 object-contain mt-0.5 shrink-0 filter drop-shadow-[0_2px_8px_rgba(197,161,90,0.4)]" />
              <div>
                <span className="font-heading text-[9px] font-semibold tracking-[0.24em] text-[#C5A15A] uppercase block">
                  ONE RING. SIX CITIES. A STRONGER TOMORROW.
                </span>
                <p className="mt-1 font-body text-[11px] sm:text-xs text-[#A7A095] leading-relaxed">
                  BEL is structured with professional governance, athlete insurance &amp; structured championship-pathway training. Direct queries for franchise acquisition, title sponsorship and athlete scouting are processed by our executive legal desk.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: SEND A MESSAGE Form matching template (7 cols) */}
          <div className="lg:col-span-7 bg-[#191816] p-7 sm:p-9 border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
            <span className="font-heading text-xs font-semibold tracking-[0.26em] text-[#C5A15A] uppercase block mb-4">
              SEND A MESSAGE
            </span>

            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((cat) => <button key={cat} type="button" onClick={() => setSelectedCat(cat)} className={`px-3 py-1 font-heading text-[10px] sm:text-[11px] tracking-[0.18em] uppercase transition-all ${selectedCat === cat ? 'bg-[#C5A15A] text-[#0B0B0A] font-semibold' : 'bg-[#0B0B0A] text-[#A7A095] border border-white/10 hover:border-[#C5A15A]/40 hover:text-[#F2E9D7]'}`}>{cat}</button>)}
            </div>
            {submitted ? <div className="p-6 bg-[#0B0B0A] border border-[#C5A15A] text-center my-4"><span className="font-display text-2xl text-[#C5A15A] uppercase block">MESSAGE TRANSMITTED</span><p className="mt-1 font-body text-xs text-[#A7A095]">Thank you. Our legal & executive desk will respond within 24 hours.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-4 font-heading text-xs tracking-[0.2em] text-[#C5A15A] hover:underline uppercase">Submit another message</button></div> : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-[#0B0B0A] border border-white/10 focus:border-[#C5A15A] px-4 py-3 font-body text-xs sm:text-sm text-[#F2E9D7] placeholder-[#A7A095]/40 outline-none transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your Message"
                    className="w-full bg-[#0B0B0A] border border-white/10 focus:border-[#C5A15A] px-4 py-3 font-body text-xs sm:text-sm text-[#F2E9D7] placeholder-[#A7A095]/40 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A15A] text-[#0B0B0A] font-heading text-xs tracking-[0.24em] font-semibold uppercase hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(197,161,90,0.3)]"
                >
                  SEND MESSAGE →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </ScrollTypeSection>
  )
}
