# IronLogic Website — Project Context

## What this is
Single-page marketing website for **Iron Logic** — an AI revenue automation agency that installs done-for-you lead capture, qualification, and appointment booking systems for high-ticket service businesses ($2k+ deal value).

## Stack
- Pure static HTML/CSS/JS — single file: `index.html`
- No build tools, no framework, no npm
- Fonts: Inter (body), DM Mono (code/labels), Playfair Display (logo wordmark)
- Hosted target: ironlogic.ai (not yet deployed)

## Brand
- **Logo mark**: two overlapping squares — dark red `#C8201A` (top-right) + salmon `#E8735A` (bottom-left) + black `#111827` intersection square. Inline SVG, viewBox="0 0 44 44"
- **Wordmark**: "IronLogic" (no space) in Playfair Display
- **Accent color**: `--red: #dc2626` for CTAs, eyebrows, animated words
- **Theme**: White background (`#ffffff`), clean light UI — Linear/Stripe aesthetic
- **NO dark background** — previous version was dark, user switched to light

## Sections (top to bottom)
1. Nav — fixed, glassmorphism on scroll
2. Hero — two-column, animated word-cycle headline, chat card mockup, floating stat badges, mouse-parallax blobs, prominent grid background
3. Ticker — scrolling live results bar
4. Problem — 4 pain points + stat card
5. Systems — 3-column grid (System 01/02/03), center card dark featured
6. Demo — scroll-driven sticky section, 420vh tall, chat messages reveal on scroll
7. Who We Serve — industry list with deal values
8. Case Study — 876 DNA Test, Kingston Jamaica. 340% conversion lift, J$2.4M added monthly revenue
9. Results — 4 animated counters
10. ROI Calculator — dual-panel, sliders on left, dark output panel on right
11. Clarity — What this IS / IS NOT two-column
12. Proof Grid — filterable results cards by industry
13. Testimonial — dark section, Terron Campbell quote
14. Pricing — card with 3 price points
15. CTA — apply for free audit
16. Footer

## Interactive JS (all inline in index.html)
- Smooth scroll (`data-scroll` attribute wires all nav/CTA links)
- Scroll reveal (`.rv` → `.rv.in` via IntersectionObserver)
- Demo scroll-driven chat reveal (scroll progress 0→1 triggers messages)
- Animated counters on #results section enter
- ROI calculator (sliders → live output)
- Proof grid filter buttons
- Magnetic buttons (`.mag` class — cursor follow on hover)
- 3D tilt cards (`.tilt` class — mouse rotate on hover)
- Hero blob parallax (mouse move → blobs shift at different speeds)
- Word cycle animation on hero headline ("speed." → "response time." → "follow-up." → "availability." → "systems.")
- Nav scroll state (adds `.scrolled` class for glassmorphism)
- Progress bar (top of page, scaleX as scroll %)

## Contact / Backend
- Contact email: ironlogic.business@gmail.com
- CTA links currently use `mailto:` — **needs proper form with backend**
- Formspree recommended for static site form handling (no server needed)
- Form endpoint needs to be set up at formspree.io with user's email

## Known issues / TODO
- Demo section: conversation window may be misaligned on certain viewport sizes (sticky layout)
- No deployment yet — just local file
- No analytics wired up
- No real logo image file — logo is inline SVG recreated from brand reference

## Key copy decisions
- Headline: "You're not losing deals on price. You're losing them on [speed/response time/follow-up/availability/systems]"
- Value prop: respond to every lead in seconds, 30–90 day ROI guarantee
- Primary CTA: "Apply for System Audit" → mailto or form
- Positioning: application-based, qualifying businesses only, $2k+ deal value minimum

## User preferences
- Terse responses — no narration, just do the work
- Light background (NOT dark) — previous dark version was scrapped
- Linear.app + Stripe.com are the design reference
- Interactive elements are important (tilt, magnetic, parallax)
- Real logo mark must be used (two overlapping squares, not placeholder)
