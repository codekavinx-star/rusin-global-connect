import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";
import moscow from "@/assets/dest-moscow.jpg";
import petersburg from "@/assets/dest-petersburg.jpg";
import baikal from "@/assets/dest-baikal.jpg";
import kazan from "@/assets/dest-kazan.jpg";
import sochi from "@/assets/dest-sochi.jpg";
import kamchatka from "@/assets/dest-kamchatka.jpg";

const imgMap: Record<string, string> = {
  "/src/assets/dest-moscow.jpg": moscow,
  "/src/assets/dest-petersburg.jpg": petersburg,
  "/src/assets/dest-baikal.jpg": baikal,
  "/src/assets/dest-kazan.jpg": kazan,
  "/src/assets/dest-sochi.jpg": sochi,
  "/src/assets/dest-kamchatka.jpg": kamchatka,
};

export const Route = createFileRoute("/_site/adventure")({
  head: () => ({
    meta: [
      { title: "Adventure — Premium Russia Tour Packages | RUSIN" },
      { name: "description", content: "Explore curated Russia tour packages: Moscow, Saint Petersburg, Lake Baikal, Kazan, Sochi and Kamchatka." },
      { property: "og:title", content: "Russia Tour Packages — RUSIN" },
      { property: "og:description", content: "Curated journeys across the Russian Federation." },
    ],
  }),
  component: AdventurePage,
});

type Destination = {
  id: string; title: string; description: string; price: number;
  duration: string; image_url: string; location: string;
};

function AdventurePage() {
  const [items, setItems] = useState<Destination[] | null>(null);

  useEffect(() => {
    supabase.from("destinations").select("*").order("created_at").then(({ data }) => {
      setItems(data ?? []);
    });
  }, []);

  return (
    <>
      <div className="relative pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-[oklch(0.35_0.13_257)] text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,hsl(0_0%_100%/0.2),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs uppercase tracking-widest mb-5"
          >
            <Sparkles size={14} /> Adventure
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-display text-5xl md:text-7xl font-bold leading-tight">
            From Red Square <br /> to <span className="italic text-[oklch(0.85_0.15_85)]">Active Volcanoes.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 max-w-2xl mx-auto text-primary-foreground/85">
            Six signature journeys spanning eleven time zones. Each one designed for travelers who expect more than postcards.
          </motion.p>
        </div>
      </div>

      <Section className="!pt-16">
        <SectionHeader eyebrow="Destinations" title="Our Tour Packages" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items === null
            ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-[480px]" />)
            : items.map((d, i) => (
                <motion.article
                  key={d.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                  className="group rounded-3xl overflow-hidden bg-card shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border border-border/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imgMap[d.image_url] ?? d.image_url}
                      alt={d.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={1024}
                      height={768}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-dark text-white text-xs font-medium flex items-center gap-1.5">
                      <MapPin size={12} /> {d.location}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center gap-1.5">
                      <Clock size={12} /> {d.duration}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold">{d.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{d.description}</p>
                    <div className="mt-5 flex items-end justify-between pt-5 border-t border-border/60">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase">From</div>
                        <div className="font-display text-2xl font-bold text-primary">${Number(d.price).toLocaleString()}</div>
                      </div>
                      <button className="inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-brand text-primary-foreground rounded-full px-4 py-2.5 hover:scale-105 transition-transform">
                        View Details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
        </div>
      </Section>
    </>
  );
}
