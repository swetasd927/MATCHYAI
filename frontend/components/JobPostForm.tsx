// frontend/components/JobPostForm.tsx
"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Job } from "@/types";

export default function JobPostForm({ onPosted }: { onPosted: (j: Job) => void }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch<{ data: Job }>("/jobs", { method: "POST", body: JSON.stringify({ description }) });
      onPosted(res.data);
      setDescription("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded bg-white space-y-4">
      <h2 className="text-lg font-semibold">Post a Job Description</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
        required
        placeholder="Paste the full job description here..."
        className="w-full border rounded px-3 py-2"
      />
      <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {loading ? "Parsing..." : "Post Job"}
      </button>
    </form>
  );
}