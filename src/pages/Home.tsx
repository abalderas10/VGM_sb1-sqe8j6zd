import React, { useState } from 'react';
import { Navigation } from '../components/navigation/Navigation';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Gallery } from '../components/Gallery';
import { Boat } from '../components/Boat';
import { Location } from '../components/Location';
import { InfiniteCarousel } from '../components/carousel/InfiniteCarousel';
import { Footer } from '../components/Footer';
import { Chat } from '../components/chat/Chat';

export function Home() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-caribbean-50">
      <Navigation />
      <Hero
        startDate={startDate}
        endDate={endDate}
        guests={guests}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onGuestsChange={setGuests}
      />
      <Features />
      <Gallery />
      <Boat />
      <Location />
      <InfiniteCarousel />
      <Footer />
      <Chat />
    </div>
  );
}