# Tapout Tactics Art Prompts

Purpose: This is the non-code art planning handoff for Tapout Tactics pose and card artwork. The art chat uses this file to collect approved BJJ technique prompts, technical pose notes, visual mistakes to avoid, and game-readiness decisions. The master app chat can later read this file and connect approved artwork or prompts into the game.

Do not treat this as code. This is an art direction and production checklist document.

## House Art Direction

- Style: comic-book sports-card illustration
- Camera: 45-degree overhead grappling camera
- Mat: gray tatami mats with subtle tile seams
- Athletes: white gi vs blue gi
- Linework: thick black outlines
- Anatomy: realistic adult grappler proportions
- Visibility: full bodies visible, all limbs readable
- Card readability: clear silhouettes at small card size
- Rendering: clean action pose, dynamic but not cluttered
- Safety constraint: no extra limbs, no fused hands, no broken anatomy, no confusing overlaps
- Text: no text, logos, watermarks, UI, or card labels baked into the image

## Canonical Reference Notes

The current target look is the newer white-gi vs blue-gi grappling reference: a 45-degree overhead camera, gray tatami floor, thick black comic outlines, realistic grappler anatomy, full-body visibility, and clear limb placement. This is now the house standard for Tapout Tactics.

Older generated pose PNGs that show both athletes in white gis, use a side-view camera, or place the athletes on a plain studio background should be treated as legacy drafts. They can be useful for technique planning, but they are not final game-ready art unless regenerated or restyled to match the canonical reference.

## Global Prompt Anchor

Use this base direction in every image-generation prompt unless a technique requires a specific exception:

Comic-book sports-card illustration of two Brazilian jiu-jitsu athletes in gis on gray tatami mats, white gi athlete versus blue gi athlete, 45-degree overhead grappling camera, full bodies visible, thick black outlines, realistic anatomy, clean readable silhouettes, dynamic but technically accurate BJJ positioning, subtle mat seams, no text, no logos, no watermark, no extra limbs, no cropped bodies.

## Technique Entry Template

### Technique Name

Status: draft / approved / needs revision

Category:

Game Use:

Image-Generation Prompt:

Key Technical Details:

-

Common Mistakes To Avoid:

-

Game Readiness:

Notes For Master Chat:

## Approved / Planned Technique Prompts

### Standing

Status: in-game reference reviewed

Category: Standing position

Game Use: Neutral baseline position for grip fighting, movement, takedown entries, and reset states.

Image-Generation Prompt:

Comic-book sports-card illustration of two Brazilian jiu-jitsu athletes in gis facing each other in a neutral standing grappling stance, white gi athlete versus blue gi athlete, both athletes crouched with knees bent and hands forward ready to hand fight, 45-degree overhead grappling camera, full bodies visible, gray tatami mats with subtle seams, thick black outlines, realistic adult grappler anatomy, clean readable silhouettes, dynamic but balanced stance, no text, no logos, no watermark, no extra limbs, no cropped bodies.

Key Technical Details:

- Both athletes should be balanced in staggered stances with knees bent and hips slightly back.
- Hands should be up and forward, ready for collar ties, wrist control, or grip fighting.
- Feet should be visible and planted naturally, with neither athlete crossing their stance.
- Distance should read as neutral engagement range, not striking range and not chest-to-chest clinch.
- White gi and blue gi should be clearly separated for instant small-card readability.

Common Mistakes To Avoid:

- Do not show both athletes in the same color gi.
- Do not make the camera a flat side view.
- Do not crop feet, hands, or heads.
- Do not add text or a logo on the mat for generated card art unless the app itself overlays it later.
- Do not make the athletes look like they are boxing, lunging wildly, or already locked into grips.

Game Readiness:

Good enough for the game as a neutral pose. The screenshot version matches the white gi vs blue gi direction and reads clearly at small size. For final polished card art, future versions should use a cleaner gray tatami background without baked-in logo text and should push the camera slightly closer to the canonical 45-degree overhead reference.

Notes For Master Chat:

User provided an in-game screenshot of the Standing pose on 2026-06-17. Treat the currently displayed Standing art as usable, but prefer regenerating/exporting a clean source image without UI overlay, logo text, or screen-photo distortion if available.

## Existing Art Review

### Legacy Standing Pose PNGs

Status: restyle needed

Files:

