"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Resume } from "@/types";

export default function ResumeUploadForm({ onUploaded }: { onUploaded: (r: Resume) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const res = await apiFetch<{ data: Resume }>("/resume/upload", { method: "POST", body: formData });
      onUploaded(res.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded bg-white space-y-4">
      <h2 className="text-lg font-semibold">Upload Resume (PDF)</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {loading ? "Parsing..." : "Upload & Parse"}
      </button>
    </form>
  );
}