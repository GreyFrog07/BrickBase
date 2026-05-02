import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Pillars } from '@/components/Pillars';
import { HowItWorks } from '@/components/HowItWorks';
import { FinalCTA } from '@/components/FinalCTA';

export default function Home() {
  return (
    <div>
      <Nav />

      <section>
        <Hero />
      </section>

      <section>
        <Pillars />
      </section>

      <section>
        <HowItWorks />
      </section>

      <section>
        <FinalCTA />
        <Footer />
      </section>
    </div>
  );
}
