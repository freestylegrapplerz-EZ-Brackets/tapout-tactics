# Build Notes — Craftsmanship C1 (`vs-0.4.0-craftsmanship-c1`)

**Milestone:** C1 Interaction Feel (+ partial C2–C5 polish)  
**Branch:** `cursor/craftsmanship-c1-6013`  
**Mechanics:** Frozen · **No new systems · No content**

---

## What changed

### C1 — Interaction Feel
- **Drag from hand** — pointer ghost follows finger/mouse; drop target highlights valid cell
- **Tap to select** — rune lifts with snap animation; tap again to deselect
- **Long-press pickup** — hold placed rune ~450ms to return to hand (mobile)
- **Right-click pickup** — desktop preserved
- **Spark press** — brief ignition animation + dedicated spark sound before cascade
- **Touch-first** — `touch-action: none` on board/hand; 48–52px rune targets

### C2 — Cascade Feel (partial)
- Eased travel (`easeOutCubic`) — frontier decelerates into each cell
- Element-colored travel lines + white glow core
- Slightly longer spark beat (85ms) and curtain hold (650ms)
- Richer curtain audio on strong chains

### C3 — Visual Language (partial)
- Extracted `theme.css` — one token set for stage, elements, motion, typography
- **Improved lit/cold legibility** — brighter lit glow, higher cold opacity floor
- Calmer hierarchy — uppercase whisper title, softer meta copy

### C4 — Audio (partial)
- Separate UI sounds: pick · drop · cancel · spark · curtain
- AudioContext resumes on first interaction (mobile unlock)

### C5 — Mobile (partial)
- Safe area insets · coarse pointer sizing · viewport-fit cover
- One-thumb layout (max-width 420px, centered stage)

---

## What did not change

- Simulation rules · scoring · cascade logic · Performance 1 hand
- Constitution · Hope Contract · Progressive Discovery philosophy (paused for invites)
- No Performance 2+ · no progression · no new elements or systems

---

## Constitutional alignment

| Principle | How this milestone serves it |
|---|---|
| §4 Frontier is lead actor | C2 travel easing + element-colored wave |
| §5 Player is director | C1 drag/pickup — arranging feels intentional |
| §9 Curtain before credits | Longer hold + curtain audio |
| §10 Grin before optimize | Interaction smile test — pick/drop/spark delight |
| §12 Score hidden during show | Unchanged |

---

## Known issues

- Drag ghost can appear slightly offset on very small screens — acceptable for C1
- Long-press vs spark on occupied cells: movement cancels long-press (by design)
- No haptic API yet — visual pickup-hint only

---

## Review questions (CEO)

1. **Did placing runes feel satisfying** — drag or tap — without thinking about controls?
2. **Did spark feel like calling Action** — not just clicking a button?
3. **Could you pick up and rearrange on your phone** without right-click?
4. **Did lit vs cold read more clearly** after the performance?
5. **Did the frontier feel slightly more alive** — travel easing, color, rhythm?
6. **Would you play with sound on** for at least one full performance?

---

## Play

https://raw.githack.com/freestylegrapplerz-EZ-Brackets/tapout-tactics/cursor/craftsmanship-c1-6013/glyph/index.html

Version string in build: `vs-0.4.0-craftsmanship-c1`
