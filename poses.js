// Split from the original prototype script. Keep load order in index.html.

const poseLibraryList = [
  { pose: "standing", label: "Standing" },
  { pose: "collarTie", label: "Collar Tie" },
  { pose: "snapdown", label: "Snapdown" },
  { pose: "frontHeadlock", label: "Front Headlock" },
  { pose: "sprawlPose", label: "Sprawl" },
  { pose: "doubleLegEntry", label: "Double Leg" },
  { pose: "singleLegEntry", label: "Single Leg" },
  { pose: "closedGuardBottom", label: "Closed Guard" },
  { pose: "openGuardTop", label: "Open Guard" },
  { pose: "butterflyGuard", label: "Butterfly" },
  { pose: "halfGuardTop", label: "Half Guard" },
  { pose: "kneeSlice", label: "Knee Slice" },
  { pose: "torreandoPass", label: "Torreando Pass" },
  { pose: "legDrag", label: "Leg Drag" },
  { pose: "bodyLockPass", label: "Body Lock Pass" },
  { pose: "sideControlTop", label: "Side Control" },
  { pose: "kneeOnBelly", label: "Knee On Belly" },
  { pose: "mountTop", label: "Mount" },
  { pose: "goBehind", label: "Go Behind" },
  { pose: "backControlTop", label: "Back Control" },
  { pose: "turtle", label: "Turtle" },
  { pose: "armbar", label: "Armbar" },
  { pose: "triangle", label: "Triangle" },
  { pose: "kimura", label: "Kimura" },
  { pose: "hipBump", label: "Hip Bump" },
  { pose: "scissorSweep", label: "Scissor Sweep" },
  { pose: "rearNakedChoke", label: "RNC" },
  { pose: "standingGuillotine", label: "Standing Guillotine" },
  { pose: "ashiGarami", label: "Ashi Garami" },
  { pose: "legLockFinish", label: "Leg Lock Finish" },
  { pose: "guardRecovery", label: "Guard Recovery" },
  { pose: "elbowEscape", label: "Elbow Escape" },
  { pose: "bridgeEscape", label: "Bridge Escape" },
  { pose: "handFight", label: "Hand Fight" }
];


function animationStageLabels(labels) {
  return labels.map((label, index) => `
    <text class="stage-label stage-${index + 1}" x="${160 + index * 160}" y="392">${label}</text>
  `).join("");
}

function doubleLegAnimation(title) {
  return `
    <svg class="technique-svg double-leg-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="430" cy="326" rx="178" ry="42"/>
      <g class="phase phase-1">${standingGrappler("player", 250, 184, 1)}${standingGrappler("opponent", 550, 184, -1)}</g>
      <g class="phase phase-2">${shootingGrappler("player", 328, 238)}${standingGrappler("opponent", 520, 184, -1)}</g>
      <g class="phase phase-3">${drivingGrappler("player", 405, 250)}${fallingGrappler("opponent", 515, 254)}</g>
      <g class="phase phase-4">${guardTopGrappler("player", 400, 202)}${guardBottomGrappler("opponent", 400, 276)}</g>
      ${animationStageLabels(["Level change", "Penetration step", "Drive through", "Top guard"])}
    </svg>`;
}

function pullGuardAnimation(title) {
  return `
    <svg class="technique-svg pull-guard-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="400" cy="326" rx="170" ry="42"/>
      <g class="phase phase-1">${standingGrappler("player", 285, 184, 1)}${standingGrappler("opponent", 515, 184, -1)}</g>
      <g class="phase phase-2">${standingGrappler("player", 330, 184, 1)}${standingGrappler("opponent", 470, 184, -1)}<path class="scene-control" d="M354 205 C384 184 418 184 448 205"/></g>
      <g class="phase phase-3">${seatedPullGrappler("player", 378, 255)}${leaningTopGrappler("opponent", 430, 204)}</g>
      <g class="phase phase-4">${guardBottomGrappler("player", 400, 276)}${guardTopGrappler("opponent", 400, 202)}</g>
      ${animationStageLabels(["Standing", "Grips", "Sit and pull", "Closed guard"])}
    </svg>`;
}

function kneeSliceAnimation(title) {
  return `
    <svg class="technique-svg knee-slice-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="400" cy="320" rx="166" ry="42"/>
      <g class="phase phase-1">${guardTopGrappler("player", 400, 202)}${guardBottomGrappler("opponent", 400, 278)}</g>
      <g class="phase phase-2">${kneeCutGrappler("player", 372, 220)}${guardBottomGrappler("opponent", 425, 275)}</g>
      <g class="phase phase-3">${sideControlGrappler("player", 350, 218)}${groundGrappler("opponent", 418, 260)}</g>
      <g class="phase phase-4">${sideControlGrappler("player", 342, 212)}${groundGrappler("opponent", 420, 266)}</g>
      ${animationStageLabels(["Pin hip", "Slice knee", "Clear legs", "Side control"])}
    </svg>`;
}

function armbarAnimation(title) {
  return `
    <svg class="technique-svg armbar-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="400" cy="320" rx="160" ry="42"/>
      <g class="phase phase-1">${mountGrappler("player", 400, 198)}${groundGrappler("opponent", 400, 266)}</g>
      <g class="phase phase-2">${armbarSetupGrappler("player", 385, 218)}${groundGrappler("opponent", 410, 268)}</g>
      <g class="phase phase-3">${armbarFinishGrappler("player", 386, 246)}${armbarDefender("opponent", 438, 268)}</g>
      <g class="phase phase-4">${armbarFinishGrappler("player", 374, 246)}${armbarDefender("opponent", 446, 268)}<path class="submission-line" d="M402 246 L494 266"/></g>
      ${animationStageLabels(["Control arm", "Leg swings over", "Hips extend", "Armbar"])}
    </svg>`;
}

function takedownAnimation(title, name) {
  return `
    <svg class="technique-svg takedown-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="415" cy="320" rx="170" ry="42"/>
      <g class="phase phase-1">${standingGrappler("player", 270, 184, 1)}${standingGrappler("opponent", 530, 184, -1)}</g>
      <g class="phase phase-2">${shootingGrappler("player", 360, 238)}${standingGrappler("opponent", 520, 184, -1)}</g>
      <g class="phase phase-3">${drivingGrappler("player", 420, 250)}${fallingGrappler("opponent", 515, 254)}</g>
      <g class="phase phase-4">${guardTopGrappler("player", 400, 205)}${guardBottomGrappler("opponent", 400, 278)}</g>
      <text class="technique-title" x="400" y="58">${name}</text>
      ${animationStageLabels(["Entry", "Connect", "Finish", "Land"])}
    </svg>`;
}

function passAnimation(title, name) {
  return `
    <svg class="technique-svg pass-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="400" cy="320" rx="166" ry="42"/>
      <g class="phase phase-1">${guardTopGrappler("player", 400, 202)}${guardBottomGrappler("opponent", 400, 278)}</g>
      <g class="phase phase-2">${kneeCutGrappler("player", 370, 222)}${guardBottomGrappler("opponent", 430, 276)}</g>
      <g class="phase phase-3">${sideControlGrappler("player", 350, 218)}${groundGrappler("opponent", 418, 260)}</g>
      <g class="phase phase-4">${sideControlGrappler("player", 342, 214)}${groundGrappler("opponent", 420, 266)}</g>
      <text class="technique-title" x="400" y="58">${name}</text>
      ${animationStageLabels(["Control legs", "Cut angle", "Chest pressure", "Settle"])}
    </svg>`;
}

function sweepAnimation(title, name) {
  return `
    <svg class="technique-svg sweep-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="400" cy="320" rx="168" ry="42"/>
      <g class="phase phase-1">${guardBottomGrappler("player", 400, 276)}${guardTopGrappler("opponent", 400, 202)}</g>
      <g class="phase phase-2">${guardBottomGrappler("player", 380, 270)}${tiltingTopGrappler("opponent", 432, 224)}</g>
      <g class="phase phase-3">${rollingTopGrappler("player", 380, 220)}${fallingGrappler("opponent", 430, 270)}</g>
      <g class="phase phase-4">${mountGrappler("player", 400, 198)}${groundGrappler("opponent", 400, 266)}</g>
      <text class="technique-title" x="400" y="58">${name}</text>
      ${animationStageLabels(["Off-balance", "Lift angle", "Roll through", "Top"])}
    </svg>`;
}

function submissionAnimation(title, name) {
  return `
    <svg class="technique-svg submission-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="400" cy="320" rx="160" ry="42"/>
      <g class="phase phase-1">${guardBottomGrappler("player", 400, 276)}${guardTopGrappler("opponent", 400, 202)}</g>
      <g class="phase phase-2">${armbarSetupGrappler("player", 385, 238)}${guardTopGrappler("opponent", 420, 212)}</g>
      <g class="phase phase-3">${armbarFinishGrappler("player", 385, 246)}${armbarDefender("opponent", 440, 268)}</g>
      <g class="phase phase-4">${armbarFinishGrappler("player", 374, 246)}${armbarDefender("opponent", 446, 268)}<path class="submission-line" d="M402 246 L494 266"/></g>
      <text class="technique-title" x="400" y="58">${name}</text>
      ${animationStageLabels(["Trap", "Angle", "Extend", "Finish threat"])}
    </svg>`;
}

