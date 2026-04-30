import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined" && !localStorage.getItem("rusin-cookies")) {
        setShow(true);
      }
    }, 1200);
    return () => clearTimeout(t);
  }, []);
  const accept = () => {
    localStorage.setItem("rusin-cookies", "accepted");
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(640px,calc(100vw-2rem))]"
        >
          <div className="glass shadow-elegant rounded-2xl p-4 sm:p-5 flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-accent/15 grid place-items-center text-accent">
              <Cookie size={20} />
            </div>
            <div className="flex-1 text-sm text-foreground/85">
              We use cookies to enhance your experience and analyze site traffic. By continuing, you agree to our use of cookies.
            </div>
            <button onClick={accept} className="rounded-full bg-gradient-brand text-primary-foreground px-4 py-2 text-sm font-semibold shrink-0 hover:scale-105 transition-transform">
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
