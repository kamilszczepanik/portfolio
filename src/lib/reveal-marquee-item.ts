type RevealMarqueeItemOptions = {
  list: HTMLElement;
  viewport: HTMLElement;
  target: EventTarget;
};

const MARQUEE_ANIMATION_NAME = "scroll";

const findMarqueeAnimation = (list: HTMLElement) =>
  list
    .getAnimations()
    .find(
      (animation) =>
        animation instanceof CSSAnimation &&
        animation.animationName === MARQUEE_ANIMATION_NAME,
    );

const findItem = (list: HTMLElement, target: EventTarget) => {
  if (!(target instanceof Element)) {
    return null;
  }
  const item = target.closest("li");
  return item?.parentElement === list ? item : null;
};

export const revealMarqueeItem = ({
  list,
  viewport,
  target,
}: RevealMarqueeItemOptions) => {
  const resetScroll = () => {
    viewport.scrollLeft = 0;
  };
  resetScroll();
  requestAnimationFrame(resetScroll);
  const item = findItem(list, target);
  const items = Array.from(list.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const first = items[0];
  const firstCopy = items[Math.floor(items.length / 2)];
  const animation = findMarqueeAnimation(list);
  const timing = animation?.effect?.getComputedTiming();
  if (!item || !first || !firstCopy || !animation || !timing) {
    return;
  }
  const { duration, direction } = timing;
  const period = firstCopy.offsetLeft - first.offsetLeft;
  if (typeof duration !== "number" || period <= 0) {
    return;
  }
  const centeredOffset =
    (viewport.clientWidth - item.offsetWidth) / 2 -
    (item.offsetLeft - first.offsetLeft);
  const offset = Math.min(Math.max(centeredOffset, -period), 0);
  const progress = -offset / period;
  animation.currentTime =
    (direction === "reverse" ? 1 - progress : progress) * duration;
};
