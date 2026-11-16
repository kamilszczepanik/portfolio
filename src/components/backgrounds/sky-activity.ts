type Impact = "none" | "move" | "layout";

export type SkyActivity = {
  isTree: boolean;
  isLayout: boolean;
  movers: Element[];
};

const MOVING_PROPERTIES = new Set([
  "transform",
  "translate",
  "rotate",
  "scale",
  "transform-origin",
]);
const PAINT_PROPERTIES = new Set([
  "opacity",
  "visibility",
  "box-shadow",
  "text-shadow",
  "filter",
  "backdrop-filter",
  "fill",
  "stroke",
  "will-change",
]);
const KEYFRAME_KEYS = new Set([
  "offset",
  "computedOffset",
  "easing",
  "composite",
]);

const toKebab = (property: string) =>
  property.startsWith("--")
    ? property
    : property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const impactOf = (properties: string[]): Impact => {
  let impact: Impact = "none";
  for (const property of properties.map(toKebab)) {
    if (MOVING_PROPERTIES.has(property)) {
      impact = "move";
    } else if (
      !PAINT_PROPERTIES.has(property) &&
      !property.endsWith("-color")
    ) {
      return "layout";
    }
  }
  return impact;
};

const declarations = (css: string | null) =>
  new Map(
    (css ?? "")
      .split(";")
      .map((declaration) => {
        const [name, ...value] = declaration.split(":");
        return [name.trim(), value.join(":").trim()] as const;
      })
      .filter(([name]) => name),
  );

const styleChanges = (record: MutationRecord) => {
  const before = declarations(record.oldValue);
  const after = declarations(
    record.target instanceof Element
      ? record.target.getAttribute("style")
      : null,
  );
  return Array.from(new Set([...before.keys(), ...after.keys()])).filter(
    (name) => before.get(name) !== after.get(name),
  );
};

export const readMutations = (records: MutationRecord[]): SkyActivity => {
  const activity: SkyActivity = { isTree: false, isLayout: false, movers: [] };
  for (const record of records) {
    if (record.type === "childList") {
      activity.isTree = true;
      activity.isLayout = true;
      continue;
    }
    const impact =
      record.attributeName === "style"
        ? impactOf(styleChanges(record))
        : "layout";
    if (impact === "layout") {
      activity.isLayout = true;
    } else if (impact === "move" && record.target instanceof Element) {
      activity.movers.push(record.target);
    }
  }
  return activity;
};

export const scanAnimations = (scope: Element): SkyActivity => {
  const activity: SkyActivity = { isTree: false, isLayout: false, movers: [] };
  for (const animation of scope.getAnimations({ subtree: true })) {
    const { effect } = animation;
    if (
      animation.playState !== "running" ||
      !(effect instanceof KeyframeEffect) ||
      !effect.target
    ) {
      continue;
    }
    const properties = effect
      .getKeyframes()
      .flatMap((frame) => Object.keys(frame))
      .filter((key) => !KEYFRAME_KEYS.has(key));
    const impact = impactOf(properties);
    if (impact === "layout") {
      activity.isLayout = true;
    } else if (impact === "move") {
      activity.movers.push(effect.target);
    }
  }
  return activity;
};
