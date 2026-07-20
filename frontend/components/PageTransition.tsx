"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Wraps route content so navigating between pages fades/slides instead of
 * hard-cutting. Keyed on pathname so AnimatePresence knows a "page" changed
 * (as opposed to state changing within the same page, which shouldn't
 * re-trigger this).
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}