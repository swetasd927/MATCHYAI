"use client";
import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import ResumeUploadForm from "../../components/ResumeUploadForm";
import { Resume } from "../../types";

export default function SeekerDashboard() {
  const [resume, setResume] = useState<Resume | null>(null);

  return (
    <ProtectedRoute role="seeker">
      <div className="max-w-3xl mx-auto space-y-10 py-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Seeker Dashboard</h1>
          <p className="text-slate-400">Upload your resume and let our semantic search engine find jobs for you.</p>
        </div>
        
        <ResumeUploadForm onUploaded={setResume} />
        
        {resume && (
          <div className="p-8 glass-card space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">Parsed Profile</h2>
              <p className="text-sm text-slate-400 mt-1">Here is how our AI understood your resume.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Candidate Name</span>
                <p className="text-white font-medium">{resume.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Location/Address</span>
                <p className="text-white font-medium">{resume.address || "Not specified"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Extracted Skills</span>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 text-xs font-medium bg-slate-800/80 text-slate-300 rounded-full border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Experience</span>
                <div className="space-y-4">
                  {resume.experience.map((e, i) => (
                    <div key={i} className="pl-4 border-l-2 border-indigo-500/50">
                      <h4 className="text-white font-medium">{e.title}</h4>
                      <p className="text-slate-300 text-sm">{e.company}</p>
                      <p className="text-slate-500 text-xs mt-1">{e.duration}</p>
                    </div>
                  ))}
                  {resume.experience.length === 0 && <p className="text-slate-500 text-sm">No experience found.</p>}
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Education</span>
                <div className="space-y-4">
                  {resume.education.map((e, i) => (
                    <div key={i} className="pl-4 border-l-2 border-purple-500/50">
                      <h4 className="text-white font-medium">{e.degree}</h4>
                      <p className="text-slate-300 text-sm">{e.institution}</p>
                      <p className="text-slate-500 text-xs mt-1">{e.year}</p>
                    </div>
                  ))}
                  {resume.education.length === 0 && <p className="text-slate-500 text-sm">No education found.</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}