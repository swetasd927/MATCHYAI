"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, User as UserIcon, Briefcase, GraduationCap } from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";
import ResumeUploadForm from "../../components/ResumeUploadForm";
import { Card } from "../../components/ui/Card";
import { Resume } from "../../types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SeekerDashboard() {
  const [resume, setResume] = useState<Resume | null>(null);

  return (
    <ProtectedRoute role="seeker">
      <div className="max-w-3xl mx-auto space-y-8 py-10">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Seeker Dashboard</h1>
          <p className="text-sm sm:text-base" style={{ color: "var(--muted)" }}>
            Upload your resume and let our semantic search engine find jobs for you.
          </p>
        </div>

        <Card>
          <ResumeUploadForm onUploaded={setResume} />
        </Card>

        {resume && (
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <Card>
                <div
                  className="flex items-center gap-2 mb-6 pb-5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <Sparkles size={16} className="text-primary" />
                  <div>
                    <h2 className="font-semibold">Parsed Profile</h2>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      Here's how our AI understood your resume.
                    </p>
                  </div>
                </div>

                <motion.div variants={container} className="grid sm:grid-cols-2 gap-6 mb-6">
                  <motion.div variants={item} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-(--radius-md) flex items-center justify-center shrink-0"
                      style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
                    >
                      <UserIcon size={15} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                        Candidate Name
                      </span>
                      <p className="font-medium">{resume.name || "Not specified"}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-(--radius-md) flex items-center justify-center shrink-0"
                      style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
                    >
                      <MapPin size={15} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                        Location
                      </span>
                      <p className="font-medium">{resume.address || "Not specified"}</p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={item} className="mb-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider block mb-2.5"
                    style={{ color: "var(--muted)" }}
                  >
                    Extracted Skills
                  </span>
                  <motion.div variants={container} className="flex flex-wrap gap-2">
                    {resume.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={item}
                        className="px-2.5 py-1 text-xs font-mono rounded-full"
                        style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--muted)" }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                    {resume.skills.length === 0 && (
                      <span className="text-sm" style={{ color: "var(--muted)" }}>
                        No skills found.
                      </span>
                    )}
                  </motion.div>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-8 pt-2">
                  <motion.div variants={item}>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-3"
                      style={{ color: "var(--muted)" }}
                    >
                      <Briefcase size={12} /> Experience
                    </span>
                    <motion.div variants={container} className="space-y-4">
                      {resume.experience.map((e, i) => (
                        <motion.div
                          key={i}
                          variants={item}
                          className="pl-3"
                          style={{ borderLeft: "2px solid color-mix(in oklab, var(--primary) 40%, transparent)" }}
                        >
                          <h4 className="text-sm font-medium">{e.title}</h4>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{e.company}</p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{e.duration}</p>
                        </motion.div>
                      ))}
                      {resume.experience.length === 0 && (
                        <p className="text-sm" style={{ color: "var(--muted)" }}>No experience found.</p>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div variants={item}>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-3"
                      style={{ color: "var(--muted)" }}
                    >
                      <GraduationCap size={12} /> Education
                    </span>
                    <motion.div variants={container} className="space-y-4">
                      {resume.education.map((e, i) => (
                        <motion.div
                          key={i}
                          variants={item}
                          className="pl-3"
                          style={{ borderLeft: "2px solid color-mix(in oklab, var(--primary-light) 50%, transparent)" }}
                        >
                          <h4 className="text-sm font-medium">{e.degree}</h4>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{e.institution}</p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{e.year}</p>
                        </motion.div>
                      ))}
                      {resume.education.length === 0 && (
                        <p className="text-sm" style={{ color: "var(--muted)" }}>No education found.</p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ProtectedRoute>
  );
}