"use client";
import Link from "next/link";
import { useAuth } from "../lib/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 glass border-b-0 border-white/10 px-6 py-4 mb-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-gradient">
          MatchyAI
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="flex flex-col text-right">
                <span className="text-sm font-medium text-slate-200">{user.firstName} {user.lastName}</span>
                <span className="text-xs text-indigo-400 capitalize">{user.role}</span>
              </div>
              <button 
                onClick={logout} 
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}