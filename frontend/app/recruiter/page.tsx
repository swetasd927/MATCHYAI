// frontend/app/recruiter/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import JobPostForm from "@/components/JobPostForm";
import { Job } from "@/types";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  return (
    <ProtectedRoute role="recruiter">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <JobPostForm onPosted={(job) => setJobs([job, ...jobs])} />
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 border rounded bg-white flex justify-between items-center">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-gray-500">{job.skills.join(", ")}</p>
              </div>
              <Link href={`/recruiter/jobs/${job.id}`} className="text-indigo-600 text-sm hover:underline">
                View Matches
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}