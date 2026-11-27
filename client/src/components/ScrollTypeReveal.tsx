"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * ScrollTypeReveal
 *
 * Smooth scroll-scrubbed typewriter reveal.
 * Characters type as their section scrolls and docks into view.
 * Scrolling backwards smoothly removes characters in reverse.
 */

const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export interface ScrollTypeSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  sectionRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Wraps a section and shares smooth scroll progress with all ScrollTypeText children.
 * Starts typing as the section begins to enter the viewport from the bottom,
 * and completes 100% of typing when the section is fully revealed at the top.
 */
export function ScrollTypeSection({
  children,
  className,
  id,
  style,
  ariaLabel,
  sectionRef: externalRef,
}: ScrollTypeSectionProps) {
  const internalRef = useRef<HTMLElement | null>(null);
  const targetRef = externalRef || internalRef;
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start smoothly as section enters from bottom;
    // Complete typing when section is fully docked at the top.
    offset: ["start end", "start start"],
  });

  // Soft spring smoothing for fluid, continuous character reveal
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 130,
    mass: 0.25,
    restDelta: 0.0001,
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const skipAnimation = prefersReducedMotion || isMobile;

  const sectionOpacity = useTransform(smoothProgress, [0, 0.08], [0.9, 1]);

  return (
    <ScrollProgressContext.Provider
      value={skipAnimation ? scrollYProgress : smoothProgress}
    >
      <motion.section
        ref={targetRef as React.RefObject<HTMLElement>}
        id={id}
        className={className}
        aria-label={ariaLabel}
        style={{
          ...style,
          opacity: skipAnimation ? 1 : sectionOpacity,
          willChange: skipAnimation ? style?.willChange : "opacity",
        }}
      >
        {children}
      </motion.section>
    </ScrollProgressContext.Provider>
  );
}

export type ScrollTypeTextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p"
  | "div"
  | "span"
  | "li"
  | "strong"
  | "em";

export interface ScrollTypeTextProps {
  /** Plain text string to reveal. */
  children: string;
  as?: ScrollTypeTextTag;
  className?: string;
  style?: CSSProperties;
  /** Start typing at this fraction of the section's scroll progress (0–1). */
  start?: number;
  /** Finish typing at this fraction of the section's scroll progress (0–1). */
  end?: number;
}

/**
 * Reveals one character at a time, driven smoothly by the parent section's scroll progress.
 * Uses a hidden text underlayer to lock dimensions and eliminate layout jumps.
 */
export function ScrollTypeText({
  children,
  as = "p",
  className,
  style,
  start = 0.08,
  end = 0.88,
}: ScrollTypeTextProps) {
  const sectionProgress = useContext(ScrollProgressContext);
  const fallbackProgress = useMotionValue(1);
  const progressSource = sectionProgress ?? fallbackProgress;
  const prefersReducedMotion = useReducedMotion();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const isBot =
    typeof navigator !== "undefined" &&
    /Googlebot|bingbot|DuckDuckBot|Baiduspider|YandexBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot/i.test(
      navigator.userAgent
    );
  const skipTyping = prefersReducedMotion || isMobile || isBot;

  const cleanText = useMemo(() => (children || "").trim(), [children]);
  const characters = useMemo(() => Array.from(cleanText), [cleanText]);

  // Keep range valid (0 to 1)
  const safeStart = Math.min(Math.max(start, 0), 0.999);
  const safeEnd = Math.min(Math.max(end, safeStart + 0.001), 1);

  const typingProgress = useTransform(
    progressSource,
    [safeStart, safeEnd],
    [0, 1],
    { clamp: true }
  );

  const getVisibleCount = () => {
    if (skipTyping) return characters.length;
    return Math.floor(typingProgress.get() * characters.length);
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useMotionValueEvent(typingProgress, "change", (latest) => {
    const nextCount = skipTyping
      ? characters.length
      : Math.min(
          characters.length,
          Math.max(0, Math.floor(latest * characters.length))
        );

    setVisibleCount((current) => (current === nextCount ? current : nextCount));
  });

  useEffect(() => {
    setVisibleCount(getVisibleCount());
  }, [cleanText, characters.length, skipTyping, typingProgress]);

  const Tag = as;
  const visibleText = characters.slice(0, visibleCount).join("");
  const hiddenText = characters.slice(visibleCount).join("");

  return (
    <Tag className={className} aria-label={cleanText} style={style}>
      <span>{visibleText}</span>
      <span
        aria-hidden="true"
        style={{ opacity: 0, userSelect: "none", pointerEvents: "none" }}
      >
        {hiddenText}
      </span>
    </Tag>
  );
}
