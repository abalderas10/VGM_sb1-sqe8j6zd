import { Anchor, Ship, Waves, MapPin, Trees, Home } from 'lucide-react';
import type { FeatureItem } from './types';

export const FEATURES: FeatureItem[] = [
  {
    id: 'marina',
    icon: Anchor,
    title: "Private Marina Access",
    description: "Exclusive dock access for your yacht adventures in the Caribbean waters"
  },
  {
    id: 'yacht',
    icon: Ship,
    title: "Luxury Boat",
    description: "Fully equipped yacht for unforgettable marine experiences and exploration"
  },
  {
    id: 'pools',
    icon: Waves,
    title: "Private Pools",
    description: "Multiple infinity pools with breathtaking ocean views and luxury amenities"
  },
  {
    id: 'location',
    icon: MapPin,
    title: "Prime Location",
    description: "Situated in an exclusive area with easy access to Cancún's best attractions"
  },
  {
    id: 'garden',
    icon: Trees,
    title: "Cozy Garden",
    description: "Beautifully maintained tropical gardens creating a peaceful paradise"
  },
  {
    id: 'living',
    icon: Home,
    title: "Comfortable Living",
    description: "Spacious rooms with modern amenities and luxurious furnishings"
  }
];