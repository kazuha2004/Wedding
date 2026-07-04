import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { events } from "@/data/events";
import { getAlbum } from "@/data/albums";
import GalleryView from "@/components/gallery/GalleryView";

interface AlbumPageProps {
  params: Promise<{ event: string }>;
}

export function generateStaticParams() {
  return events.map((e) => ({ event: e.folder }));
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { event: folder } = await params;

  const event = events.find((e) => e.folder === folder);
  const album = getAlbum(folder);

  if (!event || !album) {
    notFound();
  }

  return (
    <main className="bg-[var(--ivory)] min-h-screen">
      {/* Hero */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image
          src={event.cover}
          alt={event.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/75 via-[var(--charcoal)]/25 to-transparent" />

        <Link
          href="/#gallery"
          className="absolute top-8 left-6 sm:top-10 sm:left-10 flex items-center gap-2 text-white/90 hover:text-[var(--gold)] transition-colors duration-300 text-sm tracking-wide"
        >
          <ArrowLeft size={18} />
          Back to Gallery
        </Link>
      </section>

      {/* Album header — pt cut down again to close the gap under the hero,
          pb cut down to close the gap above the photo grid. */}
      <section className="text-center px-6 pt-6 sm:pt-8 pb-4 sm:pb-5 relative z-10">
        <span className="block text-[var(--gold)] text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
          Wedding Album
        </span>

        <h1
          className="text-5xl sm:text-6xl text-[var(--charcoal)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {event.title}
        </h1>

        <div className="h-[2px] w-16 rounded-full bg-[var(--gold)] mx-auto mb-4" />

        <p className="text-[var(--muted-foreground)] font-light max-w-xl mx-auto mb-3 text-[15px] leading-7">
          {event.description}
        </p>

        <p className="text-[var(--gold)] text-sm tracking-[0.25em] uppercase">
          {album.images.length} Photos
        </p>
      </section>

      {/* Gallery — top padding trimmed so photos sit closer to the count line */}
      <section className="pt-4 sm:pt-6 pb-32 sm:pb-44">
        <div className="max-w-[1500px] mx-auto">
          <GalleryView images={album.images} />
        </div>
      </section>
    </main>
  );
}