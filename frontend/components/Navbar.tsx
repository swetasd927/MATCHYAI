"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-indigo-600">MatchyAI</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">{user.firstName} ({user.role})</span>
            <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm hover:underline">Login</Link>
            <Link href="/register" className="text-sm hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}