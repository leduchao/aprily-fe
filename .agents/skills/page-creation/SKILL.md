---
name: page-creation
description: Guidelines for creating new pages with routing and proper directory structure
type: skill
---

# Page Creation Skill

## Overview

This skill defines the standard structure and conventions for creating React pages with routing in the Aprylie frontend project using TanStack Router.

## Page Structure

When creating a new page, follow this two-part structure:

```
routes/
├── page-name.tsx           (route definition)

pages/
├── page-name/
│   └── index.tsx          (page component)
```

## Step-by-Step Guide

### Step 1: Create Route File

Create the route definition in `src/routes/page-name.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageName } from "../pages/page-name";

export const Route = createFileRoute("/page-name")({
  component: PageName,
});
```

### Step 2: Create Page Component

Create the page component in `src/pages/page-name/index.tsx`:

```tsx
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export function PageName() {
  const { t } = useTranslation();

  return <Box>{/* page JSX */}</Box>;
}
```

## Naming Conventions

### Route File Name

- Use **kebab-case** with `.tsx` extension (e.g., `user-profile.tsx`, `settings-page.tsx`)
- Match the URL path (e.g., route file `user-profile.tsx` → `/user-profile`)
- For nested routes, use format: `parent.$child.tsx`

### Page Directory Name

- Use **kebab-case** (e.g., `user-profile`, `settings-page`)
- Must match the route file name (without `.tsx`)

### Page Component Export

- Use **PascalCase** function name (e.g., `UserProfile`, `SettingsPage`)
- Use named export (`export function PageName`)

## Complete Example: Creating a Dashboard Page

### 1. Create Route File

`src/routes/dashboard.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "../pages/dashboard";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});
```

### 2. Create Page Component

`src/pages/dashboard/index.tsx`:

```tsx
import { Box, Container, Typography, Grid, Card } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          {t("dashboard.title")}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>{/* card content */}</Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
```

### 3. Add i18n Translations

In `src/locales/en.json`:

```json
{
  "dashboard": {
    "title": "Dashboard"
  }
}
```

## Implementation Rules

### ✅ DO

- Create route file in `src/routes/` with kebab-case name
- Create page directory in `src/pages/` with matching kebab-case name
- Use `index.tsx` as the page component filename
- Export component as named export (`export function PageName`)
- Use i18n for all user-visible text
- Import component in route file from `../pages/page-name`
- Add TypeScript types for page props/loaders
- Make pages responsive using Material-UI Grid and responsive sx props

### ❌ DON'T

- Create route files in other locations
- Name page directories differently from route files
- Use PascalCase for directory names
- Create multiple pages in one file
- Use default exports for page components
- Hardcode text strings
- Skip i18n translations
- Make page directories without corresponding route files

## Nested Routes (Optional)

For nested pages like `/settings/profile`:

**Route file:** `src/routes/settings.$profile.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SettingsProfile } from "../pages/settings-profile";

export const Route = createFileRoute("/settings/profile")({
  component: SettingsProfile,
});
```

**Page directory:** `src/pages/settings-profile/index.tsx`

## Layout Structure

Recommended page layout structure:

```tsx
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function PageName() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: "700", mb: 1 }}>
            {t("page.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("page.subtitle")}
          </Typography>
        </Box>

        {/* Content Section */}
        <Box sx={{ mt: 4 }}>{/* main content */}</Box>
      </Box>
    </Container>
  );
}
```

## File Organization

```
src/
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   ├── dashboard.tsx         ← new page route
│   └── settings.tsx          ← another page route
│
├── pages/
│   ├── home/
│   │   └── index.tsx
│   ├── sign-in/
│   │   └── index.tsx
│   ├── sign-up/
│   │   └── index.tsx
│   ├── dashboard/            ← new page component
│   │   └── index.tsx
│   └── settings/             ← another page component
│       └── index.tsx
```

## Translation Keys Pattern

For page translations, use this key structure in `src/locales/*.json`:

```json
{
  "page": {
    "title": "Page Title",
    "subtitle": "Page Subtitle",
    "field1": "Field Label",
    "button": "Button Text"
  }
}
```

## Benefits

- 📁 **Consistency**: Uniform structure for pages across the project
- 🔀 **Routing**: Clear route definitions alongside page components
- 🎯 **Organization**: Pages and routes are logically separated but paired
- 🌍 **i18n Ready**: Built-in internationalization support
- 📱 **Responsive**: Material-UI components for mobile-first design
- 📝 **Type Safe**: Full TypeScript support with TanStack Router
