import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters"
    ),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100),

  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject cannot exceed 100 characters"),

  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;