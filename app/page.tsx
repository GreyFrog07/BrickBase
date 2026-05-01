import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Pillars } from '@/components/Pillars';
import { HowItWorks } from '@/components/HowItWorks';
import { VoiceFeature } from '@/components/VoiceFeature';
import { FinalCTA } from '@/components/FinalCTA';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Pillars />
      <VoiceFeature />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </>
  );
}
