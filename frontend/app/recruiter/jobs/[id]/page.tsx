"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import MatchCard from "../../../../components/MatchCard";
import MatchCardSkeleton from "../../../../components/MatchCardSkeleton";
import { apiFetch } from "../../../../lib/api";
import { Match, Job } from "../../../../types";

export default function JobMatchesPage() {
  const params = useParams();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    Promise.all([
      apiFetch<{ data: Job }>(`/jobs/${params.id}`).catch(() => null),
      apiFetch<{ matches: Match[] }>(`/match/${params.id}`).catch(() => ({ matches: [] as Match[] }))
    ])
    .then(([jobRes, matchesRes]) => {
      if (jobRes && jobRes.data) setJob(jobRes.data);
      if (matchesRes && matchesRes.matches) {
        setMatches(matchesRes.matches.sort((a, b) => b.matchPercentage - a.matchPercentage));
      }
    })
    .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <ProtectedRoute role="recruiter">
      <div className="max-w-4xl mx-auto space-y-8 py-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/recruiter")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              Candidate Matches
            </h1>
            {job && <p className="text-indigo-400 mt-1">{job.title}</p>}
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Running semantic search across resumes...</span>
            </div>
            <div className="grid gap-4">
              {[0, 1, 2].map((i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : matches.length === 0 ? (
          <div className="p-12 glass border border-white/5 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-2">No Matches Found</h3>
            <p className="text-slate-400 max-w-md mx-auto">We couldn't find any resumes that match this job description yet. Check back later as more candidates join the platform.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Found {matches.length} matches</span>
              <span className="text-slate-500">Sorted by match score</span>
            </div>
            <div className="grid gap-4">
              {matches.map((match, idx) => (
                <div key={match.resumeId} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <MatchCard match={match} jobId={params.id as string} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}