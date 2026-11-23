import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import boardImg from '../assets/images/board.png'
import belLogo from '../assets/images/bel-logo.webp'

export interface RoundSignalTransitionHandle {
  play: (label: string, swap: () => void) => Promise<void>
}

const CAP = 0.286 // cap height of printed word as share of board width
const MAXW = 0.75 // widest printed word as share of board width
const CAP_NUDGE = 0.0 // small vertical correction

function getBoardDimensions(): { W: number; H: number } {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  // 1700 / 1239 aspect ratio
  const W = Math.min(vw * 0.92, 1100, (vh * 0.78 * 1700) / 1239)
  const H = Math.round((W * 1239) / 1700)
  return { W, H }
}

function anim(
  el: HTMLElement | null,
  frames: Keyframe[] | PropertyIndexedKeyframes,
  opts: KeyframeAnimationOptions
): Promise<Animation | void> {
  if (!el) return Promise.resolve()
  opts.fill = 'both'
  try {
    return el.animate(frames, opts).finished
  } catch (e) {
    return Promise.resolve()
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const RoundSignalTransition = forwardRef<RoundSignalTransitionHandle>(
  (_props, ref) => {
    const txRef = useRef<HTMLDivElement>(null)
    const boardRef = useRef<HTMLDivElement>(null)
    const scrimRef = useRef<HTMLDivElement>(null)
    const flashRef = useRef<HTMLDivElement>(null)
    const halfLRef = useRef<HTMLDivElement>(null)
    const halfRRef = useRef<HTMLDivElement>(null)
    const shLRef = useRef<HTMLDivElement>(null)
    const shRRef = useRef<HTMLDivElement>(null)
    const wordLRef = useRef<HTMLDivElement>(null)
    const wordRRef = useRef<HTMLDivElement>(null)

    const busyRef = useRef(false)

    // Preload Anton font once on mount
    useEffect(() => {
      if (document.fonts && document.fonts.load) {
        document.fonts.load('100px Anton').catch(() => {})
      }
    }, [])

    const layout = (label: string) => {
      const board = boardRef.current
      const wordL = wordLRef.current
      const wordR = wordRRef.current
      if (!board || !wordL || !wordR) return { W: 900, H: 656 }

      const { W, H } = getBoardDimensions()
      board.style.setProperty('--bw', `${W}px`)
      board.style.setProperty('--bh', `${H}px`)
      board.style.setProperty('--tagfs', `${W * 0.034}px`)
      board.style.setProperty('--cutpx', `${W / 2}px`)
      board.style.width = `${W}px`
      board.style.height = `${H}px`

      const text = label.toUpperCase()

      // Measure font using an in-memory 2D canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      let fs = 100

      if (ctx) {
        ctx.font = '200px Anton, "Arial Narrow", Impact, sans-serif'
        const m = ctx.measureText('H')
        const capRatio = (m.actualBoundingBoxAscent || 150) / 200
        fs = (CAP * W) / capRatio
        ctx.font = `${fs}px Anton, "Arial Narrow", Impact, sans-serif`
        const full = ctx.measureText(text).width
        if (full > MAXW * W) {
          fs = (fs * (MAXW * W)) / full
        }
      }

      wordL.textContent = text
      wordR.textContent = text
      wordL.style.fontSize = `${fs}px`
      wordR.style.fontSize = `${fs}px`
      wordL.style.marginTop = `${CAP_NUDGE * fs}px`
      wordR.style.marginTop = `${CAP_NUDGE * fs}px`

      return { W, H }
    }

    useImperativeHandle(ref, () => ({
      async play(label: string, swap: () => void) {
        if (busyRef.current) return Promise.resolve()
        busyRef.current = true

        const tx = txRef.current
        const board = boardRef.current
        const scrim = scrimRef.current
        const flash = flashRef.current
        const halfL = halfLRef.current
        const halfR = halfRRef.current
        const shL = shLRef.current
        const shR = shRRef.current

        if (!tx || !board) {
          swap()
          busyRef.current = false
          return Promise.resolve()
        }

        const { W } = layout(label)
        const off = window.innerWidth / 2 + W / 2 + 60
        tx.classList.add('on')

        let reduce = false
        try {
          reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        } catch (e) {
          // ignore
        }

        if (reduce) {
          await anim(board, [{ opacity: 0 }, { opacity: 1 }], { duration: 180 })
          swap()
          await wait(700)
          await anim(board, [{ opacity: 1 }, { opacity: 0 }], { duration: 180 })
          tx.classList.remove('on')
          busyRef.current = false
          return
        }

        const IN = 760
        const HOLD = 800
        const OUT = 680
        const easeIn = 'cubic-bezier(.55, 0, .12, 1)'
        const easeOut = 'cubic-bezier(.6, 0, .3, 1)'

        anim(scrim, [{ opacity: 0 }, { opacity: 1 }], {
          duration: IN,
          easing: 'cubic-bezier(.4, 0, .6, 1)',
        })

        const fL = [
          { transform: `translateX(${-off}px)` },
          { transform: 'translateX(0px)' },
        ]
        const fR = [
          { transform: `translateX(${off}px)` },
          { transform: 'translateX(0px)' },
        ]

        anim(shL, fL, { duration: IN, easing: easeIn })
        anim(shR, fR, { duration: IN, easing: easeIn })
        const a = anim(halfL, fL, { duration: IN, easing: easeIn })
        const b = anim(halfR, fR, { duration: IN, easing: easeIn })

        await Promise.all([a, b])

        // The halves meet: physical jolt and flash right in the dead-center
        anim(
          board,
          [
            { transform: 'scale(1)' },
            { transform: 'scale(1.014)', offset: 0.3 },
            { transform: 'scale(.997)', offset: 0.65 },
            { transform: 'scale(1)' },
          ],
          { duration: 300, easing: 'ease-out' }
        )
        anim(flash, [{ opacity: 0.32 }, { opacity: 0 }], {
          duration: 300,
          easing: 'ease-out',
        })

        // Page change takes place underneath the closed board
        swap()

        await wait(HOLD)

        // Split apart and slide offscreen
        anim(scrim, [{ opacity: 1 }, { opacity: 0 }], {
          duration: OUT,
          easing: 'cubic-bezier(.4, 0, .6, 1)',
        })

        const oL = [
          { transform: 'translateX(0px)' },
          { transform: `translateX(${-off}px)` },
        ]
        const oR = [
          { transform: 'translateX(0px)' },
          { transform: `translateX(${off}px)` },
        ]

        anim(shL, oL, { duration: OUT, easing: easeOut })
        anim(shR, oR, { duration: OUT, easing: easeOut })
        const c = anim(halfL, oL, { duration: OUT, easing: easeOut })
        const d = anim(halfR, oR, { duration: OUT, easing: easeOut })

        await Promise.all([c, d])

        tx.classList.remove('on')
        busyRef.current = false
      },
    }))

    return (
      <>
        {/* Scoped CSS to ensure 100% pixel-perfect viewport centering & isolation */}
        <style>{`
          .rst-tx {
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            visibility: hidden;
          }
          .rst-tx.on {
            visibility: visible;
            pointer-events: auto;
          }
          .rst-scrim {
            position: absolute;
            inset: 0;
            background: #050404;
            opacity: 0;
          }
          .rst-flash {
            position: absolute;
            inset: 0;
            background: #ffffff;
            opacity: 0;
            pointer-events: none;
          }
          .rst-board {
            position: relative;
            width: var(--bw, 900px);
            height: var(--bh, 656px);
            flex-shrink: 0;
            transform-origin: center center;
          }
          .rst-half, .rst-sh {
            position: absolute;
            top: 0;
            height: 100%;
            will-change: transform;
          }
          .rst-half {
            overflow: hidden;
          }
          .rst-half.l, .rst-sh.l {
            left: 0;
            width: calc(var(--cutpx, 50%) + 1px);
          }
          .rst-half.r, .rst-sh.r {
            left: var(--cutpx, 50%);
            width: calc(var(--bw, 900px) - var(--cutpx, 50%));
          }
          .rst-sh {
            box-shadow: 0 34px 46px rgba(0, 0, 0, 0.65);
            border-radius: 10px;
          }
          .rst-inner {
            position: absolute;
            top: 0;
            height: 100%;
            width: var(--bw, 900px);
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
          .rst-half.l .rst-inner {
            left: 0;
          }
          .rst-half.r .rst-inner {
            left: calc(-1 * var(--cutpx, 50%));
          }
          .rst-word {
            position: absolute;
            top: 50.4%;
            left: 0;
            width: var(--bw, 900px);
            transform: translateY(-50%);
            text-align: center;
            color: #f2f2f0;
            font-family: Anton, "Arial Narrow", Impact, sans-serif;
            line-height: 1;
            letter-spacing: -0.005em;
            text-transform: uppercase;
            user-select: none;
            white-space: pre;
          }
          .rst-tag {
            position: absolute;
            top: 18.2%;
            left: 0;
            width: var(--bw, 900px);
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.1em;
            font-family: "Archivo Black", "Arial Black", sans-serif;
            font-size: var(--tagfs, 22px);
            line-height: 1;
            color: #f4f4f2;
            user-select: none;
          }
          .rst-tag i {
            display: block;
            width: 3.1em;
            height: 0.14em;
            background: #c4202b;
          }
        `}</style>

        <div ref={txRef} aria-hidden="true" className="rst-tx">
          {/* Scrim: deep black screen hiding page underneath */}
          <div ref={scrimRef} className="rst-scrim" />

          {/* Board container: Centered dead-center in the viewport via flexbox */}
          <div ref={boardRef} className="rst-board">
            {/* Drop shadows for both halves */}
            <div ref={shLRef} className="rst-sh l" />
            <div ref={shRRef} className="rst-sh r" />

            {/* Left Half */}
            <div ref={halfLRef} className="rst-half l">
              <div
                className="rst-inner"
                style={{ backgroundImage: `url(${boardImg})` }}
              >
                {/* BEL Header Tag */}
                <div className="rst-tag">
                  <i />
                  <img
                    src={belLogo}
                    alt="BEL Emblem"
                    style={{
                      height: '1.75em',
                      width: 'auto',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
                    }}
                  />
                  <span>BEL</span>
                  <i />
                </div>

                {/* Page Name Printed Across Left Half */}
                <div ref={wordLRef} className="rst-word" />
              </div>
            </div>

            {/* Right Half */}
            <div ref={halfRRef} className="rst-half r">
              <div
                className="rst-inner"
                style={{ backgroundImage: `url(${boardImg})` }}
              >
                {/* BEL Header Tag */}
                <div className="rst-tag">
                  <i />
                  <img
                    src={belLogo}
                    alt="BEL Emblem"
                    style={{
                      height: '1.75em',
                      width: 'auto',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
                    }}
                  />
                  <span>BEL</span>
                  <i />
                </div>

                {/* Page Name Printed Across Right Half */}
                <div ref={wordRRef} className="rst-word" />
              </div>
            </div>
          </div>

          {/* Impact Flash */}
          <div ref={flashRef} className="rst-flash" />
        </div>
      </>
    )
  }
)

export default RoundSignalTransition
