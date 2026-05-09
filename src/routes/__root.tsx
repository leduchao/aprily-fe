import { createRootRoute, Outlet } from "@tanstack/react-router";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RootComponent() {
  const [count, setCount] = useState(0);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box component={"main"} sx={{ height: "100%" }}>
        <section id="center">
          <Button
            variant="contained"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </Button>
        </section>

        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
