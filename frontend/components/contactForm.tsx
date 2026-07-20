"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormData,
} from "../app/schemas/contactSchemas";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
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

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log(data);

      // API call here

      reset();

      alert("Message sent successfully!");
    } catch {
      alert("Something went wrong.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border p-8 backdrop-blur-xl"
      style={{
        borderColor: "var(--border)",
        background: "var(--card)",
      }}
    >
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          {...register("name")}
          placeholder="John Doe"
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email Address
        </label>

        <input
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Subject
        </label>

        <input
          {...register("subject")}
          placeholder="Partnership Inquiry"
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
        />

        {errors.subject && (
          <p className="mt-2 text-sm text-red-500">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Message
        </label>

        <textarea
          rows={6}
          {...register("message")}
          placeholder="Tell us more..."
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 resize-none"
        />

        <div className="mt-2 flex justify-between">
          {errors.message ? (
            <p className="text-sm text-red-500">
              {errors.message.message}
            </p>
          ) : (
            <span />
          )}

          <p className="text-sm text-gray-500">
            {messageLength}/1000
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full rounded-xl bg-primary px-6 py-3 font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </motion.form>
  );
}