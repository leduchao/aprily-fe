import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long."),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z.string().min(8, "Please confirm your password."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
