"use client";
import { useState } from "react";
import { apiFetch } from "../lib/api";
import { Resume } from "../types";

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
    <form onSubmit={handleSubmit} className="p-8 glass-card space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">Upload Resume (PDF)</h2>
        {file && <span className="text-xs font-medium bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20">{file.name}</span>}
      </div>
      
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      
      <div className="relative border-2 border-dashed border-slate-600 rounded-xl bg-slate-900/30 hover:bg-slate-900/50 hover:border-indigo-500/50 transition-all p-10 flex flex-col items-center justify-center text-center cursor-pointer group">
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          required 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <svg className="w-12 h-12 text-slate-500 group-hover:text-indigo-400 mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        <p className="text-slate-300 font-medium mb-1 group-hover:text-white transition-colors">Click or drag PDF to upload</p>
        <p className="text-slate-500 text-xs">Maximum file size 5MB.</p>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={!file || loading} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:shadow-none flex items-center gap-2">
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Extracting Details...
            </>
          ) : "Upload & Parse Resume"}
        </button>
      </div>
    </form>
  );
}