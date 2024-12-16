import React from 'react';
import { cn } from '../../utils/cn';
import type { FeatureItem } from './types';

interface FeatureCardProps extends FeatureItem {}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center flex-shrink-0 w-80 transform hover:scale-105 transition-transform duration-300 px-6 group">
      <div className="bg-caribbean-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-caribbean-200 transition-colors">
        <Icon className="w-8 h-8 text-caribbean-500" />
      </div>
      <h3 className="text-xl font-display font-semibold mb-4 text-caribbean-800">
        {title}
      </h3>
      <p className="text-caribbean-600">
        {description}
      </p>
    </div>
  );
}