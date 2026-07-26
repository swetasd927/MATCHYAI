"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Search, Users, Mail, Sparkles } from "lucide-react";

export default function AuthPanel({
  title = "Continue Your Journey with MatchyAI",
  subtitle = "Log in to explore new job opportunities or manage your hiring process with ease.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative hidden md:flex flex-col justify-between overflow-hidden px-10 py-12 text-white min-h-[580px]" style={{ background: "radial-gradient(circle at 30% 30%, #1a0f07 0%, #0c0805 60%, #050302 100%)" }}>
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-25"
          style={{ background: "var(--primary)", top: "-10%", left: "-10%" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-20"
          style={{ background: "#ff7733", bottom: "-5%", right: "-5%" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Back Button */}
      <div className="z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 transition-all"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
      </div>

      {/* Center Orbital Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-stone-800/80 shadow-[0_0_30px_rgba(249,87,22,0.05)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Top Outer Node */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white"
              >
                <FileText size={20} />
              </motion.div>
            </div>

            {/* Bottom Outer Node */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white"
              >
                <Mail size={20} />
              </motion.div>
            </div>
          </motion.div>

          {/* Inner Ring */}
          <motion.div
            className="absolute w-36 h-36 rounded-full border border-stone-800/90"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Left Inner Node */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-9 h-9 rounded-lg bg-orange-600/90 flex items-center justify-center shadow-md text-white"
              >
                <Search size={16} />
              </motion.div>
            </div>

            {/* Right Inner Node */}
            <div className="absolute top-1/2 -right-4 -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-9 h-9 rounded-lg bg-amber-600/90 flex items-center justify-center shadow-md text-white"
              >
                <Users size={16} />
              </motion.div>
            </div>
          </motion.div>

          {/* Center Brand Pulse Core */}
          <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-xl shadow-orange-500/30">
            <Sparkles size={24} className="text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom Text Content */}
      <div className="relative z-10 text-center max-w-xs mx-auto">
        <h2 className="font-display text-2xl font-bold text-orange-500 mb-2 leading-tight">
          {title}
        </h2>
        <p className="text-xs text-stone-400 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}