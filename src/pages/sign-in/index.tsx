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
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "../../schemas/sign-in";

export function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log({
      ...data,
      rememberMe,
    });

    alert("submitted");
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
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              Sign in
            </Typography>
            <Typography variant="caption">
              Please enter your credentials to sign in.
            </Typography>
          </Box>

          <Stack
            spacing={2}
            sx={{ marginTop: "16px" }}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="email"
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <TextField
              id="password"
              label="Password"
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
              label="Remember me"
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Sign in
            </Button>
            <Link
              href="/forgot-password"
              underline="none"
              variant="body2"
              sx={{ textAlign: "end" }}
            >
              Forgot password?
            </Link>

            <Divider>or</Divider>

            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => alert("Sign in with Google")}
            >
              Sign in with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={() => alert("Sign in with Facebook")}
            >
              Sign in with Facebook
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: "24px" }}
          >
            Don't have an account?{" "}
            <Link href="/sign-up" underline="none">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
