export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date?: string;
  duration?: string;
  price?: string;
}

export interface CarouselConfig {
  speed?: number;
  pauseOnHover?: boolean;
  dragFree?: boolean;
  itemWidth?: number;
  gap?: number;
}