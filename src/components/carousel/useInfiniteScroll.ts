import { useState, useCallback, useRef, useEffect } from 'react';

interface UseInfiniteScrollProps {
  speed?: number;
  pauseOnHover?: boolean;
}

export function useInfiniteScroll({
  speed = 0.5,
  pauseOnHover = true
}: UseInfiniteScrollProps = {}) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimestampRef = useRef<number>();

  const scroll = useCallback((timestamp: number) => {
    if (!containerRef.current || isPaused) {
      animationFrameRef.current = requestAnimationFrame(scroll);
      return;
    }

    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
    }

    const elapsed = timestamp - lastTimestampRef.current;
    
    if (elapsed > 16) { // Cap at ~60fps
      const container = containerRef.current;
      const maxScroll = container.scrollWidth / 2;
      
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }
      
      lastTimestampRef.current = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(scroll);
  }, [isPaused, speed]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(scroll);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scroll]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return {
    containerRef,
    handleMouseEnter,
    handleMouseLeave
  };
}