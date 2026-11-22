import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Teams from './components/Teams'
import UpcomingEvents from './components/UpcomingEvents'
import Tickets from './components/Tickets'
import Sponsorship from './components/Sponsorship'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TicketsPage from './pages/TicketsPage'
import RoundSignalTransition, {
  type RoundSignalTransitionHandle,
} from './components/RoundSignalTransition'

gsap.registerPlugin(ScrollTrigger)

function isTicketRoute(): boolean {
  const hash = window.location.hash
  return hash.startsWith('#/tickets') || window.location.pathname === '/tickets'
}

export default function App() {
  const [route, setRoute] = useState<'home' | 'tickets'>(() =>
    isTicketRoute() ? 'tickets' : 'home'
  )
  const transitionRef = useRef<RoundSignalTransitionHandle>(null)
  const isTransitioningRef = useRef(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Navigate to Tickets page with Round Signal Transition
  const navigateToTickets = (targetHash = '#/tickets') => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true

    if (transitionRef.current) {
      transitionRef.current
        .play('TICKETS', () => {
          window.location.hash = targetHash
          setRoute('tickets')
          window.scrollTo(0, 0)
        })
        .finally(() => {
          isTransitioningRef.current = false
        })
    } else {
      window.location.hash = targetHash
      setRoute('tickets')
      window.scrollTo(0, 0)
      isTransitioningRef.current = false
    }
  }

  // Navigate back to Home with Round Signal Transition, ALWAYS landing on Hero section
  const navigateToHome = () => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true

    if (transitionRef.current) {
      transitionRef.current
        .play('FIGHT NIGHT', () => {
          window.location.hash = '#top'
          setRoute('home')
          window.scrollTo(0, 0)
          lenisRef.current?.scrollTo(0, { immediate: true })
        })
        .finally(() => {
          isTransitioningRef.current = false
        })
    } else {
      window.location.hash = '#top'
      setRoute('home')
      window.scrollTo(0, 0)
      lenisRef.current?.scrollTo(0, { immediate: true })
      isTransitioningRef.current = false
    }
  }

  // Intercept all in-page navigation clicks for smooth scrolling and transition routing
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Navigate to Tickets page with Round Signal Transition
      if (href.startsWith('#/tickets')) {
        e.preventDefault()
        navigateToTickets(href)
        return
      }

      // Smooth scroll for in-page section links (#about, #teams, #events, #sponsorship, #contact, #top, etc.)
      if (href.startsWith('#') && href !== '#') {
        const targetId = href.slice(1)
        const targetEl =
          targetId === 'top'
            ? document.getElementById('top') || document.body
            : document.getElementById(targetId)

        if (targetEl) {
          e.preventDefault()

          // Calculate exact document scroll position so sticky panels dock at top: 0
          let targetY = 0
          if (targetId !== 'top') {
            const stack = document.querySelector('.stack')
            if (stack) {
              const panels = Array.from(stack.children) as HTMLElement[]
              const targetPanelIndex = panels.findIndex(
                (p) => p.id === targetId || p.contains(targetEl)
              )

              if (targetPanelIndex > 0) {
                const currentScrollY = lenisRef.current?.scroll ?? window.scrollY
                const stackDocTop = Math.max(0, stack.getBoundingClientRect().top + currentScrollY)
                let sumHeight = stackDocTop

                for (let i = 0; i < targetPanelIndex; i++) {
                  sumHeight += panels[i].offsetHeight
                }

                // If targetEl is nested inside the panel (e.g. #founder inside #about)
                if (panels[targetPanelIndex] !== targetEl && panels[targetPanelIndex].contains(targetEl)) {
                  sumHeight += targetEl.offsetTop
                }

                targetY = sumHeight
              } else if (targetPanelIndex === 0) {
                targetY = 0
              } else {
                // Fallback for elements outside .stack
                const currentScrollY = lenisRef.current?.scroll ?? window.scrollY
                targetY = targetEl.getBoundingClientRect().top + currentScrollY
              }
            } else {
              // Fallback if no .stack found
              const currentScrollY = lenisRef.current?.scroll ?? window.scrollY
              targetY = targetEl.getBoundingClientRect().top + currentScrollY
            }
          }

          // Push URL hash without triggering native browser instant jump
          window.history.pushState(null, '', href)

          // Smooth glide via Lenis or smooth scroll fallback
          if (lenisRef.current) {
            const currentY = lenisRef.current.scroll || window.scrollY
            const distance = Math.abs(targetY - currentY)
            // Pace smoothly: ~0.8s for nearby sections, up to ~1.4s across whole page
            const duration = Math.min(1.4, Math.max(0.8, 0.7 + distance / 5000))

            lenisRef.current.scrollTo(targetY, {
              duration,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              force: true,
            })
          } else {
            window.scrollTo({
              top: targetY,
              behavior: 'smooth',
            })
          }
        }
      }
    }

    document.addEventListener('click', handleDocumentClick, true)
    return () => document.removeEventListener('click', handleDocumentClick, true)
  }, [])

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const onHashChange = () => {
      if (isTransitioningRef.current) return

      const nextIsTickets = isTicketRoute()
      if (nextIsTickets && route === 'home') {
        navigateToTickets(window.location.hash || '#/tickets')
      } else if (!nextIsTickets && route === 'tickets') {
        navigateToHome()
      }
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [route])

  // Smooth scroll with Lenis (active on home page)
  useEffect(() => {
    if (route !== 'home') return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis
    ;(window as unknown as { __lenis__: typeof lenis }).__lenis__ = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const tickerCb = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
      ;(window as unknown as { __lenis__?: unknown }).__lenis__ = undefined
    }
  }, [route])

  return (
    <>
      <RoundSignalTransition ref={transitionRef} />
      {route === 'tickets' ? (
        <TicketsPage onNavigateHome={navigateToHome} />
      ) : (
        <div className="relative min-h-screen bg-[#0B0B0A] text-[#F2E9D7] selection:bg-[#C5A15A] selection:text-[#0B0B0A]">
          <Navbar />
          <main className="stack">
            <Hero />
            <About />
            <Teams />
            <UpcomingEvents />
            <Tickets />
            <Sponsorship />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
