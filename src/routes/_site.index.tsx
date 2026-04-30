import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Star, Sparkles, Shield, Award, Globe } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";
import hero from "@/assets/hero-russia.jpg";
import moscow from "@/assets/dest-moscow.jpg";
import petersburg from "@/assets/dest-petersburg.jpg";
import baikal from "@/assets/dest-baikal.jpg";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "RUSIN — Explore Russia with Experts | Travel, Education, Business" },
      { name: "description", content: "Premium tours across Russia, MBBS & engineering admissions, and business setup. White-glove service from Moscow to Kamchatka." },
      { property: "og:title", content: "RUSIN — Explore Russia with Experts" },
      { property: "og:description", content: "Premium tours, education and business assistance across Russia." },
      { property: "og:image", content: hero },
    ],
  }),
  component: HomePage,
});

const fallbackImg: Record<string, string> = {
  "/src/assets/dest-moscow.jpg": moscow,
  "/src/assets/dest-petersburg.jpg": petersburg,
  "/src/assets/dest-baikal.jpg": baikal,
};

function Counter({ to, suffix = "+", label }: { to: number; suffix?: string; label: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient">
        {v.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm sm:text-base text-muted-foreground tracking-wide uppercase">{label}</div>
    </div>
  );
}

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const [destinations, setDestinations] = useState<Array<{ id: string; title: string; description: string; price: number; duration: string; image_url: string; location: string }>>([]);

  useEffect(() => {
    supabase.from("destinations").select("*").eq("featured", true).limit(3).then(({ data }) => {
      if (data) setDestinations(data);
    });
  }, []);

  return (
    <>
      {/* HERO */}
      <div ref={heroRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.div style={{ y, scale: 1.1 }} className="absolute inset-0">
          <img src={hero} alt="Russia at twilight" className="w-full h-full object-cover" width={1920} height={1080} fetchPriority="high" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent,hsl(0_0%_0%/0.5))]" />

        <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-white/90 text-xs sm:text-sm font-medium tracking-wider uppercase mb-6"
          >
            <Sparkles size={14} /> Russia, Reimagined
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] max-w-5xl"
          >
            Explore Russia <br className="hidden sm:block" />
            <span className="italic text-gradient bg-gradient-to-r from-white via-white to-[oklch(0.85_0.15_85)]">with Experts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-white/85"
          >
            Curated tours, world-class universities, and business assistance — across Moscow, Saint Petersburg, Siberia and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/adventure" className="group inline-flex items-center gap-2 bg-white text-primary rounded-full pl-6 pr-2 py-2 font-semibold shadow-elegant hover:scale-105 active:scale-95 transition-transform">
              Book a Tour
              <span className="h-9 w-9 grid place-items-center rounded-full bg-gradient-brand text-white">
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <a href="mailto:hello@rusin.travel" className="inline-flex items-center gap-2 glass-dark text-white rounded-full px-6 py-3 font-semibold hover:bg-white/15 transition-colors">
              Contact Us
            </a>
            <a href="/rusin-brochure.pdf" download aria-label="Download brochure" className="h-12 w-12 grid place-items-center rounded-full bg-accent text-accent-foreground shadow-elegant hover:scale-110 transition-transform" title="Download brochure">
              <Download size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
            <div className="h-10 w-6 rounded-full border-2 border-white/40 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="h-1.5 w-1.5 rounded-full bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* COUNTERS */}
      <Section className="!py-16 sm:!py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <Counter to={350} label="Tours Delivered" />
          <Counter to={1200} label="Students Placed" />
          <Counter to={480} label="Happy Clients" />
          <Counter to={15} label="Years Experience" />
        </div>
      </Section>

      {/* FEATURED PACKAGES */}
      <Section className="!pt-8">
        <SectionHeader
          eyebrow="Signature Journeys"
          title="Featured Packages"
          subtitle="Hand-crafted experiences across the most iconic corners of Russia."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.length === 0
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-[420px]" />)
            : destinations.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group relative rounded-3xl overflow-hidden bg-card shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={fallbackImg[d.image_url] ?? d.image_url}
                      alt={d.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={1024} height={1280}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full glass-dark text-white text-xs font-medium">{d.location}</span>
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">{d.duration}</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                    <h3 className="font-display text-2xl font-bold">{d.title}</h3>
                    <p className="mt-1.5 text-sm text-white/80 line-clamp-2">{d.description}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-white/60 uppercase">From</div>
                        <div className="font-display text-2xl font-bold">${Number(d.price).toLocaleString()}</div>
                      </div>
                      <Link to="/adventure" className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white text-primary rounded-full px-4 py-2 hover:scale-105 transition-transform">
                        View <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/adventure" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            See all destinations <ArrowRight size={18} />
          </Link>
        </div>
      </Section>

      {/* WHY US */}
      <div className="bg-gradient-to-br from-primary via-primary to-[oklch(0.35_0.13_257)] text-primary-foreground">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-widest uppercase mb-4">Why RUSIN</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Three pillars. <span className="italic text-[oklch(0.85_0.15_85)]">One promise.</span>
              </h2>
              <p className="mt-5 text-primary-foreground/80 leading-relaxed">
                Whether you're chasing the Northern Lights, a medical degree, or a foothold in the Russian market — we open the door.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Globe, title: "Travel & Tours", body: "350+ curated journeys across 11 time zones." },
                { icon: Award, title: "Education", body: "MBBS, Engineering & Russian language admissions." },
                { icon: Shield, title: "Business", body: "Company setup, visas, and translation services." },
                { icon: Star, title: "White-Glove", body: "Dedicated concierge from inquiry to return." },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <f.icon size={28} className="text-[oklch(0.85_0.15_85)]" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/75">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* TESTIMONIALS PREVIEW */}
      <Section>
        <SectionHeader eyebrow="Loved by Travelers" title="What our guests say" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Aarav Sharma", role: "MBBS, 2024", text: "RUSIN handled every step — visa, flights, hostel. I just had to study." },
            { name: "Elena Pavlov", role: "Moscow Tour", text: "The most cinematic week of my life. Hidden cathedrals and rooftop dinners." },
            { name: "James O'Connor", role: "Business Setup", text: "Opened our Moscow office in 6 weeks. Flawless paperwork and translations." },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="rounded-3xl bg-card p-7 shadow-card border border-border/50"
            >
              <div className="flex gap-1 text-[oklch(0.78_0.14_85)]">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="mt-4 text-foreground/85 leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground font-semibold">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/reviews" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            Read all reviews <ArrowRight size={18} />
          </Link>
        </div>
      </Section>
    </>
  );
}
