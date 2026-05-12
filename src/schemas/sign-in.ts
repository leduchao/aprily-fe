import { z } from "zod";
import type { TFunction } from "i18next";

export const signInSchema = (t: TFunction) =>
  z.object({
    email: z.email(t("validation.invalidEmail")),
    password: z.string().min(8, t("validation.passwordMinLength")),
  });

export type SignInFormData = z.infer<ReturnType<typeof signInSchema>>;