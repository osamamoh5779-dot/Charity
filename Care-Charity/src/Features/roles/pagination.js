export function buildPageItems(current, total) {
  const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  if (total <= 7) return range(1, total);
  if (current <= 4) return [...range(1, 5), "gap", total];
  if (current >= total - 3) return [1, "gap", ...range(total - 4, total)];
  return [1, "gap", current - 1, current, current + 1, "gap", total];
}
