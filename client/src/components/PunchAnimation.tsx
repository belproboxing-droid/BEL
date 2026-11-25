import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gloveLeft from '../assets/images/glove-left.webp'

gsap.registerPlugin(ScrollTrigger)

interface PunchAnimationProps {
  containerRef?: React.RefObject<HTMLElement | null>
}

export default function PunchAnimation({ containerRef }: PunchAnimationProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const shakeWrapperRef = useRef<HTMLDivElement>(null)
  const leftArmRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const shakeWrapper = shakeWrapperRef.current
    const leftArm = leftArmRef.current
    const vignette = vignetteRef.current

    if (!root || !shakeWrapper || !leftArm) return

    const isMobile = window.innerWidth < 1024
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile) {
      gsap.set(leftArm, { xPercent: 0, rotation: 0, scale: 1, opacity: 0.85 })
      return
    }

    // Set transform pivot to outer left forearm edge & start hidden/cocked back
    gsap.set(leftArm, {
      transformOrigin: '0% 50%',
      willChange: 'transform, opacity',
      opacity: 0,
      xPercent: -30,
      scale: 0.92,
      rotation: -3,
    })

    // Delayed punch timeline: fires after the section has revealed into view
    const tl = gsap.timeline({ paused: true, delay: 0.45 })

    // Phase 1: Entry / Wind-up
    tl.to(
      leftArm,
      {
        opacity: 0.92,
        xPercent: -24,
        rotation: -4,
        scale: 0.94,
        duration: 0.24,
        ease: 'power1.out',
      },
      'windup'
    )

    // Phase 2: Explosive Strike toward center
    tl.to(
      leftArm,
      {
        xPercent: 0,
        rotation: 0,
        scale: 1.0,
        opacity: 0.85,
        duration: 0.26,
        ease: 'power3.in',
      },
      'strike'
    )

    // Phase 3: Clash / Impact Shake (55% -> 65% of scroll entrance)
    tl.add('impact', 'strike+=0.26')

    tl.to(
      shakeWrapper,
      {
        x: -5,
        y: 4,
        duration: 0.03,
        yoyo: true,
        repeat: 2,
        ease: 'none',
      },
      'impact'
    )
    tl.set(shakeWrapper, { x: 0, y: 0 }, 'impact+=0.08')

    // Dynamic vignette pulse on impact
    if (vignette) {
      tl.to(
        vignette,
        {
          opacity: 0.65,
          duration: 0.04,
          ease: 'power1.out',
        },
        'impact'
      )
      tl.to(
        vignette,
        {
          opacity: 0.25,
          duration: 0.16,
          ease: 'power2.inOut',
        },
        'impact+=0.04'
      )
    }

    // Phase 4: HOLD / STAY at center (65% -> 100% of scroll entrance)
    // Glove STAYs at center through the rest of the scroll and when docked
    tl.to(
      leftArm,
      {
        xPercent: 0,
        rotation: 0,
        scale: 1.0,
        opacity: 0.85,
        duration: 0.35,
        ease: 'none',
      },
      'hold'
    )

    // ScrollTrigger: Play after section has revealed (with 0.45s delay on timeline)
    const triggerTarget = containerRef?.current || root
    const st = ScrollTrigger.create({
      trigger: triggerTarget,
      start: 'top 15%',
      toggleActions: 'play none none reverse',
      animation: tl,
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [containerRef])

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[1]"
      aria-hidden="true"
    >
      {/* Screen-shake wrapper */}
      <div
        ref={shakeWrapperRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Glove Stage Container (16:9 ratio centered) */}
        <div className="relative w-full max-w-[1280px] aspect-[16/9] flex items-center justify-center opacity-85">
          {/* Left Glove & Forearm */}
          <div
            ref={leftArmRef}
            className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-end"
          >
            <img
              src={gloveLeft}
              alt="Left boxing glove striking toward center"
              className="w-full h-auto max-h-[90%] object-contain object-right drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Impact Vignette */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `
            radial-gradient(120% 90% at 50% 50%, transparent 45%, rgba(11, 11, 10, 0.75) 85%, #0B0B0A 100%)
          `,
        }}
      />
    </div>
  )
}