function escapeAnimation(title, name) {
  return `
    <svg class="technique-svg escape-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="400" cy="320" rx="160" ry="42"/>
      <g class="phase phase-1">${groundGrappler("player", 410, 266)}${sideControlGrappler("opponent", 350, 218)}</g>
      <g class="phase phase-2">${framingGrappler("player", 410, 260)}${sideControlGrappler("opponent", 346, 216)}</g>
      <g class="phase phase-3">${shrimpGrappler("player", 455, 272)}${sideControlGrappler("opponent", 338, 216)}</g>
      <g class="phase phase-4">${guardBottomGrappler("player", 400, 276)}${guardTopGrappler("opponent", 400, 202)}</g>
      <text class="technique-title" x="400" y="58">${name}</text>
      ${animationStageLabels(["Frame", "Make space", "Hip escape", "Recover"])}
    </svg>`;
}

function handFightAnimation(title, name) {
  return `
    <svg class="technique-svg handfight-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <ellipse class="scene-shadow impact-shadow" cx="280" cy="318" rx="72" ry="18"/>
      <ellipse class="scene-shadow impact-shadow" cx="520" cy="318" rx="72" ry="18"/>
      <g class="phase phase-1">${standingGrappler("player", 280, 184, 1)}${standingGrappler("opponent", 520, 184, -1)}</g>
      <g class="phase phase-2">${standingGrappler("player", 315, 184, 1)}${standingGrappler("opponent", 485, 184, -1)}</g>
      <g class="phase phase-3">${standingGrappler("player", 302, 184, 1)}${standingGrappler("opponent", 498, 184, -1)}<path class="scene-control" d="M352 210 C388 185 418 185 454 210"/></g>
      <g class="phase phase-4">${standingGrappler("player", 300, 184, 1)}${standingGrappler("opponent", 500, 184, -1)}</g>
      <text class="technique-title" x="400" y="58">${name}</text>
      ${animationStageLabels(["Reach", "Grip fight", "Win inside", "Ready"])}
    </svg>`;
}

function fighterBelt(side) {
  if (side === "player") return getBeltProgress(playerXp);
  return { current: { short: "black", color: "#050505" }, stripes: 1 };
}

function beltSvg(side, x, y, width = 76, height = 12, rotation = 0) {
  const progress = fighterBelt(side);
  const barColor = progress.current.short === "black" ? "#ed244f" : "#050505";
  const stripeColor = progress.current.short === "coral" ? "#050505" : "#f7f7f2";
  const stripes = Array.from({ length: progress.stripes || 0 }, (_, index) => {
    const stripeX = x - width / 2 + 10 + index * 7;
    return `<rect class="scene-belt-stripe" x="${stripeX}" y="${y - height / 2 + 2}" width="4" height="${height - 4}" fill="${stripeColor}"/>`;
  }).join("");

  return `
    <g style="--scene-belt-color: ${progress.current.color}" transform="rotate(${rotation} ${x} ${y})">
      <rect class="scene-belt" x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" rx="3"/>
      <rect class="scene-belt-bar" x="${x - width / 2}" y="${y - height / 2}" width="34" height="${height}" fill="${barColor}"/>
      ${stripes}
    </g>`;
}

function lapelSvg(x, y, width = 42, height = 62, rotation = 0) {
  return `
    <g transform="rotate(${rotation} ${x} ${y})">
      <path class="scene-lapel" d="M${x - width / 2 + 8} ${y - height / 2 + 4} L${x} ${y} L${x - 12} ${y + height / 2 - 6}"/>
      <path class="scene-lapel" d="M${x + width / 2 - 8} ${y - height / 2 + 4} L${x} ${y} L${x + 12} ${y + height / 2 - 6}"/>
    </g>`;
}

function bodyClass(side) {
  return side === "player" ? "scene-player" : "scene-opponent";
}

function limbClass(side) {
  return side === "player" ? "scene-limb-player" : "scene-limb-opponent";
}

function patchClass(side) {
  return side === "player" ? "scene-patch-player" : "scene-patch-opponent";
}

function archetypeFor(side) {
  if (side === "player") return state?.style?.id || "wrestler";
  const opponentMap = {
    "The Wrestler": "wrestler",
    "Triangle Hunter": "guard-player",
    "Pressure Passer": "pressure-passer"
  };
  return opponentMap[state?.ai?.name] || "wrestler";
}

function buildFor(side) {
  const archetype = archetypeFor(side);
  const builds = {
    "pressure-passer": { torsoW: 86, torsoH: 92, shoulderW: 116, hipW: 84, limb: 25, leg: 27, head: 19, stance: 0.84 },
    wrestler: { torsoW: 76, torsoH: 88, shoulderW: 106, hipW: 88, limb: 22, leg: 27, head: 19, stance: 0.82 },
    "guard-player": { torsoW: 64, torsoH: 82, shoulderW: 84, hipW: 72, limb: 19, leg: 24, head: 18, stance: 0.94 },
    "leg-locker": { torsoW: 66, torsoH: 78, shoulderW: 88, hipW: 80, limb: 20, leg: 26, head: 18, stance: 0.82 },
    "back-hunter": { torsoW: 66, torsoH: 88, shoulderW: 90, hipW: 74, limb: 20, leg: 24, head: 18, stance: 0.88 }
  };
  return builds[archetype] || builds.wrestler;
}

function jointClass(side) {
  return side === "player" ? "scene-joint" : "scene-joint scene-opponent-joint";
}

function giTorso(side, x, y, rotation = 0, posture = "upright") {
  const body = bodyClass(side);
  const build = buildFor(side);
  const torsoH = posture === "low" ? build.torsoH * 0.72 : build.torsoH;
  const torsoW = posture === "low" ? build.torsoW * 1.15 : build.torsoW;
  const shoulderW = build.shoulderW * (posture === "low" ? 1.05 : 0.96);
  const hipW = build.hipW * 0.88;
  return `
    <g transform="rotate(${rotation} ${x} ${y})">
      <ellipse class="${body} scene-outline scene-depth" cx="${x}" cy="${y + torsoH * 0.08}" rx="${torsoW * 0.58}" ry="${torsoH * 0.42}"/>
      <path class="${body} scene-outline" d="
        M${x - shoulderW / 2} ${y - torsoH * 0.42}
        Q${x} ${y - torsoH * 0.58} ${x + shoulderW / 2} ${y - torsoH * 0.42}
        L${x + hipW / 2} ${y + torsoH * 0.36}
        Q${x} ${y + torsoH * 0.5} ${x - hipW / 2} ${y + torsoH * 0.36}
        Z"/>
      <ellipse class="${body} scene-outline scene-hip" cx="${x}" cy="${y + torsoH * 0.32}" rx="${hipW * 0.48}" ry="${torsoH * 0.14}"/>
      <path class="scene-lapel" d="M${x - torsoW * 0.25} ${y - torsoH * 0.42} L${x} ${y} L${x - torsoW * 0.12} ${y + torsoH * 0.38}"/>
      <path class="scene-lapel" d="M${x + torsoW * 0.25} ${y - torsoH * 0.42} L${x} ${y} L${x + torsoW * 0.12} ${y + torsoH * 0.38}"/>
      <path class="scene-gi-fold" d="M${x - torsoW * 0.34} ${y + torsoH * 0.08} C${x - torsoW * 0.18} ${y + torsoH * 0.18} ${x - torsoW * 0.04} ${y + torsoH * 0.2} ${x + torsoW * 0.1} ${y + torsoH * 0.12}"/>
      <circle class="${patchClass(side)} scene-gi-patch" cx="${x - shoulderW * 0.34}" cy="${y - torsoH * 0.22}" r="8"/>
      ${beltSvg(side, x, y + torsoH * 0.22, torsoW * 1.18, 11)}
    </g>`;
}

function headSvg(x, y, facing = 1, size = 18) {
  return `
    <g>
      <circle class="scene-skin scene-outline" cx="${x}" cy="${y}" r="${size}"/>
      <path class="scene-hair" d="
        M${x - size * 0.9} ${y - size * 0.34}
        C${x - size * 0.82} ${y - size * 1.18} ${x - size * 0.18} ${y - size * 1.38} ${x + size * 0.6} ${y - size * 1.04}
        C${x + size * 0.98} ${y - size * 0.82} ${x + size * 1.02} ${y - size * 0.22} ${x + size * 0.66} ${y + size * 0.02}
        C${x + size * 0.2} ${y - size * 0.2} ${x - size * 0.24} ${y - size * 0.22} ${x - size * 0.9} ${y - size * 0.34}
        Z"/>
      <path class="scene-face-line" d="M${x + size * 0.15 * facing} ${y - size * 0.05} L${x + size * 0.72 * facing} ${y + size * 0.04}"/>
    </g>`;
}

function limbPath(side, d, width = null) {
  const limb = limbClass(side);
  const strokeWidth = width || buildFor(side).limb;
  return `
    <path class="scene-limb-outline" d="${d}" style="stroke-width:${strokeWidth + 7}"/>
    <path class="${limb}" d="${d}" style="stroke-width:${strokeWidth}"/>`;
}

function handSvg(side, x, y) {
  return `<circle class="scene-skin scene-hand" cx="${x}" cy="${y}" r="8"/>`;
}

function footSvg(side, x, y, rotation = 0) {
  return `<ellipse class="scene-skin scene-foot" cx="${x}" cy="${y}" rx="18" ry="8" transform="rotate(${rotation} ${x} ${y})"/>`;
}

