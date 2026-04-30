import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/rusin-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/adventure", label: "Adventure" },
  { to: "/education", label: "Education" },
  { to: "/team", label: "Our Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
            scrolled ? "glass shadow-card" : "glass-dark"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-10 w-10 rounded-full bg-white grid place-items-center shadow-card overflow-hidden">
              <img src={logo} alt="RUSIN logo" className="h-9 w-9 object-contain" width={36} height={36} />
            </div>
            <span className={`font-display text-xl font-bold tracking-wide ${scrolled ? "text-foreground" : "text-white"}`}>
              RUSIN
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  scrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-white/85 hover:text-white"
                }`}
                activeProps={{
                  className: `relative px-3 py-2 text-sm font-semibold rounded-full ${
                    scrolled ? "text-primary bg-primary/10" : "text-white bg-white/15"
                  }`,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/adventure"
            className="hidden lg:inline-flex items-center justify-center bg-gradient-brand text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold shadow-elegant hover:scale-105 active:scale-95 transition-transform"
          >
            Book a Tour
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className={`lg:hidden grid place-items-center h-10 w-10 rounded-full ${
              scrolled ? "text-foreground bg-secondary" : "text-white bg-white/15"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-3xl p-3 shadow-card"
            >
              <nav className="flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-2xl text-foreground/85 hover:bg-primary/10 hover:text-primary"
                    activeProps={{ className: "px-4 py-3 rounded-2xl text-primary bg-primary/10 font-semibold" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/adventure"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center bg-gradient-brand text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Book a Tour
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
