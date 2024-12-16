import React from 'react';
import { CarouselContainer } from './carousel/CarouselContainer';
import { FeatureCard } from './features/FeatureCard';
import { FEATURES } from './features/data';

export function Features() {
  // Triple the items to ensure smooth infinite scroll
  const items = [...FEATURES, ...FEATURES, ...FEATURES];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-caribbean-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-shell-pattern opacity-5" />
      <div className="max-w-full mx-auto relative">
        <h2 className="text-4xl font-display font-bold text-center mb-16 text-caribbean-900">
          Experience Luxury & Adventure
        </h2>
        
        <CarouselContainer speed={0.3} gap={48} className="pb-8 px-8">
          {items.map((feature, index) => (
            <FeatureCard
              key={`${feature.id}-${index}`}
              {...feature}
            />
          ))}
        </CarouselContainer>
      </div>
    </section>
  );
}