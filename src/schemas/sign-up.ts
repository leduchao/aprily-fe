import { z } from "zod";
import type { TFunction } from "i18next";

export const signUpSchema = (t: TFunction) =>
  z.object({
    fullName: z.string().min(2, t("validation.fullNameMinLength")),
    username: z
      .string()
      .min(3, t("validation.usernameMinLength"))
      .regex(/^[a-zA-Z0-9_]+$/, t("validation.usernameInvalid")),
    email: z.email(t("validation.invalidEmail")),
    password: z.string().min(8, t("validation.passwordMinLength")),
    confirmPassword: z.string().min(8, t("validation.confirmPasswordRequired")),
  });

export type SignUpFormData = z.infer<ReturnType<typeof signUpSchema>>;
