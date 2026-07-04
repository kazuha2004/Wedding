import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";

import Quote from "@/components/about/Quote";
import Story from "@/components/about/Story";

import Timeline from "@/components/timeline/Timeline";

import EventSection from "@/components/event/EventSection";

import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Love Quote */}
      <Quote />

      {/* Couple Story */}
      <Story />

      {/* Wedding Journey */}
      <Timeline />

      {/* Wedding Event Albums */}
      <EventSection />

      {/* Footer */}
      <Footer />

    </main>
  );
}