function segmentedArm(side, shoulderX, shoulderY, elbowX, elbowY, handX, handY) {
  const build = buildFor(side);
  return `
    ${limbPath(side, `M${shoulderX} ${shoulderY} L${elbowX} ${elbowY}`, build.limb)}
    <circle class="${jointClass(side)}" cx="${elbowX}" cy="${elbowY}" r="${Math.max(5, build.limb * 0.34)}"/>
    ${limbPath(side, `M${elbowX} ${elbowY} L${handX} ${handY}`, build.limb * 0.82)}
    ${handSvg(side, handX, handY)}
  `;
}

function segmentedLeg(side, hipX, hipY, kneeX, kneeY, footX, footY, footRotation = 0) {
  const build = buildFor(side);
  return `
    ${limbPath(side, `M${hipX} ${hipY} L${kneeX} ${kneeY}`, build.leg)}
    <circle class="${jointClass(side)}" cx="${kneeX}" cy="${kneeY}" r="${Math.max(6, build.leg * 0.34)}"/>
    ${limbPath(side, `M${kneeX} ${kneeY} L${footX} ${footY}`, build.leg * 0.84)}
    ${footSvg(side, footX, footY, footRotation)}
  `;
}

function athleteTorso(side, x, y, rotation = 0, posture = "neutral") {
  const body = bodyClass(side);
  const build = buildFor(side);
  const low = posture === "low";
  const torsoW = low ? build.torsoW * 1.08 : build.torsoW;
  const torsoH = low ? build.torsoH * 0.82 : build.torsoH;
  const shoulderW = build.shoulderW;
  const hipW = build.hipW;
  return `
    <g transform="rotate(${rotation} ${x} ${y})">
      <ellipse class="${body} scene-outline scene-depth" cx="${x}" cy="${y + torsoH * 0.1}" rx="${torsoW * 0.64}" ry="${torsoH * 0.43}"/>
      <path class="${body} scene-outline" d="
        M${x - shoulderW / 2} ${y - torsoH * 0.42}
        Q${x} ${y - torsoH * 0.6} ${x + shoulderW / 2} ${y - torsoH * 0.42}
        L${x + hipW / 2} ${y + torsoH * 0.36}
        Q${x} ${y + torsoH * 0.52} ${x - hipW / 2} ${y + torsoH * 0.36}
        Z"/>
      <ellipse class="${body} scene-outline scene-hip" cx="${x}" cy="${y + torsoH * 0.34}" rx="${hipW * 0.48}" ry="${torsoH * 0.16}"/>
      <path class="scene-lapel" d="M${x - torsoW * 0.25} ${y - torsoH * 0.34} L${x} ${y - 2} L${x - torsoW * 0.1} ${y + torsoH * 0.28}"/>
      <path class="scene-lapel" d="M${x + torsoW * 0.25} ${y - torsoH * 0.34} L${x} ${y - 2} L${x + torsoW * 0.1} ${y + torsoH * 0.28}"/>
      <path class="scene-gi-fold" d="M${x - torsoW * 0.36} ${y + torsoH * 0.02} C${x - torsoW * 0.18} ${y + torsoH * 0.16} ${x + torsoW * 0.02} ${y + torsoH * 0.16} ${x + torsoW * 0.18} ${y + torsoH * 0.04}"/>
      <circle class="${patchClass(side)} scene-gi-patch" cx="${x - shoulderW * 0.34}" cy="${y - torsoH * 0.22}" r="8"/>
      ${beltSvg(side, x, y + torsoH * 0.22, torsoW * 1.12, 11)}
    </g>`;
}

function standingGrappler(side, x, y, facing) {
  const build = buildFor(side);
  const crouch = build.stance;
  const lean = (archetypeFor(side) === "guard-player" ? 4 : 14) * facing;
  const headX = x + lean + 16 * facing;
  const headY = y - 42;
  const shoulderY = y - 2;
  const hipY = y + 58;
  const rearFootX = x - build.hipW * 0.76 * facing;
  const leadFootX = x + build.hipW * 0.92 * facing;
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 18 * facing}" cy="${y + 134}" rx="${build.hipW * 1.28}" ry="22"/>
      ${segmentedLeg(side, x - build.hipW * 0.22 * facing, hipY, x - build.hipW * 0.48 * facing, y + 96 * crouch, rearFootX, y + 132, -20 * facing)}
      ${segmentedLeg(side, x + build.hipW * 0.18 * facing, hipY, x + build.hipW * 0.52 * facing, y + 92 * crouch, leadFootX, y + 126, 18 * facing)}
      ${segmentedArm(side, x - build.shoulderW * 0.35 * facing, shoulderY, x + 18 * facing, y - 10, x + 62 * facing, y - 20)}
      ${segmentedArm(side, x + build.shoulderW * 0.35 * facing, shoulderY, x + 34 * facing, y + 8, x + 74 * facing, y + 10)}
      ${athleteTorso(side, x + lean * 0.35, y + 22, facing * -7, "low")}
      <rect class="scene-neck" x="${headX - 7}" y="${headY + 13}" width="14" height="20" rx="7" transform="rotate(${facing * -7} ${headX} ${headY + 22})"/>
      ${headSvg(headX, headY, facing, build.head)}
    </g>`;
}

function collarTieGrappler(side, x, y, facing) {
  const build = buildFor(side);
  const shoulderY = y - 4;
  const hipY = y + 58;
  const headX = x + 42 * facing;
  const headY = y - 44;
  const tieHandX = x + 82 * facing;
  const tieHandY = y - 42;
  const insideHandX = x + 62 * facing;
  const insideHandY = y + 14;
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 24 * facing}" cy="${y + 136}" rx="${build.hipW * 1.24}" ry="21"/>
      ${segmentedLeg(side, x - build.hipW * 0.18 * facing, hipY, x - build.hipW * 0.48 * facing, y + 96, x - build.hipW * 0.82 * facing, y + 134, -20 * facing)}
      ${segmentedLeg(side, x + build.hipW * 0.2 * facing, hipY, x + build.hipW * 0.52 * facing, y + 94, x + build.hipW * 0.9 * facing, y + 128, 18 * facing)}
      ${segmentedArm(side, x + build.shoulderW * 0.36 * facing, shoulderY, x + 54 * facing, y - 26, tieHandX, tieHandY)}
      ${segmentedArm(side, x - build.shoulderW * 0.34 * facing, shoulderY, x + 30 * facing, y + 4, insideHandX, insideHandY)}
      ${athleteTorso(side, x + 16 * facing, y + 24, facing * -16, "low")}
      <rect class="scene-neck" x="${headX - 7}" y="${headY + 13}" width="14" height="20" rx="7" transform="rotate(${facing * -16} ${headX} ${headY + 22})"/>
      ${headSvg(headX, headY, facing, build.head)}
    </g>`;
}

function shootingGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 36}" cy="${y + 82}" rx="${build.shoulderW * 1.45}" ry="23"/>
      ${segmentedLeg(side, x - 24, y + 34, x - 80, y + 54, x - 130, y + 80, -18)}
      ${segmentedLeg(side, x + 22, y + 34, x - 12, y + 82, x - 42, y + 118, 10)}
      ${segmentedArm(side, x + 28, y - 18, x + 74, y - 20, x + 128, y - 26)}
      ${segmentedArm(side, x + 20, y + 16, x + 70, y + 24, x + 126, y + 38)}
      ${athleteTorso(side, x + 6, y + 8, 88, "low")}
      <rect class="scene-neck" x="${x + 72}" y="${y - 12}" width="16" height="20" rx="7" transform="rotate(88 ${x + 80} ${y - 2})"/>
      ${headSvg(x + 88, y - 20)}
    </g>`;
}

function seatedPullGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 76}" rx="${build.hipW * 1.42}" ry="24"/>
      ${limbPath(side, `M${x - 22} ${y + 38} L${x - 98} ${y + 82}`, build.leg)}
      ${limbPath(side, `M${x + 24} ${y + 38} L${x + 100} ${y + 82}`, build.leg)}
      ${limbPath(side, `M${x - build.shoulderW * 0.34} ${y - 18} L${x - 94} ${y - 52}`)}
      ${limbPath(side, `M${x + build.shoulderW * 0.34} ${y - 18} L${x + 92} ${y - 50}`)}
      ${giTorso(side, x, y, 0)}
      ${headSvg(x, y - 82)}
    </g>`;
}

function leaningTopGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 98}" rx="${build.hipW * 1.18}" ry="21"/>
      ${limbPath(side, `M${x - build.shoulderW * 0.36} ${y - 18} L${x - 92} ${y + 12}`)}
      ${limbPath(side, `M${x + build.shoulderW * 0.36} ${y - 16} L${x + 92} ${y + 8}`)}
      ${limbPath(side, `M${x - build.hipW * 0.22} ${y + 58} L${x - 62} ${y + 126}`, build.leg)}
      ${limbPath(side, `M${x + build.hipW * 0.22} ${y + 58} L${x + 62} ${y + 126}`, build.leg)}
      ${giTorso(side, x, y + 6, 0)}
      ${headSvg(x, y - 78)}
    </g>`;
}

function openGuardBottom(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 36}" rx="${build.shoulderW * 1.55}" ry="28"/>
      ${segmentedLeg(side, x - 22, y - 20, x - 70, y - 48, x - 124, y - 58, -12)}
      ${segmentedLeg(side, x - 18, y + 22, x - 72, y + 50, x - 124, y + 70, 12)}
      ${segmentedArm(side, x + 22, y - 18, x + 56, y - 42, x + 92, y - 54)}
      ${segmentedArm(side, x + 22, y + 18, x + 58, y + 40, x + 94, y + 50)}
      ${giTorso(side, x, y, 90, "low")}
      <rect class="scene-neck" x="${x + 72}" y="${y - 15}" width="16" height="22" rx="7" transform="rotate(90 ${x + 80} ${y - 4})"/>
      ${headSvg(x + 96, y - 4)}
    </g>`;
}

function butterflyGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 70}" rx="${build.hipW * 1.45}" ry="24"/>
      ${segmentedLeg(side, x - 26, y + 36, x - 76, y + 66, x - 58, y + 12, -16)}
      ${segmentedLeg(side, x + 26, y + 36, x + 76, y + 66, x + 58, y + 12, 16)}
      ${segmentedArm(side, x - build.shoulderW * 0.34, y - 18, x - 62, y - 42, x - 100, y - 50)}
      ${segmentedArm(side, x + build.shoulderW * 0.34, y - 18, x + 62, y - 42, x + 100, y - 50)}
      ${giTorso(side, x, y, 0)}
      <rect class="scene-neck" x="${x - 8}" y="${y - 66}" width="16" height="22" rx="7"/>
      ${headSvg(x, y - 82)}
    </g>`;
}

function kneelingTop(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 108}" rx="${build.hipW * 1.24}" ry="22"/>
      ${segmentedArm(side, x - build.shoulderW * 0.32, y - 24, x - 56, y - 2, x - 94, y + 6)}
      ${segmentedArm(side, x + build.shoulderW * 0.32, y - 24, x + 56, y - 2, x + 94, y + 6)}
      ${segmentedLeg(side, x - build.hipW * 0.24, y + 54, x - 58, y + 90, x - 88, y + 122, -16)}
      ${segmentedLeg(side, x + build.hipW * 0.24, y + 54, x + 58, y + 90, x + 88, y + 122, 16)}
      ${giTorso(side, x, y, 0)}
      <rect class="scene-neck" x="${x - 8}" y="${y - 66}" width="16" height="22" rx="7"/>
      ${headSvg(x, y - 82)}
    </g>`;
}

function halfGuardBottom(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 36}" rx="${build.shoulderW * 1.55}" ry="30"/>
      ${segmentedLeg(side, x - 34, y - 14, x - 82, y - 48, x + 22, y - 42, 8)}
      ${segmentedLeg(side, x - 36, y + 24, x - 88, y + 64, x + 28, y + 42, -8)}
      ${segmentedArm(side, x + 20, y - 18, x + 54, y - 42, x + 92, y - 48)}
      ${segmentedArm(side, x + 20, y + 20, x + 58, y + 40, x + 94, y + 48)}
      ${giTorso(side, x, y, 90, "low")}
      <rect class="scene-neck" x="${x + 74}" y="${y - 14}" width="16" height="22" rx="7" transform="rotate(90 ${x + 82} ${y - 3})"/>
      ${headSvg(x + 98, y - 4)}
      <path class="scene-control" d="M${x - 54} ${y - 16} C${x - 18} ${y - 42} ${x + 24} ${y - 38} ${x + 54} ${y - 14}"/>
    </g>`;
}

function halfGuardTop(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 26}" cy="${y + 86}" rx="${build.hipW * 1.28}" ry="24"/>
      ${segmentedArm(side, x - build.shoulderW * 0.38, y - 22, x - 66, y - 4, x - 106, y + 8)}
      ${segmentedArm(side, x + build.shoulderW * 0.38, y - 20, x + 58, y + 10, x + 98, y + 24)}
      ${segmentedLeg(side, x - build.hipW * 0.2, y + 54, x - 52, y + 86, x - 82, y + 116, -18)}
      ${segmentedLeg(side, x + build.hipW * 0.28, y + 50, x + 72, y + 64, x + 118, y + 78, 10)}
      ${giTorso(side, x, y - 8, -18, "low")}
      <rect class="scene-neck" x="${x - 34}" y="${y - 70}" width="16" height="22" rx="7" transform="rotate(-18 ${x - 26} ${y - 59})"/>
      ${headSvg(x - 18, y - 86)}
    </g>`;
}

function turtleBottom(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 64}" rx="${build.shoulderW * 1.35}" ry="26"/>
      ${limbPath(side, `M${x - 38} ${y + 12} L${x - 88} ${y + 76}`, build.leg)}
      ${limbPath(side, `M${x + 38} ${y + 12} L${x + 88} ${y + 76}`, build.leg)}
      ${limbPath(side, `M${x - 34} ${y - 18} L${x - 92} ${y + 18}`)}
      ${limbPath(side, `M${x + 34} ${y - 18} L${x + 92} ${y + 18}`)}
      ${giTorso(side, x, y, 0, "low")}
      ${headSvg(x, y - 66)}
    </g>`;
}

function triangleBottom(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 36}" rx="${build.shoulderW * 1.5}" ry="30"/>
      ${limbPath(side, `M${x - 42} ${y - 22} C${x - 112} ${y - 92} ${x + 20} ${y - 126} ${x + 76} ${y - 48}`, build.leg)}
      ${limbPath(side, `M${x - 34} ${y + 24} C${x - 94} ${y + 82} ${x + 4} ${y + 112} ${x + 76} ${y + 48}`, build.leg)}
      ${limbPath(side, `M${x + 22} ${y - 18} L${x + 86} ${y - 48}`)}
      ${limbPath(side, `M${x + 22} ${y + 20} L${x + 86} ${y + 48}`)}
      ${giTorso(side, x, y, 90, "low")}
      ${headSvg(x + 98, y - 4)}
    </g>`;
}

function triangleTop(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 74}" rx="${build.hipW * 1.2}" ry="22"/>
      ${limbPath(side, `M${x - build.shoulderW * 0.35} ${y - 20} L${x - 94} ${y - 2}`)}
      ${limbPath(side, `M${x + build.shoulderW * 0.35} ${y - 16} L${x + 90} ${y + 24}`)}
      ${limbPath(side, `M${x - build.hipW * 0.25} ${y + 52} L${x - 68} ${y + 106}`, build.leg)}
      ${limbPath(side, `M${x + build.hipW * 0.25} ${y + 52} L${x + 68} ${y + 106}`, build.leg)}
      ${giTorso(side, x, y, 10, "low")}
      ${headSvg(x - 18, y - 82)}
    </g>`;
}

function legEntangledTop(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 70}" rx="${build.hipW * 1.25}" ry="24"/>
      ${limbPath(side, `M${x - 24} ${y + 40} L${x - 98} ${y + 82}`, build.leg)}
      ${limbPath(side, `M${x + 22} ${y + 38} L${x + 96} ${y + 78}`, build.leg)}
      ${limbPath(side, `M${x - build.shoulderW * 0.34} ${y - 18} L${x - 88} ${y - 46}`)}
      ${limbPath(side, `M${x + build.shoulderW * 0.34} ${y - 18} L${x + 86} ${y - 44}`)}
      ${giTorso(side, x, y, 0)}
      ${headSvg(x, y - 82)}
    </g>`;
}

function drivingGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 40}" cy="${y + 78}" rx="${build.shoulderW * 1.5}" ry="24"/>
      ${segmentedLeg(side, x - 28, y + 34, x - 90, y + 42, x - 140, y + 66, -18)}
      ${segmentedLeg(side, x + 22, y + 34, x - 16, y + 84, x - 50, y + 122, 12)}
      ${segmentedArm(side, x + 30, y - 16, x + 88, y - 22, x + 146, y - 20)}
      ${segmentedArm(side, x + 24, y + 18, x + 84, y + 32, x + 144, y + 42)}
      ${athleteTorso(side, x + 8, y + 8, 92, "low")}
      <rect class="scene-neck" x="${x + 76}" y="${y - 8}" width="16" height="20" rx="7" transform="rotate(92 ${x + 84} ${y + 2})"/>
      ${headSvg(x + 92, y - 16)}
    </g>`;
}

function fallingGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="78" ry="36" transform="rotate(24 ${x} ${y})"/>
      <circle class="scene-skin" cx="${x + 82}" cy="${y + 8}" r="20"/>
      ${lapelSvg(x, y, 68, 40, 24)}
      ${beltSvg(side, x - 12, y + 8, 62, 10, 24)}
      <path class="${limb}" d="M${x - 22} ${y - 20} L${x - 90} ${y - 62}"/>
      <path class="${limb}" d="M${x - 20} ${y + 20} L${x - 86} ${y + 56}"/>
      <path class="${limb}" d="M${x + 26} ${y - 22} L${x + 94} ${y - 52}"/>
      <path class="${limb}" d="M${x + 28} ${y + 22} L${x + 92} ${y + 68}"/>
    </g>`;
}

function kneeCutGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 18}" cy="${y + 74}" rx="${build.hipW * 1.25}" ry="24"/>
      ${limbPath(side, `M${x - 28} ${y - 34} L${x - 96} ${y - 48}`)}
      ${limbPath(side, `M${x + 28} ${y - 28} L${x + 88} ${y - 8}`)}
      ${limbPath(side, `M${x - 18} ${y + 52} L${x - 84} ${y + 110}`, build.leg)}
      ${limbPath(side, `M${x + 22} ${y + 52} L${x + 118} ${y + 40}`, build.leg)}
      ${giTorso(side, x, y - 12, -18)}
      ${headSvg(x - 20, y - 90)}
      <path class="scene-control" d="M${x + 22} ${y + 48} L${x + 116} ${y + 42}"/>
    </g>`;
}

function armbarSetupGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="66" ry="42" transform="rotate(-20 ${x} ${y})"/>
      <circle class="scene-skin" cx="${x - 70}" cy="${y - 38}" r="20"/>
      ${lapelSvg(x, y, 62, 42, -20)}
      ${beltSvg(side, x + 4, y + 8, 64, 10, -20)}
      <path class="${limb}" d="M${x + 8} ${y - 28} C${x + 74} ${y - 78} ${x + 118} ${y - 34} ${x + 82} ${y + 14}"/>
      <path class="${limb}" d="M${x + 18} ${y + 28} L${x + 92} ${y + 58}"/>
      <path class="${limb}" d="M${x - 24} ${y - 22} L${x - 82} ${y - 64}"/>
    </g>`;
}

function armbarFinishGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="86" ry="34" transform="rotate(-8 ${x} ${y})"/>
      <circle class="scene-skin" cx="${x - 92}" cy="${y - 4}" r="20"/>
      ${lapelSvg(x, y, 72, 38, -8)}
      ${beltSvg(side, x - 14, y + 4, 66, 10, -8)}
      <path class="${limb}" d="M${x + 18} ${y - 24} L${x + 96} ${y - 70}"/>
      <path class="${limb}" d="M${x + 18} ${y + 24} L${x + 98} ${y + 70}"/>
      <path class="${limb}" d="M${x - 24} ${y - 22} L${x - 82} ${y - 62}"/>
      <path class="${limb}" d="M${x - 24} ${y + 22} L${x - 86} ${y + 56}"/>
    </g>`;
}

function armbarDefender(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="78" ry="36"/>
      <circle class="scene-skin" cx="${x + 84}" cy="${y - 2}" r="20"/>
      ${lapelSvg(x, y, 64, 38, 90)}
      ${beltSvg(side, x - 18, y + 2, 60, 10)}
      <path class="${limb}" d="M${x + 12} ${y - 12} L${x - 78} ${y - 38}"/>
      <path class="${limb}" d="M${x - 28} ${y + 22} L${x - 88} ${y + 62}"/>
      <path class="${limb}" d="M${x + 28} ${y + 22} L${x + 86} ${y + 62}"/>
    </g>`;
}

function tiltingTopGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="58" ry="78" transform="rotate(28 ${x} ${y})"/>
      <circle class="scene-skin" cx="${x - 36}" cy="${y - 86}" r="21"/>
      ${lapelSvg(x, y - 18, 54, 72, 28)}
      ${beltSvg(side, x, y + 22, 70, 11, 28)}
      <path class="${limb}" d="M${x - 36} ${y - 30} L${x - 102} ${y - 12}"/>
      <path class="${limb}" d="M${x + 36} ${y - 30} L${x + 92} ${y + 24}"/>
      <path class="${limb}" d="M${x - 25} ${y + 56} L${x - 82} ${y + 102}"/>
      <path class="${limb}" d="M${x + 25} ${y + 56} L${x + 84} ${y + 98}"/>
    </g>`;
}

function rollingTopGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="70" ry="44" transform="rotate(-36 ${x} ${y})"/>
      <circle class="scene-skin" cx="${x - 68}" cy="${y - 42}" r="20"/>
      ${lapelSvg(x, y, 62, 42, -36)}
      ${beltSvg(side, x, y + 8, 64, 10, -36)}
      <path class="${limb}" d="M${x - 20} ${y - 28} L${x - 76} ${y - 80}"/>
      <path class="${limb}" d="M${x + 20} ${y - 24} L${x + 92} ${y - 58}"/>
      <path class="${limb}" d="M${x - 12} ${y + 28} L${x - 70} ${y + 78}"/>
      <path class="${limb}" d="M${x + 22} ${y + 26} L${x + 86} ${y + 72}"/>
    </g>`;
}

function framingGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="82" ry="36"/>
      <circle class="scene-skin" cx="${x + 94}" cy="${y - 2}" r="20"/>
      ${lapelSvg(x, y, 72, 42, 90)}
      ${beltSvg(side, x - 22, y, 62, 10)}
      <path class="${limb}" d="M${x + 10} ${y - 22} L${x - 82} ${y - 62}"/>
      <path class="${limb}" d="M${x + 12} ${y + 22} L${x - 84} ${y + 52}"/>
      <path class="scene-control" d="M${x - 18} ${y - 34} L${x - 112} ${y - 78}"/>
    </g>`;
}

function shrimpGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="76" ry="34" transform="rotate(-18 ${x} ${y})"/>
      <circle class="scene-skin" cx="${x + 86}" cy="${y - 22}" r="20"/>
      ${lapelSvg(x, y, 66, 40, -18)}
      ${beltSvg(side, x - 18, y + 2, 60, 10, -18)}
      <path class="${limb}" d="M${x - 26} ${y - 22} L${x - 94} ${y - 72}"/>
      <path class="${limb}" d="M${x - 24} ${y + 20} L${x - 106} ${y + 30}"/>
      <path class="${limb}" d="M${x + 30} ${y - 20} L${x + 96} ${y - 64}"/>
      <path class="${limb}" d="M${x + 28} ${y + 22} L${x + 88} ${y + 64}"/>
    </g>`;
}

function groundGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 34}" rx="${build.shoulderW * 1.5}" ry="30"/>
      ${segmentedArm(side, x - 26, y - 22, x - 70, y - 48, x - 108, y - 64)}
      ${segmentedArm(side, x - 24, y + 22, x - 70, y + 40, x - 112, y + 56)}
      ${segmentedLeg(side, x + 28, y - 24, x + 74, y - 52, x + 118, y - 60, -12)}
      ${segmentedLeg(side, x + 28, y + 24, x + 78, y + 50, x + 120, y + 66, 14)}
      ${giTorso(side, x, y, 90, "low")}
      <rect class="scene-neck" x="${x + 74}" y="${y - 14}" width="16" height="20" rx="7" transform="rotate(90 ${x + 82} ${y - 4})"/>
      ${headSvg(x + 100, y - 4)}
    </g>`;
}

function guardBottomGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 34}" rx="${build.shoulderW * 1.55}" ry="32"/>
      ${segmentedLeg(side, x - 34, y - 22, x - 82, y - 74, x + 28, y - 54, 8)}
      ${segmentedLeg(side, x - 34, y + 24, x - 86, y + 78, x + 30, y + 56, -8)}
      ${segmentedArm(side, x + 24, y - 18, x + 58, y - 42, x + 94, y - 52)}
      ${segmentedArm(side, x + 24, y + 20, x + 60, y + 42, x + 96, y + 48)}
      ${giTorso(side, x, y, 90, "low")}
      <rect class="scene-neck" x="${x + 74}" y="${y - 16}" width="16" height="22" rx="7" transform="rotate(90 ${x + 82} ${y - 5})"/>
      ${headSvg(x + 98, y - 6)}
      <path class="scene-control" d="M${x - 52} ${y - 34} C${x - 18} ${y - 68} ${x + 30} ${y - 58} ${x + 54} ${y - 34}"/>
      <path class="scene-control" d="M${x - 52} ${y + 36} C${x - 18} ${y + 70} ${x + 30} ${y + 60} ${x + 54} ${y + 36}"/>
    </g>`;
}

function guardTopGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 92}" rx="${build.hipW * 1.25}" ry="24"/>
      ${segmentedArm(side, x - build.shoulderW * 0.38, y - 24, x - 76, y - 2, x - 112, y + 12)}
      ${segmentedArm(side, x + build.shoulderW * 0.38, y - 24, x + 76, y - 2, x + 112, y + 12)}
      ${segmentedLeg(side, x - build.hipW * 0.25, y + 52, x - 58, y + 92, x - 88, y + 124, -18)}
      ${segmentedLeg(side, x + build.hipW * 0.25, y + 52, x + 58, y + 92, x + 88, y + 124, 18)}
      ${giTorso(side, x, y - 14, 0)}
      <rect class="scene-neck" x="${x - 8}" y="${y - 76}" width="16" height="22" rx="7"/>
      ${headSvg(x, y - 96)}
    </g>`;
}

function sideControlGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 38}" cy="${y + 54}" rx="${build.shoulderW * 1.5}" ry="27" transform="rotate(-12 ${x + 38} ${y + 54})"/>
      ${segmentedArm(side, x - 30, y - 24, x + 20, y - 8, x + 86, y + 2)}
      ${segmentedArm(side, x - 16, y + 28, x + 34, y + 48, x + 92, y + 52)}
      ${segmentedLeg(side, x + 32, y - 20, x + 76, y - 50, x + 114, y - 76, -24)}
      ${segmentedLeg(side, x + 40, y + 18, x + 78, y + 54, x + 112, y + 84, 22)}
      ${giTorso(side, x, y, -22, "low")}
      <rect class="scene-neck" x="${x - 92}" y="${y - 36}" width="16" height="22" rx="7" transform="rotate(-22 ${x - 84} ${y - 25})"/>
      ${headSvg(x - 76, y - 42)}
    </g>`;
}

function mountGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 92}" rx="${build.hipW * 1.35}" ry="24"/>
      ${segmentedArm(side, x - build.shoulderW * 0.36, y - 34, x - 58, y - 60, x - 98, y - 76)}
      ${segmentedArm(side, x + build.shoulderW * 0.36, y - 34, x + 58, y - 60, x + 98, y - 76)}
      ${segmentedLeg(side, x - build.hipW * 0.34, y + 48, x - 70, y + 76, x - 110, y + 96, -18)}
      ${segmentedLeg(side, x + build.hipW * 0.34, y + 48, x + 70, y + 76, x + 110, y + 96, 18)}
      ${giTorso(side, x, y - 16, 0)}
      <rect class="scene-neck" x="${x - 8}" y="${y - 76}" width="16" height="22" rx="7"/>
      ${headSvg(x, y - 94)}
    </g>`;
}

function seatedGrappler(side, x, y) {
  const body = bodyClass(side);
  const limb = limbClass(side);
  return `
    <g>
      <ellipse class="${body}" cx="${x}" cy="${y}" rx="52" ry="70"/>
      <circle class="scene-skin" cx="${x}" cy="${y - 88}" r="21"/>
      ${lapelSvg(x, y - 18, 50, 68)}
      ${beltSvg(side, x, y + 22, 68, 11)}
      <path class="${limb}" d="M${x - 24} ${y + 44} L${x - 82} ${y + 98}"/>
      <path class="${limb}" d="M${x + 24} ${y + 44} L${x + 82} ${y + 98}"/>
      <path class="${limb}" d="M${x - 34} ${y - 16} L${x - 86} ${y - 40}"/>
      <path class="${limb}" d="M${x + 34} ${y - 16} L${x + 86} ${y - 40}"/>
    </g>`;
}

function backControlGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 94}" rx="${build.hipW * 1.35}" ry="25"/>
      ${segmentedArm(side, x - build.shoulderW * 0.42, y - 20, x - 18, y + 10, x + 32, y + 4)}
      ${segmentedArm(side, x + build.shoulderW * 0.42, y - 22, x + 16, y + 18, x - 32, y + 6)}
      ${segmentedLeg(side, x - build.hipW * 0.36, y + 52, x - 68, y + 90, x - 100, y + 126, -20)}
      ${segmentedLeg(side, x + build.hipW * 0.36, y + 52, x + 68, y + 90, x + 100, y + 126, 20)}
      ${giTorso(side, x, y - 12, 0)}
      <rect class="scene-neck" x="${x - 8}" y="${y - 74}" width="16" height="22" rx="7"/>
      ${headSvg(x, y - 92)}
      <path class="scene-control" d="M${x - 44} ${y - 14} C${x - 16} ${y + 14} ${x + 24} ${y + 14} ${x + 52} ${y - 14}"/>
    </g>`;
}

function kneelingGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x}" cy="${y + 64}" rx="${build.shoulderW * 1.35}" ry="26"/>
      ${limbPath(side, `M${x - 40} ${y - 18} L${x - 112} ${y - 50}`)}
      ${limbPath(side, `M${x - 18} ${y + 28} L${x - 82} ${y + 82}`, build.leg)}
      ${limbPath(side, `M${x + 26} ${y + 30} L${x + 96} ${y + 68}`, build.leg)}
      ${giTorso(side, x, y, 88, "low")}
      ${headSvg(x - 84, y - 28)}
    </g>`;
}

function frontHeadlockGrappler(side, x, y) {
  const build = buildFor(side);
  return `
    <g>
      <ellipse class="scene-shadow" cx="${x + 30}" cy="${y + 58}" rx="${build.shoulderW * 1.3}" ry="24"/>
      ${limbPath(side, `M${x - 8} ${y - 18} C${x + 28} ${y - 50} ${x + 82} ${y - 46} ${x + 108} ${y - 12}`)}
      ${limbPath(side, `M${x + 20} ${y + 28} L${x + 96} ${y + 72}`, build.leg)}
      ${limbPath(side, `M${x - 34} ${y + 24} L${x - 84} ${y + 82}`, build.leg)}
      ${giTorso(side, x, y, -12, "low")}
      ${headSvg(x - 76, y - 42)}
      <path class="scene-control" d="M${x + 18} ${y - 20} C${x + 42} ${y - 44} ${x + 78} ${y - 42} ${x + 102} ${y - 16}"/>
    </g>`;
}


const positionPoseMap = {
  "Standing": "standing",
  "Top Guard": "closedGuardTop",
  "Bottom Guard": "closedGuardBottom",
  "Top Half Guard": "halfGuardTop",
  "Bottom Half Guard": "halfGuardBottom",
  "Side Control": "sideControlTop",
  "Under Side Control": "sideControlBottom",
  "Mount": "mountTop",
  "Mounted": "mountBottom",
  "Back Control": "backControlTop",
  "Back Taken": "backControlBottom",
  "Front Headlock": "frontHeadlock",
  "Caught Front Headlock": "snapdownBottom",
  "Turtle": "turtle",
  "Ashi Garami": "ashiGarami",
  "Caught Ashi Garami": "ashiGarami"
};

function matSceneSvg(position) {
  return poseSceneSvg(positionPoseMap[position] || "standing", {
    title: position,
    note: "Position"
  });
}

function techniqueAnimationSvg(animation) {
  const card = animation.card;
  const sequence = techniquePoseSequence(card, animation.fromPosition, animation.toPosition);
  return poseSequenceSvg(sequence, card.name);
}

function techniquePoseSequence(card, fromPosition, toPosition) {
  const fromPose = positionPoseMap[fromPosition] || "standing";
  const toPose = positionPoseMap[toPosition] || fromPose;
  const guillotinePose = fromPosition === "Standing" ? "standingGuillotine" : "guillotine";

  if (card.id === "arm-drag") {
    return fromPosition === "Standing"
      ? ["standing", "handFight", "standingArmDrag", toPose]
      : [fromPose, "armDrag", "backControlTop", toPose];
  }

  const sequences = {
    "guard-pull": ["standing", "collarTie", "seatedGuardPull", "closedGuardBottom"],
    "collar-tie": ["standing", "collarTie", "collarTie", toPose],
    "snapdown": ["collarTie", "snapdown", "frontHeadlock", toPose],
    "sprawl": ["standing", "doubleLegEntry", "sprawlPose", toPose],
    "double-leg": ["standing", "doubleLegEntry", "doubleLegDrive", "halfGuardTop"],
    "single-leg": ["standing", "singleLegEntry", "singleLegFinish", "halfGuardTop"],
    "knee-slice": ["halfGuardTop", "kneeSlice", "legClear", "sideControlTop"],
    "body-lock-pass": ["halfGuardTop", "bodyLockPass", "legClear", "sideControlTop"],
    "torreando": ["closedGuardTop", "openGuardTop", "torreandoPass", "sideControlTop"],
    "leg-drag": ["openGuardTop", "legDrag", "sideControlTop", "sideControlTop"],
    "front-headlock-spin": [fromPose, "frontHeadlock", "goBehind", toPose],
    "mount": ["sideControlTop", "kneeOnBelly", "mountTop", "mountTop"],
    "armbar": ["mountTop", "armbarSetup", "armbarLegOver", "armbar"],
    "triangle": ["closedGuardBottom", "triangleSetup", "triangle", "triangle"],
    "rear-naked-choke": ["backControlTop", "rncSetup", "rearNakedChoke", "rearNakedChoke"],
    "butterfly-sweep": ["butterflyGuard", "butterflyLift", "butterflySweep", "halfGuardTop"],
    "hip-bump-sweep": ["closedGuardBottom", "hipBump", "mountTop", "mountTop"],
    "closed-guard-sweep": ["closedGuardBottom", "sweepTilt", "mountTop", "mountTop"],
    "scissor-sweep": ["closedGuardBottom", "scissorSweep", "closedGuardTop", "closedGuardTop"],
    "old-school-sweep": ["halfGuardBottom", "sweepTilt", "halfGuardTop", "halfGuardTop"],
    "ashi-garami-entry": [fromPose, "butterflyGuard", "ashiGarami", "ashiGarami"],
    "guillotine": [fromPose, "frontHeadlock", guillotinePose, toPose],
    "darce": [fromPose, "snapdown", "guillotine", toPose],
    "anaconda": [fromPose, "snapdown", "guillotine", toPose],
    "kimura": [fromPose, "kimura", "kimura", toPose],
    "straight-ankle-lock": [fromPose, "ashiGarami", "legLockFinish", toPose],
    "heel-hook": [fromPose, "ashiGarami", "legLockFinish", toPose],
    "hip-escape": [fromPose, "elbowEscape", "guardRecovery", toPose],
    "reguard": [fromPose, "frameEscape", "guardRecovery", toPose],
    "bridge": [fromPose, "bridgeEscape", "halfGuardBottom", toPose],
    "technical-bridge": [fromPose, "bridgeEscape", "turtle", toPose],
    "hand-fight": [fromPose, "handFight", "standing", toPose]
  };

  if (sequences[card.id]) return sequences[card.id];
  if (card.type === "takedown") return ["standing", "doubleLegEntry", "doubleLegDrive", toPose];
  if (card.type === "pass") return [fromPose, "kneeSlice", "legClear", toPose];
  if (card.type === "guard") return [fromPose, "butterflyGuard", "sweepTilt", toPose];
  if (card.type === "submission") return [fromPose, "armbarSetup", "triangle", toPose];
  if (card.type === "escape") return [fromPose, "frameEscape", "guardRecovery", toPose];
  return [fromPose, "handFight", "collarTie", toPose];
}

function poseSequenceSvg(sequence, title) {
  const labels = sequence.map((pose) => poseLabel(pose));
  return `
    <svg class="technique-svg pose-sequence" viewBox="0 0 800 450" aria-label="${title}">
      <text class="technique-title" x="400" y="52">${title}</text>
      ${sequence.map((pose, index) => `
        <g class="phase phase-${index + 1}">
          <g class="mat-perspective">${poseContentSvg(pose)}</g>
        </g>
      `).join("")}
      ${animationStageLabels(labels)}
    </svg>`;
}

function poseSceneSvg(pose, options = {}) {
  return `
    <svg class="pose-scene" viewBox="0 0 800 450" aria-label="${options.title || poseLabel(pose)}">
      <g class="mat-perspective">${poseContentSvg(pose)}</g>
      <text class="pose-title" x="400" y="52">${options.title || poseLabel(pose)}</text>
      ${options.note ? `<text class="pose-note" x="400" y="78">${options.note}</text>` : ""}
    </svg>`;
}

function poseLabel(pose) {
  const labels = {
    standing: "Standing",
    collarTie: "Collar Tie",
    snapdown: "Snapdown",
    frontHeadlock: "Front Headlock",
    snapdownBottom: "Front Headlock Defense",
    doubleLegEntry: "Double Leg Entry",
    doubleLegDrive: "Drive Through",
    sprawlPose: "Sprawl",
    singleLegEntry: "Single Leg Entry",
    singleLegFinish: "Run The Pipe",
    closedGuardTop: "Closed Guard Top",
    closedGuardBottom: "Closed Guard",
    openGuardTop: "Open Guard Top",
    butterflyGuard: "Butterfly Guard",
    butterflyLift: "Butterfly Lift",
    butterflySweep: "Butterfly Sweep",
    halfGuardTop: "Half Guard Top",
    halfGuardBottom: "Half Guard Bottom",
    kneeSlice: "Knee Slice",
    legClear: "Leg Clears",
    sideControlTop: "Side Control",
    sideControlBottom: "Under Side Control",
    kneeOnBelly: "Knee On Belly",
    mountTop: "Mount",
    mountBottom: "Mounted",
    backControlTop: "Back Control",
    backControlBottom: "Back Taken",
    rncSetup: "Seatbelt",
    rearNakedChoke: "RNC",
    turtle: "Turtle",
    armbarSetup: "Armbar Setup",
    armbarLegOver: "Leg Over Head",
    armbar: "Armbar",
    triangleSetup: "Triangle Setup",
    triangle: "Triangle",
    kimura: "Kimura",
    ashiGarami: "Ashi Garami",
    legLockFinish: "Leg Lock Finish",
    seatedGuardPull: "Sit To Guard",
    frameEscape: "Frame",
    elbowEscape: "Elbow Escape",
    guardRecovery: "Recover Guard",
    bridgeEscape: "Bridge",
    handFight: "Hand Fight",
    armDrag: "Arm Drag",
    standingArmDrag: "Standing Arm Drag",
    bodyLockPass: "Body Lock Pass",
    legDrag: "Leg Drag",
    torreandoPass: "Torreando Pass",
    guillotine: "Guillotine",
    standingGuillotine: "Standing Guillotine",
    hipBump: "Hip Bump",
    scissorSweep: "Scissor Sweep",
    sweepTilt: "Sweep Tilt"
  };
  return labels[pose] || pose;
}

const poseSpriteMap = {
  standing: "standing-neutral.png",
  collarTie: "collar-tie.png",
  snapdown: "snapdown.png",
  frontHeadlock: "front-headlock.png",
  sprawlPose: "sprawl.png",
  doubleLegEntry: "double-leg-entry.png",
  doubleLegDrive: "double-leg-entry.png",
  singleLegEntry: "single-leg-entry.png",
  singleLegFinish: "single-leg-entry.png",
  closedGuardTop: "closed-guard.png",
  closedGuardBottom: "closed-guard.png",
  openGuardTop: "open-guard.png",
  butterflyGuard: "butterfly-guard.png",
  butterflyLift: "butterfly-guard.png",
  butterflySweep: "butterfly-guard.png",
  halfGuardTop: "half-guard.png",
  halfGuardBottom: "half-guard.png",
  kneeSlice: "knee-slice-pass.png",
  torreandoPass: "torreando-pass.png",
  legClear: "side-control.png",
  sideControlTop: "side-control.png",
  sideControlBottom: "side-control.png",
  kneeOnBelly: "knee-on-belly.png",
  mountTop: "mount.png",
  mountBottom: "mount.png",
  goBehind: "go-behind.png",
  backControlTop: "back-control.png",
  backControlBottom: "back-control.png",
  rncSetup: "rear-naked-choke.png",
  rearNakedChoke: "rear-naked-choke.png",
  turtle: "turtle.png",
  armbarSetup: "armbar.png",
  armbarLegOver: "armbar.png",
  armbar: "armbar.png",
  triangleSetup: "triangle.png",
  triangle: "triangle.png",
  kimura: "kimura.png",
  frameEscape: "guard-recovery.png",
  elbowEscape: "elbow-escape.png",
  guardRecovery: "guard-recovery.png",
  bridgeEscape: "bridge-escape.png",
  handFight: "hand-fight.png",
  armDrag: "arm-drag.png",
  standingArmDrag: "standing-arm-drag.png",
  bodyLockPass: "body-lock-pass.png",
  legDrag: "leg-drag.png",
  guillotine: "guillotine.png",
  standingGuillotine: "standing-guillotine.png",
  ashiGarami: "ashi-garami.png",
  legLockFinish: "leg-lock-finish.png",
  hipBump: "hip-bump-sweep.png",
  scissorSweep: "scissor-sweep.png"
};

function poseContentSvg(pose) {
  if (poseSpriteMap[pose]) return poseSpriteSvg(pose, poseSpriteMap[pose]);

  const poseFns = {
    standing: poseStanding,
    collarTie: poseCollarTie,
    snapdown: poseSnapdown,
    snapdownBottom: poseSnapdownBottom,
    doubleLegEntry: poseDoubleLegEntry,
    doubleLegDrive: poseDoubleLegDrive,
    sprawlPose: poseSprawl,
    singleLegEntry: poseSingleLegEntry,
    singleLegFinish: poseSingleLegFinish,
    closedGuardTop: poseClosedGuardTop,
    closedGuardBottom: poseClosedGuardBottom,
    openGuardTop: poseOpenGuardTop,
    butterflyGuard: poseButterflyGuard,
    butterflyLift: poseButterflyLift,
    butterflySweep: poseButterflySweep,
    halfGuardTop: poseHalfGuardTop,
    halfGuardBottom: poseHalfGuardBottom,
    kneeSlice: poseKneeSlice,
    legClear: poseLegClear,
    sideControlTop: poseSideControlTop,
    sideControlBottom: poseSideControlBottom,
    kneeOnBelly: poseKneeOnBelly,
    mountTop: poseMountTop,
    mountBottom: poseMountBottom,
    backControlTop: poseBackControlTop,
    backControlBottom: poseBackControlBottom,
    rncSetup: poseRncSetup,
    rearNakedChoke: poseRearNakedChoke,
    turtle: poseTurtle,
    armbarSetup: poseArmbarSetup,
    armbarLegOver: poseArmbarLegOver,
    armbar: poseArmbar,
    triangleSetup: poseTriangleSetup,
    triangle: poseTriangle,
    kimura: poseKimura,
    ashiGarami: poseAshiGarami,
    legLockFinish: poseLegLockFinish,
    seatedGuardPull: poseSeatedGuardPull,
    frameEscape: poseFrameEscape,
    guardRecovery: poseGuardRecovery,
    bridgeEscape: poseBridgeEscape,
    handFight: poseHandFight,
    bodyLockPass: poseBodyLockPass,
    legDrag: poseLegDrag,
    guillotine: poseGuillotine,
    hipBump: poseHipBump,
    sweepTilt: poseSweepTilt
  };
  return (poseFns[pose] || poseFns.standing)();
}

function poseSpriteSvg(pose, fileName) {
  return `
    <ellipse class="scene-shadow" cx="400" cy="350" rx="235" ry="34"/>
    <image class="pose-sprite generated-pose-sprite ${slugify(pose)}-sprite" href="assets/sprites/${fileName}" x="80" y="58" width="640" height="332" preserveAspectRatio="xMidYMid meet"/>
    ${playerRankMarkerSvg()}
  `;
}

function playerRankMarkerSvg() {
  const progress = getBeltProgress(playerXp);
  return `
    <g class="player-rank-marker">
      <rect x="96" y="356" width="208" height="46" rx="12" fill="rgba(8, 14, 18, 0.74)" stroke="rgba(255,255,255,0.25)"/>
      ${beltSvg("player", 162, 379, 104, 15)}
      <text x="228" y="375" fill="#f7f5ea" font-size="13" font-weight="900" text-anchor="middle">YOUR FIGHTER</text>
      <text x="228" y="393" fill="#f3c76b" font-size="14" font-weight="900" text-anchor="middle">${progress.current.name}</text>
    </g>
  `;
}

function poseStanding() {
  return `
    <ellipse class="scene-shadow" cx="400" cy="340" rx="260" ry="42"/>
    <image class="pose-sprite standing-neutral-sprite" href="assets/sprites/standing-neutral.png" x="80" y="35" width="640" height="365" preserveAspectRatio="xMidYMid meet"/>
  `;
}

function poseCollarTie() {
  return `
    <ellipse class="scene-shadow" cx="340" cy="326" rx="96" ry="20"/>
    <ellipse class="scene-shadow" cx="460" cy="326" rx="96" ry="20"/>
    ${collarTieGrappler("player", 345, 194, 1)}
    ${collarTieGrappler("opponent", 455, 194, -1)}
    <path class="scene-grip" d="M374 156 C392 140 410 140 428 156"/>
    <path class="scene-control" d="M358 212 C388 238 412 238 442 212"/>
  `;
}

function poseSnapdown() {
  return `
    <ellipse class="scene-shadow" cx="390" cy="326" rx="164" ry="36"/>
    ${frontHeadlockGrappler("player", 350, 210)}
    ${kneelingGrappler("opponent", 440, 255)}
  `;
}

function poseSnapdownBottom() {
  return `
    <ellipse class="scene-shadow" cx="390" cy="326" rx="164" ry="36"/>
    ${kneelingGrappler("player", 440, 255)}
    ${frontHeadlockGrappler("opponent", 350, 210)}
  `;
}

function poseDoubleLegEntry() {
  return `
    <ellipse class="scene-shadow" cx="410" cy="332" rx="178" ry="38"/>
    ${shootingGrappler("player", 360, 238)}
    ${standingGrappler("opponent", 530, 182, -1)}
    <path class="scene-control" d="M428 238 C456 230 484 232 512 250"/>
  `;
}

function poseDoubleLegDrive() {
  return `
    <ellipse class="scene-shadow" cx="420" cy="334" rx="190" ry="42"/>
    ${drivingGrappler("player", 405, 252)}
    ${fallingGrappler("opponent", 520, 260)}
  `;
}

function poseSprawl() {
  return `
    <ellipse class="scene-shadow" cx="410" cy="334" rx="190" ry="42"/>
    ${shootingGrappler("opponent", 394, 252)}
    ${sideControlGrappler("player", 360, 210)}
    <path class="scene-control" d="M326 210 C372 176 434 180 482 222"/>
  `;
}

function poseSingleLegEntry() {
  return `
    <ellipse class="scene-shadow" cx="420" cy="330" rx="172" ry="38"/>
    ${shootingGrappler("player", 378, 246)}
    ${standingGrappler("opponent", 530, 182, -1)}
    <path class="scene-control" d="M438 250 L526 292"/>
  `;
}

function poseSingleLegFinish() {
  return `
    <ellipse class="scene-shadow" cx="420" cy="334" rx="188" ry="42"/>
    ${drivingGrappler("player", 412, 252)}
    ${fallingGrappler("opponent", 522, 258)}
  `;
}

function poseClosedGuardTop() {
  return `
    ${guardBottomGrappler("opponent", 400, 276)}
    ${guardTopGrappler("player", 400, 202)}
  `;
}

function poseClosedGuardBottom() {
  return `
    ${guardBottomGrappler("player", 400, 276)}
    ${guardTopGrappler("opponent", 400, 202)}
  `;
}

function poseOpenGuardTop() {
  return `
    ${openGuardBottom("opponent", 390, 280)}
    ${standingGrappler("player", 420, 176, -1)}
  `;
}

function poseButterflyGuard() {
  return `
    ${butterflyGrappler("player", 375, 264)}
    ${kneelingTop("opponent", 455, 222)}
    <path class="scene-control" d="M388 246 C418 222 448 222 478 246"/>
  `;
}

function poseButterflyLift() {
  return `
    ${butterflyGrappler("player", 372, 266)}
    ${tiltingTopGrappler("opponent", 448, 226)}
  `;
}

function poseButterflySweep() {
  return `
    ${rollingTopGrappler("player", 374, 224)}
    ${fallingGrappler("opponent", 452, 272)}
  `;
}

function poseHalfGuardTop() {
  return `
    ${halfGuardBottom("opponent", 410, 274)}
    ${halfGuardTop("player", 372, 214)}
  `;
}

function poseHalfGuardBottom() {
  return `
    ${halfGuardBottom("player", 410, 274)}
    ${halfGuardTop("opponent", 372, 214)}
  `;
}

function poseKneeSlice() {
  return `
    ${halfGuardBottom("opponent", 420, 276)}
    ${kneeCutGrappler("player", 370, 220)}
  `;
}

function poseLegClear() {
  return `
    ${groundGrappler("opponent", 420, 266)}
    ${sideControlGrappler("player", 350, 218)}
  `;
}

function poseSideControlTop() {
  return `
    ${groundGrappler("opponent", 420, 266)}
    ${sideControlGrappler("player", 350, 218)}
  `;
}

function poseSideControlBottom() {
  return `
    ${groundGrappler("player", 420, 266)}
    ${sideControlGrappler("opponent", 350, 218)}
  `;
}

function poseKneeOnBelly() {
  return `
    ${groundGrappler("opponent", 420, 266)}
    ${kneeCutGrappler("player", 380, 205)}
  `;
}

function poseMountTop() {
  return `
    ${groundGrappler("opponent", 400, 268)}
    ${mountGrappler("player", 400, 198)}
  `;
}

function poseMountBottom() {
  return `
    ${groundGrappler("player", 400, 268)}
    ${mountGrappler("opponent", 400, 198)}
  `;
}

function poseBackControlTop() {
  return `
    ${seatedGrappler("opponent", 404, 228)}
    ${backControlGrappler("player", 386, 198)}
  `;
}

function poseBackControlBottom() {
  return `
    ${seatedGrappler("player", 404, 228)}
    ${backControlGrappler("opponent", 386, 198)}
  `;
}

function poseRncSetup() {
  return `
    ${seatedGrappler("opponent", 404, 228)}
    ${backControlGrappler("player", 386, 198)}
    <path class="scene-control" d="M348 178 C384 148 428 150 462 184"/>
  `;
}

function poseRearNakedChoke() {
  return `
    ${seatedGrappler("opponent", 404, 228)}
    ${backControlGrappler("player", 386, 198)}
    <path class="submission-line" d="M350 174 C386 136 432 142 468 186"/>
  `;
}

function poseTurtle() {
  return `
    ${turtleBottom("opponent", 424, 270)}
    ${kneelingTop("player", 380, 210)}
  `;
}

function poseArmbarSetup() {
  return `
    ${groundGrappler("opponent", 410, 268)}
    ${armbarSetupGrappler("player", 384, 220)}
  `;
}

function poseArmbarLegOver() {
  return `
    ${armbarDefender("opponent", 438, 268)}
    ${armbarSetupGrappler("player", 385, 218)}
  `;
}

function poseArmbar() {
  return `
    ${armbarDefender("opponent", 442, 268)}
    ${armbarFinishGrappler("player", 374, 246)}
    <path class="submission-line" d="M402 246 L494 266"/>
  `;
}

function poseTriangleSetup() {
  return `
    ${guardBottomGrappler("player", 398, 276)}
    ${guardTopGrappler("opponent", 410, 202)}
    <path class="scene-control" d="M330 224 C386 172 446 176 500 226"/>
  `;
}

function poseTriangle() {
  return `
    ${triangleBottom("player", 398, 274)}
    ${triangleTop("opponent", 438, 226)}
    <path class="submission-line" d="M326 208 C386 154 464 164 514 230"/>
  `;
}

function poseKimura() {
  return `
    ${groundGrappler("opponent", 420, 266)}
    ${sideControlGrappler("player", 350, 218)}
    <path class="submission-line" d="M376 208 C420 190 458 204 490 240"/>
  `;
}

function poseAshiGarami() {
  return `
    ${openGuardBottom("player", 388, 284)}
    ${legEntangledTop("opponent", 458, 236)}
  `;
}

function poseLegLockFinish() {
  return `
    ${openGuardBottom("player", 388, 284)}
    ${legEntangledTop("opponent", 458, 236)}
    <path class="submission-line" d="M350 296 C402 268 456 270 512 302"/>
  `;
}

function poseSeatedGuardPull() {
  return `
    ${seatedPullGrappler("player", 378, 255)}
    ${leaningTopGrappler("opponent", 430, 204)}
  `;
}

function poseFrameEscape() {
  return `
    ${framingGrappler("player", 414, 266)}
    ${sideControlGrappler("opponent", 350, 218)}
  `;
}

function poseGuardRecovery() {
  return `
    ${guardBottomGrappler("player", 400, 276)}
    ${guardTopGrappler("opponent", 400, 202)}
  `;
}

function poseBridgeEscape() {
  return `
    ${groundGrappler("player", 400, 268)}
    ${tiltingTopGrappler("opponent", 400, 206)}
  `;
}

function poseHandFight() {
  return `
    ${standingGrappler("player", 318, 184, 1)}
    ${standingGrappler("opponent", 482, 184, -1)}
    <path class="scene-control" d="M356 218 C390 238 410 238 444 218"/>
  `;
}

function poseBodyLockPass() {
  return `
    ${halfGuardBottom("opponent", 420, 276)}
    ${sideControlGrappler("player", 356, 222)}
    <path class="scene-control" d="M330 210 C382 184 434 188 482 224"/>
  `;
}

function poseLegDrag() {
  return `
    ${openGuardBottom("opponent", 414, 284)}
    ${sideControlGrappler("player", 350, 218)}
  `;
}

function poseGuillotine() {
  return `
    ${frontHeadlockGrappler("player", 350, 210)}
    ${kneelingGrappler("opponent", 440, 255)}
    <path class="submission-line" d="M346 188 C386 158 426 170 458 212"/>
  `;
}

function poseHipBump() {
  return `
    ${seatedPullGrappler("player", 378, 250)}
    ${tiltingTopGrappler("opponent", 438, 222)}
  `;
}

function poseSweepTilt() {
  return `
    ${guardBottomGrappler("player", 380, 272)}
    ${tiltingTopGrappler("opponent", 438, 226)}
  `;
}
