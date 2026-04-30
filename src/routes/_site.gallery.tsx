import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";
import moscow from "@/assets/dest-moscow.jpg";
import petersburg from "@/assets/dest-petersburg.jpg";
import baikal from "@/assets/dest-baikal.jpg";
import kazan from "@/assets/dest-kazan.jpg";
import sochi from "@/assets/dest-sochi.jpg";
import kamchatka from "@/assets/dest-kamchatka.jpg";
import hero from "@/assets/hero-russia.jpg";

export const Route = createFileRoute("/_site/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Russia Through Our Lens | RUSIN" },
      { name: "description", content: "Photo gallery from RUSIN journeys across Russia: Moscow, Saint Petersburg, Baikal, Kazan, Sochi and Kamchatka." },
      { property: "og:title", content: "RUSIN Gallery" },
      { property: "og:description", content: "Russia, captured." },
    ],
  }),
  component: GalleryPage,
});

const fallback = [hero, moscow, petersburg, baikal, kazan, sochi, kamchatka, petersburg, moscow];

function GalleryPage() {
  const [images, setImages] = useState<string[] | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.from("gallery_images").select("image_url").order("created_at", { ascending: false }).then(({ data }) => {
      const urls = data?.map(d => d.image_url) ?? [];
      setImages(urls.length ? urls : fallback);
    });
  }, []);

  const close = () => setIndex(null);
  const prev = () => images && setIndex(((index ?? 0) - 1 + images.length) % images.length);
  const next = () => images && setIndex(((index ?? 0) + 1) % images.length);

  return (
    <>
      <div className="pt-32 pb-12 bg-gradient-to-br from-primary via-primary to-[oklch(0.35_0.13_257)] text-primary-foreground text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-xs uppercase tracking-widest mb-5">
          Gallery
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl mx-auto px-4">
          Russia, <span className="italic text-[oklch(0.85_0.15_85)]">captured.</span>
        </motion.h1>
      </div>

      <Section>
        {images === null ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton mb-4 break-inside-avoid" style={{ height: 200 + (i % 3) * 80 }} />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
            {images.map((src, i) => (
              <motion.button
                key={i + src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.04, duration: 0.5 }}
                onClick={() => setIndex(i)}
                className="block w-full break-inside-avoid rounded-2xl overflow-hidden bg-secondary group focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
              </motion.button>
            ))}
          </div>
        )}
      </Section>

      <AnimatePresence>
        {index !== null && images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/95 grid place-items-center p-4"
          >
            <motion.img
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={images[index]}
              alt=""
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close" className="absolute top-5 right-5 h-11 w-11 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"><X /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
