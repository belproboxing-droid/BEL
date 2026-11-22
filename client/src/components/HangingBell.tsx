import { useEffect, useRef } from 'react'
import beamSrc from '../assets/images/beam.png'
import bellSrc from '../assets/images/bell.png'
import chainSrc from '../assets/images/chain.png'
import clapperSrc from '../assets/images/clapper.png'

export default function HangingBell() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!stageRef.current || !canvasRef.current) return
    const stage: HTMLDivElement = stageRef.current
    const cv: HTMLCanvasElement = canvasRef.current
    const context = cv.getContext('2d')
    if (!context) return
    const ctx: CanvasRenderingContext2D = context

    let reduce = false
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch (_) { /* noop */ }

    /* ---------- virtual stage: 2816 × 1584 layout space ---------- */
    const VW = 2816, VH = 1584
    const PX = 905, PY = 318
    const BEAM = { top: 130, right: 1040, h: 205, left: -2400, capSrc: 100, bodySrc0: 120 }
    const SC = 0.62
    const CHAIN_SRC0 = 40
    const CHAIN_LEN = (900 - CHAIN_SRC0) * SC
    const CHAIN_AX = 36
    const SB = 0.62
    const HOLE = { x: 478 * SB, y: 40 * SB }
    const BELL_W = 900 * SB, BELL_H = 798 * SB
    const MOUTH = { cx: (450 - 478) * SB, cy: (722 - 40) * SB, rx: 408 * SB, ry: 60 * SB }
    const RIM_U = (797 - 40) * SB
    const SK = 0.35, KB = { x: 96, y: 395 }
    const BR = 33
    const HU = 70, KL = 370

    const PROF: [number, number][] = [
      [-40, 28], [20, 34], [70, 70], [160, 120],
      [285, 172], [384, 216], [430, 232], [480, 240],
    ]
    function rin(u: number) {
      if (u <= PROF[0][0]) return PROF[0][1]
      for (let i = 1; i < PROF.length; i++) {
        if (u <= PROF[i][0]) {
          const a = PROF[i - 1], b = PROF[i], f = (u - a[0]) / (b[0] - a[0])
          return a[1] + (b[1] - a[1]) * f
        }
      }
      return PROF[PROF.length - 1][1]
    }

    /* ---- rig ---- */
    const N = 9, E = 5, M = 6, B = 7, K = 8
    const iw = [0, 3, 3, 3, 3, 0.6, 0.12, 0.5, 0.6]
    const x = new Float64Array(N), y = new Float64Array(N)
    const qx = new Float64Array(N), qy = new Float64Array(N)
    const SEG = CHAIN_LEN / 5, EM = 300, MB = 168, EB = EM + MB
    const arcs: number[] = []
    const DT = 1 / 240, ITER = 22, G = 8000, TAU = 12, TAUK = 60, REST = 0.5
    let simT = 0, lastKick = 0, autoDir = 1, lastHit = -1

    function reset() {
      for (let i = 0; i <= 5; i++) { x[i] = PX; y[i] = PY + i * SEG }
      x[M] = PX; y[M] = y[E] + EM
      x[B] = PX; y[B] = y[E] + EB
      x[K] = PX; y[K] = y[E] + HU + KL
      for (let i = 0; i < N; i++) { qx[i] = x[i]; qy[i] = y[i]; arcs[i] = y[i] - PY }
      simT = 0; lastKick = 0
    }
    reset()

    function kick(dir: number, w: number) {
      for (let i = 1; i < K; i++) qx[i] -= dir * w * arcs[i] * DT
      lastKick = simT
    }

    function distConstraint(a: number, b: number, r: number) {
      const dx = x[b] - x[a], dy = y[b] - y[a]
      const d = Math.sqrt(dx * dx + dy * dy) || 1e-6
      const f = (d - r) / d, ws = iw[a] + iw[b]
      if (!ws) return
      x[a] += dx * f * iw[a] / ws; y[a] += dy * f * iw[a] / ws
      x[b] -= dx * f * iw[b] / ws; y[b] -= dy * f * iw[b] / ws
    }

    function rod() {
      const t = HU / EB
      const hx = x[E] + t * (x[B] - x[E]), hy = y[E] + t * (y[B] - y[E])
      const dx = x[K] - hx, dy = y[K] - hy
      const d = Math.sqrt(dx * dx + dy * dy) || 1e-6
      const f = (d - KL) / d
      const wK = iw[K], wh = (1 - t) * (1 - t) * iw[E] + t * t * iw[B], W = wK + wh
      x[K] -= dx * f * wK / W; y[K] -= dy * f * wK / W
      x[E] += dx * f * (1 - t) * iw[E] / W; y[E] += dy * f * (1 - t) * iw[E] / W
      x[B] += dx * f * t * iw[B] / W; y[B] += dy * f * t * iw[B] / W
    }

    function collide(final: boolean) {
      const ex = x[E], ey = y[E]
      const ax2 = x[B] - ex, ay2 = y[B] - ey
      const L = Math.sqrt(ax2 * ax2 + ay2 * ay2) || 1
      const axn = ax2 / L, ayn = ay2 / L
      const nxn = ayn, nyn = -axn
      const dx = x[K] - ex, dy = y[K] - ey
      const u = dx * axn + dy * ayn, v = dx * nxn + dy * nyn
      const r = rin(u) * 0.84 - BR
      if (Math.abs(v) <= r - (final ? 1.5 : 0)) return
      const s = v > 0 ? 1 : -1, pen = Math.max(0, Math.abs(v) - r)
      const t = Math.max(0, Math.min(1, u / L))
      const wK = iw[K], wb = (1 - t) * (1 - t) * iw[E] + t * t * iw[B], W = wK + wb
      const cx = nxn * s * pen, cy = nyn * s * pen
      x[K] -= cx * wK / W; y[K] -= cy * wK / W
      x[E] += cx * (1 - t) * iw[E] / W; y[E] += cy * (1 - t) * iw[E] / W
      x[B] += cx * t * iw[B] / W; y[B] += cy * t * iw[B] / W
      if (final) {
        const kvx = x[K] - qx[K], kvy = y[K] - qy[K]
        const bvx = (1 - t) * (x[E] - qx[E]) + t * (x[B] - qx[B])
        const bvy = (1 - t) * (y[E] - qy[E]) + t * (y[B] - qy[B])
        const vn = ((kvx - bvx) * nxn + (kvy - bvy) * nyn) * s
        if (vn > 0) {
          const j = (1 + REST) * vn / W
          qx[K] += nxn * s * j * wK; qy[K] += nyn * s * j * wK
          qx[E] -= nxn * s * j * (1 - t) * iw[E]; qy[E] -= nyn * s * j * (1 - t) * iw[E]
          qx[B] -= nxn * s * j * t * iw[B]; qy[B] -= nyn * s * j * t * iw[B]
          const spd = vn / DT
          if (spd > 45 && simT - lastHit > 0.07) { lastHit = simT }
        }
      }
    }

    function step() {
      const dB = Math.exp(-DT / TAU), dK = Math.exp(-DT / TAUK)
      for (let i = 1; i < N; i++) {
        const d = i === K ? dK : dB
        const vx2 = (x[i] - qx[i]) * d, vy2 = (y[i] - qy[i]) * d
        qx[i] = x[i]; qy[i] = y[i]
        x[i] += vx2; y[i] += vy2 + G * DT * DT
      }
      for (let k = 0; k < ITER; k++) {
        x[0] = PX; y[0] = PY
        for (let i = 0; i < 5; i++) distConstraint(i, i + 1, SEG)
        distConstraint(E, M, EM); distConstraint(M, B, MB); distConstraint(E, B, EB)
        rod()
        if (k < ITER - 1) collide(false)
      }
      collide(true)
      x[0] = qx[0] = PX; y[0] = qy[0] = PY
      simT += DT

      if (!reduce) {
        if (simT > 0.7 && lastKick === 0) { kick(1, 1.5) }
        else if (lastKick > 0 && simT - lastKick > 5.5) {
          const th = Math.atan2(x[B] - x[E], y[B] - y[E])
          if (Math.abs(th) < 0.05) { autoDir = -autoDir; kick(autoDir, 1.2) }
        }
      }
    }

    /* ---- images ---- */
    const imgMap: Record<string, HTMLImageElement> = {}
    const srcs: Record<string, string> = {
      beam: beamSrc, chain: chainSrc, bell: bellSrc, clapper: clapperSrc,
    }
    let left = 4, ready = false
    Object.keys(srcs).forEach((name) => {
      const im = new Image()
      im.onload = () => { if (--left === 0) ready = true }
      im.src = srcs[name]
      imgMap[name] = im
    })

    /* ---- view ---- */
    let CW = 0, CH = 0, S = 1, dpr = 1, vx0 = 0

    function resize() {
      dpr = Math.min(1.5, window.devicePixelRatio || 1)
      CW = Math.max(1, stage.clientWidth)
      CH = Math.max(1, stage.clientHeight)
      cv.width = Math.round(CW * dpr)
      cv.height = Math.round(CH * dpr)

      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
      if (isDesktop) {
        // Fits entire bell including clapper & bottom rim with comfortable breathing room
        const fitH = CH / 1500
        const fitW = CW / 600
        S = Math.min(fitH, fitW)
        // Anchor to left edge so wooden beam emerges seamlessly from the left screen end
        vx0 = 0
      } else {
        // Exact previous mobile scaling formula
        S = Math.min(Math.max(CW / VW, CH / VH), CH / 1400)
        if (CW / S < 900) S = CW / 900
        const viewW = CW / S
        vx0 = Math.max(0, Math.min(PX - viewW / 2, VW - viewW))
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)

    /* ---- drawing ---- */
    function drawBeam() {
      const b = imgMap.beam
      const sh = BEAM.h / b.height
      const capW = BEAM.capSrc
      const srcBodyW = b.width - BEAM.capSrc - BEAM.bodySrc0
      const capDW = capW * sh
      const capX = BEAM.right - capDW
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,.55)'
      ctx.shadowBlur = 46 * S * dpr
      ctx.shadowOffsetX = 14 * S * dpr
      ctx.shadowOffsetY = 34 * S * dpr
      ctx.drawImage(b, BEAM.bodySrc0, 0, srcBodyW, b.height, BEAM.left, BEAM.top, capX - BEAM.left + 1, BEAM.h)
      ctx.drawImage(b, b.width - capW, 0, capW, b.height, capX, BEAM.top, capDW, BEAM.h)
      ctx.restore()
    }

    function drawChain() {
      const ca = [0], ct = [0]
      for (let k = 0; k < 5; k++) {
        ca.push(SEG * (k + 0.5))
        ct.push(Math.atan2(x[k + 1] - x[k], y[k + 1] - y[k]))
      }
      ca.push(CHAIN_LEN)
      ct.push(Math.atan2(x[B] - x[E], y[B] - y[E]))
      let wx = PX, wy = PY, seg = 0
      const h = 2
      const cw = imgMap.chain.width * SC
      for (let a = 0; a < CHAIN_LEN; a += h) {
        const am = a + h / 2
        while (seg < ca.length - 2 && am > ca[seg + 1]) seg++
        const f = (am - ca[seg]) / (ca[seg + 1] - ca[seg])
        const t = ct[seg] + (ct[seg + 1] - ct[seg]) * f
        ctx.save()
        ctx.translate(wx, wy)
        ctx.rotate(-t)
        ctx.drawImage(imgMap.chain, 0, CHAIN_SRC0 + a / SC, imgMap.chain.width, (h + 1) / SC, -CHAIN_AX * SC, 0, cw, h + 1)
        ctx.restore()
        wx += h * Math.sin(t)
        wy += h * Math.cos(t)
      }
    }

    function drawBell() {
      const ex = x[E], ey = y[E]
      const thB = Math.atan2(x[B] - ex, y[B] - ey)
      ctx.save()
      ctx.translate(ex, ey)
      ctx.rotate(-thB)
      ctx.shadowColor = 'rgba(0,0,0,.4)'
      ctx.shadowBlur = 36 * S * dpr
      ctx.shadowOffsetX = 26 * S * dpr
      ctx.shadowOffsetY = 22 * S * dpr
      ctx.drawImage(imgMap.bell, -HOLE.x, -HOLE.y, BELL_W, BELL_H)
      ctx.restore()

      const L = Math.sqrt((x[B] - ex) ** 2 + (y[B] - ey) ** 2)
      const axn = (x[B] - ex) / L, ayn = (y[B] - ey) / L
      const nxn = ayn
      const dx = x[K] - ex, dy = y[K] - ey
      const u = dx * axn + dy * ayn, v = dx * nxn + dy * (- axn)
      const t = HU / EB
      const hx = ex + t * (x[B] - ex), hy = ey + t * (y[B] - ey)
      const psi = Math.atan2(x[K] - hx, y[K] - hy) - thB
      ctx.save()
      ctx.translate(ex, ey)
      ctx.rotate(-thB)
      ctx.beginPath()
      ctx.ellipse(MOUTH.cx, MOUTH.cy, MOUTH.rx - 8, MOUTH.ry - 4, 0, 0, Math.PI * 2)
      ctx.rect(-600, RIM_U - 6, 1200, 900)
      ctx.clip()
      ctx.translate(v, u)
      ctx.rotate(-psi)
      ctx.drawImage(imgMap.clapper, -KB.x * SK, -KB.y * SK, imgMap.clapper.width * SK, imgMap.clapper.height * SK)
      ctx.restore()
    }

    function render() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, CW, CH)
      ctx.setTransform(dpr * S, 0, 0, dpr * S, -vx0 * S * dpr, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      drawChain()
      drawBell()
      drawBeam()
    }

    /* ---- tap-to-kick ---- */
    const handlePointer = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      const px = (e.clientX - r.left) / S + vx0
      const py = (e.clientY - r.top) / S
      const dx2 = px - x[M], dy2 = py - y[M]
      if (dx2 * dx2 + dy2 * dy2 > 300 * 300) return
      kick(dx2 > 0 ? -1 : 1, 1.4)
    }
    cv.addEventListener('pointerdown', handlePointer)

    /* ---- loop ---- */
    let running = true
    let last = 0, acc = 0, animId = 0

    function frame(ts: number) {
      if (!running) return
      const dt = Math.min(0.05, (ts - last) / 1000 || 0.016)
      last = ts
      if (ready) {
        acc += dt
        while (acc >= DT) { step(); acc -= DT }
        render()
      }
      animId = requestAnimationFrame(frame)
    }
    animId = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      cv.removeEventListener('pointerdown', handlePointer)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="relative w-full h-full min-h-[220px] sm:min-h-[300px] lg:min-h-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block touch-manipulation cursor-grab active:cursor-grabbing"
        aria-label="A brass bell hanging from a wooden beam on an iron chain, swinging while its clapper strikes the rim"
      />
    </div>
  )
}
