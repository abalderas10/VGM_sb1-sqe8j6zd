import React from 'react';
import { ExperienceCard } from './ExperienceCard';
import { CarouselContainer } from './CarouselContainer';
import { EXPERIENCES } from './data';
import { cn } from '../../utils/cn';

export function InfiniteCarousel() {
  // Triple the items to ensure smooth infinite scroll
  const items = [...EXPERIENCES, ...EXPERIENCES, ...EXPERIENCES];
  
  return (
    <section className="py-20 bg-gradient-to-b from-caribbean-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-shell-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-4xl font-display font-bold text-center mb-16 text-caribbean-900">
          Featured Experiences
        </h2>
        
        <CarouselContainer speed={0.5} gap={32} className="pb-8 px-8">
          {items.map((experience, index) => (
            <div 
              key={`${experience.id}-${index}`} 
              className="flex-none w-[350px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ExperienceCard {...experience} />
            </div>
          ))}
        </CarouselContainer>
      </div>
    </section>
  );
}