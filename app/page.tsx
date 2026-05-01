"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar                from "@/components/Navbar";
import Hero3D               from "@/components/Hero3D";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import FeaturedPackages     from "@/components/FeaturedPackages";
import Testimonials         from "@/components/Testimonials";
import Footer               from "@/components/Footer";
import BookingModal         from "@/components/BookingModal";
import ScrollProgress       from "@/components/ScrollProgress";
import Particles            from "@/components/Particles";
import WhatsAppFloat        from "@/components/WhatsAppFloat";
import JourneyMode          from "@/components/journey/JourneyMode";
import { packages }         from "@/lib/packages";
import { destinationToJourney } from "@/lib/journey";
import type { Package }     from "@/lib/packages";
import type { Destination } from "@/lib/destinations";

export default function Page() {
  const [selected,    setSelected]    = useState<Package | null>(null);
  const [journeyData, setJourneyData] = useState<ReturnType<typeof destinationToJourney> | null>(null);

  const openQuote = () => setSelected(packages[0]);

  const handleExplore = (dest: Destination) => {
    setJourneyData(destinationToJourney(dest));
  };

  return (
    <>
      <ScrollProgress />
      <Particles />

      <div className="relative z-2 bg-animated">
        <Navbar onQuoteClick={openQuote} />
        <Hero3D onQuoteClick={openQuote} />
        <FeaturedDestinations onExplore={handleExplore} />
        <FeaturedPackages onBook={(pkg) => setSelected(pkg)} />
        <Testimonials />
        <Footer />
      </div>

      {/* Booking modal */}
      {selected && (
        <BookingModal pkg={selected} onClose={() => setSelected(null)} />
      )}

      {/* Journey mode — full-screen cinematic overlay */}
      <AnimatePresence>
        {journeyData && (
          <JourneyMode
            journey={journeyData}
            onClose={() => setJourneyData(null)}
            onBook={() => {
              setJourneyData(null);
              setSelected(packages[0]);
            }}
          />
        )}
      </AnimatePresence>

      <WhatsAppFloat />
    </>
  );
}
