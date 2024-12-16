import { useState, useCallback, useRef, useEffect } from 'react';

interface UseCarouselScrollProps {
  speed?: number;
  pauseOnHover?: boolean;
  dragFree?: boolean;
}

export function useCarouselScroll({
  speed = 0.5,
  pauseOnHover = true,
  dragFree = true
}: UseCarouselScrollProps = {}) {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const animationFrameRef = useRef<number>();
  const lastTimestampRef = useRef<number>(0);

  const scroll = useCallback((timestamp: number) => {
    if (!containerRef.current || isPaused || isDragging) {
      animationFrameRef.current = requestAnimationFrame(scroll);
      return;
    }

    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
    }

    const elapsed = timestamp - lastTimestampRef.current;
    
    if (elapsed > 16) { // Cap at ~60fps
      const container = containerRef.current;
      const maxScroll = container.scrollWidth / 3;
      const newScrollLeft = container.scrollLeft + speed;

      if (newScrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = newScrollLeft;
      }

      lastTimestampRef.current = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(scroll);
  }, [isPaused, isDragging, speed]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(scroll);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scroll]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
      setIsDragging(false);
      dragStartRef.current = null;
    }
  }, [pauseOnHover]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!dragFree || !containerRef.current) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: containerRef.current.scrollLeft
    };
  }, [dragFree]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragFree || !isDragging || !dragStartRef.current || !containerRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
  }, [dragFree, isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  return {
    containerRef,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging
  };
}