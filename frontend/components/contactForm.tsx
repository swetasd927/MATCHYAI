"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Tag, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import {
  contactSchema,
  ContactFormData,
} from "../app/schemas/contactSchemas";
import { FloatingInput, FloatingTextarea } from "./ui/Input";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

export default function ContactForm() {
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const messageLength = watch("message")?.length || 0;
  const nearLimit = messageLength > 900;

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError("");
    try {
      console.log(data);

      // API call here

      reset();
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again in a moment.");
    }
  };

  if (submitted) {
    return (
      <Card
        variant="glass"
        className="relative overflow-hidden p-8 text-center sm:p-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "color-mix(in oklab, var(--success) 15%, transparent)",
            color: "var(--success)",
          }}
        >
          <CheckCircle2 size={32} />
        </motion.div>
        <h3 className="font-display text-2xl font-bold tracking-tight mb-2">
          Message sent
        </h3>
        <p className="mx-auto mb-8 max-w-sm" style={{ color: "var(--muted)" }}>
          Thanks for reaching out — our team will get back to you within
          1–2 business days.
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </Card>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative overflow-hidden rounded-(--radius-lg) border p-6 sm:p-10"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--primary)" }}
      />

      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="flex items-start gap-2 overflow-hidden rounded-(--radius-md) px-4 py-3 text-sm"
            style={{
              background: "color-mix(in oklab, var(--danger) 10%, transparent)",
              border: "1px solid color-mix(in oklab, var(--danger) 30%, transparent)",
              color: "var(--danger)",
            }}
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {submitError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative grid gap-5 sm:grid-cols-2">
        <div>
          <FloatingInput
            label="Full Name"
            icon={<User size={16} />}
            error={errors.name?.message}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-xs" style={{ color: "var(--danger)" }}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <FloatingInput
            label="Email Address"
            type="email"
            icon={<Mail size={16} />}
            error={errors.email?.message}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 text-xs" style={{ color: "var(--danger)" }}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-5">
        <FloatingInput
          label="Subject"
          icon={<Tag size={16} />}
          error={errors.subject?.message}
          {...register("subject")}
        />
        {errors.subject && (
          <p className="mt-2 text-xs" style={{ color: "var(--danger)" }}>
            {errors.subject.message}
          </p>
        )}
      </div>

      <div className="relative mt-5">
        <FloatingTextarea
          label="Message"
          rows={6}
          error={errors.message?.message}
          {...register("message")}
        />
        <div className="mt-2 flex items-start justify-between gap-4">
          {errors.message ? (
            <p className="text-xs" style={{ color: "var(--danger)" }}>
              {errors.message.message}
            </p>
          ) : (
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--muted)" }}
            >
              <MessageSquare size={12} />
              Minimum 20 characters
            </span>
          )}

          <span
            className="shrink-0 text-xs tabular-nums"
            style={{ color: nearLimit ? "var(--warning)" : "var(--muted)" }}
          >
            {messageLength}/1000
          </span>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        className="relative mt-8 w-full group"
      >
        {!isSubmitting && (
          <>
            Send Message
            <Send
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
        {isSubmitting && "Sending..."}
      </Button>

      <p
        className="relative mt-4 text-center text-xs"
        style={{ color: "var(--muted)" }}
      >
        We typically respond within 1–2 business days.
      </p>
    </motion.form>
  );
}