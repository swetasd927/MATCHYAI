// components/ProtectedRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";
import { UserRole } from "../types";
import { Skeleton } from "./ui/Skeleton";

function AuthGateSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-fade-in">
      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid gap-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default function ProtectedRoute({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== role)) router.push("/login");
  }, [loading, user, role, router]);

  if (loading || !user || user.role !== role) return <AuthGateSkeleton />;
  return <>{children}</>;
}