- `01_standing/standing_neutral_pose.png`
- `01_standing/collar_tie_pose.png`
- `01_standing/wrist_control_pose.png`
- `01_standing/snapdown_pose.png`
- `01_standing/arm_drag_pose.png`

Review:

- These are useful early pose drafts, but they do not match the current Tapout Tactics house style closely enough.
- Main mismatch: both athletes are in white gis instead of white gi vs blue gi.
- Main mismatch: camera is closer to side-view or three-quarter standing illustration instead of the 45-degree overhead grappling camera.
- Main mismatch: background is more studio-like than gray tatami card art.
- Recommendation: regenerate these five before treating them as final game assets.

## In-Game Library Inventory

Source: user-provided screenshot of the Tapout Tactics in-game Library tab on 2026-06-17.

Note: The screenshot shows the pose library buttons and technique names, not the actual artwork thumbnails. Use this as the current app-recognized move list, not as proof that final art files exist for every move.

### Visible Core BJJ Poses (34 total)

These match the `poseLibraryList` array in `poses.js`:

| Pose ID | Display Name | Sprite Filename |
|---|---|---|
| standing | Standing | standing-neutral.png |
| collarTie | Collar Tie | collar-tie.png |
| snapdown | Snapdown | snapdown.png |
| frontHeadlock | Front Headlock | front-headlock.png |
| sprawlPose | Sprawl | sprawl.png |
| doubleLegEntry | Double Leg | double-leg-entry.png |
| singleLegEntry | Single Leg | single-leg-entry.png |
| closedGuardBottom | Closed Guard | closed-guard.png |
| openGuardTop | Open Guard | open-guard.png |
| butterflyGuard | Butterfly | butterfly-guard.png |
| halfGuardTop | Half Guard | half-guard.png |
| kneeSlice | Knee Slice | knee-slice-pass.png |
| torreandoPass | Torreando Pass | torreando-pass.png |
| legDrag | Leg Drag | leg-drag.png |
| bodyLockPass | Body Lock Pass | body-lock-pass.png |
| sideControlTop | Side Control | side-control.png |
| kneeOnBelly | Knee On Belly | knee-on-belly.png |
| mountTop | Mount | mount.png |
| goBehind | Go Behind | go-behind.png |
| backControlTop | Back Control | back-control.png |
| turtle | Turtle | turtle.png |
| armbar | Armbar | armbar.png |
| triangle | Triangle | triangle.png |
| kimura | Kimura | kimura.png |
| hipBump | Hip Bump | hip-bump-sweep.png |
| scissorSweep | Scissor Sweep | scissor-sweep.png |
| rearNakedChoke | RNC | rear-naked-choke.png |
| standingGuillotine | Standing Guillotine | standing-guillotine.png |
| ashiGarami | Ashi Garami | ashi-garami.png |
| legLockFinish | Leg Lock Finish | leg-lock-finish.png |
| guardRecovery | Guard Recovery | guard-recovery.png |
| elbowEscape | Elbow Escape | elbow-escape.png |
| bridgeEscape | Bridge Escape | bridge-escape.png |
| handFight | Hand Fight | hand-fight.png |

### Planning Notes

- The in-game library currently exposes 34 pose names.
- The `poseSpriteMap` in `poses.js` maps each of these pose IDs to the filenames in the table above.
- All 34 sprites should be placed in `assets/sprites/` using those exact filenames.
- The game will fall back to SVG-rendered poses for any filename that is missing.
- The older `bjj_move_database.json` first batch contains 28 moves, so the art database and game library are not perfectly aligned.
- Moves in the app not obviously covered by the original 28-move first batch: Front Headlock, Leg Drag, Knee On Belly, Go Behind, Standing Guillotine, Ashi Garami, Leg Lock Finish, Guard Recovery, Elbow Escape, Bridge Escape, Hand Fight.
- Next art-planning pass should build prompts for all 34 poses using the canonical white-gi vs blue-gi gray-tatami style.

## Art Delivery Checklist

To connect the art library to the live game:

1. Ensure all 34 sprite files exist with the exact filenames listed in the table above.
2. Place them in `assets/sprites/` in the repo.
3. The `poseSpriteMap` in `poses.js` will automatically load them.
4. The game falls back to SVG if a file is missing, so partial delivery is safe.
5. Card-art PNGs from `bjj_art_library/12_card_art/` are a future enhancement for `ui.cards.js`.
