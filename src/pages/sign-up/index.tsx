import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpFormData } from "../../schemas/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log({
      ...data,
    });

    alert("submitted");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: {
              xs: "24px 0",
              sm: "0",
            },
          }}
        >
          <Box sx={{ marginBottom: "32px" }}>
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              Create an account
            </Typography>
            <Typography variant="caption">
              Please enter your details to create an account.
            </Typography>
          </Box>

          <Stack
            spacing={2}
            sx={{ marginTop: "16px" }}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <TextField
                fullWidth
                id="fullName"
                label="Full Name"
                error={!!errors.fullName}
                helperText={errors.fullName?.message || "e.g. John Doe"}
                {...register("fullName")}
              />

              <TextField
                fullWidth
                id="username"
                label="Username"
                error={!!errors.username}
                helperText={errors.username?.message || "e.g. johndoe"}
                {...register("username")}
              />
            </Stack>

            <TextField
              id="email"
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message || "e.g. johndoe@example.com"}
              {...register("email")}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={
                  errors.password?.message ||
                  "Must be at least 8 characters long"
                }
                {...register("password")}
              />

              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword?.message ||
                  "Please confirm your password"
                }
                {...register("confirmPassword")}
              />
            </Stack>

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Create an account
            </Button>

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
            Already have an account?{" "}
            <Link href="/sign-in" underline="none">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
