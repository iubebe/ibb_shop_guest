# ibb_shop_guest — Conventions

Customer-facing shop web (menu, cart, placing orders). Guests use it on their phones, so **mobile is the primary target**; tablet/desktop only need to degrade gracefully.

Stack: React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui (`base-nova`), Zustand. Alias `@/` -> `src/`.

## Mobile-first styling

- Write base classes for mobile, then add `sm:` / `md:` / `lg:` to enlarge. Never write desktop-first and override down (no `max-*:` variants unless unavoidable).
- Design and check at 360x640 first, then 390x844. No horizontal scroll at 320px.
- Use Tailwind's default breakpoints only; don't add custom ones without a reason.
- Layout: flex/grid with `gap-*`, fluid widths (`w-full`, `max-w-*`). Avoid fixed pixel widths/heights. Page container is centered with `max-w-md` on larger screens (single column app feel), side padding `px-4`.
- Use `min-h-svh` / `h-svh` (not `100vh`) so mobile browser bars don't break layouts.
- Respect safe areas on fixed top/bottom bars: `pb-[env(safe-area-inset-bottom)]`, and `viewport-fit=cover` in `index.html`.
- Sticky bottom actions (cart bar, "Place order") live at the bottom within thumb reach; primary action is full width.

## Touch and UX

- Tap targets at least 44x44px (`min-h-11 min-w-11`); spacing between adjacent targets at least `gap-2`.
- Inputs use at least 16px text (`text-base`) so iOS doesn't zoom on focus; set the right `inputMode` / `type` / `autoComplete`.
- No hover-only interactions. Hover styles are an enhancement behind `hover:` and must have an `active:` / focus state for touch.
- Always give feedback for actions: pressed state, loading state on buttons, disabled while submitting, toast/inline message on result.
- Provide loading (skeleton), empty and error states for every data-driven screen.
- Prefer bottom sheets / drawers over centered modals on mobile; avoid nested scroll areas.
- Keep text readable: body `text-base`, never below `text-xs`; sufficient contrast for light and dark.
- Images: set width/height or `aspect-*` to avoid layout shift, `loading="lazy"` below the fold, serve sized images.
- Respect `prefers-reduced-motion` for animations; keep transitions short (150-200ms).

## Tailwind and shadcn rules

- Style with Tailwind utilities and shadcn theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-primary`...). No hard-coded hex colors, no inline `style` unless the value is dynamic.
- Change the look globally through CSS variables in `src/index.css`, not per component.
- Merge class names with `cn()` from `@/lib/utils`.
- Add shadcn components with `npx shadcn@latest add <name>`; they land in `src/components/ui/`. Treat them as owned code, but keep edits small and note them in the day's doc.
- Variants go through `cva` (as in `button.tsx`), not ad-hoc conditional strings.
- Icons: `lucide-react` only.
- Class order is not enforced manually; keep long class lists readable by extracting a component rather than a CSS file. No custom CSS files beyond `src/index.css`.

## Code structure

- `src/components/ui/` shadcn primitives (generated). `src/components/` shared app components. `src/features/<feature>/` feature code (components, hooks, api, types). `src/hooks/` shared hooks. `src/stores/` Zustand stores. `src/lib/` helpers.
- Components: function components, named exports, one component per file, `kebab-case.tsx` file names, `PascalCase` component names. Props typed with an `interface`.
- Hooks: `use-xxx.ts` file, `useXxx` name.
- Zustand: one store per domain, select with selectors (`useCartStore(selectCartCount)`), never subscribe to the whole store.
- Prices and money are formatted through one shared formatter, not inline.

## Reuse policy

- Before creating a new reusable component or hook, **suggest it to the user first** (name, purpose, props/signature, where it would be used) and wait for approval. Don't apply it unprompted.
- Rule of three: a one-off stays local to its feature; propose extraction when the same UI/logic appears a second or third time.
- If a shadcn component already covers the need, use it instead of proposing a new one.

## Verification

- Run `npm run build` and `npm run lint` before reporting done.
- For UI changes, check the page in a mobile viewport (devtools device mode or a browser at 390px wide), not only at desktop width.
- Docs go in `docs/<DDMMYYYY>/<topic>.md` per the workspace rules.

## Known gotchas

- `npx shadcn add` generates `import { cn } from "cn"` and re-adds the stray `cn` npm package. After each add, change the import to `@/lib/utils` and run `pnpm remove cn`.
- Package manager is pnpm (`pnpm-lock.yaml`).
