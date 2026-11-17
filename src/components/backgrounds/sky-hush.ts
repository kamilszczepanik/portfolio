type HushStepOptions = { now: number; isStill: boolean };

const HUSH_FRAMES = 3;
const FADE_MS = 150;
const MODAL_SELECTOR =
  '[role="dialog"],[role="alertdialog"],[aria-modal="true"],[data-vaul-drawer],[data-vaul-overlay]';
const ROOT_ATTRIBUTES = ["class", "inert", "data-scroll-locked"];
const BODY_ATTRIBUTES = [...ROOT_ATTRIBUTES, "style", "aria-hidden"];
const LAYER_ATTRIBUTES = [
  "inert",
  "aria-hidden",
  "data-aria-hidden",
  "aria-modal",
  "role",
];

const hasModal = (node: Node) =>
  node instanceof Element &&
  (node.matches(MODAL_SELECTOR) || node.querySelector(MODAL_SELECTOR) !== null);

const isLockChange = (record: MutationRecord) => {
  if (record.type === "childList") {
    return [...record.addedNodes, ...record.removedNodes].some(hasModal);
  }
  const { target } = record;
  return (
    target === document.documentElement ||
    target === document.body ||
    target.parentNode === document.body
  );
};

export const watchLocks = (onLock: () => void) => {
  const handleMutations = (records: MutationRecord[]) => {
    if (records.some(isLockChange)) {
      onLock();
    }
  };
  const pageObserver = new MutationObserver(handleMutations);
  pageObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ROOT_ATTRIBUTES,
  });
  pageObserver.observe(document.body, {
    attributes: true,
    attributeFilter: BODY_ATTRIBUTES,
    childList: true,
  });
  const layerObserver = new MutationObserver(handleMutations);
  layerObserver.observe(document.body, {
    attributes: true,
    attributeFilter: LAYER_ATTRIBUTES,
    subtree: true,
  });
  return () => {
    pageObserver.disconnect();
    layerObserver.disconnect();
  };
};

export const createHush = () => {
  let frames = 0;
  let fadeFrom = -Infinity;
  let level = 1;

  const start = () => {
    frames = HUSH_FRAMES;
    level = 0;
  };

  const step = ({ now, isStill }: HushStepOptions) => {
    if (frames > 0) {
      frames -= 1;
      fadeFrom = now;
      return 0;
    }
    level = isStill ? 1 : Math.min(1, (now - fadeFrom) / FADE_MS);
    return level;
  };

  const isActive = () => level < 1;

  return { start, step, isActive };
};
