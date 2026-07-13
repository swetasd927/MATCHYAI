"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";
import { UserRole } from "../types";

export default function ProtectedRoute({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== role)) router.push("/login");
  }, [loading, user, role, router]);

  if (loading || !user || user.role !== role) return <p className="p-8">Loading...</p>;
  return <>{children}</>;
}