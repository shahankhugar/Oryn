'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import FruitShowcase from '@/components/FruitShowcase';
import ScarcityStatement from '@/components/ScarcityStatement';
import Subscription from '@/components/Subscription';
import BrandStory from '@/components/BrandStory';
import DropCalendar from '@/components/DropCalendar';
import Manifesto from '@/components/Manifesto';
import Process from '@/components/Process';
import WaitlistFooter from '@/components/WaitlistFooter';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <Navbar />
      <Hero loaded={loaded} />
      <Philosophy />
      <FruitShowcase />
      <ScarcityStatement />
      <Subscription />
      <BrandStory />
      <DropCalendar />
      <Manifesto />
      <Process />
      <WaitlistFooter />
    </main>
  );
}
