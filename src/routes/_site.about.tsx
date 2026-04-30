import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Compass, HeartHandshake, Shield, Sparkles, Target } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import petersburg from "@/assets/dest-petersburg.jpg";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About RUSIN — Russia Travel, Education & Business Experts" },
      { name: "description", content: "Founded in Moscow, RUSIN connects the world to Russia through premium travel, university admissions and business setup services." },
      { property: "og:title", content: "About RUSIN" },
      { property: "og:description", content: "Russia travel, education and business experts." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <div className="relative h-[60svh] min-h-[440px] overflow-hidden">
        <img src={petersburg} alt="Saint Petersburg" className="absolute inset-0 w-full h-full object-cover scale-110" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-background" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full glass-dark text-white/90 text-xs uppercase tracking-widest mb-5"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-white max-w-3xl"
          >
            Built in Moscow. <span className="italic text-[oklch(0.85_0.15_85)]">For the World.</span>
          </motion.h1>
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-accent font-semibold text-xs uppercase tracking-widest">Our Story</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">A house of three crafts.</h2>
            <p className="mt-5 text-foreground/80 leading-relaxed">
              RUSIN began in 2010 with a single tour through Moscow's hidden courtyards. Fifteen years later we lead premium expeditions across the Russian Federation, place hundreds of international students into top medical and engineering universities, and help foreign companies open their first office in Russia.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              We believe Russia is best discovered through trusted, local hands — and that's exactly what we are.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: Target, title: "Mission", body: "Make Russia accessible, safe and unforgettable for every traveler, student and entrepreneur." },
              { icon: Sparkles, title: "Vision", body: "Be the most trusted bridge between Russia and the world by 2030." },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl p-7 bg-gradient-brand text-primary-foreground shadow-card"
              >
                <c.icon size={28} />
                <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/85 leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="bg-secondary/40">
        <Section>
          <SectionHeader eyebrow="Why Choose Us" title="Six reasons travelers and students trust RUSIN" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: "Licensed & Insured", body: "Fully accredited tour operator and education consultancy." },
              { icon: Award, title: "15 Years On-Ground", body: "Local team based in Moscow and Saint Petersburg since 2010." },
              { icon: Compass, title: "Tailored Itineraries", body: "Every trip and study plan built around you — never copy-pasted." },
              { icon: HeartHandshake, title: "End-to-End Support", body: "Visa, flights, housing, transport, translation — all handled." },
              { icon: Sparkles, title: "Premium Partners", body: "Five-star hotels, top universities, vetted local guides." },
              { icon: Target, title: "Transparent Pricing", body: "No hidden fees. What you see is what you pay." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-card p-6 shadow-card hover:-translate-y-1 hover:shadow-elegant transition-all border border-border/40"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-brand grid place-items-center text-primary-foreground">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "ISO 9001", v: "Certified Operator" },
            { k: "24/7", v: "Concierge Support" },
            { k: "100%", v: "Visa Success Rate" },
            { k: "4.9★", v: "Google Reviews" },
          ].map((b) => (
            <div key={b.k} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{b.k}</div>
              <div className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{b.v}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
