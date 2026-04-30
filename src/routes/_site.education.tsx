import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Check, GraduationCap, Stethoscope, Wrench, BookOpen, Loader2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import mbbs from "@/assets/edu-mbbs.jpg";
import eng from "@/assets/edu-engineering.jpg";
import courses from "@/assets/edu-courses.jpg";

export const Route = createFileRoute("/_site/education")({
  head: () => ({
    meta: [
      { title: "Study in Russia — MBBS, Engineering & Courses | RUSIN" },
      { name: "description", content: "Admissions guidance for top Russian universities. MBBS, Engineering and language courses with eligibility, fees and process." },
      { property: "og:title", content: "Study in Russia — RUSIN" },
      { property: "og:description", content: "Top universities, transparent fees, full admission support." },
    ],
  }),
  component: EducationPage,
});

const programs = [
  {
    id: "mbbs",
    icon: Stethoscope,
    title: "MBBS",
    img: mbbs,
    eligibility: "12th grade with PCB ≥ 50% (40% reserved). NEET qualified for Indian students.",
    fees: "$3,500 – $6,500 / year",
    duration: "6 years (incl. internship)",
    universities: ["Pirogov RNRMU", "Kazan Federal University", "Tver State Medical", "Bashkir State Medical"],
  },
  {
    id: "engineering",
    icon: Wrench,
    title: "Engineering",
    img: eng,
    eligibility: "12th grade with PCM ≥ 50%. English or Russian-medium tracks available.",
    fees: "$2,800 – $5,200 / year",
    duration: "4 years Bachelor / 6 years Specialist",
    universities: ["Moscow Institute of Physics & Tech", "ITMO University", "Bauman Moscow State Technical", "Tomsk Polytechnic"],
  },
  {
    id: "courses",
    icon: BookOpen,
    title: "Other Courses",
    img: courses,
    eligibility: "Open to international students of all backgrounds.",
    fees: "$1,200 – $4,000 / year",
    duration: "1 – 4 years depending on program",
    universities: ["HSE University", "MGIMO", "St. Petersburg State University", "Lomonosov MSU"],
  },
];

const steps = ["Free Counseling", "Document Review", "University Application", "Invitation Letter", "Visa Processing", "Travel & Arrival"];

const applicationSchema = z.object({
  full_name: z.string().trim().min(2, "Name too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Invalid phone").max(30),
  program: z.string().min(2).max(100),
  country: z.string().max(100).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
});

function EducationPage() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", program: "MBBS", country: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = applicationSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    const payload = {
      ...parsed.data,
      country: parsed.data.country || null,
      message: parsed.data.message || null,
    };
    const { error } = await supabase.from("applications").insert(payload);
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    toast.success("Application received — our team will reach out within 24 hours.");
    setForm({ full_name: "", email: "", phone: "", program: "MBBS", country: "", message: "" });
  };

  return (
    <>
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-accent via-accent to-[oklch(0.35_0.13_25)] text-accent-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_30%,hsl(0_0%_100%/0.25),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-xs uppercase tracking-widest mb-5">
            <GraduationCap size={14} /> Study in Russia
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-display text-5xl md:text-7xl font-bold leading-tight">
            World-Class Degrees. <br /> <span className="italic text-white/90">Russian Heritage.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 max-w-2xl mx-auto text-white/85">
            We place 200+ students every year into Russia's top medical, engineering and humanities universities.
          </motion.p>
        </div>
      </div>

      <Section>
        <SectionHeader eyebrow="Programs" title="Choose your path" />
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group rounded-3xl overflow-hidden bg-card shadow-card hover:shadow-elegant transition-all border border-border/40"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" width={1024} height={640} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur grid place-items-center"><p.icon size={20} /></div>
                  <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                </div>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <Field label="Eligibility" value={p.eligibility} />
                <Field label="Fees" value={p.fees} />
                <Field label="Duration" value={p.duration} />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Top Universities</div>
                  <ul className="mt-2 space-y-1.5">
                    {p.universities.map(u => (
                      <li key={u} className="flex gap-2 text-foreground/85">
                        <Check size={16} className="text-accent shrink-0 mt-0.5" /> {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="bg-secondary/50">
        <Section>
          <SectionHeader eyebrow="Process" title="Admission in 6 simple steps" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card p-5 text-center shadow-card border border-border/40"
              >
                <div className="mx-auto h-10 w-10 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center font-display font-bold">{i + 1}</div>
                <div className="mt-3 text-sm font-semibold">{s}</div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="rounded-3xl overflow-hidden bg-gradient-brand p-1 shadow-elegant">
          <div className="rounded-[calc(theme(borderRadius.3xl)-4px)] bg-card p-8 sm:p-12 grid md:grid-cols-2 gap-10">
            <div>
              <span className="text-accent font-semibold text-xs uppercase tracking-widest">Apply Now</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Begin your <span className="text-gradient">Russian education</span> journey.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Submit your details and our admissions team will get in touch within 24 hours with the best universities for your profile.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["100% free counseling", "No upfront fees", "Direct university partnerships", "Visa & travel support"].map(x => (
                  <li key={x} className="flex gap-2 text-sm text-foreground/85"><Check size={18} className="text-accent" /> {x}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <Input placeholder="Full name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} />
              <Input type="email" placeholder="Email address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Input placeholder="Phone (with country code)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <select
                value={form.program}
                onChange={(e) => setForm({ ...form, program: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
              >
                <option>MBBS</option>
                <option>Engineering</option>
                <option>Other Courses</option>
              </select>
              <Input placeholder="Country (optional)" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
              <textarea
                placeholder="Message (optional)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
              />
              <button
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-brand text-primary-foreground py-3.5 font-semibold shadow-card hover:scale-[1.01] active:scale-[0.99] transition-transform inline-flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
      <div className="mt-1 text-foreground/85">{value}</div>
    </div>
  );
}

function Input({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
    />
  );
}
