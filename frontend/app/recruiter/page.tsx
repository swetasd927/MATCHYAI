"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Users, Target, Sparkles, ArrowRight, Clock } from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";
import JobPostForm from "../../components/JobPostForm";
import JobCardSkeleton from "../../components/JobCardSkeleton";
import StatCardSkeleton from "../../components/StatCardSkeleton";
import { Card } from "../../components/ui/Card";
import { Job, Match } from "../../types";
import { apiFetch } from "../../lib/api";

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matchCounts, setMatchCounts] = useState<Record<number, Match[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ data: Job[] }>("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to load jobs", err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch match counts per job so the stat cards and job list reflect real
  // pipeline activity, not just the job listing itself.
  useEffect(() => {
    if (jobs.length === 0) return;
    Promise.all(
      jobs.map((j) =>
        apiFetch<{ matches: Match[] }>(`/match/${j.id}`)
          .then((res) => [j.id, res.matches] as const)
          .catch(() => [j.id, []] as const),
      ),
    ).then((results) => {
      setMatchCounts(Object.fromEntries(results));
    });
  }, [jobs]);

  const stats = useMemo(() => {
    const allMatches = Object.values(matchCounts).flat();
    const uniqueSkills = new Set(jobs.flatMap((j) => j.skills));
    const avgScore =
      allMatches.length > 0
        ? Math.round(allMatches.reduce((sum, m) => sum + m.matchPercentage, 0) / allMatches.length)
        : null;

    return [
      { icon: Briefcase, label: "Active Job Posts", value: jobs.length.toString() },
      { icon: Users, label: "Candidates Matched", value: allMatches.length.toString() },
      { icon: Target, label: "Avg Match Score", value: avgScore !== null ? `${avgScore}%` : "—" },
      { icon: Sparkles, label: "Skills Tracked", value: uniqueSkills.size.toString() },
    ];
  }, [jobs, matchCounts]);

  return (
    <ProtectedRoute role="recruiter">
      <div className="max-w-4xl mx-auto space-y-8 py-10">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Recruiter Dashboard</h1>
          <p className="text-sm sm:text-base" style={{ color: "var(--muted)" }}>
            Post job descriptions and find your perfect matches.
          </p>
        </div>

        {/* Stat cards */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <motion.div key={s.label} variants={item}>
                <Card className="p-4! sm:p-5!">
                  <s.icon size={16} className="text-primary mb-2.5" />
                  <div className="font-display text-xl sm:text-2xl font-bold">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    {s.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <Card>
          <JobPostForm onPosted={(job) => setJobs([job, ...jobs])} />
        </Card>

        <div>
          <h2 className="font-semibold text-lg mb-4">Your Posted Jobs</h2>

          {loading ? (
            <div className="space-y-4">
              {[0, 1].map((i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <Card className="text-center py-10">
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                No jobs posted yet. Use the form above to post your first job.
              </p>
            </Card>
          ) : (
            <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
              {jobs.map((job) => {
                const matches = matchCounts[job.id];
                return (
                  <motion.div key={job.id} variants={item} whileHover={{ y: -3 }}>
                    <Card className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="font-semibold">{job.title}</h3>
                          <span
                            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                            style={{ color: "var(--muted)" }}
                          >
                            <Clock size={11} /> {timeAgo(job.createdAt)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {job.skills.slice(0, 5).map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 text-xs font-mono rounded-full"
                              style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--muted)" }}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="text-xs self-center" style={{ color: "var(--muted)" }}>
                              +{job.skills.length - 5} more
                            </span>
                          )}
                        </div>

                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: "color-mix(in oklab, var(--primary) 10%, transparent)",
                            color: "var(--primary)",
                          }}
                        >
                          <Users size={11} />
                          {matches === undefined ? "Loading matches…" : `${matches.length} match${matches.length === 1 ? "" : "es"}`}
                        </span>
                      </div>

                      <Link
                        href={`/recruiter/jobs/${job.id}`}
                        className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-pill text-center transition-colors group"
                        style={{ background: "var(--primary)", color: "white" }}
                      >
                        View Matches
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}