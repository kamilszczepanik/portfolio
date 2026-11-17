import { throttle } from "./sky-watch";
import { collectLayout, SkyLayout } from "./sky-zones";

type LayoutKeeperOptions = {
  scope: HTMLElement;
  field: HTMLElement;
  hasOverlays: boolean;
  onShift: () => void;
};

const COLLECT_INTERVAL_MS = 250;

export const createLayoutKeeper = ({
  scope,
  field,
  hasOverlays,
  onShift,
}: LayoutKeeperOptions) => {
  const sizes = new ResizeObserver(onShift);
  let layout: SkyLayout = { zones: [], horizons: [] };
  let isDirty = true;

  const mark = () => {
    isDirty = true;
  };

  const collect = throttle({
    intervalMs: COLLECT_INTERVAL_MS,
    run: () => {
      mark();
      onShift();
    },
  });

  const recollect = () => {
    onShift();
    collect.call();
  };

  const read = () => {
    if (isDirty) {
      layout = collectLayout({ root: scope, field, hasOverlays });
      isDirty = false;
      sizes.disconnect();
      new Set(
        layout.zones.flatMap((zone) =>
          zone.clip ? [zone.element, zone.clip.element] : [zone.element],
        ),
      ).forEach((element) => sizes.observe(element));
    }
    return layout;
  };

  const stop = () => {
    collect.cancel();
    sizes.disconnect();
  };

  return { mark, read, recollect, stop };
};
