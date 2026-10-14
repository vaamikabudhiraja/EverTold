import { ColorStory } from "@/components/landing/ColorStory";
import { ConciergeSection } from "@/components/landing/ConciergeSection";
import { DemoShowcase } from "@/components/landing/DemoShowcase";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Inquiry } from "@/components/landing/Inquiry";
import { Manifesto } from "@/components/landing/Manifesto";
import { OneLink } from "@/components/landing/OneLink";
import { Packages } from "@/components/landing/Packages";
import { Process } from "@/components/landing/Process";
import { Scatter } from "@/components/landing/Scatter";
import { Services } from "@/components/landing/Services";
import { Reveals } from "@/components/Reveals";
import { DEMO_SLUG, getWedding } from "@/content/weddings";

export default function Home() {
  const demo = getWedding(DEMO_SLUG)!;

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Services />
        <Scatter />
        <OneLink />
        <ColorStory />
        <ConciergeSection />
        <DemoShowcase
          slug={demo.slug}
          names={[demo.couple.first, demo.couple.second]}
          dateLabel={demo.dateLabel}
          place={`${demo.location.city}, ${demo.location.region}`}
          eventCount={demo.events.length}
        />
        <Process />
        <Packages />
        <Faq />
        <Inquiry />
      </main>
      <Footer />
      <Reveals />
    </>
  );
}
