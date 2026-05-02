import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { FinalCTA } from '@/components/FinalCTA';

export default function Home() {
  return (
    <div className="h-dvh overflow-y-scroll snap-y snap-mandatory">
      <Nav />

      <section className="snap-start h-dvh flex flex-col justify-center">
        <Hero />
      </section>

      <section className="snap-start h-dvh flex flex-col justify-center">
        <HowItWorks />
      </section>

      <section className="snap-start h-dvh flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <FinalCTA />
        </div>
        <Footer />
      </section>
    </div>
  );
}
