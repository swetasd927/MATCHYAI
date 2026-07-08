"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import { Resume } from "@/types";

export default function SeekerDashboard() {
  const [resume, setResume] = useState<Resume | null>(null);

  return (
    <ProtectedRoute role="seeker">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Seeker Dashboard</h1>
        <ResumeUploadForm onUploaded={setResume} />
        {resume && (
          <div className="p-6 border rounded bg-white space-y-2">
            <h2 className="text-lg font-semibold">Parsed Resume</h2>
            <p><strong>Name:</strong> {resume.name}</p>
            <p><strong>Address:</strong> {resume.address}</p>
            <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>
            <div>
              <strong>Experience:</strong>
              <ul className="list-disc pl-5">
                {resume.experience.map((e, i) => (
                  <li key={i}>{e.title} at {e.company} ({e.duration})</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Education:</strong>
              <ul className="list-disc pl-5">
                {resume.education.map((e, i) => (
                  <li key={i}>{e.degree} - {e.institution} ({e.year})</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}