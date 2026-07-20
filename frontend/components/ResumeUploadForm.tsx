"use client";
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "./ui/Button";
import { Resume } from "../types";

type Status = "idle" | "dragging" | "selected" | "uploading" | "success" | "error";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Uploads via XMLHttpRequest instead of fetch — fetch has no reliable way to
 * report upload progress, but XHR's `upload.onprogress` does, which is what
 * drives the real progress bar below (not a simulated/fake one).
 */

function uploadWithProgress(
  file: File,
  onProgress: (pct: number) => void,
): Promise<{ data: Resume }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    xhr.open("POST", `${API_URL}/resume/upload`);
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    // Hard cap so "Processing" can never hang forever — the upload itself
    // is usually fast, it's the AI parsing step server-side that can stall.
    xhr.timeout = 30000; // 30s

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(data);
        else reject(new Error(data.error || data.message || "Upload failed"));
      } catch {
        reject(new Error("Unexpected response from server"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error while uploading"));
    xhr.ontimeout = () =>
      reject(new Error("This is taking too long. The AI service may be busy — please try again shortly."));

    const formData = new FormData();
    formData.append("pdf", file);
    xhr.send(formData);
  });
}

export default function ResumeUploadForm({ onUploaded }: { onUploaded: (r: Resume) => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const isBusy = status === "uploading";
  const isDragging = status === "dragging";

  const pickFile = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file");
      setStatus("error");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("File is larger than 5MB");
      setStatus("error");
      return;
    }
    setFile(f);
    setError("");
    setStatus("selected");
  };

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    setStatus((s) => (s === "uploading" ? s : "dragging"));
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setStatus((s) => (s === "dragging" ? "idle" : s));
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    pickFile(e.dataTransfer.files?.[0] || null);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(0);
    setError("");
    try {
      const res = await uploadWithProgress(file, setProgress);
      setStatus("success");
      onUploaded(res.data);
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setError("");
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Upload Resume (PDF)</h2>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-(--radius-md) text-sm overflow-hidden"
            style={{
              background: "color-mix(in oklab, var(--danger) 10%, transparent)",
              border: "1px solid color-mix(in oklab, var(--danger) 30%, transparent)",
              color: "var(--danger)",
            }}
          >
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !isBusy && !file && inputRef.current?.click()}
        animate={{
          scale: isDragging ? 1.015 : 1,
          borderColor: isDragging ? "var(--primary)" : "var(--border)",
        }}
        transition={{ duration: 0.15 }}
        className="relative rounded-lg p-10 flex flex-col items-center justify-center text-center"
        style={{
          border: `2px dashed ${isDragging ? "var(--primary)" : "var(--border)"}`,
          background: isDragging
            ? "color-mix(in oklab, var(--primary) 6%, var(--surface-2))"
            : "var(--surface-2)",
          cursor: isBusy || file ? "default" : "pointer",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0] || null)}
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: isDragging ? -4 : 0 }}
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
              >
                <UploadCloud size={24} className="text-primary" />
              </motion.div>
              <p className="font-medium mb-1">
                {isDragging ? "Drop it right here" : "Click or drag PDF to upload"}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Maximum file size 5MB.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="w-full max-w-sm"
            >
              <div className="flex items-center gap-3 mb-4 text-left">
                <div
                  className="w-10 h-10 rounded-(--radius-md) flex items-center justify-center shrink-0"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  {status === "success" ? (
                    <CheckCircle2 size={18} style={{ color: "var(--success)" }} />
                  ) : (
                    <FileText size={18} className="text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                {!isBusy && status !== "success" && (
                  <button
                    type="button"
                    onClick={reset}
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5"
                    style={{ color: "var(--muted)" }}
                    aria-label="Remove file"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {(isBusy || status === "success") && (
                <div className="mb-1">
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--border)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: status === "success" ? "var(--success)" : "var(--primary)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${status === "success" ? 100 : progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-xs mt-1.5 text-left" style={{ color: "var(--muted)" }}>
                    {status === "success"
                      ? "Parsed successfully"
                      : progress < 100
                        ? `Uploading… ${progress}%`
                        : "Extracting details with AI…"}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {file && status !== "success" && (
        <div className="flex justify-end mt-5">
          <Button onClick={handleUpload} disabled={isBusy} loading={isBusy} size="md">
            {isBusy ? "Processing" : "Upload & Parse Resume"}
          </Button>
        </div>
      )}

      {status === "success" && (
        <div className="flex justify-end mt-5">
          <Button onClick={reset} variant="secondary" size="md">
            Upload a different resume
          </Button>
        </div>
      )}
    </div>
  );
}