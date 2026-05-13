import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import z from "zod";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../services/auth";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

export const Route = createFileRoute("/sign-in/")({
  component: RouteComponent,
});

const signInSchema = (t: TFunction) =>
  z.object({
    email: z.email(t("validation.invalidEmail")),
    password: z.string().min(8, t("validation.passwordMinLength")),
  });

type SignInFormData = z.infer<ReturnType<typeof signInSchema>>;

function RouteComponent() {
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      if (response.data?.token && response.data.user) {
        setAuth(response.data.user, response.data.token);
        alert(t("common.submitted"));
      }
    },
    onError: (error) => {
      alert(error instanceof Error ? error.message : t("common.error"));
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    await mutation.mutateAsync({ ...data, rememberMe });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ marginBottom: "32px" }}>
            <Typography variant="h4" sx={{ fontWeight: "700" }}>
              {t("signIn.title")}
            </Typography>
            <Typography variant="caption">{t("signIn.subtitle")}</Typography>
          </Box>

          <Stack
            spacing={2}
            sx={{ marginTop: "16px" }}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="email"
              label={t("signIn.email")}
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <TextField
              id="password"
              label={t("signIn.password")}
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label={t("common.rememberMe")}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || mutation.isPending}
            >
              {t("signIn.submit")}
            </Button>
            <Link
              href="/forgot-password"
              underline="none"
              variant="body2"
              sx={{ textAlign: "end" }}
            >
              {t("common.forgotPassword")}
            </Link>

            <Divider>{t("common.or")}</Divider>

            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => alert(t("common.signInWithGoogle"))}
            >
              {t("common.signInWithGoogle")}
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={() => alert(t("common.signInWithFacebook"))}
            >
              {t("common.signInWithFacebook")}
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: "24px" }}
          >
            {t("signIn.noAccount")}{" "}
            <Link href="/sign-up" underline="none">
              {t("signIn.signUpLink")}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
