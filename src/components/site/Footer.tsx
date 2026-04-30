import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { TermsModal } from "./TermsModal";
import logo from "@/assets/rusin-logo.png";

export function Footer() {
  const [terms, setTerms] = useState(false);
  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_0%,hsl(0_0%_100%/0.18),transparent_60%),radial-gradient(circle_at_80%_100%,hsl(0_0%_100%/0.12),transparent_55%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white grid place-items-center">
              <img src={logo} alt="RUSIN" className="h-10 w-10 object-contain" width={40} height={40} />
            </div>
            <div>
              <div className="font-display text-2xl font-bold">RUSIN</div>
              <div className="text-xs text-primary-foreground/70">Russia, Reimagined.</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/75 leading-relaxed">
            Travel, education and business assistance across Russia — delivered with white-glove service.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-accent transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-accent transition-colors">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/adventure" className="hover:text-white">Adventure</Link></li>
            <li><Link to="/education" className="hover:text-white">Education</Link></li>
            <li><Link to="/team" className="hover:text-white">Our Team</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/85">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" /> Tverskaya St 22, Moscow, Russia 125009</li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0" /> +7 (495) 555-12-34</li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0" /> hello@rusin.travel</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-white">Newsletter</h4>
          <p className="text-sm text-primary-foreground/75 mb-3">Get curated Russia stories monthly.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-full px-4 py-2.5 bg-white/10 placeholder:text-white/50 text-sm border border-white/15 focus:outline-none focus:border-white/40"
            />
            <button className="rounded-full px-4 py-2.5 bg-accent text-accent-foreground text-sm font-semibold hover:scale-105 transition-transform">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/65">
          <p>© {new Date().getFullYear()} RUSIN. All rights reserved. Designed by RUSIN Studio.</p>
          <div className="flex gap-5">
            <button onClick={() => setTerms(true)} className="hover:text-white">Terms & Conditions</button>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </div>

      <TermsModal open={terms} onClose={() => setTerms(false)} />
    </footer>
  );
}
