// frontend/app/recruiter/jobs/[jobId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import MatchCard from "@/components/MatchCard";
import { apiFetch } from "@/lib/api";
import { Match } from "@/types";

export default function JobMatchesPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [matches, setMatches] = useState<Match[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ jobTitle: string; matches: Match[] }>(`/match/${jobId}`)
      .then((res) => {
        setJobTitle(res.jobTitle);
        setMatches(res.matches);
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [jobId]);

  return (
    <ProtectedRoute role="recruiter">
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Matches for {jobTitle}</h1>
        {loading && <p>Loading matches...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {matches.map((m) => (
          <MatchCard key={m.resumeId} match={m} />
        ))}
        {!loading && matches.length === 0 && !error && <p className="text-gray-500">No matches found yet.</p>}
      </div>
    </ProtectedRoute>
  );
}