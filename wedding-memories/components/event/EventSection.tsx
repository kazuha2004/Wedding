"use client";

import FeaturedEvent from "./FeaturedEvent";
import EventCard from "./EventCard";
import { events } from "@/data/events";

export default function EventSection() {
  return (
    <section id="gallery" className="section bg-[var(--ivory)]">
      <div className="container">
        <FeaturedEvent />

        {/* Real spacing after subtitle */}
        <div className="pt-24">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} priority={index < 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}