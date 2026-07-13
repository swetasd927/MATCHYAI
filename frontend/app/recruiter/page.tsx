"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import JobPostForm from "../../components/JobPostForm";
import { Job } from "../../types";
import { apiFetch } from "../../lib/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ data: Job[] }>("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to load jobs", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute role="recruiter">
      <div className="max-w-4xl mx-auto space-y-10 py-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Recruiter Dashboard</h1>
          <p className="text-slate-400">Post job descriptions and find your perfect matches.</p>
        </div>
        
        <JobPostForm onPosted={(job) => setJobs([job, ...jobs])} />
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Your Posted Jobs</h2>
          {loading ? (
            <div className="text-slate-400 animate-pulse">Loading your jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="p-8 glass border border-white/5 rounded-2xl text-center text-slate-400">
              No jobs posted yet. Use the form above to post your first job.
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="p-6 glass-card hover-lift flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 5).map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/20">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 5 && <span className="text-xs text-slate-500 self-center">+{job.skills.length - 5} more</span>}
                    </div>
                  </div>
                  <Link href={`/recruiter/jobs/${job.id}`} className="shrink-0 px-5 py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors text-center">
                    View Matches
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}