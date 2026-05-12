import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import "./config/i18n";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
