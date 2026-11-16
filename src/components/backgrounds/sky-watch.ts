import { readMutations } from "./sky-activity";

type WatchSkyOptions = {
  scope: HTMLElement;
  field: HTMLElement;
  canvas: HTMLCanvasElement;
  isViewportBound: boolean;
  onResize: () => void;
  onTree: () => void;
  onLayout: () => void;
  onMovers: (movers: Element[]) => void;
  onScroll: () => void;
  onView: (isInView: boolean) => void;
  onVisibility: () => void;
};

type FitCanvasOptions = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};

const MAX_PIXEL_RATIO = 2;
const SCOPE_MUTATIONS: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeOldValue: true,
  characterData: true,
};

export const fitCanvas = ({ canvas, ctx }: FitCanvasOptions) => {
  const ratio = Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { width, height };
};

export const watchSky = ({
  scope,
  field,
  canvas,
  isViewportBound,
  onResize,
  onTree,
  onLayout,
  onMovers,
  onScroll,
  onView,
  onVisibility,
}: WatchSkyOptions) => {
  const handleMutations = (records: MutationRecord[]) => {
    const activity = readMutations(records);
    if (activity.movers.length > 0) {
      onMovers(activity.movers);
    }
    if (activity.isTree) {
      onTree();
    } else if (activity.isLayout) {
      onLayout();
    }
  };

  const handleInnerScroll = (event: Event) => {
    if (event.target !== document) {
      onLayout();
    }
  };

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(canvas);
  resizeObserver.observe(field);

  const mutationObserver = new MutationObserver(handleMutations);
  mutationObserver.observe(scope, SCOPE_MUTATIONS);
  if (isViewportBound) {
    mutationObserver.observe(document.body, { childList: true });
  }

  const intersectionObserver = isViewportBound
    ? new IntersectionObserver(([entry]) => onView(entry.isIntersecting))
    : null;
  intersectionObserver?.observe(field);

  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", handleInnerScroll, {
    capture: true,
    passive: true,
  });
  document.addEventListener("visibilitychange", onVisibility);
  document.fonts.addEventListener("loadingdone", onLayout);

  return () => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    intersectionObserver?.disconnect();
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("scroll", handleInnerScroll, {
      capture: true,
    });
    document.removeEventListener("visibilitychange", onVisibility);
    document.fonts.removeEventListener("loadingdone", onLayout);
  };
};
