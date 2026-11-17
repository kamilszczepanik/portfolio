const END_TOLERANCE_PX = 2;

export const itemsOf = (list: HTMLUListElement) =>
  Array.from(list.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

export const startPadding = (list: HTMLUListElement) =>
  parseFloat(window.getComputedStyle(list).paddingLeft) || 0;

const maxScrollOf = (list: HTMLUListElement) =>
  list.scrollWidth - list.clientWidth;

export const nearestIndex = (list: HTMLUListElement) => {
  const items = itemsOf(list);
  if (list.scrollLeft >= maxScrollOf(list) - END_TOLERANCE_PX) {
    return items.length - 1;
  }
  const padding = startPadding(list);
  const distances = items.map((item) =>
    Math.abs(item.offsetLeft - padding - list.scrollLeft),
  );
  return distances.indexOf(Math.min(...distances));
};

export const countStops = (list: HTMLUListElement) => {
  const maxScroll = maxScrollOf(list);
  if (maxScroll <= END_TOLERANCE_PX) {
    return 1;
  }
  const padding = startPadding(list);
  const startsBeforeEnd = itemsOf(list).filter(
    (item) => item.offsetLeft - padding < maxScroll - END_TOLERANCE_PX,
  );
  return startsBeforeEnd.length + 1;
};
