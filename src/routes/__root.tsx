import { createRootRoute, Outlet } from "@tanstack/react-router";
import { createTheme, CssBaseline, ThemeProvider, Box } from "@mui/material";
import { MobileOnly } from "../components/mobile-only";
// import { LanguageSwitcher } from "../components/language-switcher";

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
      <Box sx={{ position: "relative", minWidth: "320px" }}>
        {/* <LanguageSwitcher /> */}
        <MobileOnly>
          <Outlet />
        </MobileOnly>
      </Box>
    </ThemeProvider>
  );
}
