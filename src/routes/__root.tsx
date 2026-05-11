import { createRootRoute, Outlet } from "@tanstack/react-router";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

export const Route = createRootRoute({
  component: RootComponent,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RootComponent() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}
