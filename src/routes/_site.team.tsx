import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import ceo from "@/assets/team-ceo.jpg";
import manager from "@/assets/team-manager.jpg";
import consultant from "@/assets/team-consultant.jpg";
import support from "@/assets/team-support.jpg";

export const Route = createFileRoute("/_site/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Meet the People Behind RUSIN" },
      { name: "description", content: "Meet our founders, managers, consultants and support leads — the people who make Russia accessible." },
      { property: "og:title", content: "Meet the RUSIN Team" },
      { property: "og:description", content: "The people behind premium Russia experiences." },
    ],
  }),
  component: TeamPage,
});

const team = [
  { name: "Dmitri Volkov", role: "Founder & CEO", img: ceo, bio: "15 years guiding global travelers and students across Russia." },
  { name: "Anna Petrova", role: "Operations Manager", img: manager, bio: "Logistics maestro making every itinerary seamless." },
  { name: "Rajiv Mehra", role: "Education Consultant", img: consultant, bio: "MBBS & engineering admissions specialist with 500+ placements." },
  { name: "Sofia Ivanova", role: "Support Lead", img: support, bio: "Your 24/7 concierge from inquiry to safe return home." },
];

function TeamPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-[oklch(0.35_0.13_257)] text-primary-foreground text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-xs uppercase tracking-widest mb-5">
          Our Team
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl mx-auto px-4">
          The faces behind <span className="italic text-[oklch(0.85_0.15_85)]">your Russia.</span>
        </motion.h1>
      </div>

      <Section>
        <SectionHeader eyebrow="Leadership" title="Meet the team" subtitle="Local experts. Global standards." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group rounded-3xl overflow-hidden bg-card shadow-card hover:shadow-elegant transition-all duration-500 border border-border/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" width={768} height={960} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-xl font-bold">{m.name}</h3>
                  <div className="text-xs text-[oklch(0.85_0.15_85)] uppercase tracking-widest font-semibold">{m.role}</div>
                  <p className="mt-2 text-sm text-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{m.bio}</p>
                  <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
                    {[Linkedin, Twitter, Mail].map((Icon, j) => (
                      <a key={j} href="#" aria-label="social" className="h-8 w-8 grid place-items-center rounded-full bg-white/15 hover:bg-accent transition-colors">
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
