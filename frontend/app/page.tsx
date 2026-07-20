"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand/30 blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-brand-2/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[35%] w-[400px] h-[400px] rounded-full bg-brand-3/10 blur-[120px]"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-32 max-w-5xl mx-auto"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-indigo-300 text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          AI-Powered Job Matching
        </motion.div>

        <motion.h1 variants={item} className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]">
          Hire smarter.<br />
          <span className="text-gradient">Match instantly.</span>
        </motion.h1>

        <motion.p variants={item} className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed">
          Upload your resume once and let our semantic search engine find the perfect role.
          Recruiters, find your top candidates in milliseconds.
        </motion.p>

        <motion.div variants={item} className="flex gap-4 items-center flex-wrap justify-center">
          <Link
            href="/register"
            className="group px-8 py-3.5 rounded-full bg-brand hover:bg-brand/90 text-white font-medium transition-all shadow-[0_0_30px_-6px_rgba(99,102,241,0.7)] hover:shadow-[0_0_40px_-4px_rgba(99,102,241,0.9)] flex items-center gap-2"
          >
            Start Matching
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 rounded-full border border-white/[0.1] hover:bg-white/[0.04] text-slate-300 font-medium transition-all"
          >
            Sign In
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 flex items-center gap-8 text-slate-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-2" />
            <span>Semantic AI matching</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span>Built for seekers & recruiters</span>
        </motion.div>
      </motion.div>
    </div>
  );
}