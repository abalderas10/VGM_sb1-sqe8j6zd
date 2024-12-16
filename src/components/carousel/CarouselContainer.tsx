import React from 'react';
import { useCarouselScroll } from './useCarouselScroll';
import { cn } from '../../utils/cn';

interface CarouselContainerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  gap?: number;
}

export function CarouselContainer({
  children,
  className,
  speed = 0.5,
  gap = 8
}: CarouselContainerProps) {
  const {
    containerRef,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging
  } = useCarouselScroll({ speed });

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className={cn(
          "flex overflow-x-hidden scroll-smooth",
          isDragging && "cursor-grabbing",
          className
        )}
        style={{ 
          gap: `${gap}px`,
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
      </div>
      
      <div className="absolute left-0 top-0 bottom-8 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-8 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}