# Aprylie Frontend Agents

This file defines the custom agents available for the Aprylie frontend project.

## Agents

### Component Creator Agent

**Name:** `component-creator`
**Description:** Specialized agent for creating React components following project conventions
**Skills:**

- `component-creation` - Guidelines for creating new components with proper directory structure and naming conventions

**Usage:**

- Create new React components
- Follow kebab-case directory naming
- Use index.tsx pattern
- Include i18n support
- Add TypeScript interfaces

### Page Creator Agent

**Name:** `page-creator`
**Description:** Specialized agent for creating new pages with routing and proper directory structure
**Skills:**

- `page-creation` - Guidelines for creating new pages with routing and proper directory structure

**Usage:**

- Create new pages with TanStack Router
- Set up route definitions
- Create page components in pages/ directory
- Include i18n translations
- Follow responsive design patterns

## Skills

### component-creation

**Path:** `.agents/skills/component-creation/SKILL.md`
**Description:** Guidelines for creating new components with proper directory structure and naming conventions
**Type:** skill

### page-creation

**Path:** `.agents/skills/page-creation/SKILL.md`
**Description:** Guidelines for creating new pages with routing and proper directory structure
**Type:** skill

## Agent Configuration

### Default Agent

The default agent has access to all skills and can perform general coding tasks.

### Specialized Agents

- Use `component-creator` when specifically asked to create components
- Use `page-creator` when specifically asked to create pages
- Use default agent for general coding, debugging, or refactoring tasks

## Usage Examples

### Creating a Component

```
Create a UserCard component
```

→ Uses `component-creator` agent

### Creating a Page

```
Create a dashboard page
```

→ Uses `page-creator` agent

### General Tasks

```
Fix this bug in the sign-in form
```

→ Uses default agent

## Project Context

This project uses:

- **React 19** with TypeScript
- **Material-UI (MUI)** for components
- **TanStack Router** for routing
- **React Hook Form** with Zod validation
- **i18next** for internationalization (English/Vietnamese)
- **Vite** for build tooling

## File Structure

```
src/
├── components/          # Reusable components
│   ├── component-name/  # Kebab-case directories
│   │   ├── index.tsx    # Component files
│   │   └── styles.css   # Optional CSS file for complex styles
├── pages/              # Page components
│   ├── page-name/      # Kebab-case directories
│   │   ├── index.tsx   # Page files
│   │   └── styles.css  # Optional CSS file for complex styles
├── routes/             # Route definitions
│   ├── page-name.tsx   # Route files
├── locales/            # i18n translations
│   ├── en.json
│   └── vi.json
├── schemas/            # Zod validation schemas
└── config/             # Configuration files
    └── i18n.ts         # i18n setup
```

## Coding Standards

### Components

- Directory: `kebab-case`
- File: `index.tsx`
- Export: `export const PascalCase = () => {}`
- Props: TypeScript interfaces
- i18n: Use `useTranslation()` hook

### Pages

- Route file: `routes/kebab-case.tsx`
- Page directory: `pages/kebab-case/`
- Page file: `pages/kebab-case/index.tsx`
- Export: `export function PascalCase() {}`
- i18n: Include translations in locale files

### Styling

- Use Material-UI sx prop for simple styles
- For complex CSS, create a separate CSS file in the component/page folder
- CSS file naming: `styles.css` or `component-name.css`
- Import CSS files at the top of component files
- Responsive design with breakpoints
- Dark theme by default
- Consistent spacing and typography

### Internationalization

- All user-visible text must be translated
- Keys follow pattern: `namespace.key`
- Support English and Vietnamese
- Auto-detect browser language
- Persist language preference in localStorage
