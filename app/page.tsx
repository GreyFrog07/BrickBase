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
    <div className="h-dvh overflow-y-scroll snap-y snap-mandatory">
      <Nav />

      <section className="snap-start min-h-dvh pt-[68px]">
        <Hero />
        <Marquee />
      </section>

      <section className="snap-start min-h-dvh flex flex-col justify-center">
        <Pillars />
      </section>

      <section className="snap-start min-h-dvh flex flex-col justify-center">
        <VoiceFeature />
      </section>

      <section className="snap-start min-h-dvh flex flex-col justify-center">
        <HowItWorks />
      </section>

      <section className="snap-start min-h-dvh flex flex-col justify-center">
        <FinalCTA />
        <Footer />
      </section>
    </div>
  );
}
