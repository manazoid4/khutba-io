# Khutba.io visual direction

## Direction contract

| Decision | Direction |
| --- | --- |
| Product mode | Persuade on the public site; operate in admin; experience at viewing distance on the live display |
| Audience and cadence | Volunteer mosque committees evaluating the product, nontechnical operators using it weekly, and congregations reading at 3–15 metres |
| Visual world | **The illuminated courtyard** — Islamic architectural heritage rendered as a calm, premium live-broadcast system |
| Palette family | Midnight and lapis foundations, cobalt/turquoise ceramic accents, aged gold signals, warm plaster text |
| Type treatment | Display-led editorial contrast for marketing; highly legible sans-serif for operations and live captions; Arabic/Urdu-specific fallbacks |
| Composition | Cinematic, layered marketing canvas; focused admin workbench; extremely quiet live display |
| Shape language | Monumental pointed arches, crisp geometry, restrained corner radii, fine gold rules, subtle tile patterns |
| Anti-references | Generic emerald SaaS, crypto dashboards, neon cyberpunk, cheap Ramadan graphics, mosque clip art, ornament overload, glass-card soup |

## Product principles

- The first five seconds explain the chain: imam → translation → existing screen → understanding.
- Gold marks action or readiness; turquoise marks live language infrastructure; red is reserved for live or destructive state.
- The live display uses plaster-white text for every language. Language is identified by a restrained label, never paragraph colour.
- Architectural richness belongs at the edges and in marketing imagery. Operational and worship surfaces preserve calm visual space.
- Motion communicates state changes only and respects `prefers-reduced-motion`.

## Core tokens

| Token | Value |
| --- | --- |
| Midnight | `#08131F` |
| Lapis | `#123E73` |
| Cobalt | `#175EA8` |
| Turquoise | `#1F9EAD` |
| Ceramic | `#88CED0` |
| Gold | `#D6A64A` |
| Light gold | `#F0C978` |
| Sand | `#E7D6B5` |
| Plaster | `#F4EDDF` |
| Ink | `#162027` |

## Accessibility and viewing-distance rules

- Marketing text meets WCAG AA contrast; focus rings are visible in gold/ceramic.
- Live translation targets `clamp(2.4rem, 5.2vw, 6.6rem)` with short measures and generous leading.
- Controls have a minimum 44px target where practical.
- Live, disconnected, standby, and degraded states use both words and colour.
- No critical information depends on animation, blur, or subtle pattern visibility.
