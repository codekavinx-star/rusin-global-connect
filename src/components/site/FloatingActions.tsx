import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, Play, X } from "lucide-react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/74955551234"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 grid place-items-center rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-110 active:scale-95 transition-transform animate-float"
      >
        <MessageCircle size={24} />
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-50 animate-ping" />
      </a>

      {/* YouTube floating */}
      <AnimatePresence>
        {videoOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40 }}
            className="fixed bottom-24 right-6 z-40 w-[320px] sm:w-[380px] aspect-video rounded-2xl overflow-hidden shadow-elegant border border-white/15"
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-2 right-2 z-10 h-8 w-8 grid place-items-center rounded-full bg-black/60 text-white hover:bg-black"
              aria-label="Close video"
            >
              <X size={16} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/lWnsrlA8xAA?autoplay=1&mute=1"
              title="Discover Russia"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => setVideoOpen(true)}
            aria-label="Watch video"
            className="fixed bottom-24 right-6 z-40 h-14 w-14 grid place-items-center rounded-full bg-accent text-accent-foreground shadow-elegant hover:scale-110 active:scale-95 transition-transform"
          >
            <Play size={22} className="ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-6 left-6 z-40 h-12 w-12 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-card hover:scale-110 transition-transform"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
