import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/_site/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What our travelers and students say | RUSIN" },
      { name: "description", content: "Real reviews from RUSIN travelers, MBBS students and business clients. 4.3 / 5 average rating." },
      { property: "og:title", content: "RUSIN Reviews" },
      { property: "og:description", content: "Loved by travelers, students and entrepreneurs." },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [
  { name: "Aarav Sharma", role: "MBBS Student, Kazan FU", rating: 5, text: "RUSIN handled every step — visa, flights, hostel, even the SIM card waiting for me at the airport. They turned an intimidating move into a smooth one." },
  { name: "Elena Pavlov", role: "Moscow Tour, 2024", rating: 4, text: "The most cinematic week of my life. Hidden cathedrals, rooftop dinners, and a guide who actually knew the history. Only wish it lasted longer." },
  { name: "James O'Connor", role: "Business Setup, Dublin → Moscow", rating: 5, text: "We opened our Moscow office in just 6 weeks. Flawless paperwork, translations and a local CFO recommendation that saved us months." },
  { name: "Priya Reddy", role: "Engineering, ITMO University", rating: 4, text: "Transparent fees and honest counseling. They didn't push me toward the most expensive option — they pushed me toward the right one." },
  { name: "Marcus Lehmann", role: "Baikal Expedition", rating: 5, text: "Standing on a meter of frozen turquoise ice with our Siberian guide cooking lunch on the bank — unreal. Worth every euro." },
];

const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

function ReviewsPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-gradient-to-br from-accent via-accent to-[oklch(0.35_0.13_25)] text-accent-foreground text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-xs uppercase tracking-widest mb-5">
          Reviews
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl mx-auto px-4">
          Loved by <span className="italic">travelers and students.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 inline-flex items-center gap-3 glass-dark rounded-full px-6 py-3">
          <div className="flex gap-0.5 text-[oklch(0.85_0.15_85)]">
            {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
          </div>
          <span className="font-display text-2xl font-bold">{avg}</span>
          <span className="text-white/80 text-sm">/ 5 average rating</span>
        </motion.div>
      </div>

      <Section>
        <SectionHeader eyebrow="Testimonials" title="Real stories, real journeys" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="relative rounded-3xl bg-card p-7 shadow-card border border-border/40 hover:-translate-y-1 hover:shadow-elegant transition-all"
            >
              <Quote size={40} className="text-primary/15 absolute top-4 right-4" />
              <div className="flex gap-0.5 text-[oklch(0.78_0.14_85)]">
                {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                {Array.from({ length: 5 - r.rating }).map((_, j) => <Star key={j} size={16} className="opacity-25" fill="currentColor" />)}
              </div>
              <p className="mt-4 text-foreground/85 leading-relaxed relative z-10">"{r.text}"</p>
              <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground font-semibold">
                  {r.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </>
  );
}
