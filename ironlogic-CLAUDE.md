# CLAUDE.md - IronLogic AI

## What This Project Is
IronLogic AI is an AI automation agency building client-facing systems for Caribbean businesses.
Products: AI voice agent UIs, WhatsApp chatbot dashboards, CRM automation panels,
appointment booking interfaces, client reporting dashboards.
All work is premium, conversion-focused, and cinematic in aesthetic.

## Reference Client: Polygenetics Consulting
The canonical example of what IronLogic delivers. Full system details in `CLAUDE_WAP.md`.
Stack: n8n + Vapi + Twilio + Gemini + Google Sheets + Python tooling.
Every IronLogic system includes: voice agent, WhatsApp bot, CRM automation, and a
Guardian monitoring layer. Deliverables live in cloud services the client accesses directly.

---

## Current State
- Polygenetics system: delivered and running
- IronLogic website: migrating from Netlify to Vercel (serverless function conversion in progress)
- Cold email infrastructure: secondary sending domain, SPF/DKIM/DMARC, Instantly setup
- Active leads: Terron (876 DNA Test - stalled), Joseph (Governor Communications - stalled)
- Next client target: Polygenetics Consulting (Wednesday meeting, free build for testimonial)

---

## Stack
- Next.js 15, App Router, React Server Components by default
- React 19, TypeScript strict mode
- Tailwind CSS v4 (CSS-first - no tailwind.config.js)
- shadcn/ui components in `components/ui/`
- Framer Motion for all animations
- Vercel AI SDK for streaming UI and tool calling
- Supabase (Postgres + RLS + Edge Functions)
- Vercel for hosting + AI Gateway

## Commands
- `npm run dev` - start dev server
- `npm run typecheck` - TypeScript check
- `npm run test` - vitest unit tests
- `npm run build` - production build

---

## Design System - IronLogic Brand

### Palette (never use default Tailwind blue/indigo)
- Background base: `#0a0e1a` (deep navy)
- Surface elevated: `#0f1628`
- Surface floating: `#151c35`
- Accent primary: `#DC2626` (red)
- Accent hover: `#C8201A`
- Text primary: `#f4f4f5`
- Text muted: `#71717a`
- Border subtle: `rgba(255,255,255,0.06)`

### CSS Variable Names (use these in code - never raw hex in components)
- `var(--color-bg-base)` = #0a0e1a
- `var(--color-bg-elevated)` = #0f1628
- `var(--color-bg-floating)` = #151c35
- `var(--color-accent)` = #DC2626
- `var(--color-accent-hover)` = #C8201A
- `var(--color-text-primary)` = #f4f4f5
- `var(--color-text-muted)` = #71717a

### Typography
- Never use the same font for headings and body
- Headings: tight tracking (-0.03em), bold weight
- Body: generous line-height (1.7), clean sans
- Large headings: letter-spacing -0.03em

### Shadows (never flat shadow-md)
- Use layered, color-tinted shadows with low opacity
- Example: `0 4px 24px rgba(220,38,38,0.12), 0 1px 4px rgba(0,0,0,0.4)`

### Gradients and Depth
- Layer multiple radial gradients - never flat backgrounds
- Add grain/texture via SVG noise filter for depth
- Surfaces use layering: base -> elevated -> floating (never same z-plane)

### Animations (Framer Motion only)
- Only animate `transform` and `opacity` - never `transition-all`
- Spring easing: `type: "spring", stiffness: 300, damping: 30`
- Always include `useReducedMotion` fallback
- NEVER mix Tailwind `transition-*` classes with Framer Motion - they conflict
- Use `AnimatePresence` for mount/unmount transitions
- Use `layout` prop for size/position changes

### Interactive States
- Every clickable element needs hover, focus-visible, and active states - no exceptions
- Focus rings use `var(--color-accent)` at 50% opacity

---

## Architecture Rules

### Skill Invocation
- Run `/frontend-design` before writing any frontend code, every session, no exceptions

### Data Fetching
- Fetch data in Server Components - never useEffect for initial data
- Use Suspense boundaries with skeleton fallbacks
- Parallel fetch independent data with Promise.all in server components
- Client components only for interactivity (forms, real-time, animations)

### Error Handling
- Every data-fetching component must be wrapped in an ErrorBoundary
- Failed fetches show explicit error state - never silent fallback
- Retry logic: 3 attempts with exponential backoff before showing error UI
- Never swallow errors silently

### Component Patterns
- No boolean props - use compound components or explicit variant props
- shadcn FieldGroup for all form fields
- shadcn ToggleGroup for option sets
- Use CSS vars from globals.css - never hardcode hex in components
- Export one component per file

### AI / Streaming UI
- Use `useChat` from Vercel AI SDK for chat interfaces
- Use `streamText` for server-side streaming
- Use `generateObject` with Zod schemas for structured AI output
- Always show typing indicator during AI responses
- Stream incrementally - never wait for full response
- Tool calls use Zod schemas for validation

### File Structure
```
src/
├── app/
│   ├── (dashboard)/        - Authenticated dashboard routes
│   ├── (marketing)/        - Public pages
│   └── api/                - Route handlers
├── components/
│   ├── ui/                 - shadcn components (never edit directly)
│   ├── dashboard/          - Dashboard-specific components
│   ├── chat/               - AI chat/voice agent UI components
│   └── shared/             - Reusable across features
├── lib/
│   ├── ai/                 - AI SDK config, system prompts, tools
│   ├── animations/         - Framer Motion variants and configs
│   ├── supabase/           - DB client, queries, types
│   └── utils/              - Helpers
└── styles/
    └── globals.css         - Tailwind v4 CSS vars, design tokens
```

---

## Workflow Rules

### Before Any Task
- Run `/frontend-design` before writing any frontend code
- For any change touching 3+ files: use Plan Mode first
- Check `components/ui/` before building anything - it may already exist

### Execution
- Plan Mode for multi-file changes: investigate -> plan -> execute -> verify
- Parallel sub-agents for independent domains (frontend / backend / DB)
- Run `npm run typecheck` after edits
- Never commit secrets - `.env.local` only, never `.env`

### Git
- Feature branches only - never push directly to `main`
- Branch naming: `feature/description`, `fix/description`

---

## Client Deliverable Standards
- Every client UI must work on mobile (375px minimum)
- Page load under 3s on 4G Caribbean connection
- All interactive elements have loading states
- Error states always handled - never silent failures
- Forms validate client-side before submission

---

## Skills (installed vs planned)
- `/frontend-design` - installed, invoke before every frontend session
- `vercel-react-best-practices` - planned (not yet installed)
- `web-design-guidelines` - planned (not yet installed)
- `vercel-composition-patterns` - planned (not yet installed)
- `vercel-ai-sdk` - planned (not yet installed)

---

## Anti-Patterns - Never Do These
- useEffect for data fetching - use Server Components
- Boolean props - use variants
- transition-all - animate specific properties only
- Default Tailwind blue/indigo as primary color
- Flat shadow-md - use layered tinted shadows
- Hardcode hex in component files - use CSS vars
- console.log in production code
- Silent error swallowing - always surface to user
- Over-engineer - if 50 lines works, use 50 lines
- Make silent assumptions - ask if unsure
