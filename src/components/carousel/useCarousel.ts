import { useState, useCallback, useRef, useEffect } from 'react';

interface UseCarouselProps {
  itemWidth: number;
  totalItems: number;
  speed?: number;
  pauseOnHover?: boolean;
}

export function useCarousel({
  itemWidth,
  totalItems,
  speed = 1,
  pauseOnHover = true
}: UseCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(0);

  const scroll = useCallback((timestamp: number) => {
    if (!scrollRef.current || isPaused) {
      requestAnimationFrame(scroll);
      return;
    }

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;

    if (elapsed > 16) { // Limit to ~60fps
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (scrollPosition >= maxScroll / 2) {
        setScrollPosition(0);
        container.scrollTo({ left: 0 });
      } else {
        setScrollPosition(prev => prev + speed);
        container.scrollTo({ left: scrollPosition });
      }
      
      lastTimeRef.current = timestamp;
    }

    requestAnimationFrame(scroll);
  }, [isPaused, scrollPosition, speed]);

  useEffect(() => {
    const animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [scroll]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return {
    scrollRef,
    handleMouseEnter,
    handleMouseLeave,
    isPaused,
    setIsPaused
  };
}