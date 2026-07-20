"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Sparkles } from "lucide-react";
import { apiFetch } from "../lib/api";
import { Job } from "../types";
import { Button } from "./ui/Button";

export default function JobPostForm({ onPosted }: { onPosted: (j: Job) => void }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch<{ data: Job }>("/jobs", {
        method: "POST",
        body: JSON.stringify({ description }),
      });
      onPosted(res.data);
      setDescription("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-semibold text-lg">Post a New Job</h2>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="flex items-start gap-2 px-4 py-3 rounded-(--radius-md) text-sm overflow-hidden"
            style={{
              background: "color-mix(in oklab, var(--danger) 10%, transparent)",
              border: "1px solid color-mix(in oklab, var(--danger) 30%, transparent)",
              color: "var(--danger)",
            }}
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-2">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          required
          placeholder="Paste the full job description here… Our AI will automatically parse the title, requirements, and required skills."
          className="w-full rounded-(--radius-md) px-4 py-3 text-sm outline-none border transition-colors resize-none"
          style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
          <Sparkles size={12} className="text-primary" /> AI extracts title, skills & requirements automatically
        </span>
        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? "Processing" : "Post Job"}
        </Button>
      </div>
    </form>
  );